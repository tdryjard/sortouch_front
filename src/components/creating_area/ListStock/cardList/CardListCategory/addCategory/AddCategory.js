import React, { useState, useEffect } from 'react';
import url from '../../../../../../api/url';
import origin from '../../../../../../api/origin';
import ContentEditable from 'react-contenteditable'
import useGlobalStateAddingCard from '../../../../../../hooks/useGlobalStateAddingCard';
import './AddCategory.scss'

const Addcategory = () => {
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
    }
    setModelId(localStorage.getItem('modelId'))
  }, [])

  const changeInput = (event) => {
    if (inputValue.html.split('').length < 200) {
      setInputValue({ html: event.target.value })
    }
  }

  async function validCategory() {
    let name = inputValue.html.replace('&nbsp;', '')
    name = name.replace('<div>', '')
    name = name.replace('<br>', '')
    name = name.replace('</div>', '')
    const valueCategory = {
      name: name,
      user_id: userId,
      model_id: modelId
    }
    try {
      const result = await fetch(url + '/category/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Acces-Control-Allow-Origin': { origin },
          'authorization': token
        },
        body: JSON.stringify(valueCategory)
      });
      if (result) {
        setLoad(false)
        addingCard()
      }
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className="containerAddCategoryBuilder">
      {!load ?
        <>
          <p className="textAddingQuestion">Category</p>
          <ContentEditable
            className="contentQuestionInput"
            innerRef={contentEditable}
            html={inputValue.html}
            disabled={false}
            onChange={changeInput}
            tagName='article'
          />
          <button className="validAddCategoryBuilder" onClick={() => {setLoad(true); validCategory()}}>Ajouter</button>
        </>
        :
        <img alt="chargement" src={require('../../../../image/loading.gif')} className="loadAddCard" />}
    </div>
  )
}

export default Addcategory;