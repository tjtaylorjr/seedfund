from flask import Blueprint, jsonify, redirect, request
from app.models import db, Project
from app.forms.project_form import ProjectForm

project_routes = Blueprint('projects', __name__)

@project_routes.route('/')
def getAllProjects():
    return 'this works'
    # result = Project.all()
    # return jsonify(result)


@project_routes.route('/', methods=["POST"])
def newProject():
    form = ProjectForm() # How does this thing connect to the incoming data...?
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        project = Project(
            user_id=form.data['userId'],
            title=form.data['title'],
            description=form.data['description'],
            funding_goal=form.data['fundingGoal'],
            balance=0.00,
            image=form.data['image'],
            date_goal=form.data['dateGoal'],
            category=form.data['category']
        )
        db.session.add(project)
        db.session.commit()
        return project.to_dict()
    print(form.errors)
    return jsonify(form.errors)
    