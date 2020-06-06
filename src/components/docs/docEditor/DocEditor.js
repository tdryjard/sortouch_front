import React from 'react'
import Menu from '../menu/Menu'
import MenuBurger from '../burgerMenu/BurgerMenu'
import Navbar from '../../navbar/Navbar'
import './DocEditor.scss'

const DocEditor = () => {
    return(
        <div className="containerDoc">
            {window.innerWidth > 1280 && <Navbar type={"doc"}/>}
            {window.innerWidth > 1280 && <Menu link="editor"/>}
            {window.innerWidth < 1280 && <MenuBurger link="editor"/>}
            <div className="contentDoc">
                <h1 className="titleDoc">Apprenez facilement à utiliser notre éditeur de chatbot</h1>
                <div className="containerSectionDoc">
                    <img src={require('../../landing/image/editor.gif')} alt="editeur video" className="editorMovieDoc"/>
                </div>
                <div className="containerSectionDoc">
                    <h4 className="titleContainerSectionDoc">Selectionner une réponse</h4>
                    <div className="contentSectionDoc">
                        <p className="textContainerSectionColumnDoc">Afin de pouvoir ajouter de nouvelles interactions, il faut lier celle ci à une réponse.<br/>Cliquez donc simplement sur la réponse avec laquelle vous souhaitez lier les prochaines interctions </p>
                        <img className="imgSelectResponse" src={require('./image/select_response.png')} alt="selectionner une réponse"/>
                    </div>
                </div>
                <div className="containerSectionDoc">
                    <h4 className="titleContainerSectionDoc">Ajouter une interraction</h4>
                    <div className="contentSectionDocColumn">
                        <p className="textContainerSectionColumnDoc">Un chatbot se constitue en plusieurs interactions, afin d'ajouter une interaction dans l'éditeur il faut simplement appuyer sur le bouton d'ajout du type d'interaction désiré</p>
                        <img className="imgAddContainerDoc" src={require('./image/add_container.png')} alt="category cartes éditeur"/>
                    </div>
                </div>
                <div className="containerSectionDoc">
                    <h4 className="titleContainerSectionDoc">Ajouter une question, réponse ou catégorie de réceptions</h4>
                    <div className="contentSectionDocColumn">
                        <p className="textContainerSectionColumnDoc">Appuyez simplement sur le bouton "+" écrivez simplement votre question, réponse ou la catégorie dans laquelle vous souhaitez recevoir la prise de contact liée à la réponse précédente.<br/>Pui appuyez sur ajouter</p>
                        <img style={{borderRadius: "50px"}} src={require('./image/button_add.png')} alt="Ajouter une question"/>
                        <img className="imgAddContainerDoc" src={require('./image/textarea.png')} alt="textarea"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DocEditor