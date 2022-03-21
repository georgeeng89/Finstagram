import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addPhoto } from '../../store/photo';
import { Modal } from '../context/Modal';

import './AddCommentForm.css'

function AddCommentForm({ photoId, userId }) {

  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  const updateContent = e => {
    setContent(e.target.value)
  }


  const handleSubmit = async e => {

    e.preventDefault();
    setErrors([]);
    let data = [];

    // let comment = {
    //   userId,
    //   photoId,
    //   url
    // };

    // data = await dispatch(addPhoto(userId, photoId, content));

    if (data) {
      setErrors(data);
    }

    // if (data === null) {
    //   setShowModal(false);
    // }

  };

  return (

    <form onSubmit={handleSubmit}>
      <div className='photo-errors'>
        {errors?.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

      <div>
        <label htmlFor='comment'>Comment </label>
        <input
          name='comment'
          type='text'
          placeholder='Comment'
          value={content}
          onChange={updateContent}
        />
      </div>

      <button className='submit-button' type='submit'>Post Comment</button>

    </form>

  )


}


export default AddCommentForm
