

import sqlite3
import json
from pathlib import Path

DB_PATH = Path(__file__).parent / "kindred.db"

ALLOWED_STATUSES = ["Pending", "Accepted", "Picked Up", "Completed"]


def get_connection():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def create_tables():
    connection = get_connection()

    connection.execute("""
        CREATE TABLE IF NOT EXISTS donations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            items TEXT NOT NULL,
            total_items INTEGER NOT NULL,
            status TEXT NOT NULL DEFAULT 'Pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    connection.commit()
    connection.close()


def save_donation(items):
    connection = get_connection()

    total_items = sum(item["quantity"] for item in items)

    cursor = connection.execute(
        """
        INSERT INTO donations (items, total_items)
        VALUES (?, ?)
        """,
        (json.dumps(items), total_items)
    )

    donation_id = cursor.lastrowid
    connection.commit()
    connection.close()

    return {
        "id": donation_id,
        "items": items,
        "total_items": total_items,
        "status": "Pending"
    }


def get_all_donations():
    connection = get_connection()

    rows = connection.execute(
        "SELECT * FROM donations ORDER BY id DESC"
    ).fetchall()

    connection.close()

    donations = []

    for row in rows:
        donations.append({
            "id": row["id"],
            "items": json.loads(row["items"]),
            "total_items": row["total_items"],
            "status": row["status"],
            "created_at": row["created_at"]
        })

    return donations


def update_donation_status(donation_id, new_status):
    if new_status not in ALLOWED_STATUSES:
        raise ValueError("Invalid donation status.")

    connection = get_connection()

    cursor = connection.execute(
        """
        UPDATE donations
        SET status = ?
        WHERE id = ?
        """,
        (new_status, donation_id)
    )

    connection.commit()
    updated = cursor.rowcount > 0
    connection.close()

    if not updated:
        return None

    return {
        "id": donation_id,
        "status": new_status
    }
