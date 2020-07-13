import React, { useEffect, useState } from 'react'
import url from '../../../api/url'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutForm = (props) => {

    const [token, setToken] = useState()
    const [mail, setMail] = useState('')
    const [society, setSociety] = useState('')
    const [error, setError] = useState('')
    const [userId, setUserId] = useState()
    const [load, setLoad] = useState(false)

    const elements = useElements();
    const stripeFunction = useStripe();

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setToken(localStorage.getItem('token'))
            setUserId(localStorage.getItem('userId'))
        } else {
            setToken(sessionStorage.getItem('token'))
            setUserId(sessionStorage.getItem('userId'))
        }
    }, [])

    const CARD_OPTIONS = {
        iconStyle: 'solid',
        style: {
            base: {
                iconColor: '#ffffff',
                color: '#ffffff',
                fontWeight: 600,
                fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                fontSize: '16px',
                fontSmoothing: 'antialiased',
                ':-webkit-autofill': { color: '#ffffff' },
                '::placeholder': { color: '#ffffff' },
            },
            invalid: {
                iconColor: '#ffc7ee',
                color: '#ffc7ee',
            },
        },
    };

    function validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


    const subscription = async (event) => {
        if (!validateEmail(mail)) setError('Veuillez entrer une email correct')
        else if (!society) setError(`Veuillez entrer votre nom ou nom d'entreprise`)
        else {
            setLoad(true)
            fetch(`${url}/create-customer`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: mail,
                    name: society
                })
            })
                .then(response => {
                    if (!response) setError('Problème avec le paiement, veuillez réessayer ou nous contacter si le problème persiste')
                    else return response.json();
                })
                .then(result => {
                    // result.customer.id is used to map back to the customer object
                    // result.setupIntent.client_secret is used to create the payment method
                    if (result) createPaymentMethod(elements.getElement(CardElement), result.customer.id, 'price_1GwZJxKleZ50Ivn6n5S03e4U')
                });
        }

    }

    function createPaymentMethod(cardElement, customerId, priceId) {
        return stripeFunction
            .createPaymentMethod({
                type: 'card',
                card: cardElement,
            })
            .then((result) => {
                if (result.error) {
                    setError('Problème avec le paiement, veuillez réessayer ou nous contacter si le problème persiste')
                } else {
                    createSubscription({
                        customerId: customerId,
                        paymentMethodId: result.paymentMethod.id,
                        priceId: priceId,
                    });
                }
            });
    }

    async function createSubscription({ customerId, paymentMethodId, priceId }) {
        const resSub = await fetch(`${url}/create-subscription`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                customerId: customerId,
                paymentMethodId: paymentMethodId,
                priceId: priceId,
            }),
        })
            .then((response) => {
                return response.json();
            })
            // If the card is declined, display an error to the user.
            .then(async (result) => {
                if (result.error) {
                    // The card had an error when trying to attach it to a customer.
                    setError('Problème avec le paiement, veuillez réessayer ou nous contacter si le problème persiste')
                    throw result;
                }
                const up = await fetch(`${url}/user/update/${props.userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Acces-Control-Allow-Origin': { origin },
                        'authorization': props.token
                    },
                    body: JSON.stringify({
                        type: "standard",
                        custom: result.id
                    })
                })
                if (up) {
                    sessionStorage.setItem('type', 'standard')
                    window.location.reload()
                }
            })
            // Normalize the result to contain the object returned by Stripe.
            // Add the addional details we need.
            .then((result) => {
                return {
                    paymentMethodId: paymentMethodId,
                    priceId: priceId,
                    subscription: result,
                };
            })
            // Some payment methods require a customer to be on session
            // to complete the payment process. Check the status of the
            // payment intent to handle these actions.
            .then()
            // If attaching this card to a Customer object succeeds,
            // but attempts to charge the customer fail, you
            // get a requires_payment_method error.
            .then((result) => {

            })
            // No more actions required. Provision your service for the user.
            .then()
            .catch((error) => {
                // An error has happened. Display the failure to the user here.
                // We utilize the HTML element we created.
            })
    }

    useEffect(() => {
        setTimeout(() => {
            setError('')
            setLoad(false)
        }, 7000)
    }, [error])


    const getMail = (e) => {
        setMail(e.target.value)
    }

    const getSociety = (e) => {
        setSociety(e.target.value)
    }


    return (
        <div className="contentPlanStripe" >
            {error && <p className="errorPay">{error}</p>}
            {!load ?
                <>
                    <input className="inputPricing" onChange={getMail} placeholder="Votre email" />
                    <input className="inputPricing" onChange={getSociety} placeholder="Nom de votre société" />
                </>
                : <img style={{ width: "50%" }} src={require('../image/load.gif')} />}

            <div className="inputPricingCard">
                <CardElement options={CARD_OPTIONS} />
            </div>
            <button onClick={subscription} type="submit" className="buttonBuyPricing"><p className="titleBuy">Acheter 59.00€/mois </p> <p className="noEngagement">sans engagement</p> </button>
        </div>
    )
}

export default CheckoutForm