import React from 'react'
import Navbar from '../../navbar/Navbar'
import MenuBurger from '../../menuBurger/MenuBurger'
import Footer from '../../footer/Footer'
import { Helmet } from "react-helmet";


const Art3 = () => {

    const shemaOrg = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://sortouch.co/creer-chatbot-parfait"
        },
        "headline": "Créer le chatbot parfait en 5 étapes",
        "description": `Je vais vous aider à structurer au mieux vos idées, vos besoins et votre public afin que vous puissiez créer votre chatbot idéal.
        Cela en 5 étapes, c’est parti !`,
        "image": "https://sortouch.co/static/media/first_cover.5221720f.png",
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
        "datePublished": "2020-09-29",
        "dateModified": "2020-09-29"
    }



    return (
        <div className="containerBlog">
            <Helmet>
                <title>Créer le chatbot parfait en 5 étapes</title>
                <script type="application/ld+json">
                    {JSON.stringify(shemaOrg)}
                </script>
                <meta name="title" property="title" content="Créer le chatbot parfait en 5 étapes" />
                <meta name="description" content="Je vais vous aider à structurer au mieux vos idées, vos besoins et votre public afin que vous puissiez créer votre chatbot idéal.
                Cela en 5 étapes, c’est parti !" />
                <meta name="og:title" property="og:title" content="Créer le chatbot parfait en 5 étapes" />
                <meta name="og:description" property="og:description" content="Je vais vous aider à structurer au mieux vos idées, vos besoins et votre public afin que vous puissiez créer votre chatbot idéal.
                Cela en 5 étapes, c’est parti !" />
                <meta name="og:image" property="og:image" content="https://sortouch.co/static/media/cover.591fdfd9.png" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            {window.innerWidth > 1280 ?
                <Navbar type={"blog"} />
                :
                <MenuBurger type={"blog"} />}
            <div className="contentArt">
                <h1 style={{ marginBottom: '0px' }} className="titleArt">Créer le chatbot parfait en 5 étapes</h1>
                <p style={{ fontSize: '15px', marginBottom: '35px' }} className="textArt">par Thomas Dryjard le 29 septembre 2020</p>
                <p style={{ marginTop: "0px" }} className="textArt">
                    Créer un chatbot est comparable à la rédaction d’article, quand l’on n’a pas l’habitude, on ne sait pas toujours par où commencer et quelle direction prendre.
                    Ce tuto n’est pas basé sur la pratique de certains outils, mais sur la théorie.
                    Je vais vous aider à structurer au mieux vos idées, vos besoins et votre public afin que vous puissiez créer votre chatbot idéal.
                    Cela en 5 étapes, c’est parti !
                    </p>
                <img src={require('./images/cover.png')} style={{width: '100%', height: 'auto'}} alt="chatbot idéal illustration"/>
                <h2 className="h2Art">1) Cibler les futurs utilisateurs de votre chatbot</h2>
                <div className="columnBlog">
                    <p style={{ marginTop: "0px" }} className="textArt">
                        Cette première étape consiste à vous mettre dans la peau des futurs utilisateurs de votre chatbot en vous demandant “qui visite la page de mon site ou la page facebook où sera présent mon chatbot”.<br /><br />

                        Est ce des clients, des prospects ou des random complets (personnes aléatoires). Si votre chatbot s’adresse à une de ces catégories exclusivement, vous n’avez pas à vous soucier des autres et pouvez donc programmer des questions et réponses en conséquence.<br /> Si votre chatbot s’adresse à vos clients, vous pouvez vous permettre d’utiliser des termes en rapport avec vos services ou produits qu’ils sont susceptibles de comprendre.
                        Pareil pour des prospects, qui seront arrivés sur votre page en ayant déjà connaissances de ce que vous proposez.<br />
                        Avec ces deux types d’utilisateurs vous pourrez donc aller directement à l’essentiel en essayant de cibler leurs besoins plus spécifiquement.<br /><br />

                        En revanche, si votre chatbot s’adresse à vos clients et prospects, mais aussi à de nouveaux visiteurs (si votre chatbot se trouve sur votre page d’accueil par exemple), vous devez créer plusieurs chemins possibles avec des questions et réponses adaptés à tous.<br /><br />

                        Cela en demandant par exemple dès la première interaction :<br/>
                        “qui êtes-vous ?”<br/>
                        “déja client ?”<br/>
                        “vous souhaitez en savoir plus sur le service xxx ?”<br/>
                        “vous souhaitez découvrir nos services ?”<br /><br />

                        Plusieurs choix qui serviront à proposer par la suite des interactions ciblées.
                    </p>
                </div>


                <h2 className="h2Art">2) Lister les différentes questions des utilisateurs</h2>
                <p className="textArt">
                    J’aborde ce deuxième point en reprenant l'exemple de l’introduction : “créer un chatbot est comparable à la rédaction d’un article”. C'est vrai, mais le retour en arrière en cas d’erreur est encore plus pénalisant.<br /> Créer un chatbot demande parfois de créer 10 interactions voire plus afin de ne répondre qu’à un besoin ou une question, structurer les différentes directions à prendre lors de la création est donc primordiale.<br /><br />

                    Structurer les directions à prendre lors de cette création commence par un listage des différentes questions auxquelles les utilisateurs de votre chatbot attendront une réponse.<br /><br />

                    Reprenez la liste des futurs utilisateurs de votre chatbot que vous avez faite durant l’étape une et écrivez en dessous les différentes questions que ceux-ci pourraient poser si vous étiez en face d’eux.<br /><br />
                    (cette étape demande un peu d’imagination et de réflexion)

                    Maintenant que vous avez fini, demandez-vous combien de temps vous souhaitez accorder à la création de votre chatbot (car oui, créer un chatbot très complet peut prendre du temps).<br />
                    Estimez qu’il faut environ 1 à 5 minutes afin de créer les différentes interactions pour répondre à une question. Il faut donc sélectionner les questions les plus importantes en conséquence.<br /><br />

                    Vous voilà maintenant avec la liste de toutes les questions auxquelles votre chatbot devra répondre !<br /><br />
                </p>


                <h2 className="h2Art">3) Trouver les liens entre les questions</h2>
                <p className="textArt">
                    Imaginons maintenant que les questions auxquelles il faudra répondre sont des chapitres que vous devez classer par thèmes.<br />
                    (Vous l’avez compris ce sera le sujet du troisième point)<br /><br />

                    Les futures questions qui nécessitent des réponses (que vous avez déjà classées par type d’utilisateurs) ne sont en fait que les branches de différentes interactions.<br /> Je reformule par peur de vous avoir perdu…<br /><br />

                    Lorsque l’on utilise un chatbot, l’on navigue entre les questions et réponses en sélectionnant différentes interactions.<br /> à mesure que l’on interagit, les questions s’affinent et les réponses nous accompagnent jusqu’à la réponse ultime, qui est celle attendue par l’utilisateur.<br />
                    Durant tout ce chemin, les questions et réponses possibles n’ont fait que s’affiner et les sujets proposés se sont rapprochés de plus en plus.<br /><br />

                    L’on peut imaginer cela par un arbre qui se divise en de plus en plus de branches jusqu’à atteindre la pointe de l’une d’elles.<br /><br />

                    Mais alors, quel rapport avec la classification des questions ?<br />
                    Tout simplement, il est indispensable de trouver le lien entre ses différentes branches afin de déterminer quelles interactions leurs sont communes et quel est l’interaction qui décidera de la divergence entre deux branches.<br /><br />

                    De cette façon, vous pourrez créer qu’une seule interaction menant à plusieurs réponses.
                </p>


                <h2 className="h2Art">4) Rédiger les interactions</h2>
                <p className="textArt">
                    Maintenant que nous (enfin, vous) avez les différentes questions auxquelles il faudra répondre, que celles-ci sont structurées par type d’utilisateurs et par thème, il nous (enfin vous toujours) faut passer à la rédaction des interactions menantes à ces réponses.<br /><br />

                    Petit récapitulatif pour plus de clarté, je vais prendre comme exemple la création d’un chatbot avec Sortouch (le site où vous vous trouvez) :<br />
                    question = ce que dit le chatbot<br />
                    réponse = choix d’interaction de l’utilisateur<br /><br />

                    Ce que vous allez apprendre dans ce point, ce sera à rédiger les différentes réponses que l’utilisateur pourra sélectionner afin d’atteindre la question (réponse du chatbot) qu’il attend.<br /><br />

                    Vous avez dû le remarquer, j’aime imager, je vais donc vous proposer cette même recette pour ce point.<br /><br />

                    Imaginez que je vous êtes une personne (deux pieds, deux bras, une tête), que vous vous trouviez devant la porte de chez vous et que votre but soit de vous rendre dans la cuisine afin de prendre une banane.<br />
                    Vos interactions seraient donc :<br />
                    - ouvrir la porte<br />
                    - se rendre dans la cuisine<br />
                    - prendre une banane<br /><br />

                    Assez simple… maintenant, imaginez que vous soyez les pieds, les mains et la petite voix dans la tête d’un bonhomme qui se trouve devant une maison mais que vous ne sachiez pas ce qu’il veut.<br /><br />

                    Les questions et interactions ressembleraient donc à quelque chose comme ça :
                </p>
                <img alt="algo chatbot" src={require('./images/algo_chatbot.png')} className="ImgArtColumn" />
                <p className="textArt">
                    Autant d’interactions ont été nécessaires afin de prendre la banane.<br />
                    Cet exemple illustre pas mal la création de chatbot, vous ne connaissez pas l’utilisateur et il faut prévoir un maximum d’interaction afin de cerner ses besoins.<br />
                    Bien que les étapes précédentes ai servi à cibler les priorités, répondre à la question d’un utilisateur demande souvent de lui poser avant ça plusieurs questions.<br /><br />

                    La recette magique afin de créer le chemin parfait n’existe pas, néanmoins, si vous suivez correctement les étapes précédentes et que vous répétez le chemin mental réalisé dans l’exemple ci-dessus, la création de votre chatbot ne sera pas le calvaire que vous vous imaginez.<br /><br />

                    Dites vous bien que chaque réponse apportée via votre chatbot est une réponse que vous ne prononcerez plus 20 fois par jour.
                </p>

                <h2 className="h2Art">5) La mise en situation de votre chatbot</h2>
                <p className="textArt">
                    L’étape cinq sera courte à expliquer, car elle tombe normalement sous le sens, néanmoins, beaucoup ne se donnent pas la peine de le faire, ce qui gâche parfois tout le travail fait jusqu’alors.<br/><br/>

                    Le test !<br/>
                    La relecture !<br/>
                    La correction de fautes !<br/><br/>

                    Ces 3 “choses” sont à faire absolument après la création de votre chatbot !<br/>
                    Et je précise que cela s’applique à toutes les interactions possibles avec votre chatbot que vous aurez créé !<br/><br/>

                    Enfin, j’espère avoir pu vous aider dans la création de votre future
                </p>
            </div>
            <Footer />
        </div>
    )
}

export default Art3