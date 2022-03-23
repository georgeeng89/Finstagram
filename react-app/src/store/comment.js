// const GET_PHOTO = 'photo/GET_PHOTO';
// const ADD_PHOTO = 'photo/ADD_PHOTO'
// const DELETE_PHOTO = 'photo/REMOVE_PHOTO'
// const EDIT_PHOTO = 'photo/EDIT_PHOTO'


const GET_COMMENT = 'comment/GET_COMMENT'
const ADD_COMMENT = 'comment/ADD_COMMENT'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'
const EDIT_COMMENT = 'comment/EDIT_COMMENT'



const get = comment => ({
  type: GET_COMMENT,
  payload: comment
});

const add = comment => ({
  type: ADD_COMMENT,
  payload: comment
})

const remove = id => ({
  type: DELETE_COMMENT,
  payload: id
})

const edit = comment => ({
  type: EDIT_COMMENT,
  payload: comment
})

export const getComments = () => async dispatch => {

  const response = await fetch('/api/comments/');

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


export const addComment = (userId, photoId, content) => async dispatch => {
  const response = await fetch('/api/comments/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      user_id: userId,
      photo_id: photoId,
      content
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



export const editComment = comment => async dispatch => {

  const response = await fetch(`/api/comments/edit/${comment.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  });

  if (response.ok) {
    const updatedComment = await response.json();

    dispatch(edit(updatedComment));

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


export const deleteComment = id => async dispatch => {
  const response = await fetch(`/api/comments/delete/${id}`, { method: 'DELETE' });

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

// export const addPhoto = (userId, caption, url) => async dispatch => {
//   const response = await fetch('/api/photos/add', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },

//     body: JSON.stringify({
//       user_id: userId,
//       caption,
//       url
//     }),
//   });

//   if (response.ok) {
//     const data = await response.json();

//     dispatch(add(data));

//     return null;
//   } else if (response.status < 500) {
//     const data = await response.json();
//     if (data.errors) {
//       return data.errors;
//     }
//   } else {
//     return ['An error occurred. Please try again.'];
//   }
// };


// export const getPhotos = () => async dispatch => {
//   const response = await fetch('/api/photos/');

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(get(data));
//     return data;
//   } else if (response.status < 500) {
//     const data = await response.json();
//     if (data.errors) {
//       return data.errors;
//     }
//   } else {
//     return ['An error occurred. Please try again.'];
//   }
// };

export default function commentReducer(state = {}, action) {
  let newState;
  switch (action.type) {

    case GET_COMMENT:
      newState = { ...state }
      action.payload.forEach(comment => newState[comment.id] = comment)
      return newState;

    case ADD_COMMENT:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;

    case DELETE_COMMENT:
      newState = { ...state };
      delete newState[action.payload];
      return newState;

    case EDIT_COMMENT:
      newState = { ...state };
      newState[action.payload.id] = action.payload
      return newState

    default:
      return state;
  }
}
