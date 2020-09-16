import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CheckoutForm from './CheckoutForm'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './Plan2.scss'

const Plan2 = () => {
    const [active, setActive] = useState(false)
    const [userId, setUserId] = useState()
    const [token, setToken] = useState()
    const [type, setType] = useState()

    const stripePromise = loadStripe("pk_live_u4e03SLJFJMC8k4Bv7g1T3Py00rrpMeJLo");

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
            setToken(localStorage.getItem('token'))
            setType(localStorage.getItem('type'))
        }
    }, [])

    useEffect(() => {
        if (localStorage.getItem('type')) setType(localStorage.getItem('type'))
    }, [])

    return (
        <>
            {!active ?
                <div className="contentPlan">
                    <h2 className="titlePlan2">Standard</h2>
                    <div className="pricePlan">59.00€/mois </div>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">Nombre d'utilisateurs illimité</p>
                    </div>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">1 chatbot</p>
                    </div>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">1000 réceptions de messages par mois</p>
                    </div>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">5 000 stockages de coordonnées</p>
                    </div>
                    {type === "expert" ?
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
        </>
    );
};

export default Plan2