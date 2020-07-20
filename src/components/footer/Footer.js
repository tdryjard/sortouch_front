import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Footer.scss'

const Footer = () => {
    const [userId, setUserId] = useState()
    const [modelId] = useState(localStorage.getItem('modelId'))

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
        }
    }, [])

    return (
        <div className="containerFooter">
            <div className="sectionFooter">
                <h4 className="titleFooter">Documentation</h4>
                <Link to="/installer-wordpress" className="linkFooter">Installer sur un site Wordpress</Link>
                <Link to="/utiliser-le-site-sortouch" className="linkFooter">Documentation du site</Link>
                <Link to="/editeur-doc" className="linkFooter">Documentation de l'éditeur d'interactions</Link>
                <Link to="/editeur-web-doc" className="linkFooter">Documentation de l'éditeur de page web</Link>
                <Link to="/installer-react" className="linkFooter">Installer sur un site ReactJs</Link>
                <Link to="/tarifs" className="linkFooter">Tarifs</Link>
                <Link to="/conditions-utilisateur" className="linkFooter">Conditions générales d'utilisation</Link>
            </div>
            {(userId || modelId) &&
            <div className="sectionFooter">
                <h4 className="titleFooter">Vos outils</h4>
            {userId &&
                <>
                    <Link to="/models" className="linkFooter">Mes modèles</Link>
                    <Link to="/base-de-donnee" className="linkFooter">Ma base de données de contacts</Link>
                </>}
            {modelId &&
                <>
                    <Link to="/editeur" className="linkFooter">éditeur du modèle selectionné</Link>
                    <Link to="/mails" className="linkFooter">Boite de réception du modèle selectionné</Link>
                </>}
            </div>}
            <p className="signThomas">Plateforme développée par Thomas Dryjard</p>
        </div>
    )
}
export default Footer