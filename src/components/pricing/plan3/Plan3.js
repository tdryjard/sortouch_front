import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CheckoutForm from './CheckoutForm'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const Plan3 = () => {
    const [active, setActive] = useState(false)
    const [userId, setUserId] = useState()
    const [token, setToken] = useState()
    const [type, setType] = useState()

    const stripePromise = loadStripe("pk_test_AGb35S7bWUgRgRUh3tsxgfrL00MDuBTKPS");

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
            setToken(localStorage.getItem('token'))
            setType(localStorage.getItem('type'))
        } else {
            setUserId(sessionStorage.getItem('userId'))
            setToken(sessionStorage.getItem('token'))
            setType(sessionStorage.getItem('type'))
        }
    }, [])

    useEffect(() => {
        if (sessionStorage.getItem('type')) setType(sessionStorage.getItem('type'))
        else if (localStorage.getItem('type')) setType(localStorage.getItem('type'))
    }, [])

    return (
        <div className="containerPlan">
            {!active ?
                <div className="contentPlan">
                    <h2 className="titlePlan2">Expert</h2>
                    <div className="pricePlan">90€/mois </div>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">Création de chatbot illimité</p>
                    </div>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">Intégration sur votre site</p>
                    </div>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">5 000 réceptions de messages par mois</p>
                    </div>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">Stockage de coordonnées illimité</p>
                    </div>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">Assistance technique</p>
                    </div>
                    {type === "standard" ?
                        <div className="buttonPricing2">
                            <p style={{ fontSize: "18px", margin: "0px", marginTop: "5px" }}>Résiliez l'abonnement en cours pour souscrire</p>
                        </div>
                        : !userId ?
                            <Link to={{ pathname: `/inscription`, query: { pricing: true } }} className="buttonPricing2">
                                Souscrire <p style={{ fontSize: "15px", margin: "0px", marginTop: "5px" }}>Sans engagement</p>
                            </Link>
                            :
                            <div onClick={() => { setActive(true) }} className="buttonPricing2">
                                Souscrire <p style={{ fontSize: "15px", margin: "0px", marginTop: "5px" }}>Sans engagement</p>
                            </div>}
                </div>
                :

                <Elements stripe={stripePromise}>
                    <CheckoutForm userId={userId} token={token} />
                </Elements>
            }
        </div>
    );
};

export default Plan3