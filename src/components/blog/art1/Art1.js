import React from 'react'
import Navbar from '../../navbar/Navbar'
import MenuBurger from '../../menuBurger/MenuBurger'
import Footer from '../../footer/Footer'
import { Helmet } from "react-helmet";

const shemaOrg = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://sortouch.co/comment-securiser-son-email-professionnel"
    },
    "headline": "Comment sécuriser son email professionnel ?",
    "description": `Les meilleures astuces et méthodes afin de garder son adresse mail professionnel propre, éviter les spams et email marketing`,
    "image": "https://sortouch.co/static/media/cover.591fdfd9.png",
    "author": {
        "@type": "Organization",
        "name": "Sortouch"
    },
    "publisher": {
        "@type": "Organization",
        "name": "Sortouch",
        "logo": {
            "@type": "ImageObject",
            "url": ""
        }
    },
    "datePublished": "2020-09-15",
    "dateModified": "2020-09-21"
}

const Art1 = () => {
    return (
        <div className="containerBlog">
            <Helmet>
                <title>Comment sécuriser son email professionnel ?</title>
                <script type="application/ld+json">
                    {JSON.stringify(shemaOrg)}
                </script>
                <meta name="title" property="title" content="Comment sécuriser son email professionnel" />
                <meta name="description" content="Les meilleures astuces et méthodes afin de garder son adresse mail professionnel propre, éviter les spams et email marketing" />
                <meta name="og:title" property="og:title" content="Top astuces pour sécuriser son email professionnel" />
                <meta name="og:description" property="og:description" content="Les meilleures astuces et méthodes afin de garder son adresse mail professionnel propre, éviter les spams et email marketing" />
                <meta name="og:image" property="og:image" content="https://sortouch.co/static/media/cover.591fdfd9.png" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            {window.innerWidth > 1280 ?
                <Navbar type={"blog"} />
                :
                <MenuBurger type={"blog"} />}
            <div className="contentArt">
                <h1 className="titleArt">Comment sécuriser son email professionnel ?</h1>
                <div className="containerHeadArt">
                    <img alt="sécuriser sa boite mail" src={require('./image/cover.png')} className="firstImgArt" />
                    <p style={{ marginTop: "0px" }} className="textArt">
                        Nous sommes dans une période où l’e-mailing (démarchage commercial par mail) et les spams sont de plus en plus courants.<br />
                        Sécuriser son adresse mail professionnelle face à ces méthodes marketing devient donc primordiale afin que sa boîte de réception Gmail,
                        Outlook, Yahoo…. ne devienne pas une poubelle et reste exclusivement réservée aux mails importants.
            </p>
                </div>

                <div className="tiretArt" />

                <h2 className="h2Art">Pourquoi je reçois des mails alors que je n’ai pas partagé mon adresse email à ces entreprises ?</h2>
                <h3 className="h3Art">Il y a de nombreuses méthodes pour une entreprise B2B ou B2C d’obtenir des adresses email, en voici quelques-unes :</h3>
                <h4 className="h4Art">Acheter des lots d’adresse mail</h4>
                <p className="textArt">
                    Eh oui, il est possible sur internet d’acheter un grand nombre d’adresses email en ciblant précisément
                    ses prospects et pour des prix allant de 10€ à 10 000€.<br />
                    Les plateformes proposants ce service d’achat d’emails sont nombreuses, en voici deux très connues :
                <a className="linkArt" href="https://www.acheter-base-email.com" target="_blank" rel="noopener"> acheter_base_email.com, </a>
                    <a className="linkArt" href="https://www.base-email.com" target="_blank" rel="noopener">base_email.com</a><br /><br />
                Je vous déconseille néanmoins d’utiliser des bases de données d’emails pour votre marketing !
                Le retour sur investissement est souvent à perte car en réalité très peu ciblé et les possesseurs
                de ces adresses emails sont dans le même cas que beaucoup, leur boîte de réception d’emails est surchargée
                de spams, annonces marketing… Ils passent donc presque tous à la trappe.
            </p>
                <h4 className="h4Art">Les inscriptions sur des sites</h4>
                <p className="textArt">
                    La grande majorité des sites internet demandent votre email afin de s’inscrire.<br />
                    Email qui se retrouve directement dans leurs bases de données afin de prospecter.
            </p>
                <h4 className="h4Art">L’inscription aux newsletters</h4>
                <p className="textArt">
                    L’on peut observer une forte augmentation des eBooks, formations et autres produits digitaux vendus
                    gratuitement contre une inscription à une newsletter.<br /> N’oubliez pas, si un service est gratuit, alors
                    c’est vous le produit.<br /> Votre email se retrouve ensuite dans diverses bases de données à prospecter.
            </p>
                <h4 className="h4Art">Divulguer son adresse email ouvertement sur les réseaux sociaux ou sur internet</h4>
                <p className="textArt">
                    En mettant votre adresse email en avant sur les réseaux sociaux ou votre site web, vous laissez porte ouverte au scraping.
                    Qu’est-ce que le scraping ? Le scraping consiste à laisser un petit logiciel parcourir le web pour extraire automatiquement
                    des informations (comme votre email si celle-ci se retrouve sur le web)
            </p>

                <div className="tiretArt" />

                <h2 className="h2Art">Alors comment éviter que mon adresse email se retrouve dans des bases de données d’entreprise ?</h2>
                <h4 className="h4Art">Si vous avez un site : ne pas mettre son adresse email en clair dans son code source</h4>
                <p className="textArt">
                    Je vous parlais du scraping, afin d’empêcher les méchants robots qui scrutent internet de récupérer votre email,
                    la première astuce consiste à ne pas mettre son adresse email en clair dans le code source de son site mais à remplacer ça par une image.
            </p>
                <h4 className="h4Art">Utiliser une adresse email “poubelle”</h4>
                <p className="textArt">
                    Cette méthode s’applique à l’inscription sur un site ou à une newsletter.<br />
                    Au lieu de partager son adresse mail perso courante ou professionnel, au moment de souscrire à un site ou à
                    une newsletter, entrez une adresse email que vous aurez créée spécialement pour le spam.<br /> De cette façon, les
                    spams restent entre spam et ne viennent pas se mélanger aux autres mails importants.
            </p>

                <div className="tiretArt" />

                <h2 className="h2Art">Je suis obligé de partager mon adresse email publiquement, comment faire ?</h2>
                <p className="textArt">
                    Si vous êtes un professionnel, pour beaucoup de raisons vous devez partager votre email publiquement afin que tout le monde puisse vous contacter.<br /><br />

                Dans ce cas, vous lisez cet article au bon endroit :)<br /><br />

                à défaut de partager votre adresse email,
                <a className="linkArt" href="https://sortouch.co"> sortouch.co</a> vous permet de partager un lien vers une page web avec un robot que vous pouvez créer vous-même.<br /> Ce robot répondra à votre place aux questions les plus fréquentes et donnera la possibilité de vous contacter via un formulaire.<br /><br />

                Cerise sur le pancake, votre chatbot s’occupera de trier automatiquement les messages laissés en différentes catégories que vous retrouverez dans votre boîte de réception.<br /><br />

                De cette façon, vous gagnerez du temps dans la gestion des mails de vos prospects et vous garderez votre adresse emails professionnelle secrète pour ceux que vous n’avez jamais contacté vous-même.<br /><br />

                </p>
            </div>
            <Footer />
        </div>
    )
}

export default Art1