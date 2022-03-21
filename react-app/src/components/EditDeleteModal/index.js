import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addPhoto } from '../../store/photo';
import { Modal2, Modal } from '../context/Modal';
import { deletePhoto, editPhoto } from '../../store/photo';

import './EditDeleteModal.css'

function EditDeleteModal({ photoId, photoUrl, photoCaption }) {

  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  const [caption, setCaption] = useState(photoCaption);
  const [url, setUrl] = useState(photoUrl);

  const [errors, setErrors] = useState([]);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  console.log('USER ---------------> ', user)
  const userId = user.id


  const updateCaption = e => {
    setCaption(e.target.value);
  };

  const updateUrl = e => {
    setUrl(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);
    let data = [];

    let photo = {
      user_id: userId,
      caption,
      url,
      id: photoId
    };

    data = await dispatch(editPhoto(photo));

    if (data) {
      setErrors(data);
    }

    if (data === null) {
      setShowModal1(false);
      setShowModal(false);
    }
  };

  const handleClick = async e => {
    e.preventDefault();

    let id = e.target.id;

    const data = await dispatch(deletePhoto(id));

    if (data) {
      alert(data);
    }

    // setInfo(true);
  };

  return (
    <>
      <button className='edit-photo' onClick={() => setShowModal(true)}>...</button>
      <Modal2
        title={<button className='edit-photo' onClick={() => setShowModal1(true)}>Edit</button>}
        onClose={() => setShowModal(false)}
        show={showModal}
      >

        <button className='delete-photo' id={photoId} onClick={handleClick}>Delete</button>

      </Modal2>

      <Modal
        title={'Edit Photo'}
        onClose={() => setShowModal1(false)}
        show={showModal1}
      >

        <form onSubmit={handleSubmit}>
          <div className='photo-errors'>
            {errors?.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>

          <div>
            <input type='hidden' id='userId' name='userId' value={userId} />
          </div>

          <div>
            <label htmlFor='url'>Image URL</label>
            <input
              name='url'
              type='text'
              placeholder='URL'
              required={true}
              value={url}
              onChange={updateUrl}
            />
          </div>

          <div>
            <label htmlFor='caption'>Caption </label>
            <input
              name='caption'
              type='text'
              placeholder='Caption'
              value={caption}
              onChange={updateCaption}
            />
          </div>

          <button className='submit-button' type='submit'>Submit Changes</button>
        </form>

      </Modal>

    </>
  )
}


export default EditDeleteModal
