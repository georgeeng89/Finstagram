const GET_PHOTO = 'photo/GET_PHOTO';

const setPhoto = photo => ({
  type: GET_PHOTO,
  payload: photo,
});

export const getPhotos = () => async dispatch => {
  const response = await fetch('/api/photos/');

  if (response.ok) {
    const data = await response.json();
    dispatch(setPhoto(data));
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

export default function photoReducer(state = null, action) {
  switch (action.type) {
    case GET_PHOTO:
      state = action.payload;
      return { ...state };
    default:
      return state;
  }
}
