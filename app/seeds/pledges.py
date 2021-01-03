from werkzeug.security import generate_password_hash
from app.models import db, Pledge
from datetime import datetime, timedelta

# Adds projects. Add more here if you like!


def seed_pledges():

    pledge1 = Pledge(
        user_id = 1,
        project_id = 2,
        amount = 203
    )
    db.session.add(pledge1)

    pledge2 = Pledge(
        user_id = 3,
        project_id = 2,
        amount = 410
    )
    db.session.add(pledge2)

    pledge3 = Pledge(
        user_id = 4,
        project_id = 2,
        amount = 850
    )
    db.session.add(pledge3)

    pledge4 = Pledge(
        user_id = 5,
        project_id = 2,
        amount = 230
    )
    db.session.add(pledge4)

    pledge5 = Pledge(
        user_id = 6,
        project_id = 2,
        amount = 80
    )
    db.session.add(pledge5)

    pledge6 = Pledge(
        user_id = 2,
        project_id = 1,
        amount = 50
    )
    db.session.add(pledge6)

    pledge7 = Pledge(
        user_id = 1,
        project_id = 3,
        amount = 290
    )
    db.session.add(pledge7)

    pledge8 = Pledge(
        user_id = 2,
        project_id = 3,
        amount = 800
    )
    db.session.add(pledge8)

    pledge9 = Pledge(
        user_id = 3,
        project_id = 4,
        amount = 40
    )
    db.session.add(pledge9)

    pledge10 = Pledge(
        user_id = 5,
        project_id = 4,
        amount = 100
    )
    db.session.add(pledge10)

    pledge11 = Pledge(
        user_id = 6,
        project_id = 5,
        amount = 13
    )
    db.session.add(pledge11)

    pledge12 = Pledge(
        user_id = 1,
        project_id = 6,
        amount = 10000
    )
    db.session.add(pledge12)

    pledge13 = Pledge(
        user_id = 2,
        project_id = 6,
        amount = 8000
    )
    db.session.add(pledge13)

    pledge14 = Pledge(
        user_id = 3,
        project_id = 6,
        amount = 900
    )
    db.session.add(pledge14)

    pledge15 = Pledge(
        user_id = 4,
        project_id = 6,
        amount = 100000
    )
    db.session.add(pledge15)

    pledge16 = Pledge(
        user_id = 5,
        project_id = 7,
        amount = 1084
    )
    db.session.add(pledge16)

    pledge17 = Pledge(
        user_id = 6,
        project_id = 7,
        amount = 2092
    )
    db.session.add(pledge17)

    pledge18 = Pledge(
        user_id = 1,
        project_id = 8,
        amount = 20
    )
    db.session.add(pledge18)

    pledge19 = Pledge(
        user_id = 4,
        project_id = 9,
        amount = 200
    )
    db.session.add(pledge19)

    pledge20 = Pledge(
        user_id = 5,
        project_id = 9,
        amount = 800
    )
    db.session.add(pledge20)

    pledge21 = Pledge(
        user_id = 9,
        project_id = 10,
        amount = 10
    )
    db.session.add(pledge21)

    pledge22 = Pledge(
        user_id = 6,
        project_id = 11,
        amount = 2000
    )
    db.session.add(pledge22)

    pledge23 = Pledge(
        user_id = 10,
        project_id = 12,
        amount = 500
    )
    db.session.add(pledge23)

    pledge24 = Pledge(
        user_id = 2,
        project_id = 13,
        amount = 25
    )
    db.session.add(pledge24)

    pledge25 = Pledge(
        user_id = 11,
        project_id = 14,
        amount = 2000
    )
    db.session.add(pledge25)

    pledge26 = Pledge(
        user_id = 10,
        project_id = 14,
        amount = 2500000
    )
    db.session.add(pledge26)

    pledge27 = Pledge(
        user_id = 5,
        project_id = 14,
        amount = 5000
    )
    db.session.add(pledge27)

    pledge28 = Pledge(
        user_id = 4,
        project_id = 15,
        amount = 1000
    )
    db.session.add(pledge28)

    pledge29 = Pledge(
        user_id = 11,
        project_id = 16,
        amount = 500
    )
    db.session.add(pledge29)

    pledge30 = Pledge(
        user_id = 3,
        project_id = 16,
        amount = 50
    )
    db.session.add(pledge30)

    db.session.commit()

def undo_pledges():
    db.session.execute('TRUNCATE pledge;')
    db.session.commit()
