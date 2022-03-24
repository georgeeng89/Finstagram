import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';


import './PageNotFound.css'




function PageNotFound() {

  return (
    <div className='page-not-found-container'>
      <img className='page-not-found-image' src='/static/dead_link.jpg' />
    </div>
  )
}


export default PageNotFound
