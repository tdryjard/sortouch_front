import React from 'react'
import './404.scss'

const NotFound = () => {
    return(
        <div className="container404">
            <h1 className="titleNotFound">Page not found</h1>
            <img src={require('./images/not_found.svg')} className="imgNotFound" alt="404 not found" />
        </div>
    )
}

export default NotFound