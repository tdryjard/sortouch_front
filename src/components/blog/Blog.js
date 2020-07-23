import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import MenuBurger from '../menuBurger/MenuBurger'
import Footer from '../footer/Footer'
import './blog.scss'

const Blog = () => {
    return (
        <div className="containerBlog">
            {window.innerWidth > 1280 ?
                <Navbar type={"blog"} />
                :
                <MenuBurger type={"blog"} />}
            <div className="contentBlog">
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