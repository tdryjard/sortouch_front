import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './Navbar.scss'

const Navbar = (props) => {
    const [userId, setUserId] = useState()
    const [modelId] = useState(sessionStorage.getItem('modelId'))

    useEffect(() => {
        if(localStorage.getItem('userId')){
            setUserId(localStorage.getItem('userId'))
        } else {
            setUserId(sessionStorage.getItem('userId'))
        }

    }, [])

    console.log(userId, modelId)

    return(
        <div className="containerNav">
            <Link to="/" className={props.type === "landing" ? "linkNavbarActive" : "linkNavbar"} >Accueil</Link>
            <Link to="/editeur-doc" className={props.type === "doc" ? "linkNavbarActive" : "linkNavbar"} >Docs</Link>
            <Link to="/editeur-doc" className={props.type === "tarif" ? "linkNavbarActive" : "linkNavbar"} >Tarifs</Link>
            {!userId && window.innerWidth > 1280 ?
                <div className="contentConnect">
                    <Link to="/connexion" className="connexionNavbar">Connexion</Link>
                    <Link to="/inscription" className="subNavbar">inscription</Link>
                </div>
            : userId ?
            <>
                <Link to="/models" className={props.type === "models" ? "linkNavbarActive" : "linkNavbar"} >Mes chatbots</Link>
                <Link to="/base-de-donnee" className={props.type === "data" ? "linkNavbarActive" : "linkNavbar"} >Données collectées</Link>
            </>
            : null
            }
        </div>
    )
}

export default Navbar