import React, {useEffect, useState} from 'react'
import AddCategory from './addCategory/AddCategory'
import url from '../../api/url'
import origin from '../../api/origin'
import useGlobalState from '../../hooks/useGlobalState';
import ContentEditable from 'react-contenteditable'
import LinkEditor from './linkEditor/LinkEditor'
import LinkChatBot from './linkChatBot/LinkchatBot';
import AreaMessage from './area_message/AreaMessage';
import useGlobalStateAddingCard from '../../hooks/useGlobalStateAddingCard';
import { Link } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import './MessageSpace.css'

const MessageBox = (props) => {
    const [categorys, setCategorys] = useState([])
    const { classConnectButton } = useGlobalState();
    const [categoryId, setCategoryId] = useState()
    const [inputValue, setInputValue] = useState({html: ""})
    const [contentEditable] = useState(React.createRef())
    const [categorySelect, setCategorySelect] = useState()
    const [unview, setUnview] = useState()
    const {addingCardState} = useGlobalStateAddingCard()
    const [userId, setUserId] = useState()
    const [modelId, setModelId] = useState()
    const [mobile, setMobile] = useState(false)
    const [categoryOpen, setCategoryOpen] = useState(false)
    const [token, setToken] = useState()
    const [categoryIndex, setCategoryIndex] = useState(0)

    useEffect(() => {
        if(window.innerWidth < 1280) setMobile(true)
        if(localStorage.getItem('userId')){
            setUserId(localStorage.getItem('userId'))
            setToken(localStorage.getItem('token'))
        } else {
            setUserId(sessionStorage.getItem('userId'))
            setToken(sessionStorage.getItem('token'))
        }
        if(sessionStorage.getItem('modelId')){
            setModelId(sessionStorage.getItem('modelId'))
        }
        setTimeout(() => {

        }, 300)
    }, [])

    useEffect(() => {
        fetch(`${url}/category/findAll/${userId}/${modelId}`, {
            method: 'GET',
            headers: {
              'Content-Type' :'application/json',
              'Acces-Control-Allow-Origin' : {origin},
              'authorization': token }
        })
        .then(res => res.json())
        .then(res => {
            setCategorys(res)
            if(!categorySelect && res[0]) setCategorySelect(res[0].id)
        })
    }, [classConnectButton, addingCardState, userId, modelId])

    useEffect(() => {
        let stockUnview = []
        console.log(categorys)
        if(categorys.length){
            for(let n = 1; n < categorys.length + 1; n++){
                fetch(`${url}/mail/find/${userId}/${modelId}/${n}`,  {
                    method: 'GET',
                    headers: {
                      'Content-Type' :'application/json',
                      'Acces-Control-Allow-Origin' : {origin},
                      'authorization': token }
                })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                let nb = 0
                for(let i = 0; i < res.length; i++){
                    if(res[i].view === 0) nb++
                }
                stockUnview.push(nb)
            })
            }
            setTimeout(() => {
                setUnview(stockUnview)
            }, 200)
        }
    }, [categorys, userId, modelId])

    const findAll = () => {
        fetch(`${url}/category/findAll/${userId}/${modelId}`, {
            method: 'GET',
            headers: {
              'Content-Type' :'application/json',
              'Acces-Control-Allow-Origin' : {origin},
              'authorization': token }
        })
        .then(res => res.json())
        .then(res => setCategorys(res))
    }

    const deleteCategory = (event) => {
        if(window.confirm('voulez vous supprimer cette category ?')){
            const categoryId = parseInt(event.target.id.replace('category', ''))
            fetch(`${url}/category/delete/${categoryId}/${userId}/${modelId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type' :'application/json',
              'Acces-Control-Allow-Origin' : {origin},
              'authorization': token
            }
          })
          findAll()
        }
    }

    const updateCategoryActive = (event) => {
        setCategoryId(parseInt(event.target.id.replace('category', '')))
    }

    const sendUpdate = () => {
        fetch(`${url}/category/update/${categoryId}/${userId}/${modelId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': `${origin}`,
              'authorization': token
            },
            body: JSON.stringify({
            name: inputValue.html
            })
        })
        setCategoryId(-1)
        findAll()
    }

    const changeInput = (event) => {
        setInputValue({html: event.target.value})
    }

    

    return(
        <div className="containerMessageSpace">
            <Navbar/>
            {mobile && <img onClick={() => {setCategoryOpen(!categoryOpen)}} className="menuIcon" alt="menu burger" src={require('./image/menu_icon.png')}/>}
            <div className={!mobile ? "containerOngletLeft" : mobile && categoryOpen ? "containerOngletLeftOpen" : "containerOngletLeftClose"}>
                <p className="titleCategoryOnglet">Catégories</p>
                {Array.isArray(categorys) &&
                categorys.map((category, index) => {
                    return(
                        <div onClick={() => {setCategoryIndex(index); setCategorySelect(category.id); setCategoryOpen(!categoryOpen)}} className="contentCategory">
                            {category.id !== categoryId ?
                            <div className="contentUnderCategory">
                                <p className="titleCategory">{category.name}</p>
                                <div className="contentIconCategory">
                                    {unview &&
                                    <div className="contentNewMessage">
                                        <img src={require('./image/newMessage_icon.png')} className="newMessageIcon" alt="new message"/>
                                        <p className="nbNewMessage">{unview[index]}</p>
                                    </div>}
                                    <img alt="update icon" src={require('./image/update_icon.png')} id={`category${category.id}`} className='iconCategory' onClick={updateCategoryActive}/>
                                    <img alt="delete icon" src={require('./image/delete_icon.png')} id={`category${category.id}`} className="iconCategory" onClick={deleteCategory}/>
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
                })}
            </div>
            <AreaMessage token={token} userId={userId} modelId={modelId} categoryName={categorys[categoryIndex] && categorys[categoryIndex].name} userId={userId} categoryId={categorySelect} />
            {!mobile &&
            <div className="containerOngletRight">
                <AddCategory token={token} userId={userId} modelId={modelId}/>
                <LinkEditor userId={userId} modelId={modelId}/>
                <LinkChatBot userId={userId} modelId={modelId}/>
            </div>}
        </div>
    )
}

export default MessageBox;