import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './DocWordpress.scss'

const DocWordpress = () => {
    const [userId, setUserId] = useState()

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
        }
    }, [])

    const disconnect = () => {
        localStorage.setItem('userId', '')
        localStorage.setItem('modelId', '')
        localStorage.setItem('token', '')
        localStorage.setItem('type', '')
        sessionStorage.setItem('disconnect', true)
        setTimeout(() => {
            window.location.reload()
        }, 100)
    }

    return (
        <div className="containerDocPartner">
            <title>Sortouch : doc wordpress partenaire</title>
            <div className="containerNav">
                <Link to="/" className="linkNavbar" >Menu</Link>
                <Link to="/installer-wordpress" className="linkNavbar" >Installer son chatbot sur Wordpress</Link>
                <Link to="/installer-react" className="linkNavbar" >Installer son chatbot sur ReactJs</Link>
                {window.innerWidth > 1280 && <button onClick={disconnect} className="disconnect" >Déconnexion</button>}
            </div>
            <div style={{ marginLeft: "0" }} className="contentDoc">
                <h1 className="titleDoc">Intégrer son chatbot sur un site Wordpress</h1>
                <img alt="react logo" src={require('./image/wordpress.png')} className="reactLogo" />
                <h4 className="titleContainerSectionDocWordpress">Sur votre ordinateur</h4>
                <a href="sortouch_plugin.zip"
                    download="sortouch_plugin.zip" className="linkDownload">1) Télécharger le plugin</a>
                <p className="textDoc">2) Extraire le dossier puis le placer dans le dossier wp-content/plugins de wordpress en local</p>
                <h4 className="titleContainerSectionDocWordpress">Sur wordrpess</h4>
                <p className="textDoc">Activer le plugin Sortouch qui est apparu dans la section "extensions"</p>
                <img src={require('./image/active.png')} alt="active plugin" className="imgDocWordpress" />
                <h4 className="titleContainerSectionDocWordpress">Sur le site</h4>
                <p className="textDoc">1) Ajouter un bloc Shortcode (code court) sur le site wordpress</p>
                <img src={require('./image/add_shortcode.png')} alt="add shortcode" className="imgDocWordpress" />
                <p className="textDocMargin">2) écrivez la même chose que l'image ci-dessous en remplaçant le texte entre guillemets avec le user id et model id du compte généré</p>
                <div className="containerShortcode">
                    <p className="shortcode">[erw_sortouch user="le user id" model="le model id"]</p>
                </div>
                <h4 className="titleContainerSectionDoc">Trouver le user id d'un compte généré</h4>
                <img style={{ width: "100%" }} alt="trouver user id" src={require('../docReact/image/userId.png')} className="blockCode" />
                <h4 className="titleContainerSectionDoc">Trouver le model id d'un compte généré</h4>
                <img style={{ width: "100%" }} alt="trouver user id" src={require('../docReact/image/chatbotId.png')} className="blockCode" />
                <p style={{ fontSize: "18px" }} className="textDocMargin">Enfin, partagez le mot de passe l'email générés à votre client, à sa première connexion, de nouveaux identifiants lui seront demandés<br />Pour chaque abonnement mensuel souscrit par votre client sur Sortouch, 30% du montant prix de l'abonnement sera ajouté à votre versement mensuel</p>
            </div>
            {window.innerWidth < 1280 && <button style={{ marginBottom: "50px" }} onClick={disconnect} className="disconnect" >Déconnexion</button>}
        </div>
    )
}

export default DocWordpress