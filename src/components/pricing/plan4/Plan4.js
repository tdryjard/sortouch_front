import React, { useState, useEffect } from 'react'
import url from '../../../api/url'

const Plan4 = () => {
    const [active, setActive] = useState(false)
    const [mail, setMail] = useState('')
    const [society, setSociety] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [send, setSend] = useState(false)

    function getCurrentDate(separator) {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
    }

    const postContact = async () => {
        let date = getCurrentDate(' ')
        const dateChar = date.toString()
        if (!validateEmail(mail)) {
            alert('email non valide')
        } else if (!validatePhone(phone)) {
            alert('numéro de téléphone non valide')
        } else {
            const result = await fetch(`${url}/mail/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Acces-Control-Allow-Origin': { origin }
                },
                body: JSON.stringify({
                    phone: phone,
                    email: mail,
                    message: `société ${society} pour formule sur mesure : ${message}`,
                    category_id: 101,
                    model_id: 11,
                    user_id: 21,
                    view: 0,
                    date: dateChar
                })
            });
            setSend(true)
        }
    }

    function validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const validatePhone = (phone) => {
        let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        return re.test(phone)
    }

    useEffect(() => {
        setTimeout(() => {
            setError('')
        }, 6000)
    }, [error])


    const getMail = (e) => {
        setMail(e.target.value)
    }

    const getSociety = (e) => {
        setSociety(e.target.value)
    }

    const getPhone = (e) => {
        setPhone(e.target.value)
    }

    const getMessage = (e) => {
        setMessage(e.target.value)
    }

    return (
        <div className="containerPlan">
            {!active ?
                <div className="contentPlan">
                    <h2 className="titlePlan2">Sur mesure</h2>
                    <div className="containerOptionPlan4">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">Création de votre chatbot sur mesure</p>
                    </div>
                    <div className="containerOptionPlan4">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">Annalyse de votre marché et des besoins de vos visiteurs</p>
                    </div>
                    <div className="containerOptionPlan4">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">Accompagnement d'utlisation de nos outils</p>
                    </div>
                    <div className="containerOptionPlan4">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">Intégration du chatbot sur votre site par nos soins</p>
                    </div>
                    <div className="containerOptionPlan4">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">Abonnement adapté à vos besoins</p>
                    </div>
                    <div onClick={() => { setActive(true) }} className="buttonPricing2">
                        Nous contacter
                    </div>
                </div>
                : active && send ?
                <div style={{justifyContent: "flex-start"}} className="contentPlanStripe" >
                        <p className="textEndContact">Merci de nous avoir contacté<br/>Nous reviendrons vers vous très rapidement</p>
                </div>
                :
                <div style={{justifyContent: "flex-start"}} className="contentPlanStripe" >
                    {error && <p>{error}</p>}
                    <input className="inputPricing" onChange={getMail} placeholder="Votre email" />
                    <input className="inputPricing" onChange={getSociety} placeholder="Nom de votre société" />
                    <input className="inputPricing" onChange={getPhone} placeholder="Numéro de téléphone" />
                    <textarea className="inputPricingMessage" onChange={getMessage} placeholder="Message" />
                    <button onClick={postContact} type="submit" className="buttonBuyPricing"><p className="titleBuy">Envoyer </p></button>
                </div>
            }
        </div>
    );
};

export default Plan4