from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want


def seed_users():

    demo = User(
        firstname='Visitor',
        lastname='Account',
        username='Demo',
        email='demo@user.io',
        password='password'
    )
    db.session.add(demo)

    demo2 = User(
        firstname='James',
        lastname='Lee',
        username='jlee513',
        email='jlee@test.com',
        password='password'
    )
    db.session.add(demo2)

    demo3 = User(
        firstname='Mike',
        lastname='Henders',
        username='mh5412',
        email='mikehen5412@test.com',
        password='password'
    )
    db.session.add(demo3)

    demo4 = User(
        firstname='Jay',
        lastname='Leung',
        username='seedfundmaster',
        email='jtl1132@test.com',
        password='password'
    )
    db.session.add(demo4)

    demo5 = User(
        firstname='Savannah',
        lastname='White',
        username='savwhite',
        email='swhite212923@test.com',
        password='password'
    )
    db.session.add(demo5)

    demo6 = User(
        firstname='Chris',
        lastname='Lemma',
        username='CLemma',
        email='CLemma@test.com',
        password='password'
    )
    db.session.add(demo6)

    demo7 = User(
        firstname='Eric',
        lastname='Peterson',
        username='EPeterson',
        email='epeterson@test.com',
        password='password'
    )
    db.session.add(demo7)

    demo8 = User(
        firstname='Xi',
        lastname='Ming',
        username='ximing',
        email='ximing@test.com',
        password='password'
    )
    db.session.add(demo8)

    demo9 = User(
        firstname='Latrice',
        lastname='Johnson',
        username='ljohnson',
        email='ljohnson@test.com',
        password='password'
    )
    db.session.add(demo9)

    demo10 = User(
        firstname='Aidan',
        lastname='MacLachlan',
        username='amaclachlan',
        email='amaclachlan@test.com',
        password='password'
    )
    db.session.add(demo10)

    demo11 = User(
        firstname='Simon',
        lastname='Katz',
        username='skatz',
        email='skatz@test.com',
        password='password'
    )
    db.session.add(demo11)

    demo12 = User(
        firstname='Isabis',
        lastname='Laghari',
        username='ilaghari',
        email='ilaghari@test.com',
        password='password'
    )
    db.session.add(demo12)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
