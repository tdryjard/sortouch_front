import React, { useState, useEffect } from 'react';
import url from '../../../api/url';
import origin from '../../../api/origin';
import ContentEditable from 'react-contenteditable'
import './question.css'
import useGlobalStateAddingCard from '../../../hooks/useGlobalStateAddingCard';

const Question = () => {
  const [contentEditable] = useState(React.createRef())
  const [userId, setUserId] = useState()
  const [inputValue, setInputValue] = useState({ html: "" })
  const { addingCard } = useGlobalStateAddingCard();
  const [modelId, setModelId] = useState()
  const [token, setToken] = useState()
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      setUserId(localStorage.getItem('userId'))
      setToken(localStorage.getItem('token'))
    } else {
      setUserId(sessionStorage.getItem('userId'))
      setToken(sessionStorage.getItem('token'))
    }
    setModelId(sessionStorage.getItem('modelId'))
  }, [])

  const changeInput = (event) => {
    if (inputValue.html.split('').length < 200) {
      setInputValue({ html: event.target.value })
    }
  }

  async function validQuestion() {
    let name = inputValue.html.replace('&nbsp;', '')
    name = name.replace('<div>', '')
    name = name.replace('<br>', '')
    name = name.replace('</div>', '')
    const valueQuestion = {
      content: name,
      user_id: userId,
      model_id: modelId
    }
    try {
      const result = await fetch(url + '/question/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Acces-Control-Allow-Origin': { origin },
          'authorization': token
        },
        body: JSON.stringify(valueQuestion)
      });
      if(result){
        setLoad(false)
        addingCard()
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="containerQuestion">
      {!load ?
      <>
      <p className="textAddingQuestion">Question</p>
      <ContentEditable
        className="contentQuestionInput"
        innerRef={contentEditable}
        html={inputValue.html}
        disabled={false}
        onChange={changeInput}
        tagName='article'
      />
      <button className="validQuestion" onClick={() => {setLoad(true); validQuestion()}}>Ajouter</button>
      </>
      :
      <img alt="chargement" src={require('../image/loading.gif')} className="loadAddCard"/>}
    </div>
  )
}

export default Question;