import React, { useState, useEffect } from 'react'
import url from '../../../api/url'
import { Redirect, Link } from 'react-router-dom'
import Navbar from '../../navbar/Navbar'
import MenuBurger from '../../menuBurger/MenuBurger'
import { useForm } from "react-hook-form";
import ResetPassword from '../../resetPassword/ResetPassword'
import './Connexion.scss'

const Connexion = (props) => {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')
    const [valid, setValid] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [changeLog, setChangeLog] = useState(false)
    const [token, setToken] = useState()
    const [userId, setUserId] = useState()
    const [type, setType] = useState()
    const [partnerId, setPartnerId] = useState()
    const [clientName, setClientName] = useState()
    const [secondPassword, setSecondPassword] = useState()
    const [resetPassword, setResetPassword] = useState(false)

    const { connexion, handleSubmit } = useForm()

    const validSub = async () => {
        // Envoi de la requête
        try {
            const response = await fetch(`${url}/user/connect`, {
                method: 'POST',
                body: JSON.stringify({
                    email: mail,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const result = await response.json();

            if (result.status === 200) {
                if (valid === true && !(result.data.mdp_generate || result.data.email_generate)) {
                    localStorage.setItem("userId", result.data.id)
                    localStorage.setItem("type", result.data.type)
                    localStorage.setItem('token', result.token)
                    setRedirect(true)
                } else if (valid === false && !(result.data.mdp_generate || result.data.email_generate)) {
                    sessionStorage.setItem("userId", result.data.id)
                    sessionStorage.setItem("type", result.data.type)
                    sessionStorage.setItem('token', result.token)
                    setRedirect(true)
                }
                if (result.data.mdp_generate || result.data.email_generate) {
                    setToken(result.token)
                    setUserId(result.data.id)
                    setType(result.data.type)
                    setPartnerId(result.data.partner_id)
                    setClientName(result.data.name_client)
                    setChangeLog(true)
                }
            } else {
                setAlert("email ou mot de passe incorrect")
                setTimeout(() => {
                    setAlert('')
                }, 2000);
            }
        } catch{
            setAlert("email ou mot de passe incorrect")
            setTimeout(() => {
                setAlert('')
            }, 2000);
        }
    }

    const validChangeLog = async () => {
        if(password !== secondPassword){
            setAlert("Les deux mots de passe de sont pas identiques")
                setTimeout(() => {
                    setAlert('')
                }, 3000);
        }
        else{
            try {
                const resUpdateUser = await fetch(`${url}/user/changeLog/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'validy24816'
                    },
                    body: JSON.stringify({
                        password: password,
                        email: mail,
                        mdp_generate: null,
                        email_generate: null
                    })
                })
                const res = await resUpdateUser.json()
                if (res.alert.type === "success") {
                    sessionStorage.setItem("userId", userId)
                    sessionStorage.setItem("type", type)
                    sessionStorage.setItem('token', token)
                    setRedirect(true)
                } else {
                    setAlert("email ou mot de passe incorrect")
                    setTimeout(() => {
                        setAlert('')
                    }, 2000);
                }
            } catch{
                setAlert("email ou mot de passe incorrect")
                setTimeout(() => {
                    setAlert('')
                }, 2000);
            }
        }
    }

    useEffect(() => {

    }, [changeLog, userId, token])


    const takeMail = (e) => {
        setMail(e.target.value)
    }

    const takePassword = (e) => {
        setPassword(e.target.value)
    }

    const getSecondPassword = (e) => {
        setSecondPassword(e.target.value)
    }


    return (
        <div className="containerRegistration">
        <title>Sortouch : connexion</title>
            <meta name="description" content="Connectez vous à votre compte Sortouch pour éditer votre chatbot et retrouver vos prises de contact" />
            {window.innerWidth > 1280 ?
                <Navbar type={"models"} />
                :
                <MenuBurger type={"models"} />}
            {props.location.query && props.location.query.pricing && redirect ?
                <Redirect to="/tarifs" />
                : redirect &&
                <Redirect to="/models" />}
            {!changeLog && !resetPassword &&
                <div className="contentRegister">
                    <h4 className="titleRegister">Connexion</h4>
                    {alert &&
                        <div className="contentAlert">
                            <p className="textAlert">{alert}</p>
                        </div>}
                    <form onSubmit={handleSubmit(validSub)} className="subForm">
                        <input ref={connexion} onChange={takeMail} className={alert === "veuillez entrer une email correct" ? "inputLogError" : "inputLog"} placeholder="email" />
                        <input ref={connexion} type="password" onChange={takePassword} className={alert === "veuillez entrer une email correct" || alert === "" ? "inputLog" : "inputLogError"} placeholder="mot de passe" />
                        <p onClick={() => {setResetPassword(true)}} className="linkResetPassword">mot de passe oublié ?</p>
                        <div className="containerStayConnect">
                            <div className="checkBox" onClick={() => { setValid(!valid) }}>
                                {valid === true &&
                                    <img className="cochCheck" src={require("../image/valid.png")} alt="valid icon" />}
                            </div>
                            <p className="textStayConnect">rester connecter</p>
                        </div>
                        <button type="submit" className="validLog">Connexion</button>
                    </form>
                    <Link to={{ pathname: `/inscription`, query: { pricing: true } }} className="linkRegistration">S'inscrire</Link>
                </div>}
            {changeLog &&
                <div style={{justifyContent: "flex-start"}} className="contentRegister">
                    <h4 className="titleChangeLog">Activer votre compte avec de nouveaux identifiants</h4>
                    {alert &&
                        <div className="contentAlert">
                            <p className="textAlert">{alert}</p>
                        </div>}
                    <form onSubmit={handleSubmit(validChangeLog)} className="subForm">
                        <input ref={connexion} onChange={takeMail} className={alert === "veuillez entrer une email correct" ? "inputLogError" : "inputLog"} placeholder="email" />
                        <input ref={connexion} type="password" onChange={takePassword} className={alert === "veuillez entrer une email correct" || alert === "" ? "inputLog" : "inputLogError"} placeholder="mot de passe" />
                        <input ref={connexion} type="password" onChange={getSecondPassword} className={alert === "veuillez entrer une email correct" || alert === "" ? "inputLog" : "inputLogError"} placeholder="répéter mot de passe" />
                        <button type="submit" className="validChangeLog">Changer ses identifiants</button>
                    </form>
                </div>}
            {resetPassword && <ResetPassword/> }
        </div>
    )
}

export default Connexion