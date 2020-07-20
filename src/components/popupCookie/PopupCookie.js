import React, { useState } from 'react'
import './PopupCookie.scss'

const PopupCookie = () => {
    const [close, setClose] = useState(false)

    const acceptCookie = () => {
        localStorage.setItem('cookie', 'accept')
        setClose(true)
    }

    return (
        <div className={!close ? "containerCookie" : "containerCookieClose"}>
            {!close &&
                <>
                    <p className="textCookie">En poursuivant votre navigation sur Sortouch.co,
                    vous acceptez l’utilisation de Cookies afin de sauvegarder votre jeton d'accès à votre compte Sortouch et réaliser des statistiques de visites.</p>
                    <button onClick={acceptCookie} className="butonCookie">Accepter</button>
                </>}
        </div>
    )
}

export default PopupCookie