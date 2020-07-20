import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import './PopupPremium.scss'


const PopupPremium = (props) => {
    const [type, setType] = useState()
    const location = useLocation()
    const [active, setActive] = useState(props.display)

    useEffect(() => {
        if (localStorage.getItem('type')) {
            setType(localStorage.getItem('type'))
        }
    }, [])

    useEffect(() => {
        setActive(props.display)
    }, [props.display])

    return (
        <div className={active === true && "windowPopup"}>
            {(type === "free" || type === "standard") && active && location.pathname === "/models" ?
                <>
                    <div className="backBlur" />
                    <div className="containerPopup">
                        <img alt="icon" src={require('./image/icon.svg')} className="iconPopup" />
                        <img onClick={() => { setActive(!active) }} alt="close" src={require('../models_area/image/cross.png')} className="crossPopupPremium" />
                        <p className="textPopup"> Votre compte {type} ne vous permet de créer seulement 1 modèle<br/>Veuillez modifier le modèle déja créé</p>
                        <Link to="/tarifs" className="buttonPopup">Voir les offres</Link>
                    </div>
                </>
                :type === "expert" && active && location.pathname === "/models" ?
                <>
                    <div className="backBlur" />
                    <div className="containerPopup">
                        <img alt="icon" src={require('./image/icon.svg')} className="iconPopup" />
                        <img onClick={() => { setActive(!active) }} alt="close" src={require('../models_area/image/cross.png')} className="crossPopupPremium" />
                        <p className="textPopup"> Votre compte expert ne vous permet de créer seulement 3 mdoèle<br/>Veuillez nous contacter pour une formule sur mesure</p>
                        <Link to="/tarifs" className="buttonPopup">Voir les offres</Link>
                    </div>
                </>
                : type === "standard" && active && location.pathname === "/base-de-donnee" ?
                    <>
                        <div className="backBlur" />
                        <div className="containerPopup">
                            <img alt="icon" src={require('./image/icon.svg')} className="iconPopup" />
                            <img onClick={() => { setActive(!active) }} alt="close" src={require('../models_area/image/cross.png')} className="crossPopupPremium" />
                            {props.limit < 500 ?
                                <>
                                    <p className="textPopup" style={{ marginTop: "50px", marginBottom: "50px" }}> {props.limit} données stockées</p>
                                    <p className="textPopup" style={{ marginTop: "10px", marginBottom: "50px" }}> Attention vous avez bientot atteint la limite de stockage</p>
                                </>
                                :
                                <p className="textPopup" style={{ marginTop: "10px", marginBottom: "50px" }}> Attention vous avez dépassé la limite de stockage <br/>Afin de pouvoir accéder aux nouvelles données, veuillez souscrire un abonnement</p>}
                            <Link to="/tarifs" className="buttonPopup">Voir les offres</Link>
                        </div>
                    </>
                : type === "standard" && active && location.pathname === "/base-de-donnee" ?
                <>
                    <div className="backBlur" />
                    <div className="containerPopup">
                        <img alt="icon" src={require('./image/icon.svg')} className="iconPopup" />
                        <img onClick={() => { setActive(!active) }} alt="close" src={require('../models_area/image/cross.png')} className="crossPopupPremium" />
                        {props.limit < 10000 ?
                            <>
                                <p className="textPopup" style={{ marginTop: "50px", marginBottom: "50px" }}> {props.limit} données stockées</p>
                                <p className="textPopup" style={{ marginTop: "10px", marginBottom: "50px" }}> Attention vous avez bientot atteint la limite de stockage</p>
                            </>
                            :
                            <p className="textPopup" style={{ marginTop: "10px", marginBottom: "50px" }}> Attention vous avez dépassé la limite de stockage <br/>Afin de pouvoir accéder aux nouvelles données, veuillez souscrire un abonnement</p>}
                        <Link to="/tarifs" className="buttonPopup">Voir les offres</Link>
                    </div>
                </>
                : type === "free" && active && location.pathname === "/mails" ?
                <>
                    <div className="backBlur" />
                    <div className="containerPopup">
                        <img alt="icon" src={require('./image/icon.svg')} className="iconPopup" />
                        <img onClick={() => { setActive(!active) }} alt="close" src={require('../models_area/image/cross.png')} className="crossPopupPremium" />
                        {props.limit < 100 ?
                            <>
                                <p className="textPopup" style={{ marginTop: "50px", marginBottom: "50px" }}> {props.limit} emails reçus ce mois ci</p>
                                <p className="textPopup" style={{ marginTop: "10px", marginBottom: "50px" }}> Attention vous avez bientot atteint votre limite de 100 par mois</p>
                            </>
                            :
                            <p className="textPopup" style={{ marginTop: "10px", marginBottom: "50px" }}> Attention vous avez dépassé la limite de 100 réceptions de mails par mois<br/>Les nouveaux mails reçus seront consultables en souscrivant à une formule</p>}
                        <Link to="/tarifs" className="buttonPopup">Voir les offres</Link>
                    </div>
                </>
                : type === "standard" && active && location.pathname === "/mails" ?
                <>
                    <div className="backBlur" />
                    <div className="containerPopup">
                        <img alt="icon" src={require('./image/icon.svg')} className="iconPopup" />
                        <img onClick={() => { setActive(!active) }} alt="close" src={require('../models_area/image/cross.png')} className="crossPopupPremium" />
                        {props.limit < 2000 ?
                            <>
                                <p className="textPopup" style={{ marginTop: "50px", marginBottom: "50px" }}> {props.limit} emails reçus ce mois ci</p>
                                <p className="textPopup" style={{ marginTop: "10px", marginBottom: "50px" }}> Attention vous avez bientot atteint votre limite de 2000 par mois</p>
                            </>
                            :
                            <p className="textPopup" style={{ marginTop: "10px", marginBottom: "50px" }}> Attention vous avez dépassé la limite de 2000 réceptions de mails par mois<br/>Les nouveaux mails reçus seront consultables en souscrivant à une formule plus adaptée à vous</p>}
                        <Link to="/tarifs" className="buttonPopup">Voir les offres</Link>
                    </div>
                </>
                : type === "expert" && active && location.pathname === "/mails" ?
                <>
                    <div className="backBlur" />
                    <div className="containerPopup">
                        <img alt="icon" src={require('./image/icon.svg')} className="iconPopup" />
                        <img onClick={() => { setActive(!active) }} alt="close" src={require('../models_area/image/cross.png')} className="crossPopupPremium" />
                        {props.limit < 5000 ?
                            <>
                                <p className="textPopup" style={{ marginTop: "50px", marginBottom: "50px" }}> {props.limit} emails reçus ce mois ci</p>
                                <p className="textPopup" style={{ marginTop: "10px", marginBottom: "50px" }}> Attention vous avez bientot atteint votre limite de 5000 par mois</p>
                            </>
                            :
                            <p className="textPopup" style={{ marginTop: "10px", marginBottom: "50px" }}> Attention vous avez dépassé la limite de 5000 réceptions de mails par mois<br/>Veuillez nous contacter afin de souscire à une offre plus adaptée</p>}
                        <Link to="/tarifs" className="buttonPopup">Voir les offres</Link>
                    </div>
                </>
                    : null}
        </div>
    )
}

export default PopupPremium