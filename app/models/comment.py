from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    photo_id = db.Column(db.Integer, db.ForeignKey("photos.id"), nullable=False)
    content = db.Column(db.String(5000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)

    user = db.relationship("User", back_populates="comments")
    photos = db.relationship("Photo", back_populates="comments")
    # comments = db.relationship("Comment", back_populates="photos")
    # likes = db.relationship("Like", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'photo_id': self.photo_id,
            'content': self.content,
            'username': self.user.username
        }
