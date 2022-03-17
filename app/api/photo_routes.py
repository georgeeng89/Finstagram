from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Photo

photo_routes = Blueprint('photos', __name__)


@photo_routes.route('/')
# @login_required
def photos():
  photos = Photo.query.all()
  return {'photos': [photo.to_dict() for photo in photos]}

