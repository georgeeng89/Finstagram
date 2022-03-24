import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import EditDeleteModal from '../EditDeleteModal';
import AddCommentForm from '../AddCommentForm';
import CommentList from '../CommentList';

import './ProfileDetails.css'




function ProfileDetails() {

  const photosState = Object.values(useSelector(state => state.photos))

  const commentState = Object.values(useSelector(state => state.comments))




  const sessionUser = useSelector(state => state.session.user);

  const history = useHistory();

  const [user, setUser] = useState({});

  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);

      if (!response.ok) {
        history.push('/404')
      }

      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    history.push('/404')
  }

  if (!sessionUser) {
    history.push('/login')
  }


  const filteredPhotos = photosState.filter(photo => photo.user_id === user?.id)

  /////////////////////
  const handleImage = (e) => {
    e.target.src = '/static/aa_default_image.png'
  }

  // let commentCount = 0;
  // let numberOfComments = 0;
  // let viewComments = false;
  // let timestamp = false;

  function calcTime(offset) {
    var d = new Date();

    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    var time = new Date(utc + (3600000 * offset));

    return time.toLocaleString('en-US', { hour12: false });
  }

  let date = calcTime('-7')


  /////////////////////


  return (
    <div className='profile-details-container'>
      <div className='profile-user-details'>

        <div className='profile-details-user'> {user?.username}</div>

        {filteredPhotos.length === 1 && (
          <div className='profile-details-posts'>
            <div className='profile-details-photos'>{filteredPhotos.length}</div>
            <div className='profile-details-text'>post</div>
          </div>
        )}

        {filteredPhotos.length > 1 && (
          <div className='profile-details-posts'>
            <div className='profile-details-photos'>{filteredPhotos.length}</div>
            <div className='profile-details-text'>posts</div>
          </div>
        )}



      </div>


      <div className='photo-container-outer profile-details all-photos'>

        {filteredPhotos?.reverse().map(photo => (

          <div key={photo?.id} className='photo-container-inner profile-details single-photo'>

            <div className='photo-container-header'>

              <div className='caption-username'>
                {/* {photo.username} */}
              </div>

              {sessionUser?.id === photo.user_id && <EditDeleteModal photoId={photo?.id} photoUrl={photo?.url} photoCaption={photo.caption} />}

            </div>

            <img className='picture profile-details' src={photo.url} onError={handleImage} />

            <CommentList profileDetails={true} photo={photo} photoId={photo?.id} userId={user?.id} />

            <div className='timestamp'>

            </div>

            <div className='comment-container'>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}


export default ProfileDetails
