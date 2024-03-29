import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from '../menu/Menu'
import MenuBurger from '../burgerMenu/BurgerMenu'
import Navbar from '../../navbar/Navbar'
import PopupCookie from '../../popupCookie/PopupCookie'
import { Helmet } from "react-helmet";
import './DocReact.scss'

const DocReact = () => {
    const [userId, setUserId] = useState()

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
        }
    }, [])

    const shemaOrg = {
        "@context": "https://schema.org/",
        "@type": "HowTo",
        "name": "Intégrer son chatbot à son site React",
        "description": `Apprendre comment installer son chatbot sur son site React js.
      Télécharger et installer une librairie npm sur son site.`,
        "image": "https://sortouch.co/static/media/react.5d5d9eef.svg",
        "totalTime": "PT3M",
        "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "EUR",
            "value": "0"
        },
        "step": [{
            "@type": "HowToStep",
            "text": "Installer la librairie"
        }, {
            "@type": "HowToStep",
            "text": "Importer la librairie dans son code"
        }, {
            "@type": "HowToStep",
            "text": "Intégrer au code"
        }, {
            "@type": "HowToStep",
            "text": "Se rendre sur mes modèles et aller dans les options du modèle (exemple ci-dessous)"
        }]
    }

    return (
        <div className="containerDoc">
            {localStorage.getItem('cookie') !== 'accept' && <PopupCookie />}
            <Helmet>
                <title>Sortouch : installer son chatbot sur ReactJs</title>
                <script type="application/ld+json">
                    {JSON.stringify(shemaOrg)}
                </script>
                <meta name="title" property="title" content="installer son chatbot sur son site React" />
                <meta name="description" content="Apprendre à installer son chatbot sur son site ReactJs" />
            </Helmet>
            {window.innerWidth > 1280 && <Navbar type={"doc"} />}
            {window.innerWidth > 1280 && <Menu sectionSelect="install" link="docReact" />}
            {window.innerWidth < 1280 && <MenuBurger sectionSelect="install" link="docReact" />}
            <div className="contentDoc">
                <h1 className="titleDoc">Intégrer son chatbot à son site React</h1>
                <img alt="react logo" src={require('./image/react.svg')} className="reactLogo" />
                <div className="containerSectionDoc">
                    <h4 className="titleContainerSectionDoc">Installer la librairie</h4>
                    <p className="codeText">$ npm install sortouch-react</p>
                    <h4 className="titleContainerSectionDoc">Importer la librairie dans son code</h4>
                    <img alt="import Sortouch" src={require('./image/import.png')} className="blockCode1" />
                    <h4 className="titleContainerSectionDoc">Intégrer au code</h4>
                    <div className="integrationContainer">
                        <img alt="block code 1" src={require('./image/code1.png')} className="blockCode" />
                        <p className="textOnCode">votre user id</p>
                        <img alt="block code 2" src={require('./image/code2.png')} className="blockCode" />
                        <p className="textOnCode">le model id</p>
                        <img alt="block code 1" src={require('./image/code3.png')} className="blockCode" />
                    </div>
                    <h4 className="titleContainerSectionDoc">Votre user id : {userId ? userId : <Link to="/connexion" className="connexionDoc">Se connecter</Link>}</h4>
                    <h4 className="titleContainerSectionDoc">Trouver son model id</h4>
                    {userId &&
                        <p className="textDoc">Se rendre sur <Link style={{ color: "rgb(46, 46, 46)" }} to="/models">mes modèles</Link> et aller dans les options du modèle (exemple ci-dessous)</p>}
                    <div className="containerStepModelid">
                        <img alt="model id étape 1" src={require('./image/modelid1.png')} className="takeModelId" />
                        <img alt="model id étape 2" src={require('./image/modelid2.png')} className="takeModelId" />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default DocReact