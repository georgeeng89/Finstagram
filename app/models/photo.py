from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    caption = db.Column(db.String(3000), nullable=False)
    url = db.Column(db.String(5000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)

    user = db.relationship("User", back_populates="photos")
    comments = db.relationship("Comment", back_populates="photos")
    # likes = db.relationship("Like", back_populates="photos")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'caption': self.caption,
            'url': self.url,
            'username': self.user.username
        }
