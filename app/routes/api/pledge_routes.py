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
