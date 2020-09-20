import React, { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import { Link } from 'react-router-dom'
import Chatbot from '../plugin-react/chatbotArea/ChatBotArea'
import ChatbotMobile from '../react_library/src/chatbotArea/ChatBotArea'
import MenuBurger from '../menuBurger/MenuBurger'
import Footer from '../footer/Footer'
import ExpireToken from '../expireToken/ExpireToken'
import PopupCookie from '../popupCookie/PopupCookie'
import { Helmet } from "react-helmet";
import './Landing.scss'

const Landing = (props) => {
    const [textEffect2, setTextEffect2] = useState('')
    const [textEffect3, setTextEffect3] = useState('')
    const [textEffect4, setTextEffect4] = useState('')
    const [userId, setUserId] = useState()
    const [chatbotActive, setChatbotActive] = useState(false)
    const [cardActive, setCardActive] = useState(false)


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
        if (props.location.query && props.location.query.reload) window.location.reload()
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
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
            <Helmet>
                <title>Sortouch : Créer son chatbot simplement</title>
                <meta name="twitter:card" content="Sortouch" />
                <meta name="twitter:title" property="og:title" content="Créer son chatbot simplement" />
                <meta name="twitter:description" property="og:description" content="Créer facilement un chat bot qui répond à votre place et trie vos email. à héberger gratuitement ou à installer sur son site" />
                <meta name="twitter:image" property="og:image" content="https://sortouch.co/static/media/chatbot.5d205088.svg" />
                <meta name="title" property="title" content="Créer et installer son chatbot simplement" />
                <meta name="description" content="Créer son chatbot simplement. Éditer des questions et réponses automatiques. Installer son chatbot sur son site Wordpress ou ReactJs. Créer un formulaire de contact pour recevoir des messages via son site" />
                <meta name="og:title" property="og:title" content="Créer son chatbot simplement" />
                <meta name="og:description" property="og:description" content="Créer facilement un chat bot qui répond à votre place et trie vos email. à héberger gratuitement ou à installer sur son site" />
                <meta name="og:image" property="og:image" content="https://sortouch.co/static/media/chatbot.5d205088.svg" />
                <meta property="og:type" content="article" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            {localStorage.getItem('cookie') !== 'accept' && <PopupCookie />}
            {localStorage.getItem('expireToken') === 'true' && <ExpireToken active={true} />}
            <meta name="description" content="" />
            <div className="firstContainerLanding">
                {window.innerWidth > 1280 && <Chatbot active={true} modelId={11} userId={21} />}
                <div className="containerFirstTextLanding">
                    <h1 className="titleFirstLanding">Créer son chatbot simplement</h1>
                    <span className="borderBottom" />
                    <h2 className="describeFirstContainerLanding">Sortouch permet d'automatiser des interactions à travers des questions et réponses éditables !
                    <br /><br />Ajouter des formulaires de contacts liés à certaines réponses et recevoir les messages de ses visiteurs triés automatiquement dans sa boîte de réception Sortouch.
                    <br /><p style={{ fontWeight: "bold" }}>à essayer gratuitement dès maintenant !</p>
                    Nos <Link style={{ color: "black" }} to='/installer-wordpress'>tutos</Link> ne vous parlent pas ? Prenez contact et nous nous chargeons d'installer votre chatbot sur votre site </h2>
                </div>
                {window.innerWidth < 1280 && <div onClick={() => { setChatbotActive(!chatbotActive) }} className="startBotButton">
                    Démo
                    <img src={require('./image/back.png')} className="backReverseIcon" />
                </div>}
                {chatbotActive && <ChatbotMobile active={chatbotActive} modelId={11} userId={21} landing={true} />}
            </div>
            {window.innerWidth > 1280 ?
                <Navbar type={"landing"} />
                :
                <MenuBurger type={"landing"} />}
            <div style={window.innerWidth > 1280 ? { background: "none", marginTop: "80px" } : { background: "none", marginTop: "80px" }} className="containerChoiceEditor">
                <div onClick={() => { setCardActive(true) }} className="flip-card">
                    <div className="flip-card-inner">
                        <div className="contentChoice">
                            {window.innerWidth < 1280 ? <img style={{ marginBottom: "100px", marginTop: "0px" }} src={require('../choiceEditor/image/chatbot.svg')} alt="éditeur chatbot illustration" className="backChoice" />
                                :
                                <img src={require('../choiceEditor/image/chatbot.svg')} alt="éditeur chatbot illustration" className="backChoice" />}
                            <button className="buttonChoiceEditor">Éditer son chatbot</button>
                        </div>
                        <div class="flip-card-back">
                            <div className="contentTextBackCard">
                                <h4 className="titleBackCardChoice">Divers outils à votre porté</h4>
                                <p className="textBackCardChoice">Accéder aux différents outils de créations</p>
                            </div>
                            <div className="contentTextBackCard">
                                <h4 className="titleBackCardChoice">Prévisualiser</h4>
                                <p className="textBackCardChoice">Vous pouvez visualiser les interactions que vous êtes en train de créer en direct</p>
                            </div>
                            <div className="contentTextBackCard">
                                <h4 className="titleBackCardChoice">Des combinaisons infinies</h4>
                                <p className="textBackCardChoice">Une infinité de combinaisons de questions-réponses peuvent être créées</p>
                            </div>
                            <div className="contentTextBackCard">
                                {!userId ?
                                    <Link to="/connexion" className="buttonLinkChoice">C'est parti</Link>
                                    :
                                    <Link to="/editeur-chatbot" className="buttonLinkChoice">C'est parti</Link>}
                            </div>
                        </div>
                    </div>
                </div>
                {/*
                <div onClick={() => { setCardActive(true) }} className="flip-card2">
                    <div className="flip-card-inner2">
                        <div style={{ justifyContent: "flex-start" }} className="contentChoice2">
                            <button className="buttonChoiceEditor2">Éditeur de page web</button>
                            <img src={require('../choiceEditor/image/web.svg')} alt="éditeur page web illustration" className="backChoice" />
                        </div>
                        <div class="flip-card-back2">
                            <div className="contentTextBackCard">
                                <h4 className="titleBackCardChoice">Créer sa propre page web </h4>
                                <p className="textBackCardChoice">Vous pouvez maintenant créer votre propre page internet avec votre URL personnalisée</p>
                            </div>
                            <div className="contentTextBackCard">
                                <h4 className="titleBackCardChoice">Personnaliser sa page web</h4>
                                <p className="textBackCardChoice">Customisez votre page web à votre image !</p>
                            </div>
                            <div className="contentTextBackCard">
                                <h4 className="titleBackCardChoice">Intégrer sa secrétaire</h4>
                                <p className="textBackCardChoice">Votre secrétaire personnelle est automatiquement ajoutée à votre page</p>
                            </div>
                            <div className="contentTextBackCard">
                                {!userId ?
                                    <Link to="/connexion" className="buttonLinkChoice">C'est parti</Link>
                                    :
                                    <Link to="/choisir-editeur" className="buttonLinkChoice">C'est parti</Link>}
                                <a target="_blank" href="https://sortouch.co/web?fleur-et-vous" style={{ marginTop: "25px", marginBottom: "25px", padding: "5px" }} className="buttonLinkChoice">Exemple de page perso</a>
                            </div>
                        </div>
                    </div>
                </div>
                */}
            </div>
            {/*<a href="#explication" className="containerTitleLanding1">
                <img src={require('./image/money.png')} alt="gains money" className="imgTitleLanding" />
                <h3 className="titleLandingTop">Transformer ses visiteurs en clients</h3>
            </a>
            <a href="#explication" className="containerTitleLanding">
                <img src={require('./image/time.png')} alt="gains time" className="imgTitleLanding" />
                <h3 className="titleLandingTop">Gagner du temps dans le traitement de ses mails</h3>
            </a>
            <a href="#explication" className="containerTitleLanding">
                <img src={require('./image/data.png')} alt="gains data" className="imgTitleLanding" />
                <h3 className="titleLandingTop">Se créer une base de donnée d'email et de numéro de téléphone</h3>
            </a>*/}
            <div className="containerHeadLanding">
                <div className="containerTextHead">
                    {/*<div className="contentChatbotLanding">
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
                            </div>*/}
                    <div id="explication" className="contentHeadLanding">
                        <img alt="time gain" src={require('./image/time_back.svg')} className="imgHeadLanding" />
                        <div className="windowTextHead">
                            <div className="contentTitleLanding">
                                <h1 className="titleLanding">Gagner du temps avec ses visiteurs</h1>
                            </div>
                            <div className="contentTextLanding">
                                <p className="textLanding">Finit la boîte mail en bazar et surchargée, fini les réponses répétitives aux questions récurrentes, finit le téléphone qui sonne pour une simple information. Ceux qui veulent vous contacter obtiennent des réponses rapidement et vous, ne cherchez plus l'email important parmi les spams et autres emails sans importance.</p>
                            </div>
                        </div>
                    </div>
                    <div className="contentHeadLanding">
                        {window.innerWidth < 1280 &&
                            <img alt="prospect gain" src={require('./image/graphic.svg')} className="imgHeadLanding" />}
                        <div className="windowTextHead">
                            <div className="contentTitleLanding">
                                <h1 className="titleLanding">Récupérer des coordonnés de prospects</h1>
                            </div>
                            <div className="contentTextLanding">
                                <p className="textLanding">Grâce au gestionnaire de coordonnées Sortouch, vous ne perdrez plus jamais de contact. Toutes les coordonnées envoyées via votre chatbot sont stockées et peuvent être triées et classifier dans votre espace "base de données".</p>
                            </div>
                        </div>
                        {window.innerWidth > 1280 &&
                            <img alt="prospect gain" src={require('./image/graphic.svg')} className="imgHeadLanding" />}
                    </div>
                    <div className="contentHeadLanding">
                        <img alt="mail" src={require('./image/mail_back.svg')} className="imgHeadLanding" />
                        <div className="windowTextHead">
                            <div className="contentTitleLanding">
                                <h1 className="titleLanding">Faire gagner du temps à ses visiteurs</h1>
                            </div>
                            <div className="contentTextLanding">
                                <p className="textLanding">Rechercher une information sur un site est parfois un long parcours. Les visiteurs sur votre site, comme tous aujourd'hui, veulent aller au plus vite et s'ils n'obtiennent pas rapidement leurs réponses, ils partent. Ce qui a pour effet de faire perdre des prospects ainsi qui faire baisser le référencement Google. Via les Réponses automatiques que vous aurez programmées, vos visiteurs obtiendront rapidement leurs réponses et gagneront du temps</p>
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
            <Footer />
        </div>
    )
}

export default Landing