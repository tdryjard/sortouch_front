import React, { useEffect, useState } from 'react'
import url from '../../api/url'
import origin from '../../api/origin'
import useGlobalState from '../../hooks/useGlobalState';
import ContentEditable from 'react-contenteditable'
import AreaMessage from './area_message/AreaMessage';
import useGlobalStateAddingCard from '../../hooks/useGlobalStateAddingCard';
import { Link } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import MenuBurger from '../menuBurger/MenuBurger'
import PopupPremium from '../popupPremium/PopupPremium'
import Footer from '../footer/Footer'
import './MessageSpace.css'

const MessageBox = (props) => {
    const [categorys, setCategorys] = useState([])
    const { classConnectButton } = useGlobalState();
    const [categoryId, setCategoryId] = useState()
    const [inputValue, setInputValue] = useState({ html: "" })
    const [contentEditable] = useState(React.createRef())
    const [categorySelect, setCategorySelect] = useState()
    const [unview, setUnview] = useState()
    const { addingCardState } = useGlobalStateAddingCard()
    const [userId, setUserId] = useState()
    const [modelId, setModelId] = useState()
    const [mobile, setMobile] = useState(false)
    const [categoryOpen, setCategoryOpen] = useState(false)
    const [token, setToken] = useState()
    const [categoryIndex, setCategoryIndex] = useState(0)
    const [load, setLoad] = useState(true)
    const [nbMails, setNbMails] = useState([])
    const [popup, setPopup] = useState(false)
    const [type, setType] = useState()
    const [limit, setLimit] = useState()

    useEffect(() => {
        if (window.innerWidth < 1280) setMobile(true)
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
            setToken(localStorage.getItem('token'))
            setType(localStorage.getItem('type'))
        } else {
            setUserId(sessionStorage.getItem('userId'))
            setToken(sessionStorage.getItem('token'))
            setType(sessionStorage.getItem('type'))
        }
        if (sessionStorage.getItem('modelId')) {
            setModelId(sessionStorage.getItem('modelId'))
        }
    }, [])

    const getDay = () => {
        let newDate = new Date()
        let date = newDate.getDate();
        return (date)
    }

    useEffect(() => {
        if (nbMails.length > 0) {
            let nbMailsOfMonth = nbMails.filter(mail => mail.date.includes(getCurrentDate(' ')))
            if (type === "free" && nbMailsOfMonth.length > 16) {
                setPopup(true)
                setLimit(nbMailsOfMonth.length)
            } else if (type === "standard" && nbMailsOfMonth.length > 900) {
                setPopup(true)
                setLimit(nbMailsOfMonth.length)
            } else if (type === "expert" && nbMailsOfMonth.length > 2500) {
                setPopup(true)
                setLimit(nbMailsOfMonth.length)
            }
        }
        if (getDay() === 0) {
            fetch(`${url}/mail/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': `${origin}`,
                    'authorization': token
                }
            })
        }
    }, [categorys, nbMails])

    function getCurrentDate(separator) {

        let newDate = new Date()
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}`
    }

    useEffect(() => {
        if (userId && modelId) {
            fetch(`${url}/category/findAll/${userId}/${modelId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Acces-Control-Allow-Origin': { origin },
                    'authorization': token
                }
            })
                .then(res => res.json())
                .then(res => {
                    setCategorys(res)
                    getNewMessage(res)
                    setLoad(false)
                    if (!categorySelect && res[0]) setCategorySelect(res[0].id)
                })
            fetch(`${url}/mail/findByUser/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Acces-Control-Allow-Origin': { origin },
                    'authorization': token
                }
            })
                .then(res => res.json())
                .then(res => setNbMails(res))
        }
    }, [classConnectButton, addingCardState, userId, modelId])

    const getNewMessage = async (categorys) => {
        let stockUnview = []
        if (categorys.length) {
            for (let n = 0; n < categorys.length; n++) {
                if (categorys[n].id) {
                    let res = await fetch(`${url}/mail/find/${userId}/${modelId}/${categorys[n].id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Acces-Control-Allow-Origin': { origin },
                            'authorization': token
                        }
                    })
                    let result = []
                    res = await res.json()
                    if (res.length > 0) {
                        result = res.filter(mail => mail.deleted !== 1)
                    }
                    let nb = 0
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].view === 0) nb++
                    }
                    stockUnview.push(nb)
                }
            }
            setTimeout(() => {
                setUnview(stockUnview)
            }, 200)
        }
    }

    const findAll = () => {
        fetch(`${url}/category/findAll/${userId}/${modelId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Acces-Control-Allow-Origin': { origin },
                'authorization': token
            }
        })
            .then(res => res.json())
            .then(res => setCategorys(res))
    }

    const deleteCategory = (event) => {
        if (window.confirm('voulez vous supprimer cette category ?')) {
            const categoryId = parseInt(event.target.id.replace('category', ''))
            fetch(`${url}/category/delete/${categoryId}/${userId}/${modelId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Acces-Control-Allow-Origin': { origin },
                    'authorization': token
                }
            })
            findAll()
        }
    }

    const updateCategoryActive = (id, name) => {
        setCategoryId(id)
        setInputValue({ html: name })
    }

    const sendUpdate = () => {
        let name = inputValue.html.replace('&nbsp;', '')
        name = name.replace('<div>', '')
        name = name.replace('<br>', '')
        name = name.replace('</div>', '')
        fetch(`${url}/category/update/${categoryId}/${userId}/${modelId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': `${origin}`,
                'authorization': token
            },
            body: JSON.stringify({
                name: name
            })
        })
        setCategoryId(-1)
        findAll()
    }

    const changeInput = (event) => {
        if (inputValue.html.split('').length < 50) {
            setInputValue({ html: event.target.value })

        }
    }



    return (
        <div className="containerMessageSpace">
        <title>Sortouch : boite de réception</title>
            {popup && <PopupPremium display={popup} limit={limit} />}
            {window.innerWidth > 1280 ?
                <Navbar type={"mails"} />
                :
                <MenuBurger type={"mails"} />}
            {mobile && <img onClick={() => { setCategoryOpen(!categoryOpen) }} className="menuIcon" alt="menu burger" src={require('./image/menu_icon.png')} />}
            {!load &&
                <div className={!mobile ? "containerOngletLeft" : mobile && categoryOpen ? "containerOngletLeftOpen" : "containerOngletLeftClose"}>
                    {Array.isArray(categorys) && <p className="titleCategoryOnglet">Catégories de réception</p>}
                    {Array.isArray(categorys) ?
                        categorys.map((category, index) => {
                            return (
                                <div onClick={() => { setCategoryIndex(index); setCategorySelect(category.id); setCategoryOpen(!categoryOpen) }} className="contentCategory">
                                    {category.id !== categoryId ?
                                        <div className="contentUnderCategory">
                                            <p className="titleCategory">{category.name}</p>
                                            <div className="contentIconCategory">
                                                {unview &&
                                                    <div className="contentNewMessage">
                                                        <img src={require('./image/newMessage_icon.png')} className="newMessageIcon" alt="new message" />
                                                        <p className="nbNewMessage">{unview[index]}</p>
                                                    </div>}
                                                <img alt="update icon" src={require('./image/update_icon.png')} id={`category${category.id}`} className='iconCategory' onClick={() => { updateCategoryActive(category.id, category.name) }} />
                                                <img alt="delete icon" src={require('./image/delete_icon.png')} id={`category${category.id}`} className="iconCategory" onClick={deleteCategory} />
                                            </div>
                                        </div>
                                        :
                                        <div className="contentUnderCategoryUpdate">
                                            <ContentEditable
                                                className="inputAddCategory"
                                                innerRef={contentEditable}
                                                html={inputValue.html}
                                                disabled={false}
                                                onChange={changeInput}
                                                tagName='article'
                                            />
                                            <button onClick={sendUpdate} className="buttonAddCategory">Valider</button>
                                        </div>}
                                </div>
                            )
                        })
                        :
                        <p className="textNoCategory">Acune catégories de réceptions <br/><br/> Vous pouvez en ajouter grace à <Link to="/editeur">l'éditeur</Link></p>}
                </div>}
            {!load &&
                <AreaMessage type={type} token={token} modelId={modelId} userId={userId} categoryId={categorySelect} categoryName={categorys[categoryIndex] && categorys[categoryIndex].name} />}
            {load && <img src={require('./image/load.gif')} alt="chargement" className="loadingGifMessage" />}
        </div>
    )
}

export default MessageBox;