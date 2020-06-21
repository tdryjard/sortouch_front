import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Footer.scss'

const Footer = () => {
    const [userId, setUserId] = useState()
    const [modelId] = useState(sessionStorage.getItem('modelId'))

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
        } else {
            setUserId(sessionStorage.getItem('userId'))
        }
    }, [])

    return (
        <div className="containerFooter">
            <div className="sectionFooter">
                <h4 className="titleFooter">Documentation</h4>
                <Link to="/installer-wordpress" className="linkFooter">Installer le chatbot sur un site Wordpress</Link>
                <Link to="/utiliser-le-site-sortouch" className="linkFooter">Documentation du site</Link>
                <Link to="/editeur-doc" className="linkFooter">Documentation de l'éditeur</Link>
                <Link to="/installer-react" className="linkFooter">Installer le chatbot sur un site ReactJs</Link>
                <Link to="/tarifs" className="linkFooter">tarifs</Link>
                <Link to="/conditions-utilisateur" className="linkFooter">conditions générales d'utilisation</Link>
            </div>
            {(userId || modelId) &&
            <div className="sectionFooter">
                <h4 className="titleFooter">Vos outils</h4>
            {userId &&
                <>
                    <Link to="/models" className="linkFooter">Mes chatbot</Link>
                    <Link to="/base-de-donnee" className="linkFooter">Ma base de données de contacts</Link>
                </>}
            {modelId &&
                <>
                    <Link to="/editeur" className="linkFooter">éditeur du chatbot selectionné</Link>
                    <Link to="/mails" className="linkFooter">Boite de réception du chatbot selectionné</Link>
                </>}
            </div>}
            <p className="signThomas">Plateforme développée par Thomas Dryjard</p>
        </div>
    )
}
export default Footer