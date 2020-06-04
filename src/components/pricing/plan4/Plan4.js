import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CheckoutForm from './CheckoutForm'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const Plan4 = () => {
    const [active, setActive] = useState(false)
    const [userId, setUserId] = useState()

    const stripePromise = loadStripe("pk_test_8hlgpZTIPsyWpNGcp2OkpybF00iovkpKJO");

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
        } else {
            setUserId(sessionStorage.getItem('userId'))
        }
    }, [])

    return (
        <div className="containerPlan">
            {!active ?
                <div className="contentPlan">
                    <h2 className="titlePlan2">Sur mesure</h2>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">Création de votre chatbot sur mesure</p>
                    </div>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">Annalyse de votre marché et des besoins de vos visiteurs</p>
                    </div>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">Créations de vos différentes catégories de réceptions</p>
                    </div>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">Accompagnement d'utlisation de nos outils</p>
                    </div>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">Intégration du chatbot sur votre site par nos soins</p>
                    </div>
                    {!userId &&
                        <div onClick={() => { setActive(true) }} className="buttonPricing2">
                            Nous contacter
                        </div>}
                </div>
                :

                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            }
        </div>
    );
};

export default Plan4