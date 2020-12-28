from .db import db

class Pledge(db.Model):
  __tablename__ = 'pledges'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable = False)
  amount = db.Column(db.Numeric(10, 2), nullable = False)

  user = db.relationship("User", back_populates="pledges")
  project = db.relationship("Project", back_populates="pledges")
