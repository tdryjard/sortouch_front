import React, { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import { Link } from 'react-router-dom'
import QuestionChat from './QuestionChat'
import Chatbot from 'sortouch-react'
import MenuBurger from '../menuBurger/MenuBurger'
import './Landing.scss'

const Landing = () => {
    const [textEffect1, setTextEffect1] = useState('')
    const [textEffect2, setTextEffect2] = useState('')
    const [textEffect3, setTextEffect3] = useState('')
    const [textEffect4, setTextEffect4] = useState('')
    const [scrollPosition, setSrollPosition] = useState(0);


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
        if (!textEffect4) {
            window.onscroll = () => {
                if (window.location) {
                    if (window.pageYOffset + 750 > textLanding2 && !textEffect2) setTextEffect2('ok')
                    if (window.innerWidth > 1280) {
                        if (window.pageYOffset - 1150 > textLanding3 && !textEffect3) setTextEffect3('ok')
                        if (window.pageYOffset - 2000 > textLanding4 && !textEffect4) setTextEffect4('ok')
                    } else {
                        if (window.pageYOffset - 550 > textLanding3 && !textEffect3) setTextEffect3('ok')
                        if (window.pageYOffset - 1200 > textLanding4 && !textEffect4) setTextEffect4('ok')
                    }
                }
            }

        }
    }, []);

    return (
        <div className="containerLanding">
            {window.innerWidth > 1280 ?
                <Navbar type={"landing"} />
                :
                <MenuBurger type={"landing"} />}
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
                            <div className="containerTextLanding">
                                <h2 id="textLanding1" className={"textChatLanding"}>L'éditeur de chatbot le plus simple du marché</h2>
                            </div>
                            <img src={require('./image/editor.png')} alt="editeur" className="editorImg" />
                            <div className="containerTextLanding">
                                <h2 id="textLanding2" className={textEffect2 ? "textChatLanding" : "displayNone"}  >Partagez votre chatbot généré en ligne ou intégrez votre chatbot à votre site</h2>
                            </div>
                            <div className="containerLogoLanding">
                                <img src={require('./image/react.svg')} alt="react logo" className="logoInstallLanding" />
                                <img src={require('./image/wordpress.png')} alt="wordpress logo" className="logoInstallLanding" />
                                <img src={require('./image/shopify.png')} alt="wordpress logo" className="logoInstallLanding" />
                                <img src={require('./image/prestashop.png')} alt="prestashop logo" className="logoInstallLanding" />
                            </div>
                            <div className="containerTextLanding">
                                <h2 id="textLanding3" className={textEffect3 ? "textChatLanding" : "displayNone"}>Recevez les prises de contact avec vous triées automatiquement !</h2>
                            </div>
                            <img src={require('./image/message_area.jpg')} alt="espace message" className="areaImgLanding" />
                            <div className="containerTextLanding">
                                <h2 id="textLanding4" className={textEffect4 ? "textChatLanding" : "displayNone"}>Créez vous une vrai base de donnée d'email et de numéro !</h2>
                            </div>
                            <img src={require('./image/data_area.jpg')} alt="espace base de donnée" className="areaImgLanding" />
                        </div>
                    </div>
                    <div className="contentHeadLanding">
                        <img alt="time gain" src={require('./image/time_back.svg')} className="imgHeadLanding" />
                        <div className="windowTextHead">
                            <div className="contentTitleLanding">
                                <h1 className="titleLanding">85% des interactions impliqueront l’usage de chatbots en 2022</h1>
                            </div>
                            <div className="contentTextLanding">
                                <p className="textLanding">Si le chatbot est devenu incontournable ces derniers temps c'est grace à ces nombreux avantages<br />Le premier avantage prouvé est le gains de temps pour vous et vos clients ou futurs client<br />Aujour'hui, un utilisateur internet veut aller au plus vite vers ce qu'il recherche<br />Un chatbot vous aide à les guider lors de leur visite</p>
                            </div>
                        </div>
                    </div>
                    <div className="contentHeadLanding">
                        {window.innerWidth < 1280 &&
                            <img alt="prospect gain" src={require('./image/graphic.svg')} className="imgHeadLanding" />}
                        <div className="windowTextHead">
                            <div className="contentTitleLanding">
                                <h1 className="titleLanding">60% des entreprises ont observés une amélioration de la fidélisation client avec leur chatbot</h1>
                            </div>
                            <div className="contentTextLanding">
                                <p className="textLanding">Attirer de nouveaux client ou répondre aux besoins de ses clients est le but de toute entreprise <br />En créant un liens direct avec eux grace à un chatbot créé par vous et qui vous ressemble apporte un bénéfice consédérable</p>
                            </div>
                        </div>
                        {window.innerWidth > 1280 &&
                            <img alt="prospect gain" src={require('./image/graphic.svg')} className="imgHeadLanding" />}
                    </div>
                    <div className="contentHeadLanding">
                        <img alt="mail" src={require('./image/mail_back.svg')} className="imgHeadLanding" />
                        <div className="windowTextHead">
                            <div className="contentTitleLanding">
                                <h1 className="titleLanding">75% des clients souhaitent avoir une conversation avec un humain pour des demandes plus complexes</h1>
                            </div>
                            <div className="contentTextLanding">
                                <p className="textLanding">C'est pourquoi Sortouch ne s'occupe pas uniquement de la première interraction mais aussi à l'après premier contact.<br />Grace à la boite de réception à votre disposition, ous recevez les prises de contacts directement dans votre boite de réception Sortouch, trié dans les catégories qui correspondent<br />Cela vous aide à créer le second contact humain tout en vous faisant gagner du temps et en protégeant vos emails des spams</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="containerButtonLanding">
                <Link to="/inscription" className="goButtonLanding">Essayer gratuitement</Link>
            </div>
            <Chatbot modelId={1} userId={1} />
        </div>
    )
}

export default Landing