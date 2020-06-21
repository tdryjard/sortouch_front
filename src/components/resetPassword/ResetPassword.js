import React, { useState, useEffect } from 'react'
import url from '../../api/url'
import { Redirect, Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import emailjs from 'emailjs-com';
import './ResetPassword.scss'

const ResetPassword = (props) => {
    const [email, setEmail] = useState()
    const [alert, setAlert] = useState()
    const [keyEnter, setKeyEnter] = useState()
    const [firstPassword, setFirstPassword] = useState()
    const [secondPassword, setSecondPassWord] = useState()
    const [keyValid, setKeyValid] = useState(false)
    const [userId, setUserId] = useState()
    const [resetBool, setResetBool] = useState(false)
    const [success, setSuccess] = useState('')

    const { reset, key, password, handleSubmit } = useForm()

    const getMail = (e) => {
        setEmail(e.target.value)
    }

    const getKey = (e) => {
        setKeyEnter(e.target.value)
    }

    const getFirstPassword = (e) => {
        setFirstPassword(e.target.value)
    }

    const getSecondPassword = (e) => {
        setSecondPassWord(e.target.value)
    }

    function generatePassword() {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    const sendReset = async () => {
        setResetBool(true)
        if (email && resetBool === false) {
            const resFind = await fetch(`${url}/user/findByEmail/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Acces-Control-Allow-Origin': { origin },
                    'authorization': "validy24816"
                }
            })
            const resJson = await resFind.json()
            let key = generatePassword()
            let template_params = {
                "email": email,
                "code_reset": key
            }
            if (await resFind.status === 200) {
                const resUpdateUser = await fetch(`${url}/user/update/${resJson[0].id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        key_reset: key
                    })
                })
                if (await resUpdateUser) {
                    setSuccess(`Un code de changement de mot de passe vous a été envoyé par mail...`)
                    setUserId(resJson[0].id)
                    var service_id = "gmail";
                    var template_id = "template_2CQJnjHV";
                    let user_id = "user_kUvESFOVPIi5MU8xeMfTb"
                    emailjs.send(service_id, template_id, template_params, user_id);
                    setTimeout(() => {
                        setSuccess('')
                        document.getElementsByClassName('inputLog')[0].value = ''
                    }, 4000)
                }
            }
            else{
                errorFunction()
            }
        }
    }

    const compareKey = async () => {
        if (userId) {
            const response = await fetch(`${url}/user/compareKeyReset`, {
                method: 'POST',
                body: JSON.stringify({
                    key_reset: keyEnter,
                    userId: userId
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {

                setSuccess(`Bon code de changement, veuillez entrer votre nouveau mot de passe...`)
                setTimeout(() => {
                    setSuccess('')
                    setKeyValid(true)
                    document.getElementsByClassName('inputLog')[0].value = ''
                }, 4000)
            } else {
                setAlert("Mauvais code de changement")
                setTimeout(() => {
                    setAlert('')
                }, 3000);
            }

        }
    }

    const changePassword = async () => {
        if (firstPassword !== secondPassword) {
            setAlert("Les deux mots de passe de sont pas identiques")
            setTimeout(() => {
                setAlert('')
            }, 3000);
        }
        else if (firstPassword.split('').length < 8 || firstPassword.split('').length > 25) {
            setAlert("Le mot de passe doit contenir entre 8 et 25 caractères")
            setTimeout(() => {
                setAlert('')
            }, 3000);
        }
        else {
            const resUpdateUser = await fetch(`${url}/user/changeLog/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'validy24816'
                },
                body: JSON.stringify({
                    password: firstPassword,
                    key_reset: null
                })
            })
            if (resUpdateUser) {
                setSuccess(`Votre mot de passe vient d'être mis à jour`)
                setTimeout(() => {
                    setSuccess('')
                    window.location.reload()
                }, 4000)
            }
        }
    }

    const errorFunction = () => {
        setAlert('Aucun compte lié à cette email')
        setTimeout(() => {
            setAlert('')
        }, 4000)
    }


    return (
        <div className="contentRegister">
            <title>Sortouch : mot de passe oublié</title>
            <meta name="description" content="Changez votre mot de passe Sortouch" />
            <h1 className="titleRegister">Mot de passe oublié</h1>
            {alert &&
                <div className="contentAlert">
                    <p className="textAlert">{alert}</p>
                </div>}
            {success && <p className="messageReset">{success}</p>}

            {!keyValid && !resetBool ?
                <form onSubmit={handleSubmit(sendReset)} className="subForm">
                    <input ref={reset} onChange={getMail} className="inputLog" placeholder="Entrez l'email de votre compte" />
                    <button className="validLog" onClick={sendReset}>Envoyer</button>
                </form>
                : resetBool && !keyValid ?
                    < form onSubmit={handleSubmit(compareKey)} className="subForm">
                        <input ref={key} onChange={getKey} className="inputLog" placeholder="Code de changement" />
                        <button style={{ height: "90px" }} className="validLog" onClick={compareKey}>Changer son mot de passe</button>
                    </form>
                    : keyValid &&
                    <form onSubmit={handleSubmit(changePassword)} className="subForm">
                        <input type="password" ref={password} onChange={getFirstPassword} className="inputLog" placeholder="Nouveau mot de passe" />
                        <input type="password" ref={password} onChange={getSecondPassword} className="inputLog" placeholder="Répéter mot de passe" />
                        <button className="validLog" onClick={changePassword}>Valider</button>
                    </form>}
        </div >
    )
}

export default ResetPassword