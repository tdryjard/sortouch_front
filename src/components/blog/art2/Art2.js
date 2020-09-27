import React from 'react'
import Navbar from '../../navbar/Navbar'
import MenuBurger from '../../menuBurger/MenuBurger'
import Footer from '../../footer/Footer'
import { Helmet } from "react-helmet";


const Art2 = () => {

    const shemaOrg = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://sortouch.co/les-chatbot-expliqué-simplement"
        },
        "headline": "Comprendre rapidement ce qu’est un chatbot et à quoi ça sert",
        "description": `Vous avez aperçu ou entendu le mot “chatbot” et ça a suffi pour titiller votre curiosité ? Vous souhaitez en savoir plus ? Je vais vous aider ! Une explication simple pour un sujet simple.
      
      Commençons avec un exemple de chatbot
      Si je vous parle d’une petite bulle en bas à droite de votre écran qui vous demande de venir parler avec elle, ça vous dit quelque chose ? Mais si… le petit rond qui vous appelle via une notification ou par un petit message.
      Bon, une illustration devrait vous aider, voici à quoi cela ressemble :
      
      Cette petite bulle indique qu’un chatbot est disponible sur la page où vous naviguez, la plupart du temps, un simple clique sur cette bulle permet d’activer le chatbot et de discuter avec lui.
      
      Une fois le chatbot activé, voici à quoi ressemble un chatbot peut ressembler :
      
      Ok, c’est joli, mais… à quoi ça sert ?
      
      Un chatbot, à quoi ça sert ?
      Les chatbot sont de plus en plus répandus sur le web et pour cause, le gain de temps pour les propriétaires des sites ayant adopté cette petite secrétaire automatique ainsi que pour ses visiteurs est énorme.
      
      Sans chatbot, trouver l’information que l’on recherche sur un site est parfois un vrai casse tête, quelles sont les horaires d’ouverture, comment contacter le service après-vente, en quoi consistent vos services, quels sont vos prix…
      
      Le chatbot, initialement appelé “agent conversationnel”, permet de répondre rapidement aux questions les plus fréquentes en quelques cliques et choix de questions-réponses proposées. Le visiteur du site obtient donc rapidement les informations recherchées et la personne en charge de la relation client s’épargnent beaucoup de copier-coller.
      
      Répondre aux questions fréquentes, c’est bien, mais ça ne suffit pas !
      discution entre humain
      Les besoins ou questions sont quelquefois très spécifiques et les réponses programmées lors de la création du chatbot peuvent ne pas suffire. Il faut donc tout de même pouvoir contacter une personne réelle, la plupart des éditeurs de chatbot permettent donc de mettre en relation avec une personne lors de l’utilisation du chatbot par un visiteurs quand quelqu’un est disponible afin de remédier à cela.
      
      Sortouch.co détecte les choix de questions et réponses sélectionnées par l’utilisateur du chatbot avant de demander à prendre contact et trie automatiquement le message laissé dans une catégorie propre à la raison de cette prise de contact. De cette façon, la personne chargée de répondre aux messages laissés connaît directement le sujet principal de la prise de contact et peut donc s’attarder en priorité sur les besoins les plus importants. (Ce qui a déjà sauvé plusieurs clients qui ont eu un problème majeur avec l’utilisation des outils de certaines entreprises...)
      
      Les différents types de chatbot
      chatbots family
      Il existe aujourd’hui différents types de chatbot, qui ont chacun leurs avantages et leurs inconvénients, nous allons voir ensemble les différences et caractéristique entre les deux.

Les chatbot dotés d’intelligence artificielle, “IA”
Vous avez sûrement déjà entendu parler de l’intelligence artificielle, pour faire cours, l’IA consiste à essayer de reproduire une intelligence autonome et la capacité d'apprendre par soi-même pour… un robot.

L’intelligence artificielle est encore très jeune et plein de petits génies et grosses fortunes à travers le monde investissent temps, argent et compétence afin de rendre un jour l’IA réelle. De ce fait, les chatbot utilisant l’IA aujourd’hui sont donc très limités et ne peuvent pas interpréter et répondre à des questions trop complexes, obligeant l’utilisateur à reformuler encore et encore.

Cependant, si la personne chargée du site internet sur lequel installer le chatbot n’a pas le temps pour créer son chatbot soi-même, cela peut être une bonne alternative.

Le chatbot programmé
editeur de chatbot
Contrairement aux chatbots créés à partir d’intelligence artificielle, le chatbot programmé doit être créé et personnalisé. Évidemment, tous ceux qui ont ce type de chatbot sur leur site n’ont pas re codé eux-mêmes leur chatbot, ce serait contre-productif et trop coûteux sur le court et moyen terme. Un développeur coûte en moyenne 350€ par jour et programmer un chatbot en le codant demandera au minimum 2 mois de développement pour une version aboutie. Il faut aussi prendre en compte l’adaptabilité du chatbot, avec le temps, celui-ci devra surement être modifié et devra évoluer. Les questions et réponses initialement prévues devront sûrement être changées avec le temps.

C’est pourquoi différents outils qui permettent de créer et d’installer son chatbot sur son site ont vu le jour. Ils permettent de créer son chatbot sans avoir à toucher une ligne de code et proposent divers outils autour de celui-ci.

Le chatbot… qui n’en est pas un
La plupart des agents conversationnels aujourd’hui sont en fait des boîtes de dialogue, un messenger à installer sur son site. Les messages des visiteurs via cette boîte de dialogue sont envoyés en direct à une personne chargée de répondre aux messages le plus rapidement possible Le visiteur est directement mis en relation avec une personne réelle qui pourra répondre aux questions les plus complètes, mais cela engage une ou plutôt, des personnes à être connecté 24h/24 à la boîte de dialogue et répondre à tous les messages en moins de 15 secondes, sous peine que le visiteur change de page ou de site sans avoir eu de réponse.

Cet outil est performant en matière de relation client, mais est plutôt adapté aux grandes entreprises qui peuvent se permettent de payer minimum 3 personnes de jour comme de nuit afin de répondre aux questions de ses visiteurs.

La place du chatbot sur les réseaux sociaux
différents réseaux sociaux
Les réseaux sociaux ont eux aussi adopté les chatbots récemment. Discord propose de créer un chatbot propre à son canal afin de répondre à ses membres, il est aussi possible de créer son chatbot Messenger, le service chat de Facebook et Slack donne aussi cette possibilité (pour ne citer que les plus connus). Les chatbot possibles d’intégrer sur les réseaux sociaux sont exclusivement de type programmables, un module d’IA n’étant pas assez satisfaisant et difficilement intégrable sur une plateforme tierce.

L’on remarque que la grande majorité de ces chatbot sont utilisés encore une fois pour répondre aux questions les plus fréquentes de leurs membres, des questions auxquelles les réponses sont encore une fois toujours les mêmes.

Les tâches répétitives dans la plupart des domaines laissent de plus en plus place à l’automatisation et le chatbot va dans ce sens. En automatisant les échanges conversationnels qui peuvent l’être, le chatbot n’a pas pour but de remplacer les échanges humains, mais au contraire, c’est un outil qui répond aux questions répétitives rapidement et libère du temps pour des échanges humains plus complexes.`,
  "image": [
    "https://sortouch.co/static/media/bulle_chatbot.cf414e38.png",
    "https://sortouch.co/static/media/chatbot.82731f55.png",
    "https://sortouch.co/static/media/what.abbf4f18.gif",
    "https://sortouch.co/static/media/discution.158ef876.png",
    "https://sortouch.co/static/media/many_chatbot.cec1383d.png",
    "https://sortouch.co/static/media/editeur.db50fd9f.png",
    "https://sortouch.co/static/media/reseaux_sociaux.c8993c01.png"
  ],  
  "author": {
    "@type": "Person",
    "name": "Thomas Dryjard"
  },  
  "publisher": {
    "@type": "Organization",
    "name": "Sortouch",
    "logo": {
      "@type": "ImageObject",
      "url": ""
    }
  },
  "datePublished": "2020-09-25",
  "dateModified": "2020-09-25"
}



    return (
        <div className="containerBlog">
            <Helmet>
                <title>C’est quoi un chatbot, expliqué simplement</title>
                <script type="application/ld+json">
                    {JSON.stringify(shemaOrg)}
                </script>
                <meta name="title" property="title" content="Comprendre rapidement ce qu’est un chatbot et à quoi ça sert" />
                <meta name="description" content="Vous avez aperçu ou entendu le mot “chatbot” et ça a suffi pour titiller votre curiosité ?
                Vous souhaitez en savoir plus ? Je vais vous aider !
                Une explication simple pour un sujet simple." />
                <meta name="og:title" property="og:title" content="Comprendre rapidement ce qu’est un chatbot et à quoi ça sert" />
                <meta name="og:description" property="og:description" content="Vous avez aperçu ou entendu le mot “chatbot” et ça a suffi pour titiller votre curiosité ?
                Vous souhaitez en savoir plus ? Je vais vous aider !
                Une explication simple pour un sujet simple." />
                <meta name="og:image" property="og:image" content="https://sortouch.co/static/media/cover.591fdfd9.png" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            {window.innerWidth > 1280 ?
                <Navbar type={"blog"} />
                :
                <MenuBurger type={"blog"} />}
            <div className="contentArt">
                <h1 style={{marginBottom: '0px'}} className="titleArt">Comprendre rapidement ce qu’est un chatbot et à quoi ça sert</h1>
                <p style={{fontSize: '15px', marginBottom: '35px'}} className="textArt">par Thomas Dryjard le 25 septembre 2020</p>
                <p style={{ marginTop: "0px" }} className="textArt">
                    Vous avez aperçu ou entendu le mot “chatbot” et ça a suffi pour titiller votre curiosité ?
                    Vous souhaitez en savoir plus ? Je vais vous aider !
                    Une explication simple pour un sujet simple.
                    </p>

                <h2 className="h2Art">Commençons avec un exemple de chatbot</h2>

                <div className="columnBlog">
                    <p style={{ marginTop: "0px" }} className="textArt">
                        Si je vous parle d’une petite bulle en bas à droite de votre écran qui vous demande de venir parler avec elle, ça vous dit quelque chose ? Mais si… le petit rond qui vous appelle via une notification ou par un petit message.
                        <br />Bon, une illustration devrait vous aider, voici à quoi cela ressemble :
                    </p>
                    <img alt="icon bulle chatbot" src={require('./images/bulle_chatbot.png')} className="firstImgArt" />
                </div>
                <div className="columnBlog">
                    <p className="textArt">Cette petite bulle indique qu’un chatbot est disponible sur la page où vous naviguez, la plupart du temps, un simple clique sur cette bulle permet d’activer le chatbot et de discuter avec lui.<br /><br />
                        <span style={{ fontWeight: 'bold' }}> Une fois le chatbot activé, voici à quoi ressemble un chatbot peut ressembler :</span> </p>
                    <img alt="icon bulle chatbot" src={require('./images/chatbot.png')} className="ImgArtColumn" />
                    <p className="textArt">
                        Ok, c’est joli, mais… à quoi ça sert ?
                    </p>
                </div>

                <h2 className="h2Art">Un chatbot, à quoi ça sert ?</h2>
                <img alt="what is gif" src={require('./images/what.gif')} className="ImgArtColumn" />
                <p className="textArt">
                    Les chatbot sont de plus en plus répandus sur le web et pour cause, le gain de temps pour les propriétaires des sites ayant adopté cette petite secrétaire automatique ainsi que pour ses visiteurs est énorme.
                </p>
                <p className="textArt">
                    Sans chatbot, trouver l’information que l’on recherche sur un site est parfois un vrai casse tête, quelles sont les horaires d’ouverture, comment contacter le service après-vente, en quoi consistent vos services, quels sont vos prix…
                </p>
                <p className="textArt">
                    Le chatbot, initialement appelé “agent conversationnel”, permet de répondre rapidement aux questions les plus fréquentes en quelques cliques et choix de questions-réponses proposées.
                    Le visiteur du site obtient donc rapidement les informations recherchées et la personne en charge de la relation client s’épargnent beaucoup de copier-coller.
                </p>

                <h3 className="h3Art">Répondre aux questions fréquentes, c’est bien, mais ça ne suffit pas !</h3>
                <img alt="discution entre humain" src={require('./images/discution.png')} className="firstImgArt" />
                <p className="textArt">
                    Les besoins ou questions sont quelquefois très spécifiques et les réponses programmées lors de la création du chatbot peuvent ne pas suffire.
                    Il faut donc tout de même pouvoir contacter une personne réelle, la plupart des éditeurs de chatbot permettent donc de mettre en relation avec une personne lors de l’utilisation du chatbot par un visiteurs quand quelqu’un est disponible afin de remédier à cela.
                </p>
                <p className="textArt">
                    Sortouch.co détecte les choix de questions et réponses sélectionnées par l’utilisateur du chatbot avant de demander à prendre contact et trie automatiquement le message laissé dans une catégorie propre à la raison de cette prise de contact.
                    De cette façon, la personne chargée de répondre aux messages laissés connaît directement le sujet principal de la prise de contact et peut donc s’attarder en priorité sur les besoins les plus importants.
                    (Ce qui a déjà sauvé plusieurs clients qui ont eu un problème majeur avec l’utilisation des outils de certaines entreprises...)
                </p>

                <h2 className="h2Art">Les différents types de chatbot</h2>
                <img alt="chatbots family" src={require('./images/many_chatbot.png')} className="firstImgArt" />
                <p className="textArt">
                    Il existe aujourd’hui différents types de chatbot, qui ont chacun leurs avantages et leurs inconvénients, nous allons voir ensemble les différences et caractéristique de chacun.
                </p>
                <h3 className="h4Art">Les chatbot dotés d’intelligence artificielle, “IA”</h3>
                <p className="textArt">
                    Vous avez sûrement déjà entendu parler de l’intelligence artificielle, pour faire cours, l’IA consiste à essayer de reproduire une intelligence autonome et la capacité d'apprendre par soi-même pour… un robot.
                </p>
                <p className="textArt">
                    L’intelligence artificielle est encore très jeune et plein de petits génies et grosses fortunes à travers le monde investissent temps, argent et compétence afin de rendre un jour l’IA réelle.
                    De ce fait, les chatbot utilisant l’IA aujourd’hui sont donc très limités et ne peuvent pas interpréter et répondre à des questions trop complexes, obligeant l’utilisateur à reformuler encore et encore.
                </p>
                <p className="textArt">
                    Cependant, si la personne chargée du site internet sur lequel installer le chatbot n’a pas le temps pour créer son chatbot soi-même, cela peut être une bonne alternative.
                </p>

                <h3 className="h4Art">Le chatbot programmé</h3>
                <img style={{ width: '500px', height: 'auto' }} alt="editeur de chatbot" src={require('./images/editeur.png')} className="firstImgArt" />
                <p className="textArt">
                    Contrairement aux chatbots créés à partir d’intelligence artificielle, le chatbot programmé doit être créé et personnalisé. Évidemment, tous ceux qui ont ce type de chatbot sur leur site n’ont pas re codé eux-mêmes leur chatbot, ce serait contre-productif et trop coûteux sur le court et moyen terme. Un développeur coûte en moyenne 350€ par jour et programmer un chatbot en le codant demandera au minimum 2 mois de développement pour une version aboutie.
                    Il faut aussi prendre en compte l’adaptabilité du chatbot, avec le temps, celui-ci devra surement être modifié et devra évoluer. Les questions et réponses initialement prévues devront sûrement être changées avec le temps.
                </p>
                <p className="textArt">
                    C’est pourquoi différents outils qui permettent de créer et d’installer son chatbot sur son site ont vu le jour. Ils permettent de créer son chatbot sans avoir à toucher une ligne de code et proposent divers outils autour de celui-ci.
                </p>

                <h3 className="h4Art">Le chatbot… qui n’en est pas un</h3>
                <p className="textArt">
                    La plupart des agents conversationnels aujourd’hui sont en fait des boîtes de dialogue, un messenger à installer sur son site. Les messages des visiteurs via cette boîte de dialogue sont envoyés en direct à une personne chargée de répondre aux messages le plus rapidement possible
                    Le visiteur est directement mis en relation avec une personne réelle qui pourra répondre aux questions les plus complètes, mais cela engage une ou plutôt, des personnes à être connecté 24h/24 à la boîte de dialogue et répondre à tous les messages en moins de 15 secondes, sous peine que le visiteur change de page ou de site sans avoir eu de réponse.
                </p>
                <p className="textArt">
                    Cet outil est performant en matière de relation client, mais est plutôt adapté aux grandes entreprises qui peuvent se permettent de payer minimum 3 personnes de jour comme de nuit afin de répondre aux questions de ses visiteurs.
                </p>

                <h2 className="h2Art">La place du chatbot sur les réseaux sociaux</h2>
                <img style={{ width: '500px', height: 'auto' }} alt="différents réseaux sociaux" src={require('./images/reseaux_sociaux.png')} className="firstImgArt" />
                <p className="textArt">
                    Les réseaux sociaux ont eux aussi adopté les chatbots récemment. Discord propose de créer un chatbot propre à son canal afin de répondre à ses membres, il est aussi possible de créer son chatbot Messenger, le service chat de Facebook et Slack donne aussi cette possibilité (pour ne citer que les plus connus).
                    Les chatbot possibles d’intégrer sur les réseaux sociaux sont exclusivement de type programmables, un module d’IA n’étant pas assez satisfaisant et difficilement intégrable sur une plateforme tierce.
                </p>
                <p className="textArt">
                    L’on remarque que la grande majorité de ces chatbot sont utilisés encore une fois pour répondre aux questions les plus fréquentes de leurs membres, des questions auxquelles les réponses sont encore une fois toujours les mêmes.
                </p>
                <p className="textArt">
                    Les tâches répétitives dans la plupart des domaines laissent de plus en plus place à l’automatisation et  le chatbot va dans ce sens. En automatisant les échanges conversationnels qui peuvent l’être, le chatbot n’a pas pour but de remplacer les échanges humains, mais au contraire, c’est un outil qui répond aux questions répétitives rapidement et libère du temps pour des échanges humains plus complexes.
                </p>
            </div>
            <Footer />
        </div>
    )
}

export default Art2