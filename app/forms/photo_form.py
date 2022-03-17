from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


# def acct_exists(form, field):
#     number = field.data
#     acct = BankAccount.query.filter(
#         BankAccount.account_number == number).first()
#     if acct:
#         raise ValidationError(
#             'Invalid bank account. Please enter a different account number.')


class AddPhotoForm(FlaskForm):
    user_id = StringField('user_id', validators=[DataRequired()])
    caption = StringField('caption', validators=[DataRequired()])
    url = StringField('url', validators=[DataRequired()])


# class EditBankForm(FlaskForm):
#     user_id = StringField('user_id', validators=[DataRequired()])
#     bank_id = StringField('bank_id', validators=[DataRequired()])
#     account_number = StringField('account_number', validators=[DataRequired(
#     ), Length(min=10, max=10, message='Please enter a valid account number.')])
#     name = StringField('name', validators=[DataRequired(message='Please enter a valid name.'), Length(
#         min=3, message='Name must be at least 3 characters long.')])


# @photo_routes.route('/add', methods=['POST'])
# # @login_required
# def add_photo():
#     """
#     POSTS A PHOTO
#     """
#     form = AddPhotoForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         photo = Photo(
#             user_id=form.data['user_id'],
#             caption=form.data['caption'],
#             url=form.data['url']
#         )

#         db.session.add(photo)
#         db.session.commit()

#         return photo.to_dict()

#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401
