from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import db, Photo
from app.forms import AddPhotoForm, EditPhotoForm
from flask_login import current_user, login_required
import re


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

        url_check = form.data['url']

        validImage = re.search(r"(https?:\/\/.*\.(?:png|jpg|jpeg|gif)$)", url_check)

        if validImage:

            photo = Photo(
                user_id=form.data['user_id'],
                caption=form.data['caption'],
                url=form.data['url']
            )

            db.session.add(photo)
            db.session.commit()

            return photo.to_dict()

        elif validImage == None:

            return {'errors': ['Image Url : Please enter a valid image URL.']}, 401

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@photo_routes.route('/delete/<int:id>', methods=['DELETE'])
# @login_required
def remove_photo(id):
    photo = Photo.query.get(id)

    if(current_user.id == photo.user_id):
        db.session.delete(photo)
        db.session.commit()

    return "Photo Deleted Successfully"



@photo_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def update_photo(id):
    photo = Photo.query.get(id)

    form = EditPhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        url_check = form.data['url']

        print('URL CHECK IN EDIT =======> ', url_check)

        validImage = re.search(r"(https?:\/\/.*\.(?:png|jpg|jpeg|gif)$)", url_check)

        print('VALID IMAGE IN EDIT ------> ',validImage)

        if validImage:

          photo.user_id = form.data['user_id']
          photo.caption = form.data['caption']
          photo.url = form.data['url']

          try:
              db.session.commit()

              return photo.to_dict()

          except:

              return {'errors': ['Photos : Something went wrong. Please try again']}, 401

        elif validImage == None:

            print('INSIDE VALID IMAGE EQUALS NONE =================')

            return {'errors': ['Image Url : Please enter a valid image URL.']}, 401

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
