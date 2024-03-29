import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from '../menu/Menu'
import MenuBurger from '../burgerMenu/BurgerMenu'
import Navbar from '../../navbar/Navbar'
import PopupCookie from '../../popupCookie/PopupCookie'
import { Helmet } from "react-helmet";
import './DocWordpress.scss'

const DocWordpress = () => {
    const [userId, setUserId] = useState()

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
        }
    }, [])

    const shemaOrg = {
      "@context": "https://schema.org/", 
      "@type": "HowTo", 
      "name": "Intégrer son chatbot sur son site Wordpress",
      "description": "Apprendre à intégrer un chatbot sur son site Wordpress. Comment mettre un plugin en sortcode. Mettre un plugin sur son site wordpress. Un agent conversationnel sur son site",
      "image": "https://sortouch.co/static/media/wordpress.c42ad450.png",
      "totalTime": "PT3M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "EUR",
        "value": "0"
      },
      "step": [{
        "@type": "HowToStep",
        "text": "Télécharger le plugin"
      },{
        "@type": "HowToStep",
        "text": "Extraire le dossier puis le placer dans le dossier wp-content/plugins de wordpress en local"
      },{
        "@type": "HowToStep",
        "text": `Activer le plugin Sortouch qui est apparu dans la section "extensions"`
      },{
        "@type": "HowToStep",
        "text": "Ajouter un bloc Shortcode (code court) sur votre site wordpress"
      },{
        "@type": "HowToStep",
        "text": "écrivez la même chose que l'image ci-dessous en remplaçant le texte entre guillemets avec votre user id et votre model id"
      },{
        "@type": "HowToStep",
        "text": "Se rendre sur mes modèles et aller dans les options du modèle (exemple ci-dessous)"
      }]    
    }

    return (
        <div className="containerDoc">
            <Helmet>
                <title>Sortouch : installer son chatbot sur son site Wordpress</title>
                <script type="application/ld+json">
                    {JSON.stringify(shemaOrg)}
                </script>
                <meta name="title" property="title" content="installer son chatbot sur son site Wordpress" />
                {localStorage.getItem('cookie') !== 'accept' && <PopupCookie />}
                <meta name="description" content="Apprendre comment installer son chatbot sur son site Wordpress simplement" />
            </Helmet>
            {window.innerWidth > 1280 && <Navbar type={"doc"} />}
            {window.innerWidth > 1280 && <Menu sectionSelect="install" link="docWordpress" />}
            {window.innerWidth < 1280 && <MenuBurger sectionSelect="install" link="docWordpress" />}
            <div className="contentDoc">
                <h1 className="titleDoc">Intégrer son chatbot sur son site Wordpress</h1>
                <img alt="react logo" src={require('./image/wordpress.png')} className="reactLogo" />
                <h4 className="titleContainerSectionDocWordpress">Sur votre ordinateur</h4>
                <a href="sortouch.zip"
                    download="sortouch.zip" className="linkDownload">1) Télécharger le plugin</a>
                <p className="textDoc">2) Extraire le dossier puis le placer dans le dossier wp-content/plugins de wordpress en local</p>
                <h4 className="titleContainerSectionDocWordpress">Sur wordrpess</h4>
                <p className="textDoc">Activer le plugin Sortouch qui est apparu dans la section "extensions"</p>
                <img src={require('./image/active.png')} alt="active plugin" className="imgDocWordpress" />
                <h4 className="titleContainerSectionDocWordpress">Sur votre site</h4>
                <p className="textDoc">1) Ajouter un bloc Shortcode (code court) sur votre site wordpress</p>
                <img src={require('./image/add_shortcode.png')} alt="add shortcode" className="imgDocWordpress" />
                <p className="textDocMargin">2) écrivez la même chose que l'image ci-dessous en remplaçant le texte entre guillemets avec votre user id et votre model id</p>
                <div className="containerShortcode">
                    <p className="shortcode">[erw_sortouch user="votre user id" model="votre model id"]</p>
                </div>
                <h4 className="titleContainerSectionDocWordpress">Trouver son user id</h4>
                <h4 className="titleContainerSectionDoc">Votre user id : {userId ? userId : <Link to="/connexion" className="connexionDoc">Se connecter</Link>}</h4>
                <h4 className="titleContainerSectionDocWordpress">Trouver son modèle id</h4>
                {userId &&
                    <p className="textDoc">Se rendre sur <Link style={{ color: "rgb(46, 46, 46)" }} to="/models">mes modèles</Link> et aller dans les options du modèle (exemple ci-dessous)</p>}
                <div className="containerStepModelid">
                    <img alt="model id étape 1" src={require('./image/modelid1.png')} className="takeModelId" />
                    <img alt="model id étape 2" src={require('./image/modelid2.png')} className="takeModelId" />
                </div>
            </div>
        </div>
    )
}

export default DocWordpress