import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addPhoto } from '../../store/photo';
import { Modal2 } from '../context/Modal';
import './EditDeleteModal.css'

function EditDeleteModal() {

  const [showModal, setShowModal] = useState(false);

  // const [errors, setErrors] = useState([]);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  console.log('USER ---------------> ', user)
  const userId = user.id


  // const updateCaption = e => {
  //   setCaption(e.target.value);
  // };

  // const updateUrl = e => {
  //   setUrl(e.target.value);
  // };

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   setErrors([]);
  //   let data = [];

  //   // let photo = {
  //   //   userId,
  //   //   caption,
  //   //   url
  //   // };

  //   data = await dispatch(addPhoto(userId, caption, url));

  //   if (data) {
  //     setErrors(data);
  //   }

  //   if (data === null) {
  //     setShowModal(false);
  //   }
  // };

  return (
    <>
    <button className='edit-photo' onClick={() => setShowModal(true)}>...</button>

      <Modal2
        title={<button className='edit-photo'>Edit</button>}
        onClose={() => setShowModal(false)}
        show={showModal}
      >

        <button className='delete-photo'>Delete</button>
{/*
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

            <button className='submit-button' type='submit'>Upload Photo</button>
          </form>
 */}

      </Modal2>
    </>
  )
}


export default EditDeleteModal
