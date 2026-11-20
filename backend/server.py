

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import UnidentifiedImageError

from detector import detect
from database import (
    create_tables,
    save_donation,
    get_all_donations,
    update_donation_status
)

app = FastAPI(title="Kindred Donation API")

# Create database tables automatically
create_tables()

# Allow React frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Kindred Donation API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "detector": "YOLO ready"
    }


@app.post("/api/detect")
async def detect_items(
    file: UploadFile = File(...),
    min_conf: float = Form(0.35)
):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a valid image."
        )

    if not 0 <= min_conf <= 1:
        raise HTTPException(
            status_code=400,
            detail="Confidence must be between 0 and 1."
        )

    try:
        image_bytes = await file.read()

        if not image_bytes:
            raise HTTPException(
                status_code=400,
                detail="The uploaded image is empty."
            )

        items = detect(image_bytes, min_conf)

        return {
            "success": True,
            "total_items": sum(item["quantity"] for item in items),
            "detected_categories": len(items),
            "items": items
        }

    except UnidentifiedImageError:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is not a valid image."
        )

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Detection failed: {str(error)}"
        )


class DonationRequest(BaseModel):
    items: list[dict]


@app.post("/api/donations")
def create_donation(payload: DonationRequest):
    if not payload.items:
        raise HTTPException(
            status_code=400,
            detail="Donation must contain at least one item."
        )

    for item in payload.items:
        if not item.get("item_name") or not item.get("category"):
            raise HTTPException(
                status_code=400,
                detail="Every item must have a name and category."
            )

        if not isinstance(item.get("quantity"), int) or item["quantity"] < 1:
            raise HTTPException(
                status_code=400,
                detail="Item quantity must be at least 1."
            )

    donation = save_donation(payload.items)

    return {
        "success": True,
        "message": "Donation saved successfully!",
        "donation": donation
    }


@app.get("/api/donations")
def list_donations():
    donations = get_all_donations()

    return {
        "success": True,
        "total_donations": len(donations),
        "donations": donations
    }

class DonationStatusRequest(BaseModel):
    status: str


@app.patch("/api/donations/{donation_id}/status")
def change_donation_status(
    donation_id: int,
    payload: DonationStatusRequest
):
    try:
        donation = update_donation_status(
            donation_id,
            payload.status
        )

        if donation is None:
            raise HTTPException(
                status_code=404,
                detail="Donation not found."
            )

        return {
            "success": True,
            "message": "Donation status updated successfully.",
            "donation": donation
        }

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )
