const GET_PHOTO = 'photo/GET_PHOTO';
const ADD_PHOTO = 'photo/ADD_PHOTO'

const get = photo => ({
  type: GET_PHOTO,
  payload: photo,
});

const add = photo => ({
  type: ADD_PHOTO,
  payload: photo
})

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
      newState = {...state}
      action.payload.forEach(photo => newState[photo.id] = photo)
      console.log('GET_PHOTO, newState ===========================> ', newState)
      return newState;

    case ADD_PHOTO:
      newState = JSON.parse(JSON.stringify(state));
      newState[action.payload] = action.payload;
      return newState;



    default:
      return state;
  }
}
