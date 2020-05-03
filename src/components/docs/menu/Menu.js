import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './Menu.scss'

const Menu = (props) => {
    const [sectionSiteActive, setSectionSiteActive] = useState(true)
    const [sectionChatbotActive, setSectionChatbotActive] = useState(false)
    const [sectionIntegrationActive, setSectionIntegrationActive] = useState(false)

    return(
        <div className="menuDoc">
            <div className="contentNameSectionMenu">
                <p onClick={() => {setSectionSiteActive(!sectionSiteActive)}} className="titleSectionMenu">Documentation site Sortouch</p>
                {!sectionSiteActive ? <img onClick={() => {setSectionSiteActive(true)}} className="imgSectionMenuDoc" src={require('../image/plus.png')}/> :
                <img onClick={() => {setSectionSiteActive(false)}} className="imgSectionMenuDoc" src={require('../image/moins.png')}/>}
            </div>
            <div className={!sectionSiteActive ? "siteMenuDocOff" : "siteMenuDocOn"}>
                <Link to="/editeur-doc" className={props.link === "editor" ? "linkMenuDocOn" : "linkMenuDoc"}>Éditeur</Link>
                <Link to="espace-model-doc" className={props.link === "model" ? "linkMenuDocOn" : "linkMenuDoc"}>Espace model</Link>
                <Link to="espace-message-doc" className={props.link === "message" ? "linkMenuDocOn" : "linkMenuDoc"}>Espace message</Link>
                <Link to="/partager-son-chatbot-doc" className={props.link === "share" ? "linkMenuDocOn" : "linkMenuDoc"}>Partager son chatbot</Link>
            </div>

            <div className="contentNameSectionMenu">
                <p onClick={() => {setSectionChatbotActive(!sectionChatbotActive)}} className="titleSectionMenu">Créer le chatbot parfait</p>
                {!sectionChatbotActive ? <img onClick={() => {setSectionChatbotActive(true)}} className="imgSectionMenuDoc" src={require('../image/plus.png')}/> :
                <img onClick={() => {setSectionChatbotActive(false)}} className="imgSectionMenuDoc" src={require('../image/moins.png')}/>}
            </div>
            <div className={!sectionChatbotActive ? "siteMenuDocOff" : "siteMenuDocOn"}>
                <Link to="bien-cibler-doc" className={props.link === "cible" ? "linkMenuDocOn" : "linkMenuDoc"}>Cibler ses visiteurs</Link>
                <Link to="les-bonne-question-reponse-doc" className={props.link === "question" ? "linkMenuDocOn" : "linkMenuDoc"}>Les bonnes questions-réponse</Link>
                <Link to="trier-efficacement-doc" className={props.link === "sort" ? "linkMenuDocOn" : "linkMenuDoc"}>Trier efficacement</Link>
            </div>

            <div className="contentNameSectionMenu">
                <p onClick={() => {setSectionIntegrationActive(!sectionIntegrationActive)}} className="titleSectionMenu">Intégration sur votre site</p>
                {!sectionIntegrationActive ? <img onClick={() => {setSectionIntegrationActive(true)}} className="imgSectionMenuDoc" src={require('../image/plus.png')}/> :
                <img onClick={() => {setSectionIntegrationActive(false)}} className="imgSectionMenuDoc" src={require('../image/moins.png')}/>}
            </div>
            <div className={!sectionIntegrationActive ? "siteMenuDocOff" : "siteMenuDocOn"}>
                <Link to="/installer-react" className={props.style === "cible" ? "linkMenuDocOn" : "linkMenuDoc"}>ReactJs</Link>
                <Link to="les-bonne-question-doc" className={props.link === "question" ? "linkMenuDocOn" : "linkMenuDoc"}>VueJs</Link>
                <Link to="les bonnes réponses-doc" className={props.link === "response" ? "linkMenuDocOn" : "linkMenuDoc"}>Angular</Link>
                <Link to="trier-efficacement-doc" className={props.link === "sort" ? "linkMenuDocOn" : "linkMenuDoc"}>WordPress</Link>
                <Link to="trier-efficacement-doc" className={props.link === "sort" ? "linkMenuDocOn" : "linkMenuDoc"}>Wix</Link>
            </div>
        </div>
    )
}

export default Menu