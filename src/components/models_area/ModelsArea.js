import React, { useState, useEffect } from 'react'
import CreateModel from './card_create_model/CreateModel'
import CardModel from './card_model/CardModel'
import url from '../../api/url'
import Navbar from '../navbar/Navbar'
import MenuBurger from '../menuBurger/MenuBurger'
import useGlobalState from '../../hooks/useGlobalState';
import Footer from '../footer/Footer'
import './ModelsArea.scss'
import { Redirect } from 'react-router'

const ModelArea = (props) => {
    const [cards, setCards] = useState([])
    const [userId, setUserId] = useState()
    const [mobile, setMobile] = useState(false)
    const [popup, setPoupup] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const [token, setToken] = useState()

    useEffect(() => {

    }, [cards])

    useEffect(() => {
        if (window.innerWidth < 1280) setMobile(true)
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
            setToken(localStorage.getItem('token'))
        } else {
            setUserId(sessionStorage.getItem('userId'))
            setToken(sessionStorage.getItem('token'))
        }
        setTimeout(() => {

        }, 300)
    }, [refresh])


    useEffect(() => {
        if (userId && token) {
            fetch(`${url}/model/findAll/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Acces-Control-Allow-Origin': { origin },
                    'authorization': token
                }
            })
                .then(res => res.json())
                .then(res => setCards(res.reverse()))
        }
    }, [userId, token])

    window.addEventListener("storage", (e) => {
        setRefresh(!refresh);
    });


    return (
        <div className="containerModelArea">
            {window.innerWidth > 1280 ?
                <Navbar type={"models"} />
                :
                <MenuBurger type={"models"} />}
            <div className="contentModelArea">
                <CreateModel models={cards} />
                {cards.length &&
                    cards.map((card, index) => {
                        return (
                            <CardModel id={card.id} name={card.name} index={index} />
                        )
                    })}
            </div>
            {mobile && popup &&
                <div className="containerPopupMobile">
                    <p className="textPopupMobile">Nous conseillions une utilisation sur ordinateur pour une expérience optimale</p>
                    <img src={require('./image/cross.png')} alt="close" className="crossPopup" onClick={() => { setPoupup(false) }} />
                </div>}
            <Footer/>
        </div>
    )
}

export default ModelArea