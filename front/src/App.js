import React, {useEffect, useState} from "react";
import { Switch, Route } from "react-router-dom";
import Builder from "./components/creating_area/area/Area";
import MessageSpace from "./components/message_space/MessageSpace";
import "./App.css";
import ModelArea from "./components/models_area/ModelsArea";
import ChatbotArea from './components/chatbot_area/chatbotArea/ChatBotArea'
import Landing from './components/landing/Landing'
import Registration from './components/registration/registration/Registration'
import Connexion from './components/registration/connexion/Connexion'
import Premium from './components/premium/Premium'
import DocEditor from './components/docs/docEditor/DocEditor'
import DocShare from './components/docs/docShare/DocShare'
import DocReact from './components/docs/docReact/DocReact'
import DataArea from './components/data_area/DataArea'


function App() {
  const [userId, setUserId] = useState()

  useEffect(() => {
        if(localStorage.getItem('userId')){
            setUserId(localStorage.getItem('userId'))
        } else {
            setUserId(sessionStorage.getItem('userId'))
        }
    }, [])

  return (
    <Switch>
      {!userId ?
      <>
      <Route exact path="/" component={Landing} />
      <Route path="/inscription" component={Registration}/>
      <Route path="/connexion" component={Connexion}/>
      <Route path="/editeur-doc" component={DocEditor}/>
      <Route path="/partager-son-chatbot-doc" component={DocShare}/>
      <Route path="/installer-react" component={DocReact}/>
      <Route path="/models" component={ModelArea} />
      </>
      :
      <>
      <Route exact path="/" component={Landing} />
      <Route path="/models" component={ModelArea} />
      <Route path="/base-de-donnee" component={DataArea}/>
      <Route path="/mails" component={MessageSpace}/>
      <Route path="/chatbot" component={ChatbotArea}/>
      <Route path="/editeur" component={Builder}/>
      <Route path="/premium" component={Premium}/>
      <Route path="/editeur-doc" component={DocEditor}/>
      <Route path="/partager-son-chatbot-doc" component={DocShare}/>
      <Route path="/installer-react" component={DocReact}/>
      </>}
    </Switch>
  );
}

export default App;