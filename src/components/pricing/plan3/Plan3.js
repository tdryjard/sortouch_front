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
                    <h2 className="titlePlan2">Expert</h2>
                    <div className="pricePlan">89.00€/mois </div>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">Nombre d'utilisateurs illimité</p>
                    </div>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">3 chatbots</p>
                    </div>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">3 000 réceptions de messages par mois</p>
                    </div>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">10 000 stockages de coordonnées</p>
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
        </>
    );
};

export default Plan3