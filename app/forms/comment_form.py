from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User



class AddCommentForm(FlaskForm):
    user_id = StringField('user_id', validators=[DataRequired()])
    photo_id = StringField('photo_id', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired(message='Please enter a comment'), Length(min=1, max=255, message='Comment must be between 1-255 characters.')])



class EditCommentForm(FlaskForm):
    user_id = StringField('user_id', validators=[DataRequired()])
    photo_id = StringField('photo_id', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired(message='Please enter a comment'), Length(min=1, max=255, message='Comment must be between 1-255 characters.')])
