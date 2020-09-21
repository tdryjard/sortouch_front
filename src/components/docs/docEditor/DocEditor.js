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

    const shemaOrg = {
        "@context": "https://schema.org/", 
        "@type": "HowTo", 
        "name": "Apprenez facilement à utiliser notre éditeur de chatbot",
        "description": "Apprendre comment créer son chatbot facilement avec un éditeur grtui. Créer un agent conversationnel avec des questions et réponses éditables. Ajouter un formulaire à son chatbot",
        "image": "https://sortouch.co/static/media/editor.08bb5830.gif",
        "totalTime": "PT3M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "EUR",
          "value": "0"
        },
        "step": [{
          "@type": "HowToStep",
          "text": "Sélectionner une réponse",
          "image": "https://sortouch.co/static/media/select_response.1b6de463.png",
          "name": "sélection d'une réponse"
        },{
          "@type": "HowToStep",
          "text": "Ajouter une interaction",
          "image": "https://sortouch.co/static/media/add_container.2233c75c.png",
          "name": "Ajout interaction"
        },{
          "@type": "HowToStep",
          "text": "Ajouter une question, réponse ou catégorie de réception",
          "image": "https://sortouch.co/static/media/textarea.9a744034.png",
          "name": "ajouter une question"
        }]    
      }


    return (
        <div className="containerDoc">
            {localStorage.getItem('cookie') !== 'accept' && <PopupCookie />}
            <Helmet>
                <title>Sortouch : tuto éditeur</title>
                <script type="application/ld+json">
                    {shemaOrg}
                </script>
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