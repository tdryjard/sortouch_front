import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from '../menu/Menu'
import MenuBurger from '../burgerMenu/BurgerMenu'
import Navbar from '../../navbar/Navbar'
import PopupCookie from '../../popupCookie/PopupCookie'
import { Helmet } from "react-helmet";
import './DocSortouch.scss'

const DocSortouch = () => {
    const [userId, setUserId] = useState()

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
        }
    }, [])

    const shemaOrg = [ {
        "@context" : "http://schema.org",
        "@type" : "Article",
        "name" : "Créer son premier modèle de chatbot",
        "articleSection" : "Personnaliser son modèle",
        "articleBody" : "Se rendre sur la page <A href=\"/models\" style=\"color: rgb(46, 46, 46);\">mes modèles</A></P><P class=\"textDocSortouch\">Puis cliquer sur le nouveau modèle et créer son premier modèle puis le sélectionner"
      }, {
        "@context" : "http://schema.org",
        "@type" : "Article",
        "articleSection" : "Intégrer son chatbot sur son site",
        "articleBody" : "Après sélection du modèle, se rendre sur <A href=\"/editeur\" style=\"color: rgb(46, 46, 46);\">l&#39;éditeur</A></P><P class=\"textDocSortouch\">Un guide d&#39;utilisation de l&#39;éditeur est disponible <A href=\"/editeur-doc\" style=\"color: rgb(46, 46, 46);\">ici"
      }, {
        "@context" : "http://schema.org",
        "@type" : "Article",
        "articleBody" : "Intégrer à son site wordpress",
        "url" : "https://sortouch.co/installer-wordpress"
      }, {
        "@context" : "http://schema.org",
        "@type" : "Article",
        "articleSection" : "Consultez les prises de contact avec vous via votre chatbot",
        "articleBody" : "Intégrer à son site ReactJs",
        "url" : "https://sortouch.co/installer-react"
      }, {
        "@context" : "http://schema.org",
        "@type" : "Article",
        "articleBody" : "Vous pouvez retrouver tous vos messages dans votre <A href=\"/mails\" style=\"color: rgb(46, 46, 46);\">boite de réception</A></P><P class=\"textDocSortouch\">Sélectionnez une catégorie de réception parmi celles que vous aurez créées"
      }, {
        "@context" : "http://schema.org",
        "@type" : "Article",
        "articleSection" : "Consultez votre base de données d'emails et de numéros de téléphone réceptionnés",
        "articleBody" : "Puis consulter les messages laissés par vos visiteurs"
      }, {
        "@context" : "http://schema.org",
        "@type" : "Article",
        "articleBody" : "Vous pouvez retrouver votre base de données",
        "url" : "https://sortouch.co/base-de-donnee"
      } ]

    return (
        <div className="containerDoc">
            {localStorage.getItem('cookie') !== 'accept' && <PopupCookie />}
            <Helmet>
                <title>Sortouch : comment utiliser sortouch</title>
                <meta name="description" content="Apprendre facilement comment utiliser la plateforme de création de chatbot et de gestion des contacts Sortouch en suivant un court tuto" />
                <meta name="title" content="Apprendre à utiliser l'éditeur de chatbot Sortouch" />
            </Helmet>
            {window.innerWidth > 1280 && <Navbar type={"doc"} />}
            {window.innerWidth > 1280 && <Menu link="sortouch" />}
            {window.innerWidth < 1280 && <MenuBurger link="sortouch" />}
            <div className="contentDoc">
                {!userId ?
                    <div className="contentDocSortouch">
                        <h4 className="titleStepDoc">Avant tout, se connecter</h4>
                        {window.innerWidth > 1280 && <p className="numberStepDoc">1</p>}
                        <div className="onContentDocFirst">
                            <Link to="/connexion" className="connexionDocSortouch">Se connecter</Link>
                            <p className="orDocSortouch">ou</p>
                            <Link to="/inscription" className="inscriptionDocSortouch">s'inscrire</Link>
                        </div>
                    </div>
                    :
                    <div className="contentDocSortouch">
                        {window.innerWidth > 1280 && <p className="numberStepDoc">1</p>}
                        <p className="titleStepDoc">Vous êtes déja connecté, parfait !</p>
                    </div>}
                <div className="contentDocSortouch">
                    <h4 className="titleStepDoc">Créer son premier modèle de chatbot</h4>
                    {window.innerWidth > 1280 && <p className="numberStepDoc">2</p>}
                    <div className="onContentDoc">
                        <p className="textDocSortouch">Se rendre sur la page <Link style={{ color: "rgb(46, 46, 46)" }} to="/models">mes modèles</Link></p>
                        <p className="textDocSortouch">Puis cliquer sur le nouveau modèle et créer son premier modèle puis le sélectionner</p>
                        <div className="containerImgDoc">
                            <img src={require('./image/add_model.png')} className="imgDocSortouch" alt="créer chatbot" />
                            <img src={require('./image/select_model.png')} className="imgDocSortouch" alt="select chatbot" />
                        </div>
                    </div>
                </div>
                <div className="contentDocSortouch">
                    <h4 className="titleStepDoc">Personnaliser son modèle</h4>
                    {window.innerWidth > 1280 && <p className="numberStepDoc">3</p>}
                    <div className="onContentDoc">
                        <p className="textDocSortouch">Après sélection du modèle, se rendre sur <Link style={{ color: "rgb(46, 46, 46)" }} to="/editeur">l'éditeur</Link></p>
                        <p className="textDocSortouch">Un guide d'utilisation de l'éditeur est disponible <Link style={{ color: "rgb(46, 46, 46)" }} to="/editeur-doc">ici</Link></p>
                    </div>
                </div>
                <div className="contentDocSortouch">
                    <h4 className="titleStepDoc">Intégrer son chatbot sur son site</h4>
                    <div className="onContentDoc">
                        <p className="textDocSortouch">Intégrer à son site wordpress <Link style={{ color: "rgb(46, 46, 46)" }} to="/installer-wordpress">ici</Link></p>
                        <p className="textDocSortouch">Intégrer à son site ReactJs <Link style={{ color: "rgb(46, 46, 46)" }} to="/installer-react">ici</Link></p>
                    </div>
                </div>
                <div className="contentDocSortouch">
                    <h4 className="titleStepDoc">Consultez les prises de contact avec vous via votre chatbot</h4>
                    <div className="onContentDoc">
                        <p className="textDocSortouchLast">Vous pouvez retrouver tous vos messages dans votre <Link style={{ color: "rgb(46, 46, 46)" }} to="/mails">boite de réception</Link></p>
                        <p className="textDocSortouch">Sélectionnez une catégorie de réception parmi celles que vous aurez créées</p>
                        <img src={require('./image/category.png')} className="imgDocSortouchCategory1" alt="exemple category" />
                        <p className="textDocSortouch">Puis consulter les messages laissés par vos visiteurs</p>
                        <img src={require('./image/mail.png')} className="imgDocSortouchCategory" alt="exemple mail" />
                    </div>
                </div>
                <div className="contentDocSortouch">
                    <h4 className="titleStepDoc">Consultez votre base de données d'emails et de numéros de téléphone réceptionnés</h4>
                    <div className="onContentDoc">
                        <p className="textDocSortouchLast">Vous pouvez retrouver votre base de données <Link style={{ color: "rgb(46, 46, 46)" }} to="/base-de-donnee">ici</Link></p>
                        <img src={require('./image/donnee.png')} className="imgDocSortouchDonnee" alt="exemple base de données" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DocSortouch