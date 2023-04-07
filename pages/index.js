import React, { useEffect, useState, useContext } from 'react';

//internal import 

import { MessengerContext } from '../context/MessengerContext';

const Messenger = () => {
  const {} = useContext(MessengerContext);
  return <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>;
};

export default Messenger;
