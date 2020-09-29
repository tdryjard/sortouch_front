import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import MenuBurger from '../menuBurger/MenuBurger'
import Footer from '../footer/Footer'
import './blog.scss'

const Blog = () => {
    return (
        <div className="containerBlog">
            <title>Sortouch: blog</title>
            <meta name="title" property="title" content="Tout connaitre sur les chatbots" />
            <meta name="description" content="Découvrir tout ce qu'il y a à savoir sur les chatbot. Comment créer un chatbot, à quoi sert un chatbot, le futur des chatbots et l'utilisation de plugin sur Wordpress" />
            {window.innerWidth > 1280 ?
                <Navbar type={"blog"} />
                :
                <MenuBurger type={"blog"} />}
            <div className="contentBlog">
                <Link to="/creer-chatbot-parfait" className="containerLinkArt">
                    <img className="imgPreArt" src={require('./art3/images/first_cover.png')} alt="chatbot parfait" />
                    <div className="containerTitlePreArt">
                        <h2 className="titlePreArt">Créer le chatbot parfait en 5 étapes</h2>
                    </div>
                </Link>
                <Link to="/chatbot-explication-simple" className="containerLinkArt">
                    <img className="imgPreArt" src={require('./art2/images/chatbot_illustration.png')} alt="illustration chatbot" />
                    <div className="containerTitlePreArt">
                        <h2 className="titlePreArt">Comprendre rapidement ce qu’est un chatbot et à quoi ça sert</h2>
                    </div>
                </Link>
                <Link to="/comment-securiser-son-email-professionnel" className="containerLinkArt">
                    <img className="imgPreArt" src={require('./art1/image/first_cover.png')} alt="sécurisation d'email" />
                    <div className="containerTitlePreArt">
                        <h2 className="titlePreArt">Comment sécuriser son email professionnel</h2>
                    </div>
                </Link>
            </div>
            <Footer/>
        </div>
    )
}

export default Blog