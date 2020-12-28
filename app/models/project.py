from .db import db

class Project(db.Model):
  __tablename__ = 'projects'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  title = db.Column(db.String(100), nullable = False)
  description = db.Column(db.Text, nullable = True)
  funding_goal = db.Column(db.Numeric(10, 2), nullable = False)
  balance = db.Column(db.Numeric(10,2), nullable = False, default = 0.00)
  image = db.Column(db.String, nullable = True)
  date_goal = db.Column(db.Date, nullable = False)
  category = db.Column(db.String, nullable = False)

  user = db.relationship("User", back_populates="projects")
  pledges = db.relationship("Pledge", back_populates="project") #project is not a typo
