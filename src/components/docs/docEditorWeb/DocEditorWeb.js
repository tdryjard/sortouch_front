import React, { useEffect, useState } from 'react'
import Menu from '../menu/Menu'
import MenuBurger from '../burgerMenu/BurgerMenu'
import Navbar from '../../navbar/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../../footer/Footer'
import './DocEditorWeb.scss'

const DocEditorWeb = () => {
    const [userId, setUserId] = useState()

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
        } else if (sessionStorage.getItem('userId')) {
            setUserId(sessionStorage.getItem('userId'))
        }
    }, [])


    return (
        <div className="containerDoc">
            <title>Sortouch : tuto éditeur</title>
            <meta name="description" content="Apprendre à éditer son premier chatbot en suivant un simple guide. Apprendre comment ajouter des question, réponses et boite de réception à votre chatbot" />
            {window.innerWidth > 1280 && <Navbar type={"doc"} />}
            {window.innerWidth > 1280 && <Menu link="editor-web" />}
            {window.innerWidth < 1280 && <MenuBurger link="editor-web" />}
            <div className="contentDoc">
                <h1 className="titleDoc">Apprenez facilement à créer votre page web personnalisée</h1>
                <div className="containerSectionDoc">
                    <h4 className="titleContainerSectionDoc">Rendez-vous sur modifier mon chatbot</h4>
                    <div className="contentSectionDoc">
                        <p className="textContainerSectionColumnDoc">Chaque page web personnalisée que vous pouvez créer est liée à un modèle de chatbot.<br /><br />Afin de créer et personnaliser votre page web, connectez vous puis rendez-vous dans "mes chatbot", sélectionnez "modifier" sur le chatbot avec lequel vous souhaitez créer votre page web puis sélectionnez "éditeur de page web"</p>
                        <div className="containerImgDoc">
                            <img src={require('./image/select.png')} className="selectChatbotImg" alt="selectionner chatbot" />
                            <img src={require('./image/select2.png')} className="selectChatbotImg2" alt="selectionner type éditeur" />
                        </div>
                    </div>
                </div>
                <div className="containerSectionDoc">
                    <h4 className="titleContainerSectionDoc">Personnalisez le titre et la description de votre page</h4>
                    <div className="contentSectionDocColumn">
                        <p className="textContainerSectionColumnDoc">Appuyez simplement sur le bouton <img className="editButtonDoc" alt="edit bouton" src={require('./image/edit.png')}/> afin d'éditer le titre et la description de votre page web</p>
                    </div>
                </div>
                <div className="containerSectionDoc">
                    <h4 className="titleContainerSectionDoc">Ajoutez une image à votre page web</h4>
                    <div className="contentSectionDocColumn">
                        <p className="textContainerSectionColumnDoc">Sélectionnez <button className="btnDoc">Ajouter image</button> sur la page d'édition puis choisissez l'image qui représente au mieux votre activité</p>
                    </div>
                </div>
                {userId ?
                    <Link style={{justifyContent: "center", paddingBottom: "0px"}} to="/choisir-editeur" className="containerSectionDoc"><h4 className="titleContainerSectionDoc">Accéder à l'éditeur de page web</h4></Link>
                    :
                    <Link to="/connexion" className="containerSectionDoc"><h4 className="titleContainerSectionDoc">Connecter vous afin d'accéder à l'éditeur de page web</h4></Link>}
            </div>
        </div>
    )
}

export default DocEditorWeb