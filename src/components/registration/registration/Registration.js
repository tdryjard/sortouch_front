import React, { useState } from 'react'
import url from '../../../api/url'
import { Redirect, Link } from 'react-router-dom'
import Navbar from '../../navbar/Navbar'
import MenuBurger from '../../menuBurger/MenuBurger'
import { useForm } from "react-hook-form";
import './Registration.scss'

const Registration = (props) => {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVerif, setPasswordVerif] = useState('')
    const [alert, setAlert] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [submit, setSubmit] = useState(false)

    const { register, handleSubmit } = useForm()

    function validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


    const validSub = async () => {
        if (!validateEmail(mail)) setAlert('Veuillez entrer une email correct')
        else if (password !== passwordVerif) setAlert('mot de passe différents')
        else if (password.split('').length < 8) setAlert('Veuillez entre un mot de passe entre 8 et 25 caractères svp')
        else {
            setSubmit(true)
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

                if (result && result.status === 200) {
                    localStorage.setItem("userId", result.id)
                    localStorage.setItem('token', result.token)
                }


                // CREATION EXEMPLE CHATBOT //

                const userId = data.data.id
                const token = await result.token


                if (data.data) {
                    let modelCreate = await fetch(url + '/model/add', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Credentials': true,
                            'authorization': token
                        },
                        body: JSON.stringify({
                            name: 'exemple',
                            user_id: userId
                        })
                    });
                    const model = await modelCreate.json()
                    const modelFirst = model.id
                    if (modelCreate) {
                        let postContainerOne = await fetch(url + '/container/create', {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Credentials': true,
                                'authorization': token
                            },
                            body: JSON.stringify({
                                content_type: 'question',
                                user_id: userId,
                                ordering: 1,
                                response_id: null,
                                model_id: modelFirst
                            })
                        })
                        if (postContainerOne) {
                            const questionFirstResponse = await fetch(url + '/question/add', {
                                method: 'POST',
                                credentials: 'include',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Credentials': true,
                                    'authorization': token
                                },
                                body: JSON.stringify({
                                    content: 'Bonjour, que puis je faire pour vous ?',
                                    user_id: userId,
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
                                    credentials: 'include',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Access-Control-Allow-Credentials': true,
                                        'authorization': token
                                    },
                                    body: JSON.stringify({
                                        question_id: questionFirstId,
                                        user_id: userId,
                                        model_id: modelFirst,
                                        container_id: containerFirstId
                                    })
                                })
                                if (relationFirst) {
                                    let postContainerTwo = await fetch(url + '/container/create', {
                                        method: 'POST',
                                        credentials: 'include',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Access-Control-Allow-Credentials': true,
                                            'authorization': token
                                        },
                                        body: JSON.stringify({
                                            content_type: 'response',
                                            user_id: userId,
                                            ordering: 2,
                                            response_id: null,
                                            model_id: modelFirst
                                        })
                                    })
                                    if (postContainerTwo) {
                                        const responseFirst = await fetch(url + '/response/add', {
                                            method: 'POST',
                                            credentials: 'include',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Access-Control-Allow-Credentials': true,
                                                'authorization': token
                                            },
                                            body: JSON.stringify({
                                                content: 'En savoir plus sur vos services',
                                                user_id: userId,
                                                model_id: modelFirst
                                            })
                                        })
                                        if (responseFirst) {
                                            const responseTwo = await fetch(url + '/response/add', {
                                                method: 'POST',
                                                credentials: 'include',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Access-Control-Allow-Credentials': true,
                                                    'authorization': token
                                                },
                                                body: JSON.stringify({
                                                    content: `J'aimerais contacter le service après vente`,
                                                    user_id: userId,
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
                                                    credentials: 'include',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Access-Control-Allow-Credentials': true,
                                                        'authorization': token
                                                    },
                                                    body: JSON.stringify({
                                                        response_id: responseFirstId,
                                                        user_id: userId,
                                                        model_id: modelFirst,
                                                        container_id: containerTwoId
                                                    })
                                                })
                                                if (relationTwo) {
                                                    const responseTwoJson = await responseTwo.json()
                                                    const responseTwoId = responseTwoJson.id
                                                    const relationThree = await fetch(`${url}/relation/add`, {
                                                        method: 'POST',
                                                        credentials: 'include',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Access-Control-Allow-Credentials': true,
                                                            'authorization': token
                                                        },
                                                        body: JSON.stringify({
                                                            response_id: responseTwoId,
                                                            user_id: userId,
                                                            model_id: modelFirst,
                                                            container_id: containerTwoId
                                                        })
                                                    })
                                                    if (relationThree) {
                                                        let postContainerThree = await fetch(url + '/container/create', {
                                                            method: 'POST',
                                                            credentials: 'include',
                                                            headers: {
                                                                'Content-Type': 'application/json',
                                                                'Access-Control-Allow-Credentials': true,
                                                                'authorization': token
                                                            },
                                                            body: JSON.stringify({
                                                                content_type: 'question',
                                                                user_id: userId,
                                                                ordering: 3,
                                                                response_id: responseFirstId,
                                                                model_id: modelFirst
                                                            })
                                                        })
                                                        if (postContainerThree) {
                                                            let postContainerFour = await fetch(url + '/container/create', {
                                                                method: 'POST',
                                                                credentials: 'include',
                                                                headers: {
                                                                    'Content-Type': 'application/json',
                                                                    'Access-Control-Allow-Credentials': true,
                                                                    'authorization': token
                                                                },
                                                                body: JSON.stringify({
                                                                    content_type: 'question',
                                                                    user_id: userId,
                                                                    ordering: 3,
                                                                    response_id: responseTwoId,
                                                                    model_id: modelFirst
                                                                })
                                                            })
                                                            if (postContainerFour) {
                                                                const questionTwo = await fetch(url + '/question/add', {
                                                                    method: 'POST',
                                                                    credentials: 'include',
                                                                    headers: {
                                                                        'Content-Type': 'application/json',
                                                                        'Access-Control-Allow-Credentials': true,
                                                                        'authorization': token
                                                                    },
                                                                    body: JSON.stringify({
                                                                        content: 'Très bien, laissez nous vos coordonnées et nous vous recontacterons rapidement !',
                                                                        user_id: userId,
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
                                                                        credentials: 'include',
                                                                        headers: {
                                                                            'Content-Type': 'application/json',
                                                                            'Access-Control-Allow-Credentials': true,
                                                                            'authorization': token
                                                                        },
                                                                        body: JSON.stringify({
                                                                            question_id: questionTwoId,
                                                                            user_id: userId,
                                                                            model_id: modelFirst,
                                                                            container_id: containerThreeId
                                                                        })
                                                                    })
                                                                    if (relationThree) {
                                                                        const containerFourJson = await postContainerFour.json()
                                                                        const containerFourId = containerFourJson.id
                                                                        const relationThree = await fetch(`${url}/relation/add`, {
                                                                            method: 'POST',
                                                                            credentials: 'include',
                                                                            headers: {
                                                                                'Content-Type': 'application/json',
                                                                                'Access-Control-Allow-Credentials': true,
                                                                                'authorization': token
                                                                            },
                                                                            body: JSON.stringify({
                                                                                question_id: questionTwoId,
                                                                                user_id: userId,
                                                                                model_id: modelFirst,
                                                                                container_id: containerFourId
                                                                            })
                                                                        })
                                                                        if (relationThree) {
                                                                            let containerFive = await fetch(url + '/container/create', {
                                                                                method: 'POST',
                                                                                credentials: 'include',
                                                                                headers: {
                                                                                    'Content-Type': 'application/json',
                                                                                    'Access-Control-Allow-Credentials': true,
                                                                                    'authorization': token
                                                                                },
                                                                                body: JSON.stringify({
                                                                                    content_type: 'response',
                                                                                    user_id: userId,
                                                                                    ordering: 4,
                                                                                    response_id: responseFirstId,
                                                                                    model_id: modelFirst
                                                                                })
                                                                            })
                                                                            if (containerFive) {
                                                                                let containerSix = await fetch(url + '/container/create', {
                                                                                    method: 'POST',
                                                                                    credentials: 'include',
                                                                                    headers: {
                                                                                        'Content-Type': 'application/json',
                                                                                        'Access-Control-Allow-Credentials': true,
                                                                                        'authorization': token
                                                                                    },
                                                                                    body: JSON.stringify({
                                                                                        content_type: 'response',
                                                                                        user_id: userId,
                                                                                        ordering: 4,
                                                                                        response_id: responseTwoId,
                                                                                        model_id: modelFirst
                                                                                    })
                                                                                })
                                                                                if (containerSix) {
                                                                                    const responseThree = await fetch(url + '/response/add', {
                                                                                        method: 'POST',
                                                                                        credentials: 'include',
                                                                                        headers: {
                                                                                            'Content-Type': 'application/json',
                                                                                            'Access-Control-Allow-Credentials': true,
                                                                                            'authorization': token
                                                                                        },
                                                                                        body: JSON.stringify({
                                                                                            content: `D'accord :)`,
                                                                                            user_id: userId,
                                                                                            model_id: modelFirst
                                                                                        })
                                                                                    })
                                                                                    if (responseThree) {
                                                                                        const responseFour = await fetch(url + '/response/add', {
                                                                                            method: 'POST',
                                                                                            credentials: 'include',
                                                                                            headers: {
                                                                                                'Content-Type': 'application/json',
                                                                                                'Access-Control-Allow-Credentials': true,
                                                                                                'authorization': token
                                                                                            },
                                                                                            body: JSON.stringify({
                                                                                                content: `D'accord :)`,
                                                                                                user_id: userId,
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
                                                                                                credentials: 'include',
                                                                                                headers: {
                                                                                                    'Content-Type': 'application/json',
                                                                                                    'Access-Control-Allow-Credentials': true,
                                                                                                    'authorization': token
                                                                                                },
                                                                                                body: JSON.stringify({
                                                                                                    response_id: responseThreeId,
                                                                                                    user_id: userId,
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
                                                                                                    credentials: 'include',
                                                                                                    headers: {
                                                                                                        'Content-Type': 'application/json',
                                                                                                        'Access-Control-Allow-Credentials': true,
                                                                                                        'authorization': token
                                                                                                    },
                                                                                                    body: JSON.stringify({
                                                                                                        response_id: responseFourId,
                                                                                                        user_id: userId,
                                                                                                        model_id: modelFirst,
                                                                                                        container_id: containerSixId
                                                                                                    })
                                                                                                })
                                                                                                if (relationThree) {
                                                                                                    const categoryFirst = await fetch(url + '/category/add', {
                                                                                                        method: 'POST',
                                                                                                        credentials: 'include',
                                                                                                        headers: {
                                                                                                            'Content-Type': 'application/json',
                                                                                                            'Access-Control-Allow-Credentials': true,
                                                                                                            'authorization': token
                                                                                                        },
                                                                                                        body: JSON.stringify({
                                                                                                            name: "Service après vente",
                                                                                                            user_id: userId,
                                                                                                            model_id: modelFirst
                                                                                                        })
                                                                                                    });
                                                                                                    if (categoryFirst) {
                                                                                                        const categoryTwo = await fetch(url + '/category/add', {
                                                                                                            method: 'POST',
                                                                                                            credentials: 'include',
                                                                                                            headers: {
                                                                                                                'Content-Type': 'application/json',
                                                                                                                'Access-Control-Allow-Credentials': true,
                                                                                                                'authorization': token
                                                                                                            },
                                                                                                            body: JSON.stringify({
                                                                                                                name: "Renseignement services",
                                                                                                                user_id: userId,
                                                                                                                model_id: modelFirst
                                                                                                            })
                                                                                                        })
                                                                                                        if (categoryTwo) {
                                                                                                            let containerSeven = await fetch(url + '/container/create', {
                                                                                                                method: 'POST',
                                                                                                                credentials: 'include',
                                                                                                                headers: {
                                                                                                                    'Content-Type': 'application/json',
                                                                                                                    'Access-Control-Allow-Credentials': true,
                                                                                                                    'authorization': token
                                                                                                                },
                                                                                                                body: JSON.stringify({
                                                                                                                    content_type: 'category',
                                                                                                                    user_id: userId,
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
                                                                                                                    credentials: 'include',
                                                                                                                    headers: {
                                                                                                                        'Content-Type': 'application/json',
                                                                                                                        'Access-Control-Allow-Credentials': true,
                                                                                                                        'authorization': token
                                                                                                                    },
                                                                                                                    body: JSON.stringify({
                                                                                                                        category_id: categoryFirstId,
                                                                                                                        user_id: userId,
                                                                                                                        model_id: modelFirst,
                                                                                                                        container_id: containerSevenId
                                                                                                                    })
                                                                                                                })
                                                                                                                if (relationFour) {
                                                                                                                    let containerHeight = await fetch(url + '/container/create', {
                                                                                                                        method: 'POST',
                                                                                                                        credentials: 'include',
                                                                                                                        headers: {
                                                                                                                            'Content-Type': 'application/json',
                                                                                                                            'Access-Control-Allow-Credentials': true,
                                                                                                                            'authorization': token
                                                                                                                        },
                                                                                                                        body: JSON.stringify({
                                                                                                                            content_type: 'category',
                                                                                                                            user_id: userId,
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
                                                                                                                            credentials: 'include',
                                                                                                                            headers: {
                                                                                                                                'Content-Type': 'application/json',
                                                                                                                                'Access-Control-Allow-Credentials': true,
                                                                                                                                'authorization': token
                                                                                                                            },
                                                                                                                            body: JSON.stringify({
                                                                                                                                category_id: categoryTwoId,
                                                                                                                                user_id: userId,
                                                                                                                                model_id: modelFirst,
                                                                                                                                container_id: containerHeightId
                                                                                                                            })
                                                                                                                        })

                                                                                                                        localStorage.setItem("type", 'free')
                                                                                                                        localStorage.setItem('popupModel', true)
                                                                                                                        localStorage.setItem('popupEditeur1', true)
                                                                                                                        localStorage.setItem('popupEditeur2', true)
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


                    const save = await localStorage.getItem('token')
                    if (save && response) {
                        setTimeout(() => {
                            setRedirect(true)
                        }, 1000)

                    }

                } else {
                    if (data.inputs && data.inputs[0] === "email") {
                        setAlert("Veuillez entrer une email correct")
                        setSubmit(false)
                    } else if (data.inputs && data.inputs[0] === "password") {
                        setAlert("Veuillez entrer un mot de passe entre 8 et 25 caractères svp")
                        setSubmit(false)
                    }
                }
            }
        }
        setTimeout(() => {
            setAlert('')
        }, 3000)
    }

    const takeMail = (e) => {
        setMail(e.target.value)
    }

    const takePassword = (e) => {
        setPassword(e.target.value)
    }

    const takePasswordVerif = (e) => {
        setPasswordVerif(e.target.value)
    }


    return (
        <div className="containerRegistration">
        <title>Sortouch : inscription</title>
            <meta name="description" content="Créez vous un compte Sortouch facilement pour créer votre premier chatbot, recevoir les des mesages via votre site et collecter des coordonnées" />
            {window.innerWidth > 1280 ?
                <Navbar type={"models"} />
                :
                <MenuBurger type={"models"} />}
            {redirect && !props.location.query ? <Redirect to={{ pathname: `/models` }} />
                : redirect && props.location.query && props.location.query.pricing && <Redirect to='/tarifs' />}
            {!submit ?
                <div className="contentRegister">
                    <h4 className="titleRegister">Inscription</h4>
                    {alert &&
                        <div className="contentAlert">
                            <p className="textAlert">{alert}</p>
                        </div>}
                    <form className="signForm" onSubmit={handleSubmit(validSub)}>
                        <input ref={register} onChange={takeMail} className={alert === "Veuillez entrer une email correct" ? "inputLogError" : "inputLog"} placeholder="email" />
                        <input ref={register} type="password" onChange={takePassword} className={alert === "Veuillez entrer une email correct" || alert === "" ? "inputLog" : "inputLogError"} placeholder="mot de passe" />
                        <input ref={register} type="password" onChange={takePasswordVerif} className={alert === "Veuillez entrer une email correct" || alert === "" ? "inputLog" : "inputLogError"} placeholder="répéter mot de passe" />
                        <button type="submit" className="validLog">S'inscrire</button>
                    </form>
                    {props.location.query && props.location.query.pricing ?
                        <Link to={{ pathname: `/connexion`, query: { pricing: true } }} className="linkRegistration">Connexion</Link>
                        :
                        <Link to={{ pathname: `/connexion` }} className="linkRegistration">Connexion</Link>}
                </div>
                :
                <div className="contentRegister">
                    <p className="textLoadingRegister">Nous construisons votre espace Sortouch</p>
                    <p className="textLoadingRegister">Veuillez patienter</p>
                    <img src={require('../image/loading.gif')} className="loadingGif" />
                </div>}
        </div>
    )
}

export default Registration