from flask import Blueprint

project_routes = Blueprint('projects', __name__)


@project_routes.route('/')
def test():
    return {"hello": "from project_routes.py!"}