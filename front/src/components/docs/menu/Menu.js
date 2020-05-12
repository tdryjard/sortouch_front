import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './Menu.scss'

const Menu = (props) => {
    const [sectionSiteActive, setSectionSiteActive] = useState(true)
    const [sectionChatbotActive, setSectionChatbotActive] = useState(false)
    const [sectionIntegrationActive, setSectionIntegrationActive] = useState(false)

    return(
        <div className="menuDoc">
                <Link to="/editeur-doc" className={props.link === "editor" ? "linkMenuDocOn" : "linkMenuDoc"}>Éditeur Sortouch</Link>
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
                <Link to="trier-efficacement-doc" className={props.link === "sort" ? "linkMenuDocOn" : "linkMenuDoc"}>WordPress</Link>
            </div>
        </div>
    )
}

export default Menu