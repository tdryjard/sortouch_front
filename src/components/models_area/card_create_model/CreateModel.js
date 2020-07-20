import React, { useState, useEffect } from 'react'
import url from '../../../api/url'
import origin from '../../../api/origin'
import useGlobalState from '../../../hooks/useGlobalState'
import ContentEditable from 'react-contenteditable'
import './CreateModel.scss'
import PopupPremium from '../../popupPremium/PopupPremium'


const CreateModel = (props) => {
    const [adding, setAdding] = useState(false)
    const [inputValue, setInputValue] = useState({ html: "nouveau model" })
    const [contentEditable] = useState(React.createRef())
    const [send, setSend] = useState(false)
    const { connectClassActive, connectClassDisable, classConnectButton } = useGlobalState();
    const [userId, setUserId] = useState()
    const [token, setToken] = useState()
    const [type, setType] = useState()
    const [popup, setPopup] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
            setToken(localStorage.getItem('token'))
            setType(localStorage.getItem('type'))
        }
    }, [])


    const changeInput = (event) => {
        if (inputValue.html.split('').length < 100) {
            setInputValue({ html: event.target.value })
        }
    }

    const addModel = async () => {
        let name = inputValue.html.replace(/&nbsp;/gi, '').replace(/<div><br><\/div>/gi, '').replace(/<p><br><\/p>/gi, '').replace(/<div>/gi, '').replace(/<\/div>/gi, '')
        const res = await fetch(url + '/model/add', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'authorization': token
            },
            body: JSON.stringify({
                name: name,
                user_id: userId,
                color: '#b36fff'
            })
        })
        const result = await res.json()
        if (result) {
            fetch(url + '/container/create', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'authorization': token
                },
                body: JSON.stringify({
                    content_type: 'question',
                    user_id: userId,
                    ordering: 1,
                    response_id: null,
                    model_id: result.id
                })
            })
        }
        setTimeout(() => {
            setSend(true)
        }, 200)
        if (classConnectButton === 'imgConnectActive') {
            connectClassDisable()
        } else {
            connectClassActive()
        }
        window.location.reload()
    }

    const activeContent = () => {
        if (props.models.length > 0 && (type === "free" || type === "standard")) {
            setPopup(true)
        }
        else if (props.models.length > 2 && type === "expert") {
            setPopup(true)
        } else {
            setTimeout(() => {
                setAdding(true)
            }, 200)
        }
    }

    return (
        <>
            {popup && <PopupPremium display={popup} />}
            <div onClick={activeContent} className="containerAddModel">
                {adding === false && send !== true ?
                    <div onClick={activeContent} className="contentAddModel">
                        <p onClick={activeContent} className="nameCardModel">Nouveau chatbot</p>
                        <div className="contentShine">
                            <img alt="add" onClick={activeContent} src={require('../../message_space/addCategory/image/plus_icon.png')} className="addButtonCategoryModel" />
                        </div>
                    </div>
                    : adding === true && send !== true ?
                        <div className="contentAddModelActive">
                            <p className="textCategory">Entrez le nom du model</p>
                            <ContentEditable
                                className="inputAddModel"
                                innerRef={contentEditable}
                                html={inputValue.html}
                                disabled={false}
                                onChange={changeInput}
                                tagName='article'
                            />
                            <button onClick={addModel} className="buttonAddModel">Ajouter</button>
                        </div>
                        :
                        <div className="contentAddModelActive">
                            <div className="contentSetTimeout">
                                {setTimeout(() => { setSend(false); setAdding(false) }, 1500)}
                            </div>
                            <p className="textCategory">Model créé !</p>
                        </div>}
            </div>
        </>
    )
}

export default CreateModel