import React, { useState, useEffect } from 'react'
import url from '../../../api/url';
import origin from '../../../api/origin';
import useGlobalState from '../../../hooks/useGlobalState';
import { Link } from 'react-router-dom'
import Chatbot from 'sortouch-react'
import './card.css'
import './builder.scss'

const Builder = () => {
    const [containers, setContainers] = useState([])
    const [order, setOrder] = useState(1)
    const { connectClassDisable, classConnectButton } = useGlobalState();
    const [containersReverse, setContainersReverse] = useState()
    const [cardsQuest, setCardsQuest] = useState([])
    const [cardsRes, setCardsRes] = useState([])
    const [cardsCategory, setCardsCategory] = useState([])
    const [responseSelect, setResponseSelect] = useState(0)
    const [responseSelectChanging, setResponseSelectChanging] = useState(false)
    const [storageContainers, setStorageContainers] = useState([])
    const [responseSelected, setResponseSelected] = useState([])
    const [responseBool, setResponseBool] = useState(false)
    const [userId, setUserId] = useState()
    const [modelId, setModelId] = useState()
    const [token, setToken] = useState()
    const [load, setLoad] = useState(true)

    useEffect(() => {
        console.log('dalu')
        if (localStorage.getItem('userId') && (!userId || !token)) {
            setUserId(localStorage.getItem('userId'))
            setToken(localStorage.getItem('token'))
        } else if (!userId || !token) {
            setUserId(sessionStorage.getItem('userId'))
            setToken(sessionStorage.getItem('token'))
        }
        if (!modelId) setModelId(sessionStorage.getItem('modelId'))
    }, [])

    const printContainers = async () => {
            console.log(containers)
            console.log("container")
            try {
                const resJson = await fetch(`${url}/container/findAll/${userId}/${responseSelect}/${modelId}`)
                const res = await resJson.json()
                const storageContainer = await storageContainers
                if (res.length) {
                    const stockRes = res.slice().reverse()
                    if (storageContainer.length > 0 && responseSelect) {
                        let resResult = res.filter(res => res.response_id != null)
                        let newContainer = []
                        if (storageContainer[0].ordering > storageContainer[storageContainer.length - 1].ordering) {
                            for (let i = 0; storageContainer.length > i; i++) {
                                for (let a = 0; a < resResult.length; a++) {
                                    if (resResult[a].id === storageContainer[i].id) storageContainer.splice(i, 1)
                                }
                            }
                            let storageReverse = storageContainer.reverse()
                            newContainer = [...storageReverse, ...resResult]
                        } else {
                            newContainer = [...storageContainer, ...resResult]
                        }
                        for (let i = 0; i < newContainer.length; i++) {
                            if (newContainer[i] && newContainer[i + 1] && newContainer[i].id === newContainer[i + 1].id) newContainer.splice(i, 1)
                        }
                        setContainers(await newContainer)
                        takeCard(newContainer)
                    } else {
                        setContainers(res)
                        takeCard(res)
                    }
                    setContainersReverse(stockRes)
                    setOrder(stockRes[0].ordering + 1)
                } else setOrder(1)

            } catch (error) {

            }
            setStorageContainers(containers)
    }

    useEffect(() => {
            printContainers()
            console.log('dalu')
    }, [responseSelectChanging, userId, modelId, responseBool])

    const takeCard = async (res) => {
        let stock = []
        console.log(res)
        for (let i = 0; i < res.length + 3; i++) {
            if (res[i]) {
                let result = []
                if (res[i].content_type === "question") {
                    const resNoJson = await fetch(`${url}/relation/findCardQuestion/${res[i].id}/${userId}/${modelId}`)
                    result = await resNoJson.json()
                }
                else result = { none: `pas de question container id ${i}` }
                stock = [...stock, result]
                console.log(stock)
                setCardsQuest(stock)
            }
        }
        let stockRes = []
        for (let i = 0; i < res.length + 3; i++) {
            if (res[i]) {
                let result = []
                if (res[i].content_type === "response"){
                    const resNoJson = await fetch(`${url}/relation/findCardResponse/${res[i].id}/${userId}/${modelId}`)
                    result = await resNoJson.json()
                }
                else result = { none: `pas de question container id ${i}` }
                stockRes = [...stockRes, result]
                console.log(stockRes)
                setCardsRes(stockRes)
            }
        }
        let stockCategory = []
        for (let i = 0; i < res.length + 3; i++) {
            if (res[i]) {
                let result = []
                if (res[i].content_type === "category"){
                    const resNoJson = await fetch(`${url}/relation/findCardCategory/${res[i].id}/${userId}/${modelId}`)
                    result = await resNoJson.json()
                }
                else result = { none: `pas de question container id ${i}` }
                stockCategory = [...stockCategory, result]
                setCardsCategory(stockCategory)
            }
        }
        setLoad(true)
        console.log("dal")
    }


    const createContainer = async (type) => {
        let stockContainers = containers
        stockContainers.reverse()
        if (stockContainers[0] && responseSelect !== 0) {
            if (stockContainers[0].content_type === "question" || responseBool === true) {
                try {
                    let postContainerOne = await fetch(url + '/container/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Acces-Control-Allow-Origin': { origin },
                            'authorization': token
                        },
                        body: JSON.stringify({
                            content_type: type,
                            user_id: userId,
                            ordering: order,
                            response_id: responseSelect,
                            model_id: modelId
                        })
                    });
                    if (postContainerOne) {
                        printContainers()
                    }
                } catch (error) {
                }
            } else {
                alert('veuillez selectionner une réponse')
            }
        } else {
            try {
                let postContainer = await fetch(url + '/container/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Acces-Control-Allow-Origin': { origin },
                        'authorization': token
                    },
                    body: JSON.stringify({
                        content_type: type,
                        user_id: userId,
                        ordering: order,
                        model_id: modelId
                    })
                });
                if (postContainer) {
                    printContainers()
                }
            } catch (error) {
            }
        }
        setResponseBool(!responseBool)
    }


    const insertContainerId = async (id, type) => {
        const relations = await fetch(`${url}/relation/find/${userId}/${modelId}`)
        const res = await relations.json()
        const relationsResult = res.filter(relation => relation.onChange === 1)
        if (relationsResult.length > 0) {
            let typeOnChange = "";
            if (relationsResult[0].question_id) {
                typeOnChange = "question"
            } else if (relationsResult[0].response_id) {
                typeOnChange = "response"
            } else if (relationsResult[0].category_id) {
                typeOnChange = "category"
            }
            connectClassDisable()

            if (type === typeOnChange) {
                try {
                    const result = await fetch(`${url}/relation/update/${userId}/${modelId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': `${origin}`,
                            'authorization': token
                        },
                        body: JSON.stringify({
                            container_id: id,
                            onChange: 0
                        })
                    })
                    if (await result) {
                        printContainers()
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                fetch(`${url}/relation/delete/${userId}/${modelId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Acces-Control-Allow-Origin': { origin },
                        'authorization': token
                    }
                })
                alert('veuillez selectionner un contenaire du même type')
            }
            setResponseBool(!responseBool)
        }
    }

    const selectResponse = async function (event) {
        setLoad(false)
        console.log("weice")
        setContainers([])
        const numberCard = parseInt(event.currentTarget.childNodes[0].id.replace('card', ''))
        setResponseSelect(numberCard)
        responseSelected.length = parseInt(event.currentTarget.childNodes[0].id.replace('card', ''))

        const containerIndex = (parseInt(event.currentTarget.childNodes[1].id.replace('container', '')) + 1)
        const stockContainers = containers
        stockContainers.length = containerIndex
        setStorageContainers(stockContainers)


        let stockResponseSelected = ([...responseSelected, numberCard])

        for (let a = 0; a < cardsRes.length; a++) {
            if (cardsRes[a].length) {
                for (let b = 0; b < cardsRes[a].length; b++) {
                    for (let c = 0; c < stockResponseSelected.length; c++) {
                        const nbRes = cardsRes[a].filter(card => stockResponseSelected.includes(card.id))
                        if (nbRes.length > 1) {
                            for (let i = 0; i < stockResponseSelected.length; i++) {
                                for (let a = 0; a < nbRes.length - 1; a++) {
                                    if (nbRes[a].id === (stockResponseSelected[i])) {
                                        stockResponseSelected.splice(i, 1)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        setResponseSelected(stockResponseSelected)
        setTimeout(() => {
            setResponseSelectChanging(!responseSelectChanging)
            setResponseBool(true)
        }, 0)
    }


    const deleteRelationQuestion = async (event) => {
        const containerId = (event.currentTarget.parentNode.id).replace('container', '')
        const cardId = (event.target.id).replace('card', '')
        fetch(`${url}/relation/deleteQuestionCard/${containerId}/${cardId}/${userId}/${modelId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Acces-Control-Allow-Origin': { origin },
                'authorization': token
            }
        })
        fetch(`${url}/container/delete/${containerId}/${userId}/${modelId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Acces-Control-Allow-Origin': { origin },
                'authorization': token
            }
        })
        setResponseSelect(undefined)
        setResponseSelected([])
        setResponseBool(!responseBool)
    }

    const deleteRelationResponse = async (containerIndex, containerId, cardId) => {
        fetch(`${url}/relation/deleteResponseCard/${containerId}/${cardId}/${userId}/${modelId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Acces-Control-Allow-Origin': { origin },
                'authorization': token
            }
        })
        if (cardsRes[containerIndex].length < 2) {
            await fetch(`${url}/container/delete/${containerId}/${userId}/${modelId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Acces-Control-Allow-Origin': { origin },
                    'authorization': token
                }
            })
        }

        setResponseSelect(undefined)
        setResponseSelected([])
        setResponseBool(!responseBool)
    }

    const deleteCategory = async (containerId) => {
        const result1 = await fetch(`${url}/relation/delete/${containerId}/${userId}/${modelId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Acces-Control-Allow-Origin': { origin },
                'authorization': token
            }
        })
        const result2 = await fetch(`${url}/container/delete/${containerId}/${userId}/${modelId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Acces-Control-Allow-Origin': { origin },
                'authorization': token
            }
        })
        setResponseSelect(undefined)
        setResponseSelected([])
        setResponseBool(!responseBool)
    }


    const deleteContainer = async (containerId) => {
        const res = await fetch(`${url}/container/delete/${containerId}/${userId}/${modelId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Acces-Control-Allow-Origin': { origin },
                'authorization': token
            }
        })
        if (res) {
            setResponseSelect(undefined)
            setResponseSelected([])
            setResponseBool(!responseBool)
        }
    }

    return (
        <>
        {load ?
        <div className="containerDiagram">
            {Array.isArray(containers) &&
                containers.map((container, index) => {
                    return (
                        <div className={container.content_type === "question" && index !== 0 ? "contentBuildQuestion" : container.content_type === "question" && index === 0 ? "contentBuildQuestionFirst" : container.content_type === "response" ? "contentBuildResponse" : "contentBuildDestination"}>
                            <div className="contentBuildCard">
                                {!Array.isArray(cardsQuest[index]) && !Array.isArray(cardsCategory[index]) && !Array.isArray(cardsRes[index]) &&
                                    <div className="contentEmptyContainer">
                                        <img onClick={() => { deleteContainer(container.id) }} alt="delete container" src={require('./image/cross.png')} className="crossIconContainer" />
                                        <p className="typeContainer">contenaire à {container.content_type}</p>
                                    </div>}
                                {Array.isArray(cardsQuest[index]) && container.content_type === "question" &&
                                    cardsQuest[index].map(card => {
                                        return (
                                            <div id={`container${container.id}`} className="containerCardQuest">
                                                <img alt="delete" id={`card${card.id}`} onClick={deleteRelationQuestion} src={require('../ListStock/cardList/image/delete_icon.png')} className="iconDeleteCardBuildQuest" />
                                                <p className="textCardBuildQuest">{card.content}</p>
                                            </div>
                                        )
                                    })}
                                {Array.isArray(cardsRes[index]) && container.content_type === "response" &&
                                    cardsRes[index].map(card => {
                                        return (
                                            <div onClick={selectResponse} id={`container${container.id}`} className={responseSelected.includes(card.id) ? 'containerCardResChatActive' : 'containerCardResChat'}>
                                                <img alt="delete" id={`card${card.id}`} onClick={() => { deleteRelationResponse(index, container.id, card.id) }} src={require('../ListStock/cardList/image/delete_icon.png')} className="iconDeleteCardBuild" />
                                                <p id={`container${index}`} className="textCardInBuild">{card.content}</p>
                                            </div>)
                                    })
                                }
                                {Array.isArray(cardsCategory[index]) && container.content_type === "category" &&
                                    cardsCategory[index].map(card => {
                                        return (
                                            <div id={`container${container.id}`} className="containerCardCategoryBuild">
                                                <img alt="delete" id={`card${card.id}`} onClick={() => { deleteCategory(container.id) }} src={require('../ListStock/cardList/image/delete_icon.png')} className="iconDeleteCardBuild" />
                                                <img alt="mail" src={require('./image/mail_icon.svg')} className="mailIcon" />
                                                <p className="textCardCategoryBuild">{card.name}</p>
                                            </div>
                                        )
                                    })}
                            </div>
                            <div className="contentIconCardBuild">
                                <img id={`connect${container.id}`} onClick={() => { insertContainerId(container.id, container.content_type) }} className={classConnectButton} alt="connect_icon" src={require('./image/connect_icon.png')} />
                            </div>
                        </div>
                    )
                })}
            <div className="containerButtonBuilder">
                <p className="textAddContainerBuild">Ajouter une étape</p>
                <div className="contentButtonBuild">
                    {containersReverse ?
                        <div>
                            {containersReverse[0].content_type !== "destination" &&
                                <div onClick={() => { createContainer('question') }} className="containerAddBuild">
                                    <img alt="add" src={require('./image/plus_icon.png')} className="plusIconQuestion" />
                                    <p className="textAddBuild">question</p>
                                </div>}
                        </div>
                        :
                        <div onClick={() => { createContainer('question') }} className="containerAddBuild">
                            <img alt="add" src={require('./image/plus_icon.png')} className="plusIconQuestion" />
                            <p className="textAddBuild">question</p>
                        </div>}

                    {containersReverse &&
                        <div className="contentButtonAddBuild">
                            {containersReverse[0].content_type === "question" && containersReverse[0].content_type !== "destination" &&
                                <div onClick={() => { createContainer('response') }} className="containerAddBuild">
                                    <img alt="add" src={require('./image/plus_icon.png')} className="plusIconResponse" />
                                    <p className="textAddBuild">réponse</p>
                                </div>}
                            {(containersReverse[0].content_type === "question" || containersReverse[0].content_type === "response") &&
                                <div onClick={() => { createContainer('category') }} className="containerAddBuild">
                                    <img alt="add" src={require('./image/plus_icon.png')} className="plusIconDestination" />
                                    <p className="textAddBuild">réception</p>
                                </div>}
                        </div>}
                </div>
            </div>
            <Chatbot userId={userId} modelId={modelId} />
        </div>
        :
        <div className="containerLoadBuilder">
            <img src={require('./image/load.gif')} className="loadGif" />
        </div>}
        </>
    )
}

export default Builder;