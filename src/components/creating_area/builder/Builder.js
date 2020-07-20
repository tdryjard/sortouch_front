import React, { useState, useEffect } from 'react'
import url from '../../../api/url';
import origin from '../../../api/origin';
import { useForm } from "react-hook-form";
import ContentEditable from 'react-contenteditable';
import './card.css'
import './builder.scss'

const Builder = () => {
    const [contentEditable] = useState(React.createRef())
    const [containers, setContainers] = useState([])
    const [order, setOrder] = useState(1)
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
    const [deleted, setDeleted] = useState(false)
    const [size, setSize] = useState(false)

    const { addCardRef, upCard, handleSubmit } = useForm()

    useEffect(() => {
        if (localStorage.getItem('userId') && (!userId || !token)) {
            setUserId(localStorage.getItem('userId'))
            setToken(localStorage.getItem('token'))
        }
        if (!modelId) setModelId(localStorage.getItem('modelId'))
    }, [])

    useEffect(() => {

    }, [deleted])

    const printContainers = async () => {
        try {
            const resJson = await fetch(`${url}/chatbot/container/findAll/${userId}/${responseSelect}/${modelId}`)
            const res = await resJson.json()
            if (res.status === 400) tokenExpire()
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
        const element = document.getElementById(`containerBuilder`)
        if (element) element.scrollTop = element.offsetHeight
    }, [load])

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
                    const resNoJson = await fetch(`${url}/chatbot/relation/findCardQuestion/${res[i].id}/${userId}/${modelId}`)
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
                    const resNoJson = await fetch(`${url}/chatbot/relation/findCardResponse/${res[i].id}/${userId}/${modelId}`)
                    result = await resNoJson.json()
                }
                else result = { none: `pas de réponse container id ${i}` }
                stockRes = [...stockRes, result]
                setCardsRes(stockRes)
            }
        }
        let stockCategory = []
        for (let i = 0; i < res.length + 3; i++) {
            if (res[i]) {
                let result = []
                if (res[i].content_type === "category") {
                    const resNoJson = await fetch(`${url}/chatbot/relation/findCardCategory/${res[i].id}/${userId}/${modelId}`)
                    result = await resNoJson.json()
                }
                else result = { none: `pas de catégorie container id ${i}` }
                stockCategory = [...stockCategory, result]
                setCardsCategory(stockCategory)
            }
        }
        setLoad(true)
    }

    const createContainer = async (type) => {
        if (popupStep) setPopupStep(false)
        let stockContainers = containers
        stockContainers.reverse()
        if (stockContainers[0] && responseSelect !== 0) {
            if (stockContainers[0].content_type === "question" || responseBool === true) {
                try {
                    let postContainerOne = await fetch(url + '/container/create', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Credentials': true,
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
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Credentials': true,
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

    const selectResponse = async function (numberCard, index) {
        if (popupSelect) {
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

    const deleteRelationQuestion = async (containerId, cardId, index) => {
        const res = await fetch(`${url}/relation/deleteQuestionCard/${containerId}/${cardId}/${userId}/${modelId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'authorization': token
            }
        })
        if (res) {
            const res2 = await fetch(`${url}/question/delete/${cardId}/${userId}/${modelId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'authorization': token
                }
            })
            if (res2) {
                const stock = cardsQuest
                stock[index] = { none: `pas de question` }
                setCardsQuest(stock)
                setDeleted(!deleted)
            }
        }
    }

    const deleteRelationResponse = async (event, containerId, cardId, index, cardIndex) => {
        event.stopPropagation();
        const res = await fetch(`${url}/relation/deleteResponseCard/${containerId}/${cardId}/${userId}/${modelId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'authorization': token
            }
        })
        if (res) {
            const res2 = await fetch(`${url}/response/delete/${cardId}/${userId}/${modelId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'authorization': token
                }
            })
            if (res2) {
                const stock = cardsRes
                const subStock = stock[index]
                subStock.splice(cardIndex, 1)
                stock[index] = subStock
                setCardsRes(stock)
                setDeleted(!deleted)
            }
        }
    }

    const deleteCategory = async (containerId, cardId, index) => {
        const res = await fetch(`${url}/relation/delete/${containerId}/${userId}/${modelId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'authorization': token
            }
        })
        if (res) {
            const res2 = await fetch(`${url}/category/delete/${cardId}/${userId}/${modelId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'authorization': token
                }
            })
            if (res2) {
                const stock = cardsCategory
                stock[index] = { none: `pas de catégorie` }
                setCardsCategory(stock)
                setDeleted(!deleted)
            }
        }
    }


    const deleteContainer = async (containerId) => {
        const res = await fetch(`${url}/container/delete/${containerId}/${userId}/${modelId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
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

    const sendNewCard = async (containerId, containerType, index) => {
        if (localStorage.getItem('popupEditeur2')) {
            localStorage.setItem('popupEditeur2', false)
            setPupopSelect(true)
        }
        let resRelation = {}
        if (containerType === "question") {
            await fetch(`${url}/question/add`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
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
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Credentials': true,
                            'authorization': token
                        },
                        body: JSON.stringify({
                            question_id: res.id,
                            user_id: userId,
                            model_id: modelId,
                            container_id: containerId
                        })
                    })
                    const stock = cardsQuest
                    stock[index] = [res]
                    setCardsQuest(stock)
                    setDeleted(!deleted)
                })
        } else if (containerType === "response") {
            fetch(`${url}/response/add`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
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
                    fetch(`${url}/relation/add`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Credentials': true,
                            'authorization': token
                        },
                        body: JSON.stringify({
                            response_id: res.id,
                            user_id: userId,
                            model_id: modelId,
                            container_id: containerId
                        })
                    })
                    const stock = cardsRes
                    if (stock[index].message) stock[index] = [res]
                    else stock[index].push(res)
                    setCardsRes(stock)
                    setDeleted(!deleted)
                })
        } else if (containerType === "category") {
            fetch(`${url}/category/add`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
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
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Credentials': true,
                            'authorization': token
                        },
                        body: JSON.stringify({
                            category_id: res.id,
                            user_id: userId,
                            model_id: modelId,
                            container_id: containerId
                        })
                    })
                    const stock = cardsCategory
                    stock[index] = [res]
                    setCardsCategory(stock)
                    setDeleted(!deleted)
                })
        }

        if (resRelation) {
            setContainerAddCard(null)
            setInsertCard(true)
        }
    }

    const updateCard = async (cardId, type, containerIndex, cardIndex) => {
        let content = inputValue.html.replace(/&nbsp;/gi, '').replace(/<div><br><\/div>/gi, '').replace(/<p><br><\/p>/gi, '').replace(/<div>/gi, '').replace(/<\/div>/gi, '')
        content.trim()
        if (type === "question") {
            let res = await fetch(`${url}/question/update/${cardId}/${userId}/${modelId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'authorization': token
                },
                body: JSON.stringify({
                    content: content
                })
            })
            if (res) {
                let stock = cardsQuest
                stock[cardIndex][containerIndex].content = content
                setCardsQuest(stock)
                setUpdate(null)
                setTypeUpdate('')
            }
        }
        if (type === "response") {
            let res = await fetch(`${url}/response/update/${cardId}/${userId}/${modelId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'authorization': token
                },
                body: JSON.stringify({
                    content: content
                })
            })
            if (res) {
                let stock = cardsRes
                stock[cardIndex][containerIndex].content = content
                setCardsRes(stock)
                setUpdate(null)
                setTypeUpdate('')
            }
        }
        if (type === "category") {
            let res = await fetch(`${url}/category/update/${cardId}/${userId}/${modelId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'authorization': token
                },
                body: JSON.stringify({
                    name: content
                })
            })
            if (res) {
                let stock = cardsCategory
                stock[cardIndex][containerIndex].name = content
                setCardsCategory(stock)
                setUpdate(null)
                setTypeUpdate('')
            }
        }
    }

    const getUpdateCard = (e) => {
        if (e.target.value.split().length < 250) setInputValue({ html: e.target.value })
    }

    const connect = (id) => {
        setContainerAddCard(id)
        if (localStorage.getItem('popupEditeur1') === "true") {
            localStorage.setItem('popupEditeur1', false)
        }
    }

    const tokenExpire = () => {
        localStorage.setItem('userId', '')
        localStorage.setItem('modelId', '')
        localStorage.setItem('token', '')
        localStorage.setItem('type', '')
        localStorage.setItem('expireToken', true)
        sessionStorage.setItem('disconnect', true)
        setTimeout(() => {
            window.location.reload()
        }, 100)
    }

    return (
        <>
            {load ?
                <div id="containerBuilder" className="containerDiagram">
                    {Array.isArray(containers) &&
                        containers.map((container, index) => {
                            return (
                                <div className={container.content_type === "question" && index !== 0 ? "contentBuildQuestion" : container.content_type === "question" && index === 0 ? "contentBuildQuestionFirst" : container.content_type === "response" ? "contentBuildResponse" : "contentBuildDestination"}>
                                    <div className="contentBuildCard">
                                        {!Array.isArray(cardsQuest[index]) && !Array.isArray(cardsCategory[index]) && !Array.isArray(cardsRes[index]) &&
                                            <div className="contentEmptyContainer">
                                                {index !== 0 && <img onClick={() => { deleteContainer(container.id); setLoad(true) }} alt="delete container" src={require('./image/cross.png')} className="crossIconContainer" />}
                                                {window.innerWidth > 1200 && <p className="typeContainer">contenaire à {container.content_type}</p>}
                                            </div>}
                                        {Array.isArray(cardsQuest[index]) && container.content_type === "question" &&
                                            cardsQuest[index].map((card, cardIndex) => {
                                                return (
                                                    <div className="containerCardQuest">
                                                        {!(cardIndex === update && typeUpdate === "question" && index === containerUpdate) ?
                                                            <>
                                                                <img onClick={() => { return (setUpdate(cardIndex), setContainerUpdate(index), setTypeUpdate("question"), setInputValue({ html: card.content })) }} className="iconDeleteCardBuild" alt="update" src={require('./image/update_icon.png')} />
                                                                <img alt="delete" id={`card${card.id}`} onClick={() => { deleteRelationQuestion(container.id, card.id, index); setLoad(true) }} src={require('../ListStock/cardList/image/delete_icon.png')} className="iconDeleteCardBuildQuest" />
                                                                <p id={`container${index}`} className="textCardBuildQuest">{card.content}</p>
                                                            </>
                                                            :
                                                            <form className="containerUpdateCard">
                                                                <ContentEditable
                                                                    ref={upCard}
                                                                    className="contentQuestionInput"
                                                                    innerRef={contentEditable}
                                                                    html={inputValue.html}
                                                                    disabled={false}
                                                                    onChange={getUpdateCard}
                                                                    tagName='article'
                                                                />
                                                                <img onClick={() => { updateCard(card.id, 'question', cardIndex, index) }} className="iconDeleteCardBuild" alt="update" src={require('./image/update_icon.png')} />
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
                                                                <img alt="delete" id={`card${card.id}`} onClick={(event) => { deleteRelationResponse(event, container.id, card.id, index, cardIndex); setLoad(true) }} src={require('../ListStock/cardList/image/delete_icon.png')} className="iconDeleteCardBuild" />
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
                                                    </div>)
                                            })
                                        }
                                        {Array.isArray(cardsCategory[index]) && container.content_type === "category" &&
                                            cardsCategory[index].map((card, cardIndex) => {
                                                return (
                                                    <div id={`container${index}`} className={(cardIndex === update && typeUpdate === "category" && containerUpdate === index) ? 'containerUpdateCardRes' : "containerCardCategoryBuild"}>
                                                        {!(cardIndex === update && typeUpdate === "category" && containerUpdate === index) ?
                                                            <>
                                                                <img onClick={() => { return (setUpdate(cardIndex), setContainerUpdate(index), setTypeUpdate('category'), setInputValue({ html: card.name })) }} className="iconDeleteCardBuild" alt="update" src={require('./image/update_icon.png')} />
                                                                <img alt="delete" id={`card${card.id}`} onClick={() => { deleteCategory(container.id, card.id, index); setLoad(true) }} src={require('../ListStock/cardList/image/delete_icon.png')} className="iconDeleteCardBuild" />
                                                                <img alt="mail" src={require('./image/mail_icon.svg')} className="mailIcon" />
                                                                <p id={`container${index}`} className="textCardCategoryBuild">{card.name}</p>
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
                                                                <img onClick={() => { updateCard(card.id, 'category', cardIndex, index) }} className="iconDeleteCardBuild" alt="update" src={require('./image/update_icon.png')} />
                                                            </form>}
                                                    </div>
                                                )
                                            })}
                                        {containerAddCard === container.id &&
                                            <>
                                                <form className="containerAddCard" onSubmit={handleSubmit(sendNewCard)}>
                                                    <textarea maxLength={container.content_type === "question" ? "250" : container.content_type === "response" && "80"} className="addCardInput" ref={addCardRef} onChange={getValueCard} placeholder={container.content_type === "question" ? "nouvelle question" : container.content_type === "response" ? "nouvelle réponse" : "nouvelle catégorie de réception"} />
                                                    <button className="addCardButton" onClick={() => { sendNewCard(container.id, container.content_type, index) }}>Valider</button>
                                                </form>
                                            </>
                                        }
                                    </div>
                                    {
                                        !Array.isArray(cardsCategory[index]) && !(cardsRes[index] && container.content_type === "response" && cardsRes[index].length > 3) && !(cardsQuest[index] && container.content_type === "question" && cardsQuest[index].length > 0) &&
                                        <div onClick={() => { connect(container.id) }}  className={containerAddCard !== container.id ? "imgConnectActive" : "imgConnect"}>
                                            <img id={`connect${container.id}`} style={{height: '35px', width: 'auto'}} alt="ajouter une interaction" src={require('./image/plus_icon.png')} />
                                            {container.content_type === "response" ?
                                                <p className="textAddBuilder">réponse</p>
                                                : container.content_type === "question" ?
                                                    <p className="textAddBuilder">question</p>
                                                    : container.content_type === "category" &&
                                                    <p className="textAddBuilder">catégorie</p>}
                                        </div>
                                    }
                                </div>
                            )
                        })}
                    <div className="containerButtonBuilder">
                        <p id="addStep" className="textAddContainerBuild">Ajouter une étape</p>
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