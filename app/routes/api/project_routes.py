from flask import Blueprint, jsonify, redirect
from app.models import db, Project
from app.forms.project_form import ProjectForm

project_routes = Blueprint('projects', __name__)


@project_routes.route('/')
def test():
    return {"hello": "from project_routes.py!"}


@project_routes.route('/new', methods=["POST"])
def newProject():
    form = ProjectForm()
    if form.validate_on_submit():
        data = Project()
        form.populate_obj(data)
        db.session.add(data)
        db.session.commit()
        return redirect("/")
    print(form.errors)
    return "Bad Data"
    
