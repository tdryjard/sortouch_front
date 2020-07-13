import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Chatbot from '../plugin-react/chatbotArea/ChatBotArea'
import ContentEditable from 'react-contenteditable'
import { useForm } from "react-hook-form";
import url from '../../api/url'
import './OnePage.scss'

const OnPage = () => {
    const [onepage, setOnepage] = useState()
    const [userId, setUserId] = useState()
    const [modelId, setModelId] = useState()
    const [token, setToken] = useState()
    const [contentEditable] = useState(React.createRef())
    const [titleValue, setTitleValue] = useState({ html: "Titre de votre page" })
    const [describeValue, setDescribeValue] = useState({ html: "Ceci est une description de votre entreprise, vous pouvez la modifier afin de détailler au mieux votre activité en 255 caractères" })
    const [changeTitle, setChangeTitle] = useState(false)
    const [changeDescribe, setChangeDescribe] = useState(false)
    const [logo, setLogo] = useState()
    const [changeImg, setChangeImg] = useState(false)
    const [copy, setCopy] = useState(false)
    const [load, setLoad] = useState(false)

    const { editTitle, editDescribe, handleSubmit } = useForm()

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(parseInt(localStorage.getItem('userId')))
            setModelId(localStorage.getItem('modelId'))
            setToken(localStorage.getItem('token'))
        }
    }, [])

    useEffect(() => {
        getOnepage()
    }, [changeTitle, changeDescribe, changeImg])

    const getOnepage = async () => {
        const name = window.location.href.split('?')[1]
        const res = await fetch(`${url}/onepage/findByName/${name}`)
            .then(res => res.json())
            .then(res => {
                if(res[0]){
                    if (res[0].title) setTitleValue({ html: res[0].title })
                    if (res[0].description) setDescribeValue({ html: res[0].description })
                    setOnepage(res[0])
                    if (res[0].image_id) getImage(res[0].image_id)
                }
            })
    }

    const getNewTitlte = (e) => {
        if (e.target.value.split('').length < 46) {
            setTitleValue({ html: e.target.value })
        }
    }

    const getNewDescribe = (e) => {
        if (e.target.value.split('').length < 451) setDescribeValue(e.target.value)
    }

    const updateNewTitle = async () => {
        const newTitle = titleValue.html.replace(/&nbsp;/gi, '').replace(/<div><br><\/div>/gi, '').replace(/<p><br><\/p>/gi, '').replace(/<div>/gi, '').replace(/<\/div>/gi, '').replace(/&amp;/gi, '&')
        const res = await fetch(`${url}/onepage/update/${userId}/${modelId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify({
                title: newTitle
            })
        })
        if (res) setChangeTitle(false)
    }

    const updateNewDescribe = async () => {
        const res = await fetch(`${url}/onepage/update/${userId}/${modelId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify({
                description: describeValue
            })
        })
        if (res) setChangeDescribe(false)
    }

    const getImage = async (id) => {
        const res = await fetch(`${url}/image/find/${id}`)
        const resJson = await res.json()
        setLogo(resJson[0].base)
        setLoad(false)
    }

    const getFile = (e) => {
        if (e.target.files[0]) {
            setLoad(true)
            let file_size = e.target.files[0].size;
            if (file_size > 760000){
                alert(`l'image ne doit pas dépasser 750ko`)
            }
            else {
                e.preventDefault();
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    sendFile(reader.result)
                };
            }
        }
    }

    const sendFile = async (picture) => {
        if (!logo) {
            if (picture) {
                const res = await fetch(`${url}/image/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token
                    },
                    body: JSON.stringify({
                        base: picture
                    })
                })
                if (res) {
                    const resJson = await res.json()
                    const resPut = await fetch(`${url}/onepage/update/${userId}/${modelId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': token
                        },
                        body: JSON.stringify({
                            image_id: resJson.id
                        })
                    })
                    if (resPut){
                        setChangeImg(!changeImg)
                    }
                }
            }
        }
        else {
            const res = await fetch(`${url}/image/update/${onepage.image_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify({
                    base: picture
                })
            })
            if (res){
                setChangeImg(!changeImg)
            }
        }
    };

    function clipboard() {
        /* Get the text field */
        var copyText = `https://sortouch.co/web?${window.location.href.split('?')[1]}`
      
        navigator.clipboard.writeText(copyText)
      
        setCopy(true)
      }

    return (
        <>
            {onepage && userId === onepage.user_id ?
                <div className="containerOnPage">
                    {window.innerWidth > 1280 &&
                        <>
                            <Link to="/editeur-chatbot" className="buttonLinkOnepage">Éditer le chatbot</Link>
                            {!copy ?
                            <button onClick={clipboard} className="buttonLinkOnepage2">Partager sa page</button>
                            :
                            <button onClick={clipboard} className="buttonLinkOnepage2">Copié !</button>}
                        </>}
                    {window.innerWidth < 1280 &&
                        <div className="containerButtonOnepage">
                            <Link to="/editeur-chatbot" className="buttonLinkOnepage">Éditer le chatbot</Link>
                            {!copy ?
                            <button onClick={clipboard} className="buttonLinkOnepage2">Partager sa page</button>
                            :
                            <button onClick={clipboard} className="buttonLinkOnepage2">Copié !</button>}
                        </div>
                    }
                    <div className="containerLeftOnepage">
                        {!changeTitle &&
                            <div className="contentTitleOnepage">
                                {!onepage.title || onepage.title === "" ? <h1 className="titleOnepage">Titre de votre page</h1> : <h1 className="titleOnepage">{onepage.title}</h1>}
                                <img onClick={() => { return (setChangeTitle(true), setChangeDescribe(false)) }} src={require('./image/edit.png')} className="editLogoOnepage2" alt="edit logo" />
                            </div>}
                        {changeTitle &&
                            <form onSubmit={handleSubmit(updateNewTitle)} style={{ height: 'auto', paddingTop: '10px', paddingBottom: '10px', marginBottom: '50px' }} className="containerUpdateCard">
                                <ContentEditable
                                    style={{ marginTop: '0px' }}
                                    ref={editTitle}
                                    className="contentQuestionInput"
                                    innerRef={contentEditable}
                                    html={titleValue.html}
                                    disabled={false}
                                    onChange={getNewTitlte}
                                    tagName='article'
                                />
                                <img onClick={updateNewTitle} className="iconDeleteCardBuild" alt="update" src={require('../creating_area/builder/image/update_icon.png')} />
                            </form>}
                        <div className="containerLogoOnepage">
                            {load && <img src={require('./image/loading.gif')} alt="chargement" className="loadOnepage"/> }
                            {logo && <img className="logoOnepage" src={logo} />}
                            <div style={logo && { top: "0px", left: "0px" }} class="upload-btn-wrapper">
                                <button class="btn">Changer d'image</button>
                                <input className="inputGetFile" accept=".jpeg,.jpg,.png"
                                    type="file"
                                    name="file"
                                    onChange={getFile} />
                            </div>
                        </div>
                        {!changeDescribe && (onepage.description && onepage.description !== "" && onepage.description !== "[object Object]") ?
                            <div className="contentDescriptionOnepage">
                                <p className="descriptionOnepage">{onepage.description}</p>
                                <img onClick={() => { return (setChangeDescribe(true), setChangeTitle(false)) }} src={require('./image/edit.png')} className="editLogoOnepage" alt="edit logo" />
                            </div>
                            : !changeDescribe && (!onepage.description || onepage.description === "" || onepage.description === "[object Object]") &&
                            <div className="contentDescriptionOnepage">
                                <p className="descriptionOnepage">Ceci est une description de votre entreprise, vous pouvez la modifier afin de détailler au mieux votre activité en 350 caractères</p>
                                <img onClick={() => { return (setChangeDescribe(true), setChangeTitle(false)) }} src={require('./image/edit.png')} className="editLogoOnepage" alt="edit logo" />
                            </div>}
                        {changeDescribe &&
                            <form onSubmit={handleSubmit(updateNewDescribe)} style={{ height: 'auto', paddingTop: '10px', paddingBottom: '10px' }} className="containerUpdateCard">
                                <textarea
                                    ref={editDescribe}
                                    style={{ marginTop: '0px' }}
                                    className="contentTextArea"
                                    onChange={getNewDescribe}
                                    maxLength="455"
                                />
                                <img onClick={updateNewDescribe} className="iconDeleteCardBuild" alt="update" src={require('../creating_area/builder/image/update_icon.png')} />
                            </form>}
                    </div>
                    <div className="chatbotOnpage">
                        {window.innerWidth > 1280 && onepage ? <Chatbot active={true} userId={onepage.user_id} modelId={onepage.model_id} /> : onepage && <Chatbot userId={onepage.user_id} modelId={onepage.model_id} />}
                    </div>
                </div>

            :
                onepage && userId !== onepage.user_id &&
                <div className="containerOnPage">
                    <div className="containerLeftOnepage">
                        {!changeTitle && onepage.title ?
                            <div className="contentTitleOnepage">
                                <h1 className="titleOnepage">{onepage.title}</h1>
                            </div>
                            : !changeTitle && !onepage.title &&
                            <div className="contentTitleOnepage">
                                <h1 className="titleOnepage">Titre de votre page</h1>
                            </div>}
                        <div className="containerLogoOnepage">
                            {logo && <img className="logoOnepage" src={logo} />}
                        </div>
                        {!changeDescribe && onepage.description ?
                            <div className="contentDescriptionOnepage">
                                <p className="descriptionOnepage">{onepage.description}</p>
                            </div>
                            : !changeDescribe && !onepage.description &&
                            <div className="contentDescriptionOnepage">
                                <p className="descriptionOnepage">Ceci est une description de votre entreprise, vous pouvez la modifier afin de détailler au mieux votre activité en 255 caractères</p>
                            </div>}
                    </div>
                    <div className="chatbotOnpage">
                        {window.innerWidth > 1280 && onepage ? <Chatbot active={true} userId={onepage.user_id} modelId={onepage.model_id} /> : onepage && <Chatbot userId={onepage.user_id} modelId={onepage.model_id} />}
                    </div>
                </div>
            }
        </>
    )
}

export default OnPage