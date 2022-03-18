from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import db, Photo
from app.forms import AddPhotoForm
from flask_login import current_user, login_required


photo_routes = Blueprint('photos', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@photo_routes.route('/')
# @login_required
def photos():
  photos = Photo.query.all()
  return jsonify([photo.to_dict() for photo in photos])


@photo_routes.route('/add', methods=['POST'])
# @login_required
def add_photo():
    """
    POSTS A PHOTO
    """
    form = AddPhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        photo = Photo(
            user_id=form.data['user_id'],
            caption=form.data['caption'],
            url=form.data['url']
        )

        db.session.add(photo)
        db.session.commit()

        return photo.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@photo_routes.route('/delete/<int:id>', methods=['DELETE'])
# @login_required
def remove_photo(id):
    photo = Photo.query.get(id)

    if(current_user.id == photo.user_id):
        db.session.delete(photo)
        db.session.commit()

    return "Photo Deleted Successfully"
