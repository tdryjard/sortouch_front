import React, {useState} from 'react'
import url from '../../../api/url'
import { Redirect } from 'react-router-dom'
import './Registration.scss'

const Registration = () => {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVerif, setPasswordVerif] = useState('')
    const [alert, setAlert] = useState('')
    const [redirect, setRedirect] = useState(false)


    const validSub = async () => {
        if(password !== passwordVerif) setAlert('mot de passe différents')
        else{
        const response = await fetch(`${url}/user/create`, {
            method: 'POST',
            headers: {
              'Content-Type' :'application/json',
              'Acces-Control-Allow-Origin' : {origin}
            },
            body: JSON.stringify({
                email: mail,
                password: password,
                type: 'free'
            })
          });
        const data = await response.json();
        console.log()
        if(data.data){
            setRedirect(true)
        } else {
            if(data.inputs && data.inputs[0] === "email"){
                setAlert("veuillez entrer une email correct")
                console.log('dalu')
            } else if(data.inputs && data.inputs[0] === "password"){
                setAlert("veuillez entrer un mot de passe entre 8 et 25 caractères svp")
        }
        }
        console.log(data)}
        setTimeout(() => {
            setAlert('')
        }, 3000)
    }

    const takeMail = (e) => {
        setMail(e.target.value)
    }

    const takePassword = (e) => {
        setPassword(e.target.value)
    }

    const takePasswordVerif = (e) => {
        setPasswordVerif(e.target.value)
    }
    

    return(
        <div className="containerRegistration">
            {redirect && <Redirect to='connexion'/>}
            <h4 className="titleRegister">Inscription</h4>
            {alert &&
            <div className="contentAlert">
                <p className="textAlert">{alert}</p>
            </div>}
            <form className="signForm" onSubmit={validSub}>
                <input onChange={takeMail} className={alert === "veuillez entrer une email correct" ? "inputLogError" : "inputLog"} placeholder="email"/>
                <input type="password" onChange={takePassword} className={alert === "veuillez entrer une email correct" || alert === "" ? "inputLog" : "inputLogError"}  placeholder="mot de passe"/>
                <input type="password" onChange={takePasswordVerif} className={alert === "veuillez entrer une email correct" || alert === "" ? "inputLog" : "inputLogError"} placeholder="répéter mot de passe"/>
            </form>
            <button onClick={validSub} className="validLog">Continuer</button>
        </div>
    )
}

export default Registration