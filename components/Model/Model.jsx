import React, {useState, useContext} from 'react';
import Image from 'next/image';

import Style from './Model.module.css';
import {MessengerContext} from '../../context/MessengerContext';
import {Loader} from '../index'

const Model = ({openModel, title, head, info, smallInfo, images, functionName}) => {
  // usestate
  const [name, setname] = useState('');
  const [accountAddress, setaccountAddress] = useState('');

  const {loading} = useContext(MessengerContext);

  return (
    <div className={Style.Model}>
      
    </div>
  )
}

export default Model
