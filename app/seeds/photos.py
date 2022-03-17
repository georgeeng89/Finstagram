from app.models import db, Photo


# Adds a demo user, you can add other users here if you want
def seed_photos():

    photo1 = Photo(user_id=1, caption='hello this is my photo!', url='https://w.wallhaven.cc/full/wq/wallhaven-wqve97.png')
    photo2 = Photo(user_id=2, caption='here is my thocky keyboard', url='https://i.redd.it/47tp5y8h9ko51.jpg')

    db.session.add(photo1)
    db.session.add(photo2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_photos():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
