from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User




class AddCommentForm(FlaskForm):
    user_id = StringField('user_id', validators=[DataRequired()])
    photo_id = StringField('photo_id', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired(message='Please enter a comment')])



# class AddPhotoForm(FlaskForm):
#     user_id = StringField('user_id', validators=[DataRequired()])
#     caption = StringField('caption', validators=[DataRequired(message='Please enter a caption')])
#     url = StringField('url', validators=[DataRequired(message='Please enter a URL')])



# class EditPhotoForm(FlaskForm):
#     user_id = StringField('user_id', validators=[DataRequired()])
#     caption = StringField('caption', validators=[DataRequired(message='Please enter a caption')])
#     url = StringField('url', validators=[DataRequired(message='Please enter a URL')])
