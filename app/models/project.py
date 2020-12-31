from .db import db
from datetime import datetime


class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    funding_goal = db.Column(db.Numeric(10, 2), nullable=False)
    balance = db.Column(db.Numeric(10, 2), nullable=False, default=0.00)
    image = db.Column(db.String, nullable=True)
    date_goal = db.Column(db.Date, nullable=False)
    category = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="projects")
    # project is not a typo
    pledges = db.relationship(
        "Pledge", back_populates="project", cascade="delete, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "description": self.description,
            "funding_goal": float(self.funding_goal),
            "balance": float(self.balance),
            "image": self.image,
            "date_goal": self.date_goal.isoformat(),
            "category": self.category,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
