from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


class AddPhotoForm(FlaskForm):
    user_id = StringField('user_id', validators=[DataRequired()])
    caption = StringField('caption', validators=[DataRequired(message='Please enter a caption')])
    url = StringField('url', validators=[DataRequired(message='Please enter a URL')])



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
