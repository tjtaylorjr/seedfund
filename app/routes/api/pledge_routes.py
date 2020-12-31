from flask import Blueprint, jsonify, redirect, request
from datetime import datetime, timedelta
from app.models import db, Project, Pledge, User
from app.forms.project_form import ProjectForm

pledge_routes = Blueprint('pledges', __name__)


# Get all pledges for a specific project
@pledge_routes.route('/projects/<id>/pledges')
def getAllProjectPledges(id):
    project = Project.query.get(id)
    result = Pledge.query.filter_by(project_id=project.id).all()
    data = [pledge.to_dict() for pledge in result]
    return {"pledges": data}


# Create a new pledge to a specific project
@pledge_routes.route('/projects/<id>/pledges', methods=["POST"])
def newPledge(id):
    data = request.get_json()
    user_id = data["userId"]
    project_id = data["projectId"]
    amount = float(data["amount"])
    project = Project.query.get(id)
    if project:
        project.balance = float(project.balance) + amount
        pledge = Pledge()
        pledge.user_id = user_id
        pledge.project_id = project_id
        pledge.amount = amount
        db.session.add(pledge)
        db.session.commit()
        return {"pledge": pledge.to_dict(), "project": project.to_dict()}
    else:
        return {"error": f'project id {id} not found'}


# Edit an existing pledge to a specific project
@pledge_routes.route('/projects/<id>/pledges', methods=["PUT"])
def editPledge(id):
    data = request.get_json()
    amount = float(data["amount"])
    project = Project.query.get(id)
    if project:
        pledge = Pledge.query.filter_by(project_id=project.id).first()
        project.balance = float(project.balance) + amount
        pledge.amount = float(pledge.amount) + amount
        db.session.commit()
        return {"pledge": pledge.to_dict(), "project": project.to_dict()}
    else:
        return {"error": f'project id {id} not found'}


# Get all pledges for a specific USER
@pledge_routes.route('/users/<id>/pledges')
def getAllUserPledges(id):
    user = User.query.get(id)
    pledges = Pledge.query.filter_by(user_id=user.id).all()
    data = [pledge.to_dict() for pledge in result]
    return {"pledges": data}
