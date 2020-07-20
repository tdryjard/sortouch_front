import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'

const ExpireToken = (props) => {
    const [redirect, setRedirect] = useState(false)
    const [active, setActive] = useState(props.active)

    const redirectFunction = () => {
        localStorage.setItem('expireToken', '')
        setTimeout(() => {
            setRedirect(true)
        }, 100)
    }

    const close = () => {
        localStorage.setItem('expireToken', '')
        setTimeout(() => {
            window.location.reload()
        }, 100)
    }

    return (
        <div className={active === true && "windowPopup"}>
            {redirect && <Redirect to="/connexion"/> }
            <div className="backBlur" />
            <div className="containerPopup">
                <img onClick={close} alt="close" src={require('../models_area/image/cross.png')} className="crossPopupPremium" />
                <p className="textPopup">Votre jeton d'accès a expiré, veuillez vous reconnecter</p>
                <button onClick={redirectFunction} className="buttonPopup">Se reconnecter</button>
            </div>
        </div>
    )
}

export default ExpireToken