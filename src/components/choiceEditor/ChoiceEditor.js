import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import url from '../../api/url'
import './ChoiceEditor.scss'

const ChoiceEditor = () => {
    const [cardActive, setCardActive] = useState(false)
    const [userId, setUserId] = useState()
    const [modelId, setModelId] = useState()
    const [createPage, setCreatePage] = useState(false)
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
        }
    })

    const searchOnepage = async () => {
            const res = await fetch(`${url}/onepage/find/${userId}/${modelId}`)
                .then(res => res.json())
                .then(res => {
                    if (res[0]) {
                        if(res[0].status === 400) tokenExpire()
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
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
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

    const tokenExpire = () => {
        localStorage.setItem('userId', '')
        localStorage.setItem('modelId', '')
        localStorage.setItem('token', '')
        localStorage.setItem('type', '')
        localStorage.setItem('expireToken', true)
        sessionStorage.setItem('disconnect', true)
        setTimeout(() => {
            window.location.reload()
        }, 100)
    }

    return (
        <div className="containerChoiceEditor">
            {redirect && <Redirect to={`/web?${urlPage}`} />}
            {!createPage && window.innerWidth < 1280 &&
                <Link to="/editeur-chatbot" style={{ fontSize: '25px', width: "82%", marginTop: "25px", marginBottom: "25px", boxShadow: "2px 2px 7px rgb(141, 141, 141)", textAlign: "center" }} className="buttonChoiceEditor">Éditeur d'interactions</Link>}
            {!createPage && window.innerWidth < 1280 &&
                <button onClick={searchOnepage} style={{ fontSize: '25px', width: "90%", marginTop: "25px", marginBottom: "25px", boxShadow: "2px 2px 7px rgb(141, 141, 141)" }} className="buttonChoiceEditor2">Éditeur de page web</button>}
            {!createPage && window.innerWidth > 1280 &&
                <Link to="/editeur-chatbot" onClick={() => { setCardActive(true) }} className="flip-card">
                    <div className="flip-card-inner">
                        <div className="contentChoice">
                            <img src={require('./image/chatbot.svg')} alt="éditeur chatbot illustration" className="backChoice" />
                            <button className="buttonChoiceEditor">Éditer sa secrétaire personnelle</button>
                        </div>
                        <div class="flip-card-back">
                            <div className="contentTextBackCard">
                                <h4 className="titleBackCardChoice">Éditer sa secrétaire</h4>
                                {window.innerWidth > 1280 && <p className="textBackCardChoice">Accéder aux différents outils de créations</p>}
                            </div>
                            <div className="contentTextBackCard">
                                <h4 className="titleBackCardChoice">Prévisualiser</h4>
                                {window.innerWidth > 1280 && <p className="textBackCardChoice">Vous pouvez visualiser les interactions que vous êtes en train de créer en direct</p>}
                            </div>
                            <div className="contentTextBackCard">
                                <h4 className="titleBackCardChoice">Des combinaisons infinies</h4>
                                {window.innerWidth > 1280 && <p className="textBackCardChoice">Une infinité de combinaisons de questions-réponses peuvent être créées</p>}
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
                                <h4 className="titleBackCardChoice">Intégrer sa secrétaire</h4>
                                {window.innerWidth > 1280 && <p className="textBackCardChoice">Votre secrétaire personnelle est automatiquement ajoutée à votre page</p>}
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