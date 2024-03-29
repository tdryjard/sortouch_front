import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import Navbar from '../navbar/Navbar'
import MenuBurger from '../menuBurger/MenuBurger'
import Plan from './plan/Plan'
import Plan2 from './plan2/Plan2'
import Plan3 from './plan3/Plan3'
import Plan4 from './plan4/Plan4'
import url from '../../api/url'
import './Pricing.scss'

const Pricing = () => {
  const [type, setType] = useState()
  const [userId, setUserId] = useState()
  const [token, setToken] = useState()
  const [cancel, setCancel] = useState(false)

  const stripePromise = loadStripe('pk_live_u4e03SLJFJMC8k4Bv7g1T3Py00rrpMeJLo');

  useEffect(() => {
    if (localStorage.getItem('type')) setType(localStorage.getItem('type'))
  }, [])

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      setUserId(localStorage.getItem('userId'))
      setToken(localStorage.getItem('token'))
    }
  }, [])

  const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#c4f0ff',
        color: '#fff',
        fontWeight: 500,
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': { color: '#fce883' },
        '::placeholder': { color: '#87bbfd' },
      },
      invalid: {
        iconColor: '#ffc7ee',
        color: '#ffc7ee',
      },
    },
  };

  async function cancelSubscription1() {
    const resSubId = await fetch(`${url}/user/find/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Acces-Control-Allow-Origin': { origin },
        'authorization': token
      }
    })
    const subId = await resSubId.json()
    const resCancel = await fetch(`${url}/cancel-subscription`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscriptionId: subId[0].custom,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(cancelSubscriptionResponse => {
        // Display to the user that the subscription has been cancelled.
      });
    const res = await fetch(`${url}/user/update/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
      body: JSON.stringify({
        type: 'free',
        custom: null
      })
    })

    if (res) {
      localStorage.setItem('type', '')
      window.location.reload()
    }
  }

  return (
    <div className="containerPricing">
      <title>Sortouch : tarifs</title>
      <meta name="description" content="Retrouvez les différentes formules et tarifs pour créer votre chatbot simplement avec Sortouch. Essayer gratuitement sans limite de temps !" />
      {window.innerWidth > 1280 ?
        <Navbar type={"tarifs"} />
        :
        <MenuBurger type={"models"} />}
      {type === "standard" && !cancel ?
        <div className="windowPricingBuy">
          <div className="containerPricingBuy">
            <h2 className="titlePlan2">Standard</h2>
            <div className="pricePlan">Abonné</div>
            <div className="containerOptionPlan">
              <img src={require('./image/valid.png')} alt="valid" className="validImg" />
              <p className="textOptionPlan">Nombre d'utilisateurs illimité</p>
            </div>
            <div className="containerOptionPlan">
              <img src={require('./image/valid.png')} alt="valid" className="validImg" />
              <p className="textOptionPlan">1 chatbot</p>
            </div>
            <div className="containerOptionPlan">
              <img src={require('./image/valid.png')} alt="valid" className="validImg" />
              <p className="textOptionPlan">1000 réceptions de messages par mois</p>
            </div>
            <div className="containerOptionPlan">
              <img src={require('./image/valid.png')} alt="valid" className="validImg" />
              <p className="textOptionPlan">5 000 stockages de coordonnées</p>
            </div>
            <button onClick={() => { setCancel(true) }} className="cancelSub">Résilier</button>
          </div>
        </div>
        : type === "expert" && !cancel ?

          <div className="windowPricingBuy">
            <div className="containerPricingBuy">
              <h2 className="titlePlan2">Expert</h2>
              <div className="pricePlan">Abonné</div>
              <div className="containerOptionPlan">
                <img src={require('./image/valid.png')} alt="valid" className="validImg" />
                <p className="textOptionPlan">Nombre d'utilisateurs illimité</p>
              </div>
              <div className="containerOptionPlan">
                <img src={require('./image/valid.png')} alt="valid" className="validImg" />
                <p className="textOptionPlan">3 chatbots</p>
              </div>
              <div className="containerOptionPlan">
                <img src={require('./image/valid.png')} alt="valid" className="validImg" />
                <p className="textOptionPlan">3 000 réceptions de messages par mois</p>
              </div>
              <div className="containerOptionPlan">
                <img src={require('./image/valid.png')} alt="valid" className="validImg" />
                <p className="textOptionPlan">10 000 stockages de coordonnées</p>
              </div>
              <button onClick={() => { setCancel(true) }} className="cancelSub">Résilier</button>
            </div>
          </div>
          : cancel ?
            <div className="windowPricingBuy">
              <div className="containerPricingBuy">
                <p className="textCancel">êtes vous sûr de vouloir résilier ?</p>
                <button onClick={cancelSubscription1} className="cancelSub">Résilier</button>
                <button onClick={() => { setCancel(false) }} className="cancelSub">Annuler</button>
              </div>
            </div>
            : null}
      <Plan />
      {!(type === "standard") &&
        <Elements stripe={stripePromise}>
          <Plan2 options={CARD_OPTIONS} />
        </Elements>}
      {!(type === "expert") &&
        <Elements stripe={stripePromise}>
          <Plan3 options={CARD_OPTIONS} />
        </Elements>}
      <Elements stripe={stripePromise}>
        <Plan4 options={CARD_OPTIONS} />
      </Elements>
    </div>
  )
}

export default Pricing