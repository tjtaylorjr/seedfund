from flask import Blueprint, jsonify, redirect, request
from datetime import datetime, timedelta
from app.models import db, Project, Pledge
from app.forms.project_form import ProjectForm

pledge_routes = Blueprint('pledges', __name__)


@pledge_routes.route('/projects/<id>/pledges')
def getAllPledges():
    result = Pledge.query.all()
    data = [pledge.to_dict() for pledge in result]
    return {"pledges": data}


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
        return pledge.to_dict()
    else:
        return {"error": f'project id {id} not found'}
