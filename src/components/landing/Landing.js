import React, { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import { Link } from 'react-router-dom'
import QuestionChat from './QuestionChat'
import Chatbot from 'sortouch-react'
import MenuBurger from '../menuBurger/MenuBurger'
import Footer from '../footer/Footer'
import './Landing.scss'

const Landing = () => {
    const [textEffect2, setTextEffect2] = useState('')
    const [textEffect3, setTextEffect3] = useState('')
    const [textEffect4, setTextEffect4] = useState('')
    const [userId, setUserId] = useState()


    const textLanding1 = getOffset(document.getElementById('textLanding1')).top
    const textLanding2 = getOffset(document.getElementById('textLanding2')).top
    const textLanding3 = getOffset(document.getElementById('textLanding3')).top
    const textLanding4 = getOffset(document.getElementById('textLanding4')).top

    function getOffset(el) {
        var _x = 0;
        var _y = 0;
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    }

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
        } else if (sessionStorage.getItem('userId')) {
            setUserId(sessionStorage.getItem('userId'))
        }
    }, [])


    useEffect(() => {
        if (!textEffect4) {
            window.onscroll = () => {
                if (window.location) {
                    if (window.innerWidth > 1280) {
                        if (window.pageYOffset - 1150 > textLanding2 && !textEffect2) setTextEffect2('ok')
                        if (window.pageYOffset - 1950 > textLanding3 && !textEffect3) setTextEffect3('ok')
                        if (window.pageYOffset - 2800 > textLanding4 && !textEffect4) setTextEffect4('ok')
                    } else {
                        if (window.pageYOffset - 750 > textLanding2 && !textEffect2) setTextEffect2('ok')
                        if (window.pageYOffset - 1150 > textLanding3 && !textEffect3) setTextEffect3('ok')
                        if (window.pageYOffset - 1550 > textLanding4 && !textEffect4) setTextEffect4('ok')
                    }
                }
            }

        }
    }, []);

    return (
        <div className="containerLanding">
        <title>Sortouch : éditeur de chatbot gratuit</title>
            {window.innerWidth > 1280 ?
                <Navbar type={"landing"} />
                :
                <MenuBurger type={"landing"} />}
            <a href="#explication" className="containerTitleLanding1">
                <img src={require('./image/money.png')} alt="gains money" className="imgTitleLanding" />
                <h1 className="titleLandingTop">Transformer ses visiteurs en clients</h1>
            </a>
            <a href="#explication" className="containerTitleLanding">
                <img src={require('./image/time.png')} alt="gains time" className="imgTitleLanding" />
                <h1 className="titleLandingTop">Gagner du temps dans le traitement de ses mails</h1>
            </a>
            <a href="#explication" className="containerTitleLanding">
                <img src={require('./image/data.png')} alt="gains data" className="imgTitleLanding" />
                <h1 className="titleLandingTop">Se créer une base de donnée d'email et de numéro de téléphone</h1>
            </a>
            <div className="containerHeadLanding">
                <div className="containerTextHead">
                    <div className="contentChatbotLanding">
                        {window.innerWidth > 1280 && <img alt="icon chat" src={require('./image/logo.png')} className="iconChatLanding" />}
                        {window.innerWidth < 1280 &&
                            <div className="contentTitleChatLandingMobile">
                                <img alt="icon chat" src={require('./image/logo.png')} className="iconChatLanding" />
                                <h1 className="titleChatLanding"><QuestionChat text={`Créez votre chatbot gratuitement avec Sortouch`} /></h1>
                            </div>}
                        <div className="contentTextChatLanding">
                            {window.innerWidth > 1280 &&
                                <h1 className="titleChatLanding"><QuestionChat text={`Créez votre chatbot gratuitement avec Sortouch`} /></h1>}
                            <Link to="editeur-doc" className="containerTextLanding1">
                                <h2 id="textLanding1" className={"textChatLanding"}>L'éditeur de chatbot le plus simple d'utilisation</h2>
                            </Link>
                            {window.innerWidth > 1280 ? <Link className="linkImg" to="editeur-doc"> <img src={require('./image/editor.gif')} alt="editeur" className="editorImg" /> </Link>
                                : <img src={require('./image/editor.gif')} alt="editeur" className="editorImg" />}
                            <Link to="installer-react" className="containerTextLanding">
                                <h2 id="textLanding2" className={textEffect2 ? "textChatLanding" : "displayNone"} >Intégrez facilement votre chatbot sur votre site</h2>
                            </Link>
                            {window.innerWidth > 1280 ?
                                <div className="containerLogoLanding">
                                    <Link className="linkImgDuo" to="installer-react"><img src={require('./image/react.svg')} alt="react logo" className="logoInstallLanding" /></Link>
                                    <Link className="linkImgDuo" to="installer-wordpress"> <img src={require('./image/wordpress.png')} alt="wordpress logo" className="logoInstallLanding" /> </Link>
                                </div>
                                :
                                <div className="containerLogoLanding">
                                    <img src={require('./image/react.svg')} alt="react logo" className="logoInstallLanding" />
                                    <img src={require('./image/wordpress.png')} alt="wordpress logo" className="logoInstallLanding" />
                                </div>}
                            <div className="containerTextLanding">
                                {userId ?
                                    <Link to="/mails"><h2 id="textLanding3" className={textEffect3 ? "textChatLanding" : "displayNone"}>Recevez les prises de contact avec vous via votre chatbot triées automatiquement !</h2></Link>
                                    : <Link to="/inscription"><h2 id="textLanding3" className={textEffect3 ? "textChatLanding" : "displayNone"}>Recevez les prises de contact avec vous via votre chatbot triées automatiquement !</h2></Link>}
                            </div>
                            {window.innerWidth > 1280 ?
                                <div className="containerMessageImg">
                                    {userId ?
                                        <Link className="linkImg" to="/mails"><img src={require('./image/formChatbot.png')} alt="formulaire contact chatbot" className="formChatImg" />
                                            <img src={require('./image/message_area.jpg')} alt="espace message" className="areaMessageImgLanding" /> </Link>
                                        :
                                        <Link className="linkImg" to="/inscription"><img src={require('./image/formChatbot.png')} alt="formulaire contact chatbot" className="formChatImg" />
                                            <img src={require('./image/message_area.jpg')} alt="espace message" className="areaMessageImgLanding" /> </Link>}
                                </div>
                                :
                                <div className="containerMessageImg">
                                    <img src={require('./image/formChatbot.png')} alt="formulaire contact chatbot" className="formChatImg" />
                                    <img src={require('./image/message_area.jpg')} alt="espace message" className="areaMessageImgLanding" />
                                </div>}
                            <div className="containerTextLanding">
                                {userId ?
                                    <Link to="/base-de-donnee"><h2 id="textLanding4" className={textEffect4 ? "textChatLanding" : "displayNone"}>Créez vous une vrai base de donnée d'email et de numéro de téléphone !</h2></Link>
                                    :
                                    <Link to="/inscription"><h2 id="textLanding4" className={textEffect4 ? "textChatLanding" : "displayNone"}>Créez vous une vrai base de donnée d'email et de numéro de téléphone !</h2></Link>}
                            </div>
                            {window.innerWidth > 1280 ?
                            userId ?
                                <Link className="linkImg" to="/base-de-donnee"><img src={require('./image/data_area.jpg')} alt="espace base de donnée" className="areaImgLanding" /></Link>
                                :
                                <Link className="linkImg" to="/inscription"><img src={require('./image/data_area.jpg')} alt="espace base de donnée" className="areaImgLanding" /></Link>
                            :
                            <img src={require('./image/data_area.jpg')} alt="espace base de donnée" className="areaImgLanding" />}
                        </div>
                    </div>
                    <div id="explication" className="contentHeadLanding">
                        <img alt="time gain" src={require('./image/time_back.svg')} className="imgHeadLanding" />
                        <div className="windowTextHead">
                            <div className="contentTitleLanding">
                                <h1 className="titleLanding">Votre site est votre vitrine<br />Ne laissez pas vos visiteurs regarder puis partir sans laisser de trace</h1>
                            </div>
                            <div className="contentTextLanding">
                                <p className="textLanding">En invitant les visiteurs de votre site à vous laisser leurs contacts vous ne serez plus qu'une simple vitrine<br />Votre chatbot sortouch vous aide à transformer un simple visiteur en futur client en reprenant contact avec lui</p>
                            </div>
                        </div>
                    </div>
                    <div className="contentHeadLanding">
                        {window.innerWidth < 1280 &&
                            <img alt="prospect gain" src={require('./image/graphic.svg')} className="imgHeadLanding" />}
                        <div className="windowTextHead">
                            <div className="contentTitleLanding">
                                <h1 className="titleLanding">Vos visiteurs sont humains</h1>
                            </div>
                            <div className="contentTextLanding">
                                <p className="textLanding">Le simple popup demandant l'adresse mail est devenu intrusif et le clique sur le bouton croix un réflex<br />Vos visiteurs sont humains et ont besoin d'échanger et d'être conquis avant de partager leurs contacts<br />C'est là qu'un bon chatbot fait la différence</p>
                            </div>
                        </div>
                        {window.innerWidth > 1280 &&
                            <img alt="prospect gain" src={require('./image/graphic.svg')} className="imgHeadLanding" />}
                    </div>
                    <div className="contentHeadLanding">
                        <img alt="mail" src={require('./image/mail_back.svg')} className="imgHeadLanding" />
                        <div className="windowTextHead">
                            <div className="contentTitleLanding">
                                <h1 className="titleLanding">Les tunnels de vente sont indispensables</h1>
                            </div>
                            <div className="contentTextLanding">
                                <p className="textLanding">Un tunnel de vente représente les différentes étapes de la transformation d'un visiteur sur votre site en client<br />Attirer un visiteur sur son site est une première étape<br />Mais la plupart du temps, cela ne suffit pas !<br />Il faut encore préciser ce tunnel de vente en recontactant personnellement votre prospect, par mail ou par téléphone dans les meilleurs des cas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="containerButtonLanding">
                {!userId ?
                    <Link to="/inscription" className="goButtonLanding">Essayer gratuitement</Link>
                    :
                    <Link to="/models" className="goButtonLanding">Essayer gratuitement</Link>}
            </div>
            <Chatbot modelId={11} userId={21} />
            <Footer/>
        </div>
    )
}

export default Landing