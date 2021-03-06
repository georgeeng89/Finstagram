from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length, EqualTo
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message='Please enter a username.'), username_exists, Length(min=3, max=20, message='Username needs to be more than 3 characters and less than 20 characters.')])
    email = StringField('email', validators=[DataRequired(message='Please enter an email.'), user_exists, Email(message='Please enter a valid email.'), Length(min=1, max=255, message='Email less than 255 characters.')])
    password = StringField('password', validators=[DataRequired(message='Please enter a password.'), EqualTo('confirm_password', message='Password must match Confirm Password.')])
    confirm_password = StringField('confirm_password', validators=[DataRequired(message='Please confirm your password.')])
