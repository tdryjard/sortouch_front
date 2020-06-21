import React from 'react'
import Navbar from '../navbar/Navbar'
import MenuBurger from '../menuBurger/MenuBurger'
import Footer from '../footer/Footer'
import './CGV.scss'

const CGV = () => {
    return (
        <div className="containerCGv">
            {window.innerWidth > 1280 ?
                <Navbar />
                :
                <MenuBurger />}
            <div className="contentCGV">
                <p className="titleCGV">PRÉAMBULE</p>
                <p className="textCGV">
                    Sortouch est une plateforme d’édition de chatbot (agent conversationnel programmable) et de gestion des prises de contact via celui-ci.
                    Plateforme développé par Thomas Dryjard Des Garniers n° de SIRET 85372114000012
                    Les présentes Conditions générales ont pour objet de définir les modalités d’utilisation du service Sortouch et sa politique de confidentialité.
                    Sortouch se réserve le droit, à tout moment et à sa seule discrétion, de modifier ou mettre à jour les présentes Conditions, en publiant sur le Site et/ou par envoi d’une notification par email tout changement, ajout ou mise à jour, dans la mesure du possible 30 jours au moins avant son entrée en vigueur. Ces Conditions d’Utilisation régissent la relation entre “Sortouch”, “Nous”, “Thomas Dryjard Des Garniers” et Vous, dénommé "L'utilisateur" ou "Le Client" ou "Vous" y compris si vous représentez un employeur ou un client.
                    Les conditions particulières éventuellement négociées entre Sortouch et l’Utilisateur prévalent sur les présentes Conditions générales.
                    Sortouch Vous concède un droit d’accès et d’utilisation non exclusif, nominatif, personnel et temporaire. Cette concession ne saurait être considérée comme une cession au sens du Code de la propriété intellectuelle d’un quelconque droit de propriété intellectuelle sur le Service Sortouch, ou l’un quelconque de ses composants, à votre bénéfice.

                </p>
            </div>
            <div className="contentCGV">
                <p className="titleCGV">ABONNEMENTS</p>
                <p className="textCGV">
                    Sortouch propose plusieurs options à nos clients, comprenant des abonnements gratuits et des abonnements payants, avec ou sans engagement. Vous pouvez trouver ces options d’abonnements et les tarifs associés sur le Site https://sortouch.co
                </p>
            </div>
            <div className="contentCGV">
                <p className="titleCGV">Abonnement gratuit</p>
                <p className="textCGV">
                    Les abonnements gratuits sont accessibles à tous et sont soumis à des restrictions d’utilisation
                    (nombre de d'utilisateurs mensuels et/ou volume de messages limité).
                    Ces restrictions d’utilisation figurent sur le Site à l’adresse indiquée ci-dessus.
                    Cet abonnement gratuit s’apllique à toute création de compte sur https://sortouch.co
                </p>
            </div>
            <div className="contentCGV">
                <p className="titleCGV">Abonnement payant sans engagement</p>
                <p className="textCGV">
                    Les abonnement payants sans engagement sont accessibles à tous et sont soumis à des restrictions d’utilisation plus amples. Des fonctionnalités supplémentaires peuvent également être ajoutées à ces abonnements.
                    Pour ces abonnements payants sans engagement, votre abonnement sera dû et payable d’avance chaque mois à compter de la date de votre inscription ou de celle correspondant à votre première souscription à un abonnement payant. Un calcul au prorata de la période due peut également être proposé. Le coût d’abonnement n’est pas variable et bloquera les fonctionnalités dépassant les limites indiqué à la souscription.
                    Le paiement peut se faire par carte bancaire via système de paiement en ligne. Vous autorisez Sortouch à débiter la carte bancaire que Vous Nous fournissez pour tous les frais et montants que Vous Nous devez au titre des Services.
                    Le prix des abonnements n’inclut pas le coût des télécommunications, de l’accès Internet et des éventuels Services d’Accompagnement permettant l’utilisation du Service ce coût restant toujours à Votre charge.
                    Tout retard de paiement pourra entraîner la suspension temporaire du Service et/ou la résiliation de Votre abonnement, à notre seule discrétion, immédiatement et sur simple notification.
                    Tous les montants dus sont exprimés hors taxes. Vous vous engagez à payer ou rembourser, le cas échéant, à Sortouch tous les impôts et taxes dus ou payés, imposés par toute autorité publique sur les montants dus en vertu des Services et qui vous incombent personnellement.
                    Sortouch se réserve le droit de changer les tarifs des abonnements aux Services en Vous notifiant par e-mail avec un préavis de trente (30) jours minimum. Si Vous n’acceptez pas les nouveaux tarifs qui Vous auront été notifiés, il Vous appartiendra de cesser toute utilisation du Service au plus tard au dernier jour de la période mensuelle en cours déjà réglée au jour de la notification et de résilier votre abonnement.
                    Vous acceptez de ne pas mettre en cause la responsabilité de Sortouch et de ne pas contester le paiement correspondant à vos utilisation de la plateforme, y compris dans le cas où certains de ceux-ci sont bloqués par un tiers et ne parviennent pas au destinataire dans les conditions que Vous auriez souhaitées.

                </p>
            </div>
            <div className="contentCGV">
                <p className="titleCGV">Abonnement gratuit et abonnement payant sans engagement</p>
                <p className="textCGV">
                    Les abonnements gratuits et les abonnements payants sans engagement sont conclus sans durée déterminée et tacitement reconductibles de mois en mois sous réserve, le cas échéant, du complet paiement du prix terme à échoir. Vous pouvez à tout moment mettre un terme à Votre abonnement gratuit ou sans engagement. Nous attirons cependant votre attention sur le fait que Sortouch ne pourra en aucun cas procéder au remboursement des sommes payées d’avance au prorata du mois en cours résilié et non utilisé ; il Vous appartient donc d’anticiper la résiliation de Votre abonnement pour la rendre effective au moment le plus opportun.
                </p>
            </div>
            <div className="contentCGV">
                <p className="titleCGV">UTILISATIONS INTERDITES</p>
                <p className="textCGV">
                    L’usage des Services de Sortouch résultant de la souscription desdits Services est strictement personnel et ne peut être loué, cédé à titre gratuit ou onéreux à un tiers. En l'absence d'autorisation préalable, l'usage de Sortouch est limité à un seul compte par utilisateur.
                    Toute utilisation des Services susceptible d’endommager, de désactiver, de surcharger l’infrastructure de Sorotuch ou les réseaux connectés à des serveurs de Sorotuch, ou encore d’entraver la jouissance du service par les autres utilisateurs est interdite.
                    Toute tentative d’accès non autorisé aux Services, à d’autres comptes, aux systèmes informatiques ou à d’autres réseaux connectés à un serveur de Sortouch ou à l’un des services via le piratage ou toute autre méthode est interdite.
                    L’utilisation des Services à des fins visant à diffuser, réceptionner, vendre des produits ou services liés à des activités illégales ou frauduleuses ou encourager ses activités et notamment, sans que cette liste ne soit exhaustive : les activités liées aux drogues illégales, la pornographie ou l'e-commerce sexuellement explicite, les jeux de paris et autres jeux d'argent, les programmes pirates ou la diffusion virus ou programme informatique ayant pour but de causer des dommages, les instructions de montage ou de création d'armes, la diffusion de matériaux contenant de la violence sur les enfants ou qui encourage la violence, le détournement de propriété intellectuelle de quelque tiers que ce soit, la communication d' information personnelle identifiable sur la santé ou l’assurance-maladie, la diffusion d'informations de compte bancaire ou de carte de crédit sont strictement interdits.
                    En cas de non-respect du présent article, Sortouch se réserve le droit de bloquer immédiatement l’accès de l’Utilisateur à ses Services et de supprimer toutes les informations de son compte sans préavis et sans remboursement ou toute autre forme de compensation.
                    Sortouch se réserve le droit de refuser ou de limiter le service aux comptes ne respectant pas ses conditions générales, les lois régulant les entreprises de communications ou distribuant des communications non souhaitées.

                </p>
            </div>
            <div className="contentCGV">
                <p className="titleCGV">MODIFICATION DES CONDITIONS D’UTILISATION, DES POLITIQUES SORTOUCH ET DE L’OFFRE</p>
                <p className="textCGV">
                    Sortouch peut être amenée à modifier les présentes Conditions générales d’utilisation, ses politiques de confidentialité ainsi que son offre, son offre commerciale, ses offres tarifaires.
                </p>
            </div>
            <div className="contentCGV">
                <p className="titleCGV">INCIDENT MAJEURE</p>
                <p className="textCGV">
                    La responsabilité des parties ne pourra pas être mise en œuvre si la non-exécution ou le retard dans l’exécution de l’une de ses obligations décrites dans les présentes Conditions générales découle d’un cas de force majeure.
                    La force majeure s’entend de tout événement extérieur, irrésistible et imprévisible et de son interprétation par la jurisprudence des juridictions françaises, et empêchant l’une des parties d’exécuter ses obligations ou rendant l’exécution de celles-ci excessivement onéreuses.
                    De façon expresse, seront considérés comme des cas de force majeure, outre ceux habituellement retenus par la jurisprudence des juridictions françaises, et sans que cette liste soit limitative :
                    les guerres, conflits armés, émeutes, insurrections, sabotages, actes de terrorisme,
                    les grèves totales ou partielles, internes ou externes à l'entreprise, chez un fournisseur ou chez un opérateur national, lock-out, blocages des moyens de transport ou d'approvisionnement pour quelque raison que ce soit,
                    les catastrophes naturelles entrainant la destruction d’infrastructures, telle qu’incendies, tempêtes, inondations, dégâts des eaux,
                    Les restrictions gouvernementales ou légales, modifications légales ou réglementaires des formes de commercialisation, les cas de suspension, annulation, révocation de toute autorisation par n’importe quelle autorité compétente,
                    les interruptions du réseau de Sortouch, de son sous-traitant ou de son fournisseur, par suite de pannes d'ordinateur, blocage des moyens de télécommunications, qu’elles résultent d’attaques extérieures, d’interruptions de services du fournisseur d’accès ou autres, et tout autre fait non imputable à Sortouch, son sous-traitant ou son fournisseur, empêchant l'exécution normale des prestations ;
                    les coupures d’alimentation électrique
                </p>
            </div>
            <div className="contentCGV">
                <p className="titleCGV">GESTION DU COMPTE UTILISATEUR</p>
                <p className="textCGV">
                    L’utilisation des services de Sortouch nécessite la création d’un compte en ligne. L’Utilisateur est responsable de la sincérité des informations qu’il fournit.
                    L’Utilisateur prend toute disposition utile pour maintenir la confidentialité de l’accès à son compte. L'utilisateur s'engage à assurer la sécurité et la confidentialité des identifiants personnels associés à son compte (y compris le compte-maître comme aux éventuels sous-comptes associés). Vous reconnaissez être informé et acceptez pleinement que votre responsabilité puisse être engagée pour tout dommage induit par l’utilisation du compte, et que Nous ne pouvons être tenus responsables de toute utilisation frauduleuse de Votre part.
                    En cas d’utilisation frauduleuse de son compte, l’Utilisateur s’engage à prévenir immédiatement Sortouch et à modifier sans délai son mot de passe d’accès. Les frais pouvant résulter de cette utilisation non autorisée seront à la charge de l’Utilisateur jusqu’à 48h après avoir avisé Sortouch de cet usage.
                    Sortouch ne sera en aucun cas responsable des dommages matériels ou immatériels résultant d’une utilisation du compte par un tiers, avec ou sans l’autorisation de l’Utilisateur.
                </p>
            </div>
            <div className="contentCGV">
                <p className="titleCGV">RESPECT DE LA RÉGLEMENTATION APPLICABLE</p>
                <p className="textCGV">
                    Chaque Partie déclare qu’elle respecte la réglementation applicable à son activité. D’une manière générale, l’Utilisateur garantit que les informations adressées via les Services de Sortouch ne contreviennent à aucune disposition légale, réglementaire ou résultant d’une convention internationale qui lui serait applicable et notamment aux dispositions en vigueur en France, dans l’Etat dans lequel l’Utilisateur exerce son activité et dans l’Etat dans lequel résident les personnes figurant dans les conversations, ni aux droits des tiers.
                </p>
            </div>
            <div className="contentCGV">
                <p className="titleCGV">DROITS DE PROPRIÉTÉ INTELLECTUELLE ET INDUSTRIELLE DE SORTOUCH</p>
                <p className="textCGV">
                    Tous les programmes, les services, les processus, les designs, les logiciels, les technologies, les marques et les noms commerciaux, les inventions figurant sur le Site, accessible via le Site ou via les Services de Sortouch sont la propriété de Thomas Dryjard Des Garniers.
                    L’Utilisateur s’engage à ne pas utiliser, de quelque manière que ce soit, le Site, les Services ou l’un des éléments énoncé supra pour d’autres fins que celles prévues aux présentes.
                </p>
            </div>
            <div className="contentCGV">
                <p className="titleCGV">PROTECTION DES DONNÉES PERSONNELLES DES TIERS</p>
                <p className="textCGV">
                    Sortouch a accès aux informations contenues dans les conversations créées par les Utilisateurs.
                    Ces données sont stockées sur des serveurs sécurisés et font l’objet d’un traitement informatique afin de fournir la prestation souscrite par l’Utilisateur et améliorer les Services de Sortouch.
                    Sortouch s’engage à ne pas céder ni louer les données contenues dans les conversations des Utilisateurs de ses Services.
                    La divulgation à des tiers des données à caractère personnel ne pourra intervenir que sur autorisation de l’Utilisateur attestant que le titulaire des données à caractère personnel a lui-même autorisé cette divulgation ou sur demande des autorités légalement compétentes, sur réquisition judiciaire, ou dans le cadre d’un contentieux judiciaire.
                </p>
            </div>
            <Footer />
        </div>
    )
}

export default CGV