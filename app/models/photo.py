from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    caption = db.Column(db.String(3000), nullable=False)
    url = db.Column(db.String(5000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow()+timedelta(hours=-7), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow()+timedelta(hours=-7), onupdate=datetime.now(), nullable=False)

    # created_at = db.Column(db.DateTime, default=datetime.utcnow()+timedelta(hours=3), nullable=False)
    # updated_at = db.Column(db.DateTime, default=datetime.utcnow()+timedelta(hours=3), onupdate=datetime.now(), nullable=False)

    user = db.relationship("User", back_populates="photos")
    comments = db.relationship("Comment", back_populates="photos", cascade='all, delete')
    # likes = db.relationship("Like", back_populates="photos")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'caption': self.caption,
            'url': self.url,
            'username': self.user.username,
            'created_at': self.created_at
        }
