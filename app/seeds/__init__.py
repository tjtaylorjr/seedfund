from flask.cli import AppGroup
from .users import seed_users, undo_users
from .projects import seed_projects, undo_projects
from .pledges import seed_pledges, undo_pledges

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    pass
    seed_users()
    seed_projects()
    seed_pledges()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    pass
    undo_users()
    undo_projects()
    undo_pledges()
    # Add other undo functions here
