import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addPhoto } from '../../store/photo';
import { Modal } from '../context/Modal';
import './AddPhotoForm.css'

function AddPhotoForm() {

  const [showModal, setShowModal] = useState(false);
  const [caption, setCaption] = useState('');
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState([]);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const userId = user?.id


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

    // let photo = {
    //   userId,
    //   caption,
    //   url
    // };

    data = await dispatch(addPhoto(userId, caption, url));

    if (data) {
      setErrors(data);
    }

    if (data === null) {
      setUrl('');
      setCaption('');
      setShowModal(false);
    }
  };

  return (
    <>
      {/* <button className='upload-photo' onClick={() => setShowModal(true)}>+</button> */}

      <i class="far fa-plus-square upload-photo" onClick={() => setShowModal(true)}></i>

      <Modal
        title={`Upload Image`}
        onClose={() => {
          setErrors([])
          setUrl('');
          setCaption('');
          setShowModal(false)
        }}
        show={showModal}
      >

        <form onSubmit={handleSubmit}>
          <div className='comment-errors'>
            {errors?.map((error, ind) => (
              <div key={ind}>{error.split(':')[1]}</div>
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

          <button className='submit-button' type='submit'>Upload Photo</button>
        </form>


      </Modal>
    </>
  )
}


export default AddPhotoForm
