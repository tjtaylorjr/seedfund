from flask import Blueprint, jsonify, redirect, request
from datetime import datetime, timedelta
from app.models import db, Project, Pledge, User
from app.forms.project_form import ProjectForm
from sqlalchemy.orm import joinedload

pledge_routes = Blueprint('pledges', __name__)


#Get all pledges for a specific project
@pledge_routes.route('/projects/<id>/pledges')
def getAllProjectPledges(id):
    project = Project.query.get(id)
    if project:
        result = Pledge.query.filter_by(project_id=project.id).all()
        data = [pledge.to_dict() for pledge in result]
        return {"pledges": data}
    else:
        return {"error": f'project id {id} not found'}, 404


# Create a new pledge to a specific project
@pledge_routes.route('/projects/<id>/pledges', methods=["POST"])
def newPledge(id):
    data = request.get_json()
    user_id = data["userId"]
    project_id = data["projectId"]
    try:
        amount = float(data["amount"])
    except ValueError:
        amount = None

    # amount error handling
    error = ""
    if amount is None:
        error = "Pledge amount must be numeric"
    elif amount <= 0:
        error = "Pledge amount must be at least $1.00"
    if error:
        return {"error": error}, 400

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
        return {"error": f'project id {id} not found'}, 404

# {:,.0f}
# Edit an existing pledge to a specific project


@ pledge_routes.route('/projects/<id>/pledges', methods=["PUT"])
def editPledge(id):
    data = request.get_json()
    user_id = data["userId"]
    amount = float(data["amount"])
    project = Project.query.get(id)
    if project:
        pledge = Pledge.query.filter_by(project_id=id, user_id=user_id).first()
        pledge_difference = amount - float(pledge.amount)
        if pledge_difference <= 0:
            return {"error": f'Amount must be higher than your current pledge (${pledge.amount:,.2f})'}, 400
        project.balance = float(project.balance) + pledge_difference
        pledge.amount = amount
        db.session.commit()
        return {"pledge": pledge.to_dict(), "project": project.to_dict()}
    else:
        return {"error": f'Project id {id} not found'}, 404


# Get all pledges for a specific USER
@ pledge_routes.route('/users/<id>/pledges')
def getAllUserPledges(id):
    user = User.query.get(id)
    # queries for pledges attached to user, including project data
    if user:
        pledges = Pledge.query.options(
            joinedload(Pledge.project)).filter_by(user_id=user.id).all()
        data = [pledge.to_dict_projects() for pledge in pledges]
        return {"pledges": data}
    else:
        return {"error": f'User id {id} not found'}, 404
