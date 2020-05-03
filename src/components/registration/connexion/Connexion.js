import React, {useState} from 'react'
import url from '../../../api/url'
import {Redirect} from 'react-router-dom'
import './Connexion.scss'

const Connexion = () => {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')
    const [valid, setValid] = useState(false)
    const [redirect, setRedirect] = useState(false)


    const validSub = async () => {
            // Envoi de la requête
            const response = await fetch(`${url}/user/connect`, {
              method: 'POST',
              body: JSON.stringify({
                  email: mail,
                  password: password
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
            // Récupération du status de la requête
            const result = await response.json();
            console.log(result)

            if(result.status === 200){
                if(valid === true){
                    localStorage.setItem("userId", result.data.id)
                    localStorage.setItem('token', result.token)
                    setRedirect(true)
                    setTimeout(() => {
                        document.location.reload()
                    }, 100)
                } else if(valid === false){
                    sessionStorage.setItem("userId", result.data.id)
                    sessionStorage.setItem('token', result.token)
                    setRedirect(true)
                }
            } else{
                setAlert("email ou mot de passe incorrect")
                setTimeout(() => {
                    setAlert('')
                }, 2000);
            }
}


    const takeMail = (e) => {
        setMail(e.target.value)
    }

    const takePassword = (e) => {
        setPassword(e.target.value)
    }
    

    return(
        <div className="containerRegistration">
            {redirect === true && <Redirect to="/models"/>}
            <h4 className="titleRegister">Connexion</h4>
            {alert &&
            <div className="contentAlert">
                <p className="textAlert">{alert}</p>
            </div>}
            <form className="subForm" onSubmit={validSub}>
                <input onChange={takeMail} className={alert === "veuillez entrer une email correct" ? "inputLogError" : "inputLog"} placeholder="email"/>
                <input type="password" onChange={takePassword} className={alert === "veuillez entrer une email correct" || alert === "" ? "inputLog" : "inputLogError"}  placeholder="mot de passe"/>
            </form>
            <div className="containerStayConnect">
                <div className="checkBox" onClick={() => {setValid(!valid)}}>
                    {valid === true &&
                    <img className="cochCheck" src={require("../image/valid.png")} alt="valid icon"/>}
                </div>
                <p className="textStayConnect">rester connecter</p>
            </div>
            <button onClick={validSub} className="validLog">Continuer</button>
        </div>
    )
}

export default Connexion