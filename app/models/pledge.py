from .db import db
from datetime import datetime


class Pledge(db.Model):
    __tablename__ = 'pledges'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(
        "projects.id"), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="pledges")
    project = db.relationship("Project", back_populates="pledges")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "project_id": self.project_id,
            "amount": f'{float(self.amount):,.0f}',
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def to_dict_projects(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "project_id": self.project_id,
            "amount": f'{float(self.amount):,.0f}',
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "project": self.project.to_dict()
        }
