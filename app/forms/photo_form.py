from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


class AddPhotoForm(FlaskForm):
    user_id = StringField('user_id', validators=[DataRequired()])
    caption = StringField('caption', validators=[DataRequired(message='Please enter a caption'), Length(min=1, max=255, message='Caption must be between 1-255 characters.')])
    url = StringField('url', validators=[DataRequired(message='Please enter a URL')])



class EditPhotoForm(FlaskForm):
    user_id = StringField('user_id', validators=[DataRequired()])
    caption = StringField('caption', validators=[DataRequired(message='Please enter a caption'), Length(min=1, max=255, message='Caption must be between 1-255 characters.')])
    url = StringField('url', validators=[DataRequired(message='Please enter a URL')])
