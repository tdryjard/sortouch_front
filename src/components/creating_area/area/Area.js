import React, { useState, useEffect } from "react";
import ListStock from '../ListStock/ListStock';
import Builder from '../builder/Builder';
import Navbar from '../../navbar/Navbar'
import MenuBurger from '../../menuBurger/MenuBurger'
import Chatbot from '../../react_library/src/chatbotArea/ChatBotArea'
import './area.css'

const Area = () => {
  const [modelId] = useState(sessionStorage.getItem('modelId'))
  const [userId, setUserId] = useState()
  const [token, setToken] = useState()

  useEffect(() => {
    if(localStorage.getItem('userId')){
      setUserId(localStorage.getItem('userId'))
      setToken(localStorage.getItem('token'))
    }
    if(sessionStorage.getItem('userId')){
      setUserId(sessionStorage.getItem('userId'))
      setToken(sessionStorage.getItem('token'))
    }
  }, [])

  return (
    <div className="containerArea">
    <title>Sortouch : éditeur</title>
      {window.innerWidth > 1280 ?
        <Navbar type={"editeur"} />
        :
        <MenuBurger type={"editeur"} />}
      <Builder />
      <Chatbot userId={userId} modelId={modelId} token={token}/>
    </div>
  );
};

export default Area;
