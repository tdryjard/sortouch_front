import React, { useState, useEffect } from 'react'
import Menu from '../menu/Menu'
import MenuBurger from '../burgerMenu/BurgerMenu'
import Navbar from '../../navbar/Navbar'
import { Link } from 'react-router-dom'
import PopupCookie from '../../popupCookie/PopupCookie'
import { Helmet } from "react-helmet";
import './DocEditor.scss'

const DocEditor = () => {
    const [userId, setUserId] = useState()

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
        }
    }, [])

    const shemaOrg = [{
        "@context": "http://schema.org",
        "@type": "Article",
        "name": "Apprenez facilement à utiliser notre éditeur de chatbot",
        "articleSection": "Sélectionner une réponse",
        "articleBody": "Afin de pouvoir ajouter de nouvelles interactions, il faut lier celle-ci à une réponse.<BR/>Cliquez donc simplement sur la réponse avec laquelle vous souhaitez lier les prochaines interactions",
        "url": "https://sortouch.co/connexion"
    }, {
        "@context": "http://schema.org",
        "@type": "Article",
        "name": "Apprenez facilement à utiliser notre éditeur de chatbot",
        "articleSection": "Ajouter une interaction",
        "articleBody": "Afin d&#39;ajouter une interaction dans l&#39;éditeur il faut simplement appuyer sur le bouton d&#39;ajout du type d&#39;interaction désiré",
        "url": "https://sortouch.co/connexion"
    }, {
        "@context": "http://schema.org",
        "@type": "Article",
        "name": "Apprenez facilement à utiliser notre éditeur de chatbot",
        "articleSection": "Ajouter une question, réponse ou catégorie de réception",
        "articleBody": "Appuyez simplement sur le bouton &quot;+&quot; à droite des conteneurs puis écrivez votre question, réponse ou la catégorie dans laquelle vous souhaitez recevoir la prise de contact liée à la réponse précédente.<BR/>Puis appuyez sur ajouter",
        "url": "https://sortouch.co/connexion"
    }]


    return (
        <div className="containerDoc">
            {localStorage.getItem('cookie') !== 'accept' && <PopupCookie />}
            <Helmet>
                <title>Sortouch : tuto éditeur</title>
                <meta name="title" property="title" content="Apprendre à créer et éditer son chatbot" />
                <meta name="description" content="Apprendre à créer son chatbot en suivant un simple guide. Apprendre comment ajouter des question, réponses et boite de réception à votre chatbot" />
            </Helmet>
            {window.innerWidth > 1280 && <Navbar type={"doc"} />}
            {window.innerWidth > 1280 && <Menu link="editor" />}
            {window.innerWidth < 1280 && <MenuBurger link="editor" />}
            <div className="contentDoc">
                <h1 className="titleDoc">Apprenez facilement à utiliser notre éditeur de chatbot</h1>
                <div style={{ paddingBottom: "0px" }} className="containerSectionDoc">
                    <img src={require('../../landing/image/editor.gif')} alt="editeur video" className="editorMovieDoc" />
                </div>
                <div className="containerSectionDoc">
                    <h4 className="titleContainerSectionDoc">Sélectionner une réponse</h4>
                    <div className="contentSectionDoc">
                        <p className="textContainerSectionColumnDoc">Afin de pouvoir ajouter de nouvelles interactions, il faut lier celle-ci à une réponse.<br />Cliquez donc simplement sur la réponse avec laquelle vous souhaitez lier les prochaines interactions </p>
                        <img className="imgSelectResponse" src={require('./image/select_response.png')} alt="selectionner une réponse" />
                    </div>
                </div>
                <div className="containerSectionDoc">
                    <h4 className="titleContainerSectionDoc">Ajouter une interaction</h4>
                    <div className="contentSectionDocColumn">
                        <p className="textContainerSectionColumnDoc">Afin d'ajouter une interaction dans l'éditeur il faut simplement appuyer sur le bouton d'ajout du type d'interaction désiré</p>
                        <img className="imgAddContainerDoc" src={require('./image/add_container.png')} alt="category cartes éditeur" />
                    </div>
                </div>
                <div className="containerSectionDoc">
                    <h4 className="titleContainerSectionDoc">Ajouter une question, réponse ou catégorie de réception</h4>
                    <div className="contentSectionDocColumn">
                        <p className="textContainerSectionColumnDoc">Appuyez simplement sur le bouton "+" à droite des conteneurs puis écrivez votre question, réponse ou la catégorie dans laquelle vous souhaitez recevoir la prise de contact liée à la réponse précédente.<br />Puis appuyez sur ajouter</p>
                        <img style={{ borderRadius: "50px" }} src={require('./image/button_add.png')} alt="Ajouter une question" />
                        <img className="imgAddContainerDoc" src={require('./image/textarea.png')} alt="textarea" />
                    </div>
                </div>
                {userId ?
                    <Link to="/editeur" className="containerSectionDoc"><h4 className="titleContainerSectionDoc">Accéder à l'éditeur</h4></Link>
                    :
                    <Link to="/connexion" className="containerSectionDoc"><h4 className="titleContainerSectionDoc">Connecter vous afin d'accéder à l'éditeur</h4></Link>}
            </div>
        </div>
    )
}

export default DocEditor