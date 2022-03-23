import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addPhoto } from '../../store/photo';
import { Modal } from '../context/Modal';
import { addComment } from '../../store/comment';
import { getComments } from '../../store/comment';

import './AddCommentForm.css'

function AddCommentForm({ photoId, userId }) {

  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const updateContent = e => {
    setContent(e.target.value)
  }

  // useEffect(() => {

  //   dispatch(getComments())

  // },[dispatch, addComment])

  const handleSubmit = async e => {

    e.preventDefault();
    setErrors([]);
    let data = [];

    // let comment = {
    //   userId,
    //   photoId,
    //   url
    // };

    data = await dispatch(addComment(userId, photoId, content));

    if (data) {
      setErrors(data);
    }

    if(data === null) {
      setContent('');
    }

    // if (data === null) {
    //   setShowModal(false);
    // }

  };

  return (

    <form className='comment-form' onSubmit={handleSubmit}>

       <i class="far fa-smile"></i>

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
