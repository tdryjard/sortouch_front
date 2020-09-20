import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import ReactGA from 'react-ga';
import "./App.css";

import Builder from "./components/creating_area/area/Area";
import MessageSpace from "./components/message_space/MessageSpace";
import ModelArea from "./components/models_area/ModelsArea";
import ChatbotArea from './components/chatbot_area/chatbotArea/ChatBotArea'
import Landing from './components/landing/Landing'
import Registration from './components/registration/registration/Registration'
import Connexion from './components/registration/connexion/Connexion'
import DocEditor from './components/docs/docEditor/DocEditor'
import DocShare from './components/docs/docShare/DocShare'
import DocReact from './components/docs/docReact/DocReact'
import DataArea from './components/data_area/DataArea'
import DocWordpress from './components/docs/docWordpress/DocWordpress'
import DocSortouch from './components/docs/docSortouch/DocSortouch'
import Pricing from './components/pricing/Pricing'
import Partner from './components/partner/Partner'
import DocReactPartner from './components/partner/docReact/DocReact'
import DocWordpressPartner from './components/partner/docWordpress/DocWordpress'
import CGV from './components/CGV/CGV'
import DocEditorWeb from './components/docs/docEditorWeb/DocEditorWeb'
import NotFound from './components/404/404'

import Blog from './components/blog/Blog'
import Art1 from './components/blog/art1/Art1'


function App() {
  const [userId, setUserId] = useState(null)
  const [type, setType] = useState()

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      setUserId(localStorage.getItem('userId'))
      setType(localStorage.getItem('type'))
    }
    initializeReactGA()
  }, [])

  function initializeReactGA() {
    ReactGA.initialize('UA-169275626-1');
    ReactGA.pageview('/');
    ReactGA.pageview('/inscription');
    ReactGA.pageview('/connexion');
    ReactGA.pageview('/editeur-doc');
    ReactGA.pageview('/partager-son-chatbot-doc');
    ReactGA.pageview('/installer-react');
    ReactGA.pageview('/installer-wordpress');
    ReactGA.pageview('/utiliser-le-site-sortouch');
    ReactGA.pageview('/tarifs');
    ReactGA.pageview('/models');
    ReactGA.pageview('/mails');
    ReactGA.pageview('/editeur');
    ReactGA.pageview('/base-de-donnee');
    ReactGA.pageview('/models');
    ReactGA.pageview('/models');
  }

  return (
    <Switch>
      {type !== "partner" ?
        !userId ?
          <>
            <Route exact path="/" component={Landing} />
            <Route path="/inscription" component={Registration} />
            <Route path="/connexion" component={Connexion} />
            <Route path="/editeur-doc" component={DocEditor} />
            <Route path="/partager-son-chatbot-doc" component={DocShare} />
            <Route path="/installer-react" component={DocReact} />
            <Route path="/installer-wordpress" component={DocWordpress} />
            <Route path="/utiliser-le-site-sortouch" component={DocSortouch} />
            <Route path="/tarifs" component={Pricing} />
            <Route path="/models" component={ModelArea} />
            <Route path="/mails" component={MessageSpace} />
            <Route path="/editeur-chatbot" component={Builder} />
            <Route path="/base-de-donnee" component={DataArea} />
            <Route path="/conditions-utilisateur" component={CGV} />

            <Route path="/blog" component={Blog} />
            <Route path="/comment-securiser-son-email-professionnel" component={Art1} />
            <Route component={NotFound} />
          </>
          :
          <>
            <Route exact path="/" component={Landing} />
            <Route path="/models" component={ModelArea} />
            <Route path="/base-de-donnee" component={DataArea} />
            <Route path="/mails" component={MessageSpace} />
            <Route path="/chatbot" component={ChatbotArea} />
            <Route path="/editeur-chatbot" component={Builder} />
            <Route path="/editeur-doc" component={DocEditor} />
            <Route path="/partager-son-chatbot-doc" component={DocShare} />
            <Route path="/installer-react" component={DocReact} />
            <Route path="/installer-wordpress" component={DocWordpress} />
            <Route path="/utiliser-le-site-sortouch" component={DocSortouch} />
            <Route path="/tarifs" component={Pricing} />
            <Route path="/conditions-utilisateur" component={CGV} />
            <Route component={NotFound} />

            <Route path="/blog" component={Blog} />
            <Route path="/comment-securiser-son-email-professionnel" component={Art1} />
            <Route component={NotFound} />
          </>
        :
        <>
          <Route exact path="/" component={Partner} />
          <Route path="/installer-react" component={DocReactPartner} />
          <Route path="/installer-wordpress" component={DocWordpressPartner} />
          <Route path="/conditions-utilisateur" component={CGV} />
          <Route path="/editeur-web-doc" component={DocEditorWeb} />
          <Route component={NotFound} />
        </>}
    </Switch>
  );
}

export default App;