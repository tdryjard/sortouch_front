import React, { useState, useEffect } from 'react'
import url from '../../../api/url';
import origin from '../../../api/origin';
import useGlobalState from '../../../hooks/useGlobalState';
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import ContentEditable from 'react-contenteditable'
import './card.css'
import './builder.scss'
import CardListDestination from '../ListStock/cardList/CardListCategory/CardListCategory';

const Builder = () => {
    const [contentEditable] = useState(React.createRef())
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
    const [containerAddCard, setContainerAddCard] = useState()
    const [valueCardAdd, setValueCardAdd] = useState()
    const [storage, setStorage] = useState(false)
    const [insertCard, setInsertCard] = useState(false)
    const [update, setUpdate] = useState()
    const [typeUpdate, setTypeUpdate] = useState('')
    const [containerUpdate, setContainerUpdate] = useState()
    const [inputValue, setInputValue] = useState({ html: "" })
    const [popupSelect, setPupopSelect] = useState(false)
    const [popupStep, setPopupStep] = useState(false)

    const { addCardRef, upCard, handleSubmit } = useForm()

    useEffect(() => {
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
        try {
            const resJson = await fetch(`${url}/container/findAll/${userId}/${responseSelect}/${modelId}`)
            const res = await resJson.json()
            const storageContainer = await storageContainers
            if (res.length) {
                const stockRes = res.slice().reverse()
                if (storageContainer.length > 0 && responseSelect) {
                    if (insertCard) setInsertCard(false)
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
                } else if (insertCard) {
                    setContainers(containers)
                    takeCard(containers)
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
        if (userId && modelId) printContainers()
        if (storageContainers) setStorage(true)
    }, [responseSelectChanging, userId, modelId, responseBool])

    const takeCard = async (res) => {
        let stock = []
        for (let i = 0; i < res.length + 3; i++) {
            if (res[i]) {
                let result = []
                if (res[i].content_type === "question") {
                    const resNoJson = await fetch(`${url}/relation/findCardQuestion/${res[i].id}/${userId}/${modelId}`)
                    result = await resNoJson.json()
                }
                else result = { none: `pas de question container id ${i}` }
                stock = [...stock, result]
                setCardsQuest(stock)
            }
        }
        let stockRes = []
        for (let i = 0; i < res.length + 3; i++) {
            if (res[i]) {
                let result = []
                if (res[i].content_type === "response") {
                    const resNoJson = await fetch(`${url}/relation/findCardResponse/${res[i].id}/${userId}/${modelId}`)
                    result = await resNoJson.json()
                }
                else result = { none: `pas de question container id ${i}` }
                stockRes = [...stockRes, result]
                setCardsRes(stockRes)
            }
        }
        let stockCategory = []
        for (let i = 0; i < res.length + 3; i++) {
            if (res[i]) {
                let result = []
                if (res[i].content_type === "category") {
                    const resNoJson = await fetch(`${url}/relation/findCardCategory/${res[i].id}/${userId}/${modelId}`)
                    result = await resNoJson.json()
                }
                else result = { none: `pas de question container id ${i}` }
                stockCategory = [...stockCategory, result]
                setCardsCategory(stockCategory)
            }
        }
        setLoad(true)
    }

    const createContainer = async (type) => {
        if(popupStep) setPopupStep(false)
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
        if (responseSelected) setStorageContainers(containers)
        setResponseBool(!responseBool)
        setLoad(false)
    }


    /*const insertContainerId = async (id, type) => {
        const relations = await fetch(`${url}/relation/find/${userId}/${modelId}`)
        const res = await relations.json()
        let relationsResult = []
        if (res) {
            for (let i = 0; i < res.length; i++) {
                if (res[i].onchange === 1) relationsResult = res[i]
            }
            let typeOnChange = "";
            if (relationsResult.question_id) {
                typeOnChange = "question"
            } else if (relationsResult.response_id) {
                typeOnChange = "response"
            } else if (relationsResult.category_id) {
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
                            onchange: 0
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
            if (type !== "response") setStorageContainers(containers)
            setResponseBool(!responseBool)
        }
        setLoad(false)
    }*/

    const selectResponse = async function (numberCard, index) {
        if (popupSelect){
            setPupopSelect(false)
            setPopupStep(true)
        }
        setLoad(false)
        setContainers([])
        setResponseSelect(numberCard)
        responseSelected.length = numberCard

        const containerIndex = index + 1
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
        setLoad(false)
    }


    const deleteRelationQuestion = async (containerId, cardId) => {
        fetch(`${url}/relation/deleteQuestionCard/${containerId}/${cardId}/${userId}/${modelId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Acces-Control-Allow-Origin': { origin },
                'authorization': token
            }
        })
        /*fetch(`${url}/container/delete/${containerId}/${userId}/${modelId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Acces-Control-Allow-Origin': { origin },
                'authorization': token
            }
        })*/
        setResponseSelect(undefined)
        setResponseSelected([])
        setResponseBool(!responseBool)
        setLoad(false)
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
        /*if (cardsRes[containerIndex].length < 2) {
            await fetch(`${url}/container/delete/${containerId}/${userId}/${modelId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Acces-Control-Allow-Origin': { origin },
                    'authorization': token
                }
            })
        }*/

        setResponseSelect(undefined)
        setResponseSelected([])
        setResponseBool(!responseBool)
        setLoad(false)
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
        /*const result2 = await fetch(`${url}/container/delete/${containerId}/${userId}/${modelId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Acces-Control-Allow-Origin': { origin },
                'authorization': token
            }
        })*/
        setResponseSelect(undefined)
        setResponseSelected([])
        setResponseBool(!responseBool)
        setLoad(false)
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
        setLoad(false)
    }

    const getValueCard = (e) => {
        setValueCardAdd(e.target.value)
    }

    const sendNewCard = async (containerId, containerType) => {
        if(localStorage.getItem('popupEditeur2')){
            localStorage.setItem('popupEditeur2', false)
            setPupopSelect(true)
        }
        let resRelation = {}
        if (containerType === "question") {
            await fetch(`${url}/question/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Acces-Control-Allow-Origin': { origin },
                    'authorization': token
                },
                body: JSON.stringify({
                    content: valueCardAdd,
                    user_id: userId,
                    model_id: modelId
                })
            })
                .then(res => res.json())
                .then(res => {
                    resRelation = fetch(`${url}/relation/add`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Acces-Control-Allow-Origin': { origin },
                            'authorization': token
                        },
                        body: JSON.stringify({
                            question_id: res.id,
                            user_id: userId,
                            model_id: modelId,
                            container_id: containerId
                        })
                    })
                })
        } else if (containerType === "response") {
            fetch(`${url}/response/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Acces-Control-Allow-Origin': { origin },
                    'authorization': token
                },
                body: JSON.stringify({
                    content: valueCardAdd,
                    user_id: userId,
                    model_id: modelId
                })
            })
                .then(res => res.json())
                .then(res => {
                    resRelation = fetch(`${url}/relation/add`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Acces-Control-Allow-Origin': { origin },
                            'authorization': token
                        },
                        body: JSON.stringify({
                            response_id: res.id,
                            user_id: userId,
                            model_id: modelId,
                            container_id: containerId
                        })
                    })
                })
        } else if (containerType === "category") {
            fetch(`${url}/category/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Acces-Control-Allow-Origin': { origin },
                    'authorization': token
                },
                body: JSON.stringify({
                    name: valueCardAdd,
                    user_id: userId,
                    model_id: modelId
                })
            })
                .then(res => res.json())
                .then(res => {
                    resRelation = fetch(`${url}/relation/add`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Acces-Control-Allow-Origin': { origin },
                            'authorization': token
                        },
                        body: JSON.stringify({
                            category_id: res.id,
                            user_id: userId,
                            model_id: modelId,
                            container_id: containerId
                        })
                    })
                })
        }

        if (resRelation) {
            setContainerAddCard(null)
            if (responseSelect !== containers[containers.length - 1].response_id) {
                setStorageContainers(containers)
            } else setInsertCard(true)
            setResponseBool(!responseBool)
        }
    }

    const updateCard = async (cardId, type, containerIndex) => {
        let content = inputValue.html.replace(/&nbsp;/gi, '').replace(/<div><br><\/div>/gi, '').replace(/<p><br><\/p>/gi, '').replace(/<div>/gi, '').replace(/<\/div>/gi, '')
        content.trim()
        if (type === "question") {
            let res = await fetch(`${url}/question/update/${cardId}/${userId}/${modelId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': `${origin}`,
                    'authorization': token
                },
                body: JSON.stringify({
                    content: content
                })
            })
            if (res) {
                setUpdate(null)
                setTypeUpdate('')
                setResponseSelect(undefined)
                setResponseSelected([])
                setResponseBool(!responseBool)
            }
        }
        if (type === "response") {
            let res = await fetch(`${url}/response/update/${cardId}/${userId}/${modelId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': `${origin}`,
                    'authorization': token
                },
                body: JSON.stringify({
                    content: content
                })
            })
            if (res) {
                setUpdate(null)
                setTypeUpdate('')
                setResponseSelect(undefined)
                setResponseSelected([])
                setResponseBool(!responseBool)
            }
        }
        if (type === "category") {
            let res = await fetch(`${url}/category/update/${cardId}/${userId}/${modelId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': `${origin}`,
                    'authorization': token
                },
                body: JSON.stringify({
                    name: content
                })
            })
            if (res) {
                setUpdate(null)
                setTypeUpdate('')
                setResponseSelect(undefined)
                setResponseSelected([])
                setResponseBool(!responseBool)
            }
        }
    }

    const getUpdateCard = (e) => {
        if (e.target.value.split().length < 66) setInputValue({ html: e.target.value })
    }

    const connect = (id) => {
        setContainerAddCard(id)
        if (localStorage.getItem('popupEditeur1') === "true") {
            localStorage.setItem('popupEditeur1', false)
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
                                                {index !== 0 && <img onClick={() => { deleteContainer(container.id); setLoad(true) }} alt="delete container" src={require('./image/cross.png')} className="crossIconContainer" />}
                                                <p className="typeContainer">contenaire à {container.content_type}</p>
                                            </div>}
                                        {Array.isArray(cardsQuest[index]) && container.content_type === "question" &&
                                            cardsQuest[index].map((card, cardIndex) => {
                                                return (
                                                    <div id={`container${container.id}`} className="containerCardQuest">
                                                        {!(cardIndex === update && typeUpdate === "question" && index === containerUpdate) ?
                                                            <>
                                                                <img onClick={() => { return (setUpdate(cardIndex), setContainerUpdate(index), setTypeUpdate("question"), setInputValue({ html: card.content })) }} className="iconDeleteCardBuild" alt="update" src={require('./image/update_icon.png')} />
                                                                <img alt="delete" id={`card${card.id}`} onClick={() => { deleteRelationQuestion(container.id, card.id); setLoad(true) }} src={require('../ListStock/cardList/image/delete_icon.png')} className="iconDeleteCardBuildQuest" />
                                                                <p className="textCardBuildQuest">{card.content}</p>
                                                            </>
                                                            :
                                                            <form onSubmit={handleSubmit(updateCard)} className="containerUpdateCard">
                                                                <ContentEditable
                                                                    ref={upCard}
                                                                    className="contentQuestionInput"
                                                                    innerRef={contentEditable}
                                                                    html={inputValue.html}
                                                                    disabled={false}
                                                                    onChange={getUpdateCard}
                                                                    tagName='article'
                                                                />
                                                                <img onClick={() => { updateCard(card.id, 'question', cardIndex) }} className="iconDeleteCardBuild" alt="update" src={require('./image/update_icon.png')} />
                                                            </form>}
                                                    </div>
                                                )
                                            })}
                                        {Array.isArray(cardsRes[index]) && container.content_type === "response" &&
                                            cardsRes[index].map((card, cardIndex) => {
                                                return (
                                                    <div onClick={() => { return (cardIndex !== update && selectResponse(card.id, index)) }} id={`container${container.id}`} className={(cardIndex === update && typeUpdate === "response" && containerUpdate === index) ? 'containerUpdateCardRes' : responseSelected.includes(card.id) ? 'containerCardResChatActive' : 'containerCardResChat'}>
                                                        {!(cardIndex === update && typeUpdate === "response" && containerUpdate === index) ?
                                                            <>
                                                                <img onClick={() => { return (setUpdate(cardIndex), setContainerUpdate(index), setTypeUpdate('response'), setInputValue({ html: card.content }), cardsRes[index][cardsRes[index].length - 1].id === card.id && popupSelect === true && setPopupStep(true)) }} className="iconDeleteCardBuild" alt="update" src={require('./image/update_icon.png')} />
                                                                <img alt="delete" id={`card${card.id}`} onClick={() => { deleteRelationResponse(index, container.id, card.id); setLoad(true) }} src={require('../ListStock/cardList/image/delete_icon.png')} className="iconDeleteCardBuild" />
                                                                <p id={`container${index}`} className="textCardInBuild">{card.content}</p>
                                                            </>
                                                            :
                                                            <form onSubmit={handleSubmit(updateCard)} className="containerUpdateCard">
                                                                <ContentEditable
                                                                    ref={upCard}
                                                                    className="contentQuestionInput"
                                                                    innerRef={contentEditable}
                                                                    html={inputValue.html}
                                                                    disabled={false}
                                                                    onChange={getUpdateCard}
                                                                    tagName='article'
                                                                />
                                                                <img onClick={() => { updateCard(card.id, 'response', cardIndex, index) }} className="iconDeleteCardBuild" alt="update" src={require('./image/update_icon.png')} />
                                                            </form>}
                                                        {window.location.innerWidth > 1280 && cardsRes[index][cardsRes[index].length - 1].id === card.id && popupSelect === true &&
                                                            <img src={require('./image/popupSelect.png')} className="crossPopupEditor" />}
                                                    </div>)
                                            })
                                        }
                                        {Array.isArray(cardsCategory[index]) && container.content_type === "category" &&
                                            cardsCategory[index].map((card, cardIndex) => {
                                                return (
                                                    <div id={`container${container.id}`} className={(cardIndex === update && typeUpdate === "category" && containerUpdate === index) ? 'containerUpdateCardRes' : "containerCardCategoryBuild"}>
                                                        {!(cardIndex === update && typeUpdate === "category" && containerUpdate === index) ?
                                                            <>
                                                                <img onClick={() => { return (setUpdate(cardIndex), setContainerUpdate(index), setTypeUpdate('category'), setInputValue({ html: card.name })) }} className="iconDeleteCardBuild" alt="update" src={require('./image/update_icon.png')} />
                                                                <img alt="delete" id={`card${card.id}`} onClick={() => { deleteCategory(container.id); setLoad(true) }} src={require('../ListStock/cardList/image/delete_icon.png')} className="iconDeleteCardBuild" />
                                                                <img alt="mail" src={require('./image/mail_icon.svg')} className="mailIcon" />
                                                                <p className="textCardCategoryBuild">{card.name}</p>
                                                            </>
                                                            :
                                                            <form onSubmit={handleSubmit(updateCard)} className="containerUpdateCard">
                                                                <ContentEditable
                                                                    ref={upCard}
                                                                    className="contentQuestionInput"
                                                                    innerRef={contentEditable}
                                                                    html={inputValue.html}
                                                                    disabled={false}
                                                                    onChange={getUpdateCard}
                                                                    tagName='article'
                                                                />
                                                                <img onClick={() => { updateCard(card.id, 'category', cardIndex) }} className="iconDeleteCardBuild" alt="update" src={require('./image/update_icon.png')} />
                                                            </form>}
                                                    </div>
                                                )
                                            })}
                                        {containerAddCard === container.id &&
                                            <>
                                                <form className="containerAddCard" onSubmit={handleSubmit(sendNewCard)}>
                                                    <textarea maxLength={container.content_type === "question" ? "65" : container.content_type === "response" && "45"} className="addCardInput" ref={addCardRef} onChange={getValueCard} placeholder={container.content_type === "question" ? "nouvelle question" : container.content_type === "response" ? "nouvelle réponse" : "nouvelle catégorie de réception"} />
                                                    <button className="addCardButton" onClick={() => { sendNewCard(container.id, container.content_type) }}>Valider</button>
                                                </form>
                                            </>
                                        }
                                    </div>
                                    {
                                        !Array.isArray(cardsCategory[index]) && !(cardsRes[index] && container.content_type === "response" && cardsRes[index].length > 3) && !(cardsQuest[index] && container.content_type === "question" && cardsQuest[index].length > 0) &&
                                        <div className="contentIconCardBuild">
                                            <img id={`connect${container.id}`} onClick={() => { connect(container.id) }} className={containerAddCard !== container.id ? "imgConnectActive" : "imgConnect"} alt="ajouter une interaction" src={require('./image/plus_icon.png')} />
                                            {index === 1 && (localStorage.getItem('popupEditeur1') === "true") &&
                                                <img src={require('./image/popupRes.png')} className="crossPopupEditor" />}
                                        </div>
                                    }
                                </div>
                            )
                        })}
                    <div className="containerButtonBuilder">
                        <p className="textAddContainerBuild">Ajouter une étape</p>
                        <div className="contentButtonBuild">

                            {containersReverse &&
                                <div className="contentButtonAddBuild">
                                    {(((responseSelected[responseSelected.length - 1] === responseSelect && !storage) || (containers[containers.length - 1].response_id !== responseSelect && responseSelect)) && containersReverse[0].content_type === "response") ?
                                        <div onClick={() => { createContainer('question'); setLoad(true) }} className="containerAddBuild">
                                            <img alt="add" src={require('./image/plus_icon.png')} className="plusIconQuestion" />
                                            <p className="textAddBuild">question</p>
                                        </div>
                                        : (((responseSelected[responseSelected.length - 1] === responseSelect && !storage) || (containers[containers.length - 1].response_id !== responseSelect && responseSelect)) && containersReverse[0].content_type === "response") ?
                                            null
                                            : containersReverse[0].content_type === "question" && containersReverse[0].content_type !== "destination" ?
                                                null
                                                : <p className="alertSelectResponse">Veuillez selectionner une réponse parmis le dernier conteneur</p>}
                                    {containersReverse[0].content_type === "question" && containersReverse[0].content_type !== "destination" &&
                                        <div onClick={() => { createContainer('response'); setLoad(true) }} className="containerAddBuild">
                                            <img alt="add" src={require('./image/plus_icon.png')} className="plusIconResponse" />
                                            <p className="textAddBuild">réponse</p>
                                        </div>}
                                    {(((responseSelected[responseSelected.length - 1] === responseSelect && !storage) || (containers[containers.length - 1].response_id !== responseSelect && responseSelect)) && containersReverse[0].content_type === "response") ?
                                        <div onClick={() => { createContainer('category'); setLoad(true) }} className="containerAddBuild">
                                            <img alt="add" src={require('./image/plus_icon.png')} className="plusIconDestination" />
                                            <p className="textAddBuild">réception</p>
                                        </div>
                                        : null}
                                    {window.location.innerWidth > 1280 && popupStep === true &&
                                        <img src={require('./image/popupStep.png')} className="crossPopupEditor" />}
                                </div>}
                        </div>
                    </div>
                </div>
                :
                <div className="containerLoadBuilder">
                    <img src={require('./image/load.gif')} className="loadGif" />
                </div>}
        </>
    )
}

export default Builder;