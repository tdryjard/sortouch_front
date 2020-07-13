import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import url from '../../api/url'
import './Partner.scss'

const Partner = () => {
    const [userId, setUserId] = useState()
    const [type, setType] = useState()
    const [loadGenerate, setLoadgenerate] = useState(false)
    const [popupGenerate, setPopupGenerate] = useState(false)
    const [nameClient, setNameClient] = useState('')
    const [token, setToken] = useState()
    const [ongletSelect, setOngletSelect] = useState('client sub')
    const [resGenerate, setResGenerate] = useState([])
    const [resActivate, setResActivate] = useState([])
    const [modelsId, setModelsId] = useState([])
    const [nbStandard, setNbStandard] = useState(0)
    const [nbExpert, setNbExpert] = useState(0)
    const [gain, setGain] = useState(0)
    const [clientActive, setClientActive] = useState()


    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
            setType(localStorage.getItem('type'))
            setToken(localStorage.getItem('token'))
        }
    }, [])

    useEffect(() => {
        if (loadGenerate) {
            if (nameClient) {
                generateAccount(generatePassword(), generateEmail())
            } else {
                setLoadgenerate(false)
                alert("veuillez entrer un nom client")
            }
        }
    }, [loadGenerate])

    useEffect(() => {
        findToPartner()
    }, [userId, token, loadGenerate])

    const findToPartner = async () => {
        let generate = []
        let models = []
        const res = await fetch(`${url}/user/findToPartner/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Acces-Control-Allow-Origin': { origin },
                'authorization': token
            }
        })
        let result = []
        result = await res.json()
        if (result.length > 0) {
            generate = result.filter(res => res.mdp_generate && res.email_generate)
            const activate = result.filter(res => !(res.mdp_generate && res.email_generate))

            let plan1 = 0
            let plan2 = 0;
            for (let i = 0; i < activate.length; i++) {
                if (activate[i].type === "standard") plan1++;
                if (activate[i].type === "expert") plan2++;
            }
            setNbStandard(plan1)
            setNbExpert(plan2)
            setGain((plan1 * (30 / 100 * 60)) + (plan2 * (90 * 30 / 100)))
            setResActivate(activate)
        }
        if (res) {
            for (let i = 0; generate.length > i; i++) {
                let result = await fetch(`${url}/model/findAll/${generate[i].id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Acces-Control-Allow-Origin': { origin },
                        'authorization': token
                    }
                })
                let resId = await result.json()
                models.push(resId[0].id)
            }
            setModelsId(models)
        }
        setResGenerate(generate)
    }

    function generatePassword() {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    function generateEmail() {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return `${retVal}@sortouch.com`;
    }

    const getNameClient = (e) => {
        setNameClient(e.target.value)
    }

    const generateAccount = async (password, mail) => {
        const response = await fetch(`${url}/user/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Acces-Control-Allow-Origin': { origin }
            },
            body: JSON.stringify({
                email: mail,
                password: password,
                type: 'free'
            })
        });
        const data = await response.json();

        if (data.data) {
            const response = await fetch(`${url}/user/connect`, {
                method: 'POST',
                body: JSON.stringify({
                    email: mail,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // Récupération du status de la requête
            const result = await response.json();

            // CREATION EXEMPLE CHATBOT //

            const userIdGenerate = data.data.id
            const token = await result.token


            if (data.data) {
                let modelCreate = await fetch(url + '/model/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Acces-Control-Allow-Origin': { origin },
                        'authorization': token
                    },
                    body: JSON.stringify({
                        name: 'exemple chatbot',
                        user_id: userIdGenerate
                    })
                });
                const model = await modelCreate.json()
                const modelFirst = model.id
                if (modelCreate) {
                    let postContainerOne = await fetch(url + '/container/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Acces-Control-Allow-Origin': { origin },
                            'authorization': token
                        },
                        body: JSON.stringify({
                            content_type: 'question',
                            user_id: userIdGenerate,
                            ordering: 1,
                            response_id: null,
                            model_id: modelFirst
                        })
                    })
                    if (postContainerOne) {
                        const questionFirstResponse = await fetch(url + '/question/add', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Acces-Control-Allow-Origin': { origin },
                                'authorization': token
                            },
                            body: JSON.stringify({
                                content: 'Bonjour, que puis je faire pour vous ?',
                                user_id: userIdGenerate,
                                model_id: modelFirst
                            })
                        });
                        if (questionFirstResponse) {
                            const containerFirst = await postContainerOne.json()
                            const questionFirst = await questionFirstResponse.json()
                            const questionFirstId = questionFirst.id
                            const containerFirstId = containerFirst.id
                            const relationFirst = await fetch(`${url}/relation/add`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Acces-Control-Allow-Origin': { origin },
                                    'authorization': token
                                },
                                body: JSON.stringify({
                                    question_id: questionFirstId,
                                    user_id: userIdGenerate,
                                    model_id: modelFirst,
                                    container_id: containerFirstId
                                })
                            })
                            if (relationFirst) {
                                let postContainerTwo = await fetch(url + '/container/create', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Acces-Control-Allow-Origin': { origin },
                                        'authorization': token
                                    },
                                    body: JSON.stringify({
                                        content_type: 'response',
                                        user_id: userIdGenerate,
                                        ordering: 2,
                                        response_id: null,
                                        model_id: modelFirst
                                    })
                                })
                                if (postContainerTwo) {
                                    const responseFirst = await fetch(url + '/response/add', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Acces-Control-Allow-Origin': { origin },
                                            'authorization': token
                                        },
                                        body: JSON.stringify({
                                            content: 'En savoir plus sur vos services',
                                            user_id: userIdGenerate,
                                            model_id: modelFirst
                                        })
                                    })
                                    if (responseFirst) {
                                        const responseTwo = await fetch(url + '/response/add', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Acces-Control-Allow-Origin': { origin },
                                                'authorization': token
                                            },
                                            body: JSON.stringify({
                                                content: `J'aimerais contacter le service après vente`,
                                                user_id: userIdGenerate,
                                                model_id: modelFirst
                                            })
                                        })
                                        if (responseTwo) {
                                            const containerTwo = await postContainerTwo.json()
                                            const responseFirstJson = await responseFirst.json()
                                            const responseFirstId = responseFirstJson.id
                                            const containerTwoId = containerTwo.id
                                            const relationTwo = await fetch(`${url}/relation/add`, {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Acces-Control-Allow-Origin': { origin },
                                                    'authorization': token
                                                },
                                                body: JSON.stringify({
                                                    response_id: responseFirstId,
                                                    user_id: userIdGenerate,
                                                    model_id: modelFirst,
                                                    container_id: containerTwoId
                                                })
                                            })
                                            if (relationTwo) {
                                                const responseTwoJson = await responseTwo.json()
                                                const responseTwoId = responseTwoJson.id
                                                const relationThree = await fetch(`${url}/relation/add`, {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Acces-Control-Allow-Origin': { origin },
                                                        'authorization': token
                                                    },
                                                    body: JSON.stringify({
                                                        response_id: responseTwoId,
                                                        user_id: userIdGenerate,
                                                        model_id: modelFirst,
                                                        container_id: containerTwoId
                                                    })
                                                })
                                                if (relationThree) {
                                                    let postContainerThree = await fetch(url + '/container/create', {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Acces-Control-Allow-Origin': { origin },
                                                            'authorization': token
                                                        },
                                                        body: JSON.stringify({
                                                            content_type: 'question',
                                                            user_id: userIdGenerate,
                                                            ordering: 3,
                                                            response_id: responseFirstId,
                                                            model_id: modelFirst
                                                        })
                                                    })
                                                    if (postContainerThree) {
                                                        let postContainerFour = await fetch(url + '/container/create', {
                                                            method: 'POST',
                                                            headers: {
                                                                'Content-Type': 'application/json',
                                                                'Acces-Control-Allow-Origin': { origin },
                                                                'authorization': token
                                                            },
                                                            body: JSON.stringify({
                                                                content_type: 'question',
                                                                user_id: userIdGenerate,
                                                                ordering: 3,
                                                                response_id: responseTwoId,
                                                                model_id: modelFirst
                                                            })
                                                        })
                                                        if (postContainerFour) {
                                                            const questionTwo = await fetch(url + '/question/add', {
                                                                method: 'POST',
                                                                headers: {
                                                                    'Content-Type': 'application/json',
                                                                    'Acces-Control-Allow-Origin': { origin },
                                                                    'authorization': token
                                                                },
                                                                body: JSON.stringify({
                                                                    content: 'Très bien, laissez nous vos coordonnées et nous vous recontacterons rapidement !',
                                                                    user_id: userIdGenerate,
                                                                    model_id: modelFirst
                                                                })
                                                            })
                                                            if (questionTwo) {
                                                                const containerThreeJson = await postContainerThree.json()
                                                                const containerThreeId = containerThreeJson.id
                                                                const questionTwoJson = await questionTwo.json()
                                                                const questionTwoId = questionTwoJson.id
                                                                const relationThree = await fetch(`${url}/relation/add`, {
                                                                    method: 'POST',
                                                                    headers: {
                                                                        'Content-Type': 'application/json',
                                                                        'Acces-Control-Allow-Origin': { origin },
                                                                        'authorization': token
                                                                    },
                                                                    body: JSON.stringify({
                                                                        question_id: questionTwoId,
                                                                        user_id: userIdGenerate,
                                                                        model_id: modelFirst,
                                                                        container_id: containerThreeId
                                                                    })
                                                                })
                                                                if (relationThree) {
                                                                    const containerFourJson = await postContainerFour.json()
                                                                    const containerFourId = containerFourJson.id
                                                                    const relationThree = await fetch(`${url}/relation/add`, {
                                                                        method: 'POST',
                                                                        headers: {
                                                                            'Content-Type': 'application/json',
                                                                            'Acces-Control-Allow-Origin': { origin },
                                                                            'authorization': token
                                                                        },
                                                                        body: JSON.stringify({
                                                                            question_id: questionTwoId,
                                                                            user_id: userIdGenerate,
                                                                            model_id: modelFirst,
                                                                            container_id: containerFourId
                                                                        })
                                                                    })
                                                                    if (relationThree) {
                                                                        let containerFive = await fetch(url + '/container/create', {
                                                                            method: 'POST',
                                                                            headers: {
                                                                                'Content-Type': 'application/json',
                                                                                'Acces-Control-Allow-Origin': { origin },
                                                                                'authorization': token
                                                                            },
                                                                            body: JSON.stringify({
                                                                                content_type: 'response',
                                                                                user_id: userIdGenerate,
                                                                                ordering: 4,
                                                                                response_id: responseFirstId,
                                                                                model_id: modelFirst
                                                                            })
                                                                        })
                                                                        if (containerFive) {
                                                                            let containerSix = await fetch(url + '/container/create', {
                                                                                method: 'POST',
                                                                                headers: {
                                                                                    'Content-Type': 'application/json',
                                                                                    'Acces-Control-Allow-Origin': { origin },
                                                                                    'authorization': token
                                                                                },
                                                                                body: JSON.stringify({
                                                                                    content_type: 'response',
                                                                                    user_id: userIdGenerate,
                                                                                    ordering: 4,
                                                                                    response_id: responseTwoId,
                                                                                    model_id: modelFirst
                                                                                })
                                                                            })
                                                                            if (containerSix) {
                                                                                const responseThree = await fetch(url + '/response/add', {
                                                                                    method: 'POST',
                                                                                    headers: {
                                                                                        'Content-Type': 'application/json',
                                                                                        'Acces-Control-Allow-Origin': { origin },
                                                                                        'authorization': token
                                                                                    },
                                                                                    body: JSON.stringify({
                                                                                        content: `D'accord :)`,
                                                                                        user_id: userIdGenerate,
                                                                                        model_id: modelFirst
                                                                                    })
                                                                                })
                                                                                if (responseThree) {
                                                                                    const responseFour = await fetch(url + '/response/add', {
                                                                                        method: 'POST',
                                                                                        headers: {
                                                                                            'Content-Type': 'application/json',
                                                                                            'Acces-Control-Allow-Origin': { origin },
                                                                                            'authorization': token
                                                                                        },
                                                                                        body: JSON.stringify({
                                                                                            content: `D'accord :)`,
                                                                                            user_id: userIdGenerate,
                                                                                            model_id: modelFirst
                                                                                        })
                                                                                    })
                                                                                    if (responseFour) {
                                                                                        const responseThreeJson = await responseThree.json()
                                                                                        const responseThreeId = responseThreeJson.id
                                                                                        const containerFiveJson = await containerFive.json()
                                                                                        const containerFiveId = containerFiveJson.id
                                                                                        const relationThree = await fetch(`${url}/relation/add`, {
                                                                                            method: 'POST',
                                                                                            headers: {
                                                                                                'Content-Type': 'application/json',
                                                                                                'Acces-Control-Allow-Origin': { origin },
                                                                                                'authorization': token
                                                                                            },
                                                                                            body: JSON.stringify({
                                                                                                response_id: responseThreeId,
                                                                                                user_id: userIdGenerate,
                                                                                                model_id: modelFirst,
                                                                                                container_id: containerFiveId
                                                                                            })
                                                                                        })
                                                                                        if (relationThree) {
                                                                                            const responseFourJson = await responseFour.json()
                                                                                            const responseFourId = responseFourJson.id
                                                                                            const containerSixJson = await containerSix.json()
                                                                                            const containerSixId = containerSixJson.id
                                                                                            const relationThree = await fetch(`${url}/relation/add`, {
                                                                                                method: 'POST',
                                                                                                headers: {
                                                                                                    'Content-Type': 'application/json',
                                                                                                    'Acces-Control-Allow-Origin': { origin },
                                                                                                    'authorization': token
                                                                                                },
                                                                                                body: JSON.stringify({
                                                                                                    response_id: responseFourId,
                                                                                                    user_id: userIdGenerate,
                                                                                                    model_id: modelFirst,
                                                                                                    container_id: containerSixId
                                                                                                })
                                                                                            })
                                                                                            if (relationThree) {
                                                                                                const categoryFirst = await fetch(url + '/category/add', {
                                                                                                    method: 'POST',
                                                                                                    headers: {
                                                                                                        'Content-Type': 'application/json',
                                                                                                        'Acces-Control-Allow-Origin': { origin },
                                                                                                        'authorization': token
                                                                                                    },
                                                                                                    body: JSON.stringify({
                                                                                                        name: "Service après vente",
                                                                                                        user_id: userIdGenerate,
                                                                                                        model_id: modelFirst
                                                                                                    })
                                                                                                });
                                                                                                if (categoryFirst) {
                                                                                                    const categoryTwo = await fetch(url + '/category/add', {
                                                                                                        method: 'POST',
                                                                                                        headers: {
                                                                                                            'Content-Type': 'application/json',
                                                                                                            'Acces-Control-Allow-Origin': { origin },
                                                                                                            'authorization': token
                                                                                                        },
                                                                                                        body: JSON.stringify({
                                                                                                            name: "Renseignement services",
                                                                                                            user_id: userIdGenerate,
                                                                                                            model_id: modelFirst
                                                                                                        })
                                                                                                    })
                                                                                                    if (categoryTwo) {
                                                                                                        let containerSeven = await fetch(url + '/container/create', {
                                                                                                            method: 'POST',
                                                                                                            headers: {
                                                                                                                'Content-Type': 'application/json',
                                                                                                                'Acces-Control-Allow-Origin': { origin },
                                                                                                                'authorization': token
                                                                                                            },
                                                                                                            body: JSON.stringify({
                                                                                                                content_type: 'category',
                                                                                                                user_id: userIdGenerate,
                                                                                                                ordering: 5,
                                                                                                                response_id: responseFourId,
                                                                                                                model_id: modelFirst
                                                                                                            })
                                                                                                        })
                                                                                                        if (containerSeven) {
                                                                                                            const categoryFirstJson = await categoryFirst.json()
                                                                                                            const categoryFirstId = categoryFirstJson.id
                                                                                                            const containerSevenJson = await containerSeven.json()
                                                                                                            const containerSevenId = containerSevenJson.id
                                                                                                            const relationFour = await fetch(`${url}/relation/add`, {
                                                                                                                method: 'POST',
                                                                                                                headers: {
                                                                                                                    'Content-Type': 'application/json',
                                                                                                                    'Acces-Control-Allow-Origin': { origin },
                                                                                                                    'authorization': token
                                                                                                                },
                                                                                                                body: JSON.stringify({
                                                                                                                    category_id: categoryFirstId,
                                                                                                                    user_id: userIdGenerate,
                                                                                                                    model_id: modelFirst,
                                                                                                                    container_id: containerSevenId
                                                                                                                })
                                                                                                            })
                                                                                                            if (relationFour) {
                                                                                                                let containerHeight = await fetch(url + '/container/create', {
                                                                                                                    method: 'POST',
                                                                                                                    headers: {
                                                                                                                        'Content-Type': 'application/json',
                                                                                                                        'Acces-Control-Allow-Origin': { origin },
                                                                                                                        'authorization': token
                                                                                                                    },
                                                                                                                    body: JSON.stringify({
                                                                                                                        content_type: 'category',
                                                                                                                        user_id: userIdGenerate,
                                                                                                                        ordering: 5,
                                                                                                                        response_id: responseThreeId,
                                                                                                                        model_id: modelFirst
                                                                                                                    })
                                                                                                                })
                                                                                                                if (containerHeight) {
                                                                                                                    const categoryTwoJson = await categoryTwo.json()
                                                                                                                    const categoryTwoId = categoryTwoJson.id
                                                                                                                    const containerHeightJson = await containerHeight.json()
                                                                                                                    const containerHeightId = containerHeightJson.id
                                                                                                                    const relationFour = await fetch(`${url}/relation/add`, {
                                                                                                                        method: 'POST',
                                                                                                                        headers: {
                                                                                                                            'Content-Type': 'application/json',
                                                                                                                            'Acces-Control-Allow-Origin': { origin },
                                                                                                                            'authorization': token
                                                                                                                        },
                                                                                                                        body: JSON.stringify({
                                                                                                                            category_id: categoryTwoId,
                                                                                                                            user_id: userIdGenerate,
                                                                                                                            model_id: modelFirst,
                                                                                                                            container_id: containerHeightId
                                                                                                                        })
                                                                                                                    })
                                                                                                                    if (relationFour) {
                                                                                                                        const resUpdateUser = await fetch(`${url}/user/update/${userIdGenerate}`, {
                                                                                                                            method: 'PUT',
                                                                                                                            headers: {
                                                                                                                                'Content-Type': 'application/json',
                                                                                                                                'authorization': token
                                                                                                                            },
                                                                                                                            body: JSON.stringify({
                                                                                                                                mdp_generate: password,
                                                                                                                                email_generate: mail,
                                                                                                                                name_client: nameClient,
                                                                                                                                partner_id: userId
                                                                                                                            })
                                                                                                                        })
                                                                                                                        setLoadgenerate(false)
                                                                                                                        setOngletSelect('client generate')
                                                                                                                    }

                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    return (
        <div className="containerPartner">
            <title>Sortouch : partenaire</title>
            <div className="containerNav">
                <Link to="/" className="linkNavbar" >Menu</Link>
                <Link to="/installer-wordpress" className="linkNavbar" >Installer chatbot sur Wordpress</Link>
                <Link to="/installer-react" className="linkNavbar" >Installer chatbot sur ReactJs</Link>
            </div>
            <div className="contentPartner">
                {window.innerWidth > 1280 ?
                <div className="containerStats">
                    <p className="gainPartner">{nbStandard} formules standard</p>
                    <p className="gainPartner">{nbExpert} formules expert</p>
                    <p className="totalGainPartner">{gain}€ revenus mensuel</p>
                </div>
                :
                <div className="containerStats">
                    <p style={{fontSize: "15px"}} className="gainPartner">{nbStandard} formules standard</p>
                    <p style={{fontSize: "15px"}} className="gainPartner">{nbExpert} formules expert</p>
                    <p style={{fontSize: "15px"}} className="totalGainPartner">{gain}€ revenus mensuel</p>
                </div>}
                <div className="containerOngletsPartner">
                    <button onClick={() => { setOngletSelect('client sub'); setClientActive(0) }} className={ongletSelect === 'client sub' ? "ongletPartnerSubActive" : "ongletPartnerSub"}>Comptes activés</button>
                    <button onClick={() => { setOngletSelect('client generate'); setClientActive(0) }} className={ongletSelect === 'client generate' ? "ongletPartnerSubActive" : "ongletPartnerSub"}>Comptes générés</button>
                    <div className="containerGenerate">
                        <input maxLength="30" placeholder="nom client" className="inputGenerate" onChange={getNameClient} />
                        {!loadGenerate && <button onClick={() => { setLoadgenerate(true) }} className="buttonGenerate">Générer compte client</button>}
                        {loadGenerate && <img src={require('../registration/image/loading.gif')} className="loadGenerate" alt="load" />}
                    </div>
                </div>
                <div className="containerListPartner">
                    {window.innerWidth > 1280 ?
                        ongletSelect === 'client generate' ?
                            <>
                                <div className="headRowPartner">
                                    <p style={{ fontSize: "22px" }} className="littleRowPartner">Nom du client</p>
                                    <p style={{ fontSize: "22px" }} className="littleRowPartner">Mot de passe généré</p>
                                    <p style={{ fontSize: "22px" }} className="littleRowPartner">Email générée</p>
                                    <p style={{ fontSize: "22px" }} className="littleRowPartner">user id</p>
                                    <p style={{ fontSize: "22px" }} className="littleRowPartner">chatbot id</p>
                                </div>
                                {resGenerate.length > 0 ? resGenerate.map((res, index) => {
                                    return (
                                        <div className="rowPartner">
                                            <p className="littleRowPartner">{res.name_client}</p>
                                            <p className="littleRowPartner">{res.mdp_generate}</p>
                                            <p className="littleRowPartner">{res.email_generate}</p>
                                            <p className="littleRowPartner">{res.id}</p>
                                            <p className="littleRowPartner">{modelsId[index]}</p>
                                        </div>)
                                })
                                :
                                <p className="noResultPartner">Aucun compte activé</p>}
                            </>
                            :
                            <>
                                <div className="headRowPartner">
                                    <p style={{ fontSize: "22px" }} className="titleRowPartner1">Nom du client</p>
                                    <p style={{ fontSize: "22px" }} className="titleRowPartner2">Type d'abonnement</p>
                                    <p style={{ fontSize: "22px" }} className="titleRowPartner3">Gains</p>
                                </div>
                                {resActivate.length > 0 ? resActivate.map(res => {
                                    return (
                                        <div className="rowPartner">
                                            <p className="titleRowPartner1">{res.name_client}</p>
                                            <p className="titleRowPartner2">{res.type}</p>
                                            <p className="titleRowPartner3">{res.type === "standard" ? `+${60 * 30 / 100}€ par mois` : res.type === "expert" ? `+${80 * 30 / 100}€ par mois` : "pas abonné"}</p>
                                        </div>)
                                })
                                :
                                <p className="noResultPartner">Aucun compte généré</p>}
                            </>
                        :
                        !(ongletSelect === 'client generate') ?
                            <>
                                {!clientActive &&
                                    <p className="titleRowPartnerMobile">Nom du client</p>}
                                {resActivate.length > 0 ? resActivate.map((res, index) => {
                                    return (
                                        !clientActive ?
                                            <div onClick={() => { setClientActive(res.id) }} className="rowPartner">
                                                <p style={{margin: "5px", fontSize: "18px"}} className="titleRowPartnerMobile">{res.name_client}</p>
                                            </div>
                                            : clientActive === res.id &&
                                            <div className="containerClientPartnerActive">
                                                <button onClick={() => {setClientActive(0)}} className="backViewClientPartner">Voir autres clients</button>
                                                <p className="titleRowPartnerMobile">Nom du client</p>
                                                <p className="littleRowPartnerMobile">{res.name_client}</p>
                                                <p className="titleRowPartnerMobile">Type d'abonnement</p>
                                                <p className="littleRowPartnerMobile">{res.type}</p>
                                                <p className="titleRowPartnerMobile">Gains</p>
                                                <p className="littleRowPartnerMobile">{res.type === "standard" ? `+${60 * 30 / 100}€ par mois` : res.type === "expert" ? `+${80 * 30 / 100}€ par mois` : "pas abonné"}</p>
                                            </div>)
                                })
                                :
                                <p className="noResultPartner">Aucun compte activé</p>}
                            </>
                            :
                            <>
                                {!clientActive &&
                                    <p className="titleRowPartnerMobile">Nom du client</p>}
                                {resGenerate.length > 0 ? resGenerate.map((res, index) => {
                                    return (
                                        !clientActive ?
                                            <div onClick={() => { setClientActive(res.id) }} className="rowPartner">
                                                <p style={{margin: "5px", fontSize: "18px"}} className="titleRowPartnerMobile">{res.name_client}</p>
                                            </div>
                                            : clientActive === res.id &&
                                            <div className="containerClientPartnerActive">
                                                <button onClick={() => {setClientActive(0)}} className="backViewClientPartner">Voir autres clients</button>
                                                <p className="titleRowPartnerMobile">Nom du client</p>
                                                <p className="littleRowPartnerMobile">{res.name_client}</p>
                                                <p className="titleRowPartnerMobile">Mot de passe généré</p>
                                                <p className="littleRowPartnerMobile">{res.mdp_generate}</p>
                                                <p className="titleRowPartnerMobile">Email générée</p>
                                                <p className="littleRowPartnerMobile">{res.email_generate}</p>
                                                <p className="titleRowPartnerMobile">User id</p>
                                                <p className="littleRowPartnerMobile">{res.id}</p>
                                                <p className="titleRowPartnerMobile">Chatbot id</p>
                                                <p className="littleRowPartnerMobile">{modelsId[index]}</p>
                                            </div>)
                                })
                                :
                                <p className="noResultPartner">Aucun compte généré</p>}
                            </>}
                </div>
            </div>
        </div>
    )
}

export default Partner