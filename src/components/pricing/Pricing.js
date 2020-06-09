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

  const stripePromise = loadStripe('pk_test_8hlgpZTIPsyWpNGcp2OkpybF00iovkpKJO');

  useEffect(() => {
    if (sessionStorage.getItem('type')) setType(sessionStorage.getItem('type'))
    else if (localStorage.getItem('type')) setType(localStorage.getItem('type'))
  }, [])

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      setUserId(localStorage.getItem('userId'))
      setToken(localStorage.getItem('token'))
    } else {
      setUserId(sessionStorage.getItem('userId'))
      setToken(sessionStorage.getItem('token'))
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
      sessionStorage.setItem('type', '')
      window.location.reload()
    }
  }

  return (
    <div className="containerPricing">
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
              <p className="textOptionPlan">Création de chatbot illimité</p>
            </div>
            <div className="containerOptionPlan">
              <img src={require('./image/valid.png')} alt="valid" className="validImg" />
              <p className="textOptionPlan">Intégration sur votre site</p>
            </div>
            <div className="containerOptionPlan">
              <img src={require('./image/valid.png')} alt="valid" className="validImg" />
              <p className="textOptionPlan">2000 réceptions de prise de contact par mois</p>
            </div>
            <div className="containerOptionPlan">
              <img src={require('./image/valid.png')} alt="valid" className="validImg" />
              <p className="textOptionPlan">5 000 stockages de coordonnées</p>
            </div>
            <div className="containerOptionPlan">
              <img src={require('./image/valid.png')} alt="valid" className="validImg" />
              <p className="textOptionPlan">Assistance technique</p>
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
                  <p className="textOptionPlan">Création de chatbot illimité</p>
                </div>
                <div className="containerOptionPlan">
                  <img src={require('./image/valid.png')} alt="valid" className="validImg" />
                  <p className="textOptionPlan">Intégration sur votre site</p>
                </div>
                <div className="containerOptionPlan">
                  <img src={require('./image/valid.png')} alt="valid" className="validImg" />
                  <p className="textOptionPlan">10 000 réceptions de messages par mois</p>
                </div>
                <div className="containerOptionPlan">
                  <img src={require('./image/valid.png')} alt="valid" className="validImg" />
                  <p className="textOptionPlan">Stockage de coordonnées illimité</p>
                </div>
                <div className="containerOptionPlan">
                  <img src={require('./image/valid.png')} alt="valid" className="validImg" />
                  <p className="textOptionPlan">Assistance technique</p>
                </div>
                <button onClick={() => { setCancel(true) }} className="cancelSub">Résilier</button>
              </div>
            </div>
            :  cancel ?
              <div className="windowPricingBuy">
                <div className="containerPricingBuy">
                  <p className="textCancel">êtes vous sûr de vouloir résilier ?</p>
                  <button onClick={cancelSubscription1} className="cancelSub">Résilier</button>
                  <button onClick={() => { setCancel(false) }} className="cancelSub">Annuler</button>
                </div>
              </div>
              : null}
      <div className="backPricing">
        <img src={require('./image/plan1.svg')} alt="free plan" className="backPricingImg" />
        <img src={require('./image/plan2.svg')} alt="2ème plan" className="backPricingImg" />
        <img src={require('./image/plan3.svg')} alt="3ème plan back" className="backPricingImg" />
      </div>
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