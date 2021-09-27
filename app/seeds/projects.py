from werkzeug.security import generate_password_hash
from app.models import db, Project
from datetime import datetime, timedelta

# Adds projects. Add more here if you like!


def seed_projects():

    project1 = Project(
        user_id=1,
        title='Random Lego Heads',
        description=
        '''
        Miss the sensation of stepping on a lego piece? Well, look no further!
        Back my project and you can have your own severed lego man head to
        scatter in your living room or apartment floor!
        ''',
        funding_goal=400.00,
        balance = 50.00,
        image='https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80',
        date_goal=(datetime.now() + timedelta(days=5)).isoformat(),
        category='Other'
    )
    db.session.add(project1)

    project2 = Project(
        user_id=2,
        title='THE SIGN YOU\'VE BEEN LOOKING FOR',
        description=
        '''
        What are you waiting for? THIS is the sign you've been waiting
        for all this time!
        ''',
        funding_goal=4000.00,
        balance = 1773.00,
        image='https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        date_goal=(datetime.now() + timedelta(days=30)).isoformat(),
        category='Design'
    )
    db.session.add(project2)

    project3 = Project(
        user_id=3,
        title='an aesthetic looking lightbulb',
        description=
        '''
        Come checkout this lightbulb.
        *Sunset not included
        ''',
        funding_goal=4000.00,
        balance = 1090.00,
        image='https://images.unsplash.com/photo-1493612276216-ee3925520721?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        date_goal=(datetime.now() + timedelta(days=25)).isoformat(),
        category='Arts'
    )
    db.session.add(project3)

    project4 = Project(
        user_id=4,
        title='Help me take photos like this',
        description=
        '''
        Hi, I'm a photographer. If you like photos like this, please consider funding me
        and I'll send you special photos that I take on my journey to next photo opp I
        encounter.
        ''',
        funding_goal=500.00,
        balance = 140.00,
        image='https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
        date_goal=(datetime.now() + timedelta(days=12)).isoformat(),
        category='Photography'
    )
    db.session.add(project4)

    project5 = Project(
        user_id=5,
        title='Antique Pianos',
        description=
        '''
        Old and antique looking pianos, because you love the look of your piano too!
        ''',
        funding_goal=6000.00,
        balance = 13.00,
        image='https://images.unsplash.com/photo-1505248207594-9f9912dda70a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        date_goal=(datetime.now() + timedelta(days=2)).isoformat(),
        category='Music'
    )
    db.session.add(project5)

    project6 = Project(
        user_id=6,
        title='My BOMB Sandwich shop!',
        description=
        '''
        I plan to come out of COVID swinging! Pledge to my shop and I'll make you a lifetime
        special member discout at my shop!
        ''',
        funding_goal=20000.00,
        balance = 118900.00,
        image='https://images.unsplash.com/photo-1504937551116-cb8097e6f02a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=933&q=80',
        date_goal=(datetime.now() + timedelta(days=22)).isoformat(),
        category='Food'
    )
    db.session.add(project6)

    project7 = Project(
        user_id=1,
        title='Super Indestructable Paperclips',
        description=
        '''
        I woke up one day with a dream to make paperclips. If you're ever tired
        of your paperclips breaking, I'll make them indestructable.
        ''',
        funding_goal=1534.00,
        balance = 3176.00,
        image='https://images.unsplash.com/photo-1597484662317-9bd7bdda2a45?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1267&q=80',
        date_goal=(datetime.now() + timedelta(days=10)).isoformat(),
        category='Crafts'
    )
    db.session.add(project7)

    project8 = Project(
        user_id=2,
        title='Super Dice',
        description=
        '''
        Dice that you can program the result of with a smart phone app! Impress your friends
        with this magical device!
        ''',
        funding_goal=1000.00,
        balance = 20.00,
        image='https://images.unsplash.com/photo-1605870445919-838d190e8e1b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
        date_goal=(datetime.now() + timedelta(days=10)).isoformat(),
        category='Technology'
    )
    db.session.add(project8)

    project9 = Project(
        user_id=3,
        title='Silver Pineapples',
        description=
        '''
        There's something that just feels right to paint pineapples silver
        as opposed to all the other fruits. Like... a silver banana? That wouldn't
        be right. Back me and I'll send you one for all your random silver pineapple needs.
        ''',
        funding_goal=500.00,
        balance = 1000.00,
        image='https://images.unsplash.com/photo-1496551572277-76011ca2a6e9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80',
        date_goal=(datetime.now() + timedelta(days=20)).isoformat(),
        category='Other'
    )
    db.session.add(project9)

    project10 = Project(
        user_id=5,
        title='Wooden Duck Figures',
        description=
        '''
        These things could be cool. Help me make them!
        ''',
        funding_goal=150.00,
        balance = 10.00,
        image='https://images.unsplash.com/photo-1560963619-c9e49c9380bd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
        date_goal=(datetime.now() + timedelta(days=1)).isoformat(),
        category='Crafts'
    )
    db.session.add(project10)

    project11 = Project(
        user_id=7,
        title='Fight Squad',
        description=
        '''
        Fight Squad!  All new web comic drawn by me (100 issues!)
        ''',
        funding_goal=50000.00,
        balance = 2000.00,
        image='https://images.unsplash.com/photo-1594712844133-d4193f13c17e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80',
        date_goal=(datetime.now() + timedelta(days=29)).isoformat(),
        category='Comics'
    )
    db.session.add(project11)

    project12 = Project(
        user_id=8,
        title='Boxed Water',
        description=
        '''
        Looking for funds to design our boxed water product packaging.  Supporters may get stock options!*










        *stock options not included.
        ''',
        funding_goal=25000.00,
        balance = 500.00,
        image='https://images.unsplash.com/photo-1553531888-a5892402adce?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2200&q=80',
        date_goal=(datetime.now() + timedelta(days=24)).isoformat(),
        category='Design'
    )
    db.session.add(project12)

    project13 = Project(
        user_id=9,
        title='Zombie Tarot',
        description=
        '''
        Help me complete my Zombie Tarot!  All pledges get a free deck.
        ''',
        funding_goal=1000.00,
        balance = 25.00,
        image='https://images.unsplash.com/photo-1569161031671-702dd80d5f50?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
        date_goal=(datetime.now() + timedelta(days=21)).isoformat(),
        category='Illustration'
    )
    db.session.add(project13)

    project14 = Project(
        user_id=10,
        title='Chafing Saddles 2',
        description=
        '''
        We are filming the next installment in our Chafing Saddles series.  Help us get this funded and get a copy of the western when released.  Saddle up, pardners!
        ''',
        funding_goal=7500000.00,
        balance = 2507000.00,
        image='https://images.unsplash.com/photo-1515515113139-f2840a3ddd77?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2168&q=80',
        date_goal=(datetime.now() + timedelta(days=19)).isoformat(),
        category='Film'
    )
    db.session.add(project14)

    project15 = Project(
        user_id=11,
        title='Witches And Barbarians',
        description=
        '''
        New card game from the makers of Magic Battle and Superhero Strike Force.  Witches and Barbarians is sure to be a hit at parties and family nights around the kitchen table.
        ''',
        funding_goal=10000.00,
        balance = 1000.00,
        image='https://images.unsplash.com/photo-1564509143629-ddaeb2dad661?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
        date_goal=(datetime.now() + timedelta(days=23)).isoformat(),
        category='Games'
    )
    db.session.add(project15)

    project16 = Project(
        user_id=12,
        title='Find Your True North',
        description=
        '''
        My new book, "Find Your True North", is a self-help guide for discovering who you really are and finding your true purpose in life.
        ''',
        funding_goal=5000.00,
        balance = 550.00,
        image='https://images.unsplash.com/photo-1585411667373-ea4ed275ee0e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
        date_goal=(datetime.now() + timedelta(days=27)).isoformat(),
        category='Publishing'
    )
    db.session.add(project16)

    db.session.commit()

def undo_projects():
    db.session.execute('TRUNCATE projects CASCADE;')
    db.session.commit()
