import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import url from '../../api/url'
import './ChoiceEditor.scss'

const ChoiceEditor = () => {
    const [cardActive, setCardActive] = useState(false)
    const [userId, setUserId] = useState()
    const [modelId, setModelId] = useState()
    const [createPage, setCreatePage] = useState()
    const [urlCreate, setUrlCreate] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [urlPage, setUrlPage] = useState()
    const [token, setToken] = useState()
    const [sendUrl, setSendUrl] = useState()
    const [alert, setAlert] = useState('')

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
            setModelId(localStorage.getItem('modelId'))
            setToken(localStorage.getItem('token'))
        } else {
            setUserId(sessionStorage.getItem('userId'))
            setModelId(sessionStorage.getItem('modelId'))
            setToken(sessionStorage.getItem('token'))
        }
    })

    const searchOnepage = async () => {
        const res = await fetch(`${url}/onepage/find/${userId}/${modelId}`)
            .then(res => res.json())
            .then(res => {
                if (res[0]) {
                    setUrlPage(res[0].name)
                    setTimeout(() => {
                        setRedirect(true)
                    }, 100)
                }
                else setCreatePage(true)
            })
    }

    const createPageFunction = async () => {
        const resFind = await fetch(`${url}/onepage/findByName/${urlCreate}`)
        if (resFind.status === 200) {
            setAlert(`Cette url est déja utilisée`)
            setTimeout(() => {
                setAlert('')
            }, 4000)
        }
        else {
            const result = await fetch(`${url}/onepage/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Acces-Control-Allow-Origin': { origin },
                    'authorization': token
                },
                body: JSON.stringify({
                    user_id: userId,
                    model_id: modelId,
                    name: urlCreate
                })
            });
            if (result) {
                setUrlPage(urlCreate)
                setTimeout(() => {
                    setRedirect(true)
                }, 100)

            }
        }
    }

    const getUrl = (e) => {
        const url = e.target.value.replace(/ /gi, '-')
        url.toLowerCase()
        setUrlCreate(url)
    }

    const verifUrl = () => {
        if (urlCreate.match("^[a-zA-Z-' ']+$") && urlCreate.split('').length < 23 && urlCreate.split('').length > 5) {
            setSendUrl(true)
        } else {
            setAlert(`votre url ne doit pas contenir de caractères spéciaux ou de chiffres et faire entre 5 et 23 caractères`)
            setTimeout(() => {
                setAlert('')
            }, 4000)
        }

    }

    return (
        <div className="containerChoiceEditor">
            {redirect && <Redirect to={`/web?${urlPage}`} />}
            {!createPage && window.innerWidth < 1280 &&
                <Link to="/editeur-chatbot" style={{ width: "82%", marginTop: "15px", marginBottom: "15px", boxShadow: "2px 2px 7px rgb(141, 141, 141)", textAlign: "center" }} className="buttonChoiceEditor">Éditeur de chatbot</Link>}
            {!createPage && window.innerWidth < 1280 &&
                <button onClick={searchOnepage} style={{ width: "90%", marginTop: "15px", marginBottom: "15px", boxShadow: "2px 2px 7px rgb(141, 141, 141)" }} className="buttonChoiceEditor2">Éditeur de page web</button>}
            {!createPage && window.innerWidth > 1280 &&
                <Link to="/editeur-chatbot" onClick={() => { setCardActive(true) }} className="flip-card">
                    <div className="flip-card-inner">
                        <div className="contentChoice">
                            <img src={require('./image/chatbot.svg')} alt="éditeur chatbot illustration" className="backChoice" />
                            <button className="buttonChoiceEditor">Éditeur de chatbot</button>
                        </div>
                        <div class="flip-card-back">
                            <div className="contentTextBackCard">
                                <h4 className="titleBackCardChoice">Éditer son chatbot</h4>
                                {window.innerWidth > 1280 && <p className="textBackCardChoice">Accéder à l'éditeur de chatbot et ses différentes outils</p>}
                            </div>
                            <div className="contentTextBackCard">
                                <h4 className="titleBackCardChoice">Prévisualiser</h4>
                                {window.innerWidth > 1280 && <p className="textBackCardChoice">Vous pouvez visualiser le chatbot que vous êtes entrain de créer en direct</p>}
                            </div>
                            <div className="contentTextBackCard">
                                <h4 className="titleBackCardChoice">Des combinaisons infinis</h4>
                                {window.innerWidth > 1280 && <p className="textBackCardChoice">Une infinité de combinaisons de questions/réponses peuvent être créés</p>}
                            </div>
                            <div className="contentTextBackCard">
                                {(window.innerWidth > 1280 || cardActive) && <Link to="/editeur-chatbot" className="buttonLinkChoice">C'est parti</Link>}
                            </div>
                        </div>
                    </div>
                </Link>}
            {!createPage && window.innerWidth > 1280 &&
                <div onClick={() => { return (setCardActive(true), searchOnepage()) }} className="flip-card2">
                    <div className="flip-card-inner2">
                        <div style={{ justifyContent: "flex-start" }} className="contentChoice2">
                            <button className="buttonChoiceEditor2">Éditeur de page web</button>
                            <img src={require('./image/web.svg')} alt="éditeur page web illustration" className="backChoice" />
                        </div>
                        <div class="flip-card-back2">
                            <div className="contentTextBackCard">
                                <h4 className="titleBackCardChoice">Créer sa propre page web </h4>
                                {window.innerWidth > 1280 && <p className="textBackCardChoice">Vous pouvez maintenant créer votre propre page internet avec votre URL personnalisée</p>}
                            </div>
                            <div className="contentTextBackCard">
                                <h4 className="titleBackCardChoice">Personnaliser sa page web</h4>
                                {window.innerWidth > 1280 && <p className="textBackCardChoice">Customisez votre page web à votre image !</p>}
                            </div>
                            <div className="contentTextBackCard">
                                <h4 className="titleBackCardChoice">Intégrer son chatbot</h4>
                                {window.innerWidth > 1280 && <p className="textBackCardChoice">Votre chatbot est la pièce centrale à votre page web</p>}
                            </div>
                            <div className="contentTextBackCard">
                                {(window.innerWidth > 1280 || cardActive) && <button onClick={searchOnepage} className="buttonLinkChoice">C'est parti</button>}
                            </div>
                        </div>
                    </div>
                </div>}
            {createPage && !sendUrl &&
                <div className="containerCreatePage">
                    {alert && <p className="alert">{alert}</p>}
                    <p className="titleCreateUrl">Créez votre url</p>
                    <div className="containerInputUrl">
                        <p className="beforeUrlCreatePage">https://sortouch/web/</p>
                        <input maxLength="22" placeholder="votre url" onChange={getUrl} className="inputUrlCreatePage" />
                    </div>
                    <button onClick={verifUrl} className="buttonCreateUrl">Envoyer url</button>
                </div>}
            {createPage && <div className="backBlur" />}
            {sendUrl &&
                <div className="containerCreatePage">
                    {alert && <p className="alert">{alert}</p>}
                    <p className="titleCreateUrl">Votre url</p>
                    <p className="urlCreated">https://sortouch/web/{urlCreate}</p>
                    <button onClick={createPageFunction} className="buttonCreateUrl">Valider</button>
                    <button onClick={() => { setSendUrl(false) }} className="buttonCreateUrl">Changer url</button>
                </div>}
        </div>
    )
}

export default ChoiceEditor