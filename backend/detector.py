
import io
from pathlib import Path

from PIL import Image
from ultralytics import YOLO


# Get the backend folder
BASE_DIR = Path(__file__).resolve().parent

# Existing general object detection model
general_model = YOLO(str(BASE_DIR / "yolov8s.pt"))

# Newly trained custom clothing model
clothing_model = YOLO(str(BASE_DIR / "clothing_best.pt"))


# General model category mapping
CATEGORY_MAP = {
    # Books
    "book": "books",

    # Electronics
    "laptop": "electronics",
    "tv": "electronics",
    "cell phone": "electronics",
    "keyboard": "electronics",
    "mouse": "electronics",
    "remote": "electronics",
    "microwave": "electronics",
    "toaster": "electronics",

    # Furniture
    "chair": "furniture",
    "couch": "furniture",
    "bed": "furniture",
    "dining table": "furniture",
    "bench": "furniture",

    # Utensils
    "cup": "utensils",
    "fork": "utensils",
    "knife": "utensils",
    "spoon": "utensils",
    "bowl": "utensils",
    "bottle": "utensils",
    "wine glass": "utensils",

    # Food
    "apple": "food",
    "banana": "food",
    "orange": "food",
    "sandwich": "food",
    "carrot": "food",
    "broccoli": "food",
    "pizza": "food",
    "donut": "food",
    "cake": "food",
    "hot dog": "food",

    # General clothing and accessories
    "tie": "clothing",
    "backpack": "clothing",
    "handbag": "clothing",
    "suitcase": "clothing",
}


# Custom clothing model classes
CLOTHING_CLASSES = {
    "Flats",
    "High Heel",
    "Hoodie",
    "Jacket",
    "Long Pants",
    "Long Shirt",
    "Long Skirt",
    "Shirt",
    "Shorts",
    "Short Skirt",
    "SleevelessShirt",
    "Slipper",
    "Sport Shoes",
}


def add_detection(found, name, category, confidence):

    key = (name, category)

    if key not in found:
        found[key] = {
            "item_name": name,
            "category": category,
            "quantity": 0,
            "confidence": 0.0,
        }

    found[key]["quantity"] += 1

    found[key]["confidence"] = max(
        found[key]["confidence"],
        confidence
    )


def detect(image_bytes, min_conf=0.20):

    image = Image.open(
        io.BytesIO(image_bytes)
    ).convert("RGB")

    found = {}

    # 1. General object detection
    general_result = general_model(
        image,
        conf=min_conf,
        imgsz=960,
        verbose=False
    )[0]

    for box in general_result.boxes:

        name = general_result.names[int(box.cls)]
        category = CATEGORY_MAP.get(name)

        if category is None:
            continue

        confidence = float(box.conf)

        add_detection(
            found,
            name,
            category,
            confidence
        )

    # 2. Custom clothing detection
    clothing_result = clothing_model(
        image,
        conf=min_conf,
        imgsz=640,
        verbose=False
    )[0]

    for box in clothing_result.boxes:

        name = clothing_result.names[int(box.cls)]

        if name not in CLOTHING_CLASSES:
            continue

        confidence = float(box.conf)

        add_detection(
            found,
            name,
            "clothing",
            confidence
        )

    # 3. Prepare API response
    items = []

    for i, item in enumerate(found.values(), start=1):

        item["id"] = i

        item["confidence"] = round(
            item["confidence"], 2
        )

        items.append(item)

    return items
