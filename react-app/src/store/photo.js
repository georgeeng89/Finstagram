const GET_PHOTO = 'photo/GET_PHOTO';
const ADD_PHOTO = 'photo/ADD_PHOTO'
const DELETE_PHOTO = 'photo/REMOVE_PHOTO'
const EDIT_PHOTO = 'photo/EDIT_PHOTO'

const get = photo => ({
  type: GET_PHOTO,
  payload: photo,
});

const add = photo => ({
  type: ADD_PHOTO,
  payload: photo
})

const remove = photo => ({
  type: DELETE_PHOTO,
  payload: photo
})

const edit = photo => ({
  type: EDIT_PHOTO,
  payload: photo
})


export const editPhoto = photo => async dispatch => {

  const response = await fetch(`/api/photos/edit/${photo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(photo),
  });

  if (response.ok) {
    const updatedPhoto = await response.json();

    dispatch(edit(updatedPhoto));

    return null;
  } else if (response.status < 500) {
    const data = await response.json();

    if (data.errors) {

      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};


export const deletePhoto = id => async dispatch => {
  const response = await fetch(`/api/photos/delete/${id}`, { method: 'DELETE' });

  if (response.ok) {
    dispatch(remove(id));

    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

export const addPhoto = (userId, caption, url) => async dispatch => {
  const response = await fetch('/api/photos/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      user_id: userId,
      caption,
      url
    }),
  });

  if (response.ok) {
    const data = await response.json();

    dispatch(add(data));

    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};


export const getPhotos = () => async dispatch => {
  const response = await fetch('/api/photos/');

  if (response.ok) {
    const data = await response.json();
    dispatch(get(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

export default function photoReducer(state = {}, action) {
  let newState;
  switch (action.type) {

    case GET_PHOTO:
      newState = { ...state }
      action.payload.forEach(photo => newState[photo.id] = photo)
      return newState;

    case ADD_PHOTO:
      newState = { ...state };
      newState[action.payload.id] = action.payload
      return newState

    case DELETE_PHOTO:
      newState = { ...state };
      delete newState[action.payload];
      return newState;

    case EDIT_PHOTO:
      newState = { ...state };
      newState[action.payload.id] = action.payload
      return newState

    default:
      return state;
  }
}
