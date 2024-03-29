import React, { useRef, useState, useEffect } from 'react'
import ContentEditable from 'react-contenteditable'
import url from '../../../api/url'
import origin from '../../../api/origin'
import { Redirect } from 'react-router-dom'
import './CardModel.scss'


const CardModel = (props) => {
    const [optionSelected, setOptionSelected] = useState(false)
    const [inputValue, setInputValue] = useState({ html: props.name })
    const [contentEditable] = useState(React.createRef())
    const [unview, setUnview] = useState([])
    const [categorys, setCategorys] = useState([])
    const [redirect, setRedirect] = useState(false)
    const [userId, setUserId] = useState()
    const [token, setToken] = useState()
    const [redirectEditor, setRedirectEditor] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [cardSelect, setCardSelect] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
            setToken(localStorage.getItem('token'))
        } else {
            setUserId(sessionStorage.getItem('userId'))
            setToken(sessionStorage.getItem('token'))
        }
        setTimeout(() => {

        }, 300)
    }, [])

    const changeInput = (event) => {
        if (inputValue.html.split('').length < 200) {
            setInputValue({ html: event.target.value })
        }
    }

    useEffect(() => {
        if (userId && props.id) {
            fetch(`${url}/chatbot/category/findAll/${userId}/${props.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': `${origin}`,
                    'authorization': token
                }
            })
                .then(res => res.json())
                .then(res => setCategorys(res))
        }

    }, [props.id, userId, token, deleted])

    useEffect(() => {
        let stockUnview = []
        if (userId && props.id && categorys) {
            for (let n = 0; n < categorys.length; n++) {
                if (categorys[n].id) {
                    fetch(`${url}/mail/find/${userId}/${props.id}/${categorys[n].id}`, {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Credentials': true,
                            'authorization': token
                        },
                    })
                        .then(res => res.json())
                        .then(res => {
                            let result = []
                            if (res.length > 0) {
                                result = res.filter(mail => mail.deleted !== 1)
                            }
                            let nb = 0
                            for (let i = 0; i < result.length; i++) {
                                if (result[i].view === 0) nb++
                            }
                            stockUnview.push(nb)
                        })
                }
            }
            setTimeout(() => {
                let nbTT = 0
                for (let i = 0; i < stockUnview.length; i++) {
                    nbTT += stockUnview[i]
                }
                setUnview(nbTT)
            }, 200)
        }

    }, [categorys, userId, props.id, token])

    const deleteModel = async (modelId) => {
        if (window.confirm('voulez vous supprimer ce modèle ainsi que : les mails et coordonnées récoltées associés ?')) {
            const deleteMail = await fetch(`${url}/mail/deleteByModel/${userId}/${modelId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'authorization': token
                }
            })

            if (deleteMail) {
                const deleteRelation = await fetch(`${url}/relation/deleteByModel/${userId}/${modelId}`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Credentials': true,
                        'authorization': token
                    }
                })

                if (deleteRelation) {
                    const deleteContainer = await fetch(`${url}/container/deleteByModel/${userId}/${modelId}`, {
                        method: 'DELETE',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Credentials': true,
                            'authorization': token
                        }
                    })
                    const res = await deleteContainer.json()
                    if (deleteContainer) {
                        const deleteQuestion = await fetch(`${url}/question/deleteByModel/${userId}/${modelId}`, {
                            method: 'DELETE',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Credentials': true,
                                'authorization': token
                            }
                        })
                        if (deleteQuestion) {
                            const deleteResponse = await fetch(`${url}/response/deleteByModel/${userId}/${modelId}`, {
                                method: 'DELETE',
                                credentials: 'include',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Credentials': true,
                                    'authorization': token
                                }
                            })
                            if (deleteResponse) {
                                const deleteContact = await fetch(`${url}/contact/deleteByModel/${userId}/${modelId}`, {
                                    method: 'DELETE',
                                    credentials: 'include',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Access-Control-Allow-Credentials': true,
                                        'authorization': token
                                    }
                                })
                                if (deleteContact) {
                                    const deleteCategory = await fetch(`${url}/category/deleteByModel/${userId}/${modelId}`, {
                                        method: 'DELETE',
                                        credentials: 'include',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Access-Control-Allow-Credentials': true,
                                            'authorization': token
                                        }
                                    })
                                    if (deleteCategory) {
                                        const resOnepage = await fetch(`${url}/onepage/find/${userId}/${modelId}`)
                                        const deleteOnepage = await fetch(`${url}/onepage/deleteByModel/${userId}/${modelId}`, {
                                            method: 'DELETE',
                                            credentials: 'include',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Access-Control-Allow-Credentials': true,
                                                'authorization': token
                                            }
                                        })
                                        if (deleteOnepage) {
                                            let deleteImage = {}
                                            const resOnepageJson = await resOnepage.json()
                                            if (resOnepageJson[0]) {
                                                deleteImage = await fetch(`${url}/image/delete/${resOnepageJson[0].image_id}`, {
                                                    method: 'DELETE',
                                                    credentials: 'include',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Access-Control-Allow-Credentials': true,
                                                        'authorization': token
                                                    }
                                                })
                                            }
                                            if (deleteImage || !resOnepageJson[0]) {
                                                const result = await fetch(`${url}/model/delete/${modelId}/${userId}`, {
                                                    method: 'DELETE',
                                                    credentials: 'include',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Access-Control-Allow-Credentials': true,
                                                        'authorization': token
                                                    }
                                                })
                                                if (result) {
                                                    localStorage.setItem('modelId', '')
                                                    setTimeout(() => {
                                                        window.location.reload()
                                                    }, 100)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    const updateModel = (event) => {
        let name = inputValue.html.replace('&nbsp;', '')
        name = name.replace('<div>', '')
        name = name.replace('<br>', '')
        name = name.replace('</div>', '')
        const modelId = parseInt(event.target.id.replace('model', ''))
        fetch(`${url}/model/update/${modelId}/${userId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'authorization': token
            },
            body: JSON.stringify({
                name: name
            })
        })
        window.location.reload()
    }

    const cardSelectToEditor = (type) => {
        localStorage.setItem('modelId', props.id)
        localStorage.setItem('chatbotName', props.name)
        localStorage.setItem('popupModel', false)
        setTimeout(() => {
            if (type === "editor") setRedirectEditor(true)
            if (type === "mail") setRedirect(true)
        }, 100)
    }

    return (
        <>
            {optionSelected === false ?
                <div onClick={() => { window.innerWidth < 1280 && setCardSelect(true) }} className={props.index === 0 ? "contentCardModelFirst" : "contentCardModel"}>
                    {window.location.innerWidth > 1280 && props.index === 0 && (localStorage.getItem('popupModel') === "true") &&
                        <img src={require('./image/popup.png')} className="crossPopupModel" />
                    }
                    <div className="headCardModel">
                        <div className="contentNewMessageModel">
                            <img src={require('../../message_space/image/newMessage_icon.png')} className="newMessageIconModel" alt="new message" />
                            <p className="nbNewMessageModel">{unview}</p>
                        </div>
                    </div>
                    <div className="infoCardModel">
                        <img onClick={() => { setOptionSelected(true) }} className="optionIcon" src={require('./image/option_icon.png')} alt="option" />
                        <div className="contentNameCardModel"><p className="nameCardModel">{props.name}</p></div>
                        {redirect && <Redirect
                            state={props.id} to="/mails" />}
                        {redirectEditor && <Redirect
                            state={props.id} to="/editeur-chatbot" />}
                        {window.innerWidth < 1280 && cardSelect ? <button onClick={() => { cardSelectToEditor('mail') }} className="buttonSelectModel">Boite de réception</button> : window.innerWidth > 1280 && <button onClick={() => { cardSelectToEditor('mail') }} className="buttonSelectModel">Boite de réception</button>}
                        {window.innerWidth < 1280 && cardSelect ? <button onClick={() => { cardSelectToEditor('editor') }} className="buttonSelectModel">Modifier</button> : window.innerWidth > 1280 && <button onClick={() => { cardSelectToEditor('editor') }} className="buttonSelectModel">Modifier</button>}
                    </div>
                </div>
                :
                <div className={props.index === 0 ? "contentCardModelOptionFirst" : "contentCardModelOption"}>
                    <div className="containerHeadoptionCardModel">
                        <p className="modelId">model id : {props.id}</p>
                        <img onClick={() => { setOptionSelected(false) }} className="croixIcon" src={require('./image/croix_icon.png')} alt="option" />
                    </div>
                    <ContentEditable
                        className="inputAddModel"
                        innerRef={contentEditable}
                        html={inputValue.html}
                        disabled={false}
                        onChange={changeInput}
                        tagName='article'
                    />
                    <button onClick={updateModel} id={`model${props.id}`} className="buttonUpdateModel">Valider changement</button>
                    <button id={`model${props.id}`} className="deleteButton" onClick={() => { deleteModel(props.id) }}>Supprimer le model</button>
                </div>}
        </>
    )
}

export default CardModel