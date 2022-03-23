import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import EditDeleteModal from '../EditDeleteModal';
import AddCommentForm from '../AddCommentForm';
import { getComments } from '../../store/comment';

import { CommentModal, Modal3, Modal, Modal4 } from '../context/Modal';

import { editComment, deleteComment } from '../../store/comment';

import './EditComment.css'


function EditComment({ comment }) {

  const [showModal1, setShowModal1] = useState(false);
  const [showModal3, setShowModal3] = useState(false);


  const [content, setContent] = useState(comment.content)
  const [errors, setErrors] = useState([]);

  const photosState = Object.values(useSelector(state => state.photos))
  const commentState = Object.values(useSelector(state => state.comments))
  const user = useSelector(state => state.session.user);

  const dispatch = useDispatch();

  const updateContent = e => {
    setContent(e.target.value)
  }

  // const userId = user?.id

  const handleClick = async e => {
    e.preventDefault();

    let id = e.target.id;

    const data = await dispatch(deleteComment(id));

    if (data) {
      alert(data);
    }

    if (data === null) {
      setShowModal3(false)
      setShowModal1(false);
    }
  };


  const handleSubmit = async e => {
    e.preventDefault();


    setErrors([]);
    let data = [];

    let updatedComment = {
      user_id: user?.id,
      photo_id: comment.photo_id,
      content,
      id: comment.id
    };

    data = await dispatch(editComment(updatedComment));

    if (data) {
      setErrors(data);
    }

    if (data === null) {
      setShowModal3(false)
      setShowModal1(false);
    }
  };


  return (
    <>


      <button className='edit-photo' onClick={() => setShowModal1(true)}><i class="fas fa-ellipsis-h"></i></button>


      <Modal3
        title={<button id={comment.id} className='edit-photo' onClick={() => { setShowModal3(true) }}>Edit</button>}
        onClose={() => setShowModal1(false)}
        show={showModal1}
      >

        <button className='delete-photo' id={comment.id} onClick={handleClick}>Delete</button>

      </Modal3>

      <Modal4
        title={'Edit Comment'}
        onClose={() => setShowModal3(false)}
        show={showModal3}
      >

        <form onSubmit={handleSubmit}>
          <div className='photo-errors'>
            {errors?.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>

          {/* <div>
            <input type='hidden' id='userId' name='userId' value={userId} />
          </div> */}


          <div>
            <label htmlFor='comment'>Comment </label>
            <input
              name='comment'
              type='text'
              placeholder={'comment'}
              value={content}
              onChange={updateContent}
            />
          </div>

          <button className='submit-button' type='submit'>Submit Changes</button>
        </form>

        {/* <EditComment comment={comment} /> */}

      </Modal4>


      {/* <form onSubmit={handleSubmit}>
        <div className='photo-errors'>
          {errors?.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>

        <div>
          <input type='hidden' id='userId' name='userId' value={userId} />
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

        <button className='submit-button' type='submit'>Submit Changes</button>
      </form> */}
    </>
  )
}



export default EditComment
