import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import MenuBurger from '../menuBurger/MenuBurger'
import PopupPremium from '../popupPremium/PopupPremium'
import url from '../../api/url'
import './DataArea.scss'
import ExpireToken from '../expireToken/ExpireToken'


const DataArea = () => {
    const [userId, setUserId] = useState()
    const [modelId, setModelId] = useState()
    const [token, setToken] = useState()
    const [choiceModel, setChoiceModel] = useState('Tout')
    const [choiceCategory, setChoiceCategory] = useState('Tout')
    const [models, setModels] = useState([])
    const [selectModel, setSelectModel] = useState(false)
    const [categorys, setCategorys] = useState([])
    const [categorySelect, setCategorySelect] = useState()
    const [selectCategory, setSelectCategory] = useState(false)
    const [categoryId, setCategoryId] = useState()
    const [contacts, setContacts] = useState([])
    const [sortContacts, setSortContacts] = useState([])
    const [chooseColorId, setChooseColorId] = useState()
    const [colorSort, setColorSort] = useState('')
    const [colorParamsSelect, setColorParamsSelect] = useState(false)
    const [load, setLoad] = useState(true)
    const [timeOut, setTimeOut] = useState(false)
    const [type, setType] = useState()
    const [popup, setPopup] = useState(false)
    const [lastColor, setLastColor] = useState(false)
    const [chooseColor, setChooseColor] = useState(false)
    const [deleteBool, setDeleteBool] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            if (load) setTimeOut(true)
        }, 3000)
    }, [contacts])

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
            setToken(localStorage.getItem('token'))
            setType(localStorage.getItem('type'))
        }
    }, [])

    useEffect(() => {
        fetch(`${url}/chatbot/category/findAll/${userId}/${modelId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 400) tokenExpire()
                setCategorys(res)
                if (!categorySelect && res[0]) setCategorySelect(res[0].id)
            })

        fetch(`${url}/contact/findByUser/${userId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'authorization': token
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 400) tokenExpire()
                if (type === "free" && res.length > 50) res.length = 50
                if (type === "standard" && res.length > 5000) res.length = 5000
                if (type === "expert" && res.length > 10000) res.length = 10000
                setContacts(res)
                if (lastColor !== chooseColor) {
                    let resultSort = []
                    for (let sortI = 0; sortI < sortContacts.length; sortI++) {
                        for (let resI = 0; resI < res.length; resI++) {
                            if (res[resI].id === sortContacts[sortI].id) resultSort.push(res[resI])
                        }
                    }
                    setSortContacts(resultSort)
                    setLastColor(chooseColor)
                }
                else setSortContacts(res)
            })

        fetch(`${url}/model/findAll/${userId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'authorization': token
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status === 400) tokenExpire()
                setModels(res)
            })

    }, [userId, modelId, token])

    useEffect(() => {

    }, [models, contacts, categorys])


    const sort = (param, type) => {

        if (type === "model") {
            setChoiceModel(param.name)
            setSelectModel(false)
        }
        if (type === "category") {
            setSelectCategory(false)
            setChoiceCategory(param.name)
        }
        if (type === "color") {
            setColorParamsSelect(false)
            setColorSort(param)
        }

        if (contacts.length > 0) {
            let stockContacts = []
            let contact = contacts.slice()
            let stockageContact = contact

            if (modelId && type !== "model") {
                let sortModel = stockageContact.filter(contact => contact.model_id !== modelId)
                stockContacts = [...stockContacts, ...sortModel]
            } else if (type === "model") {
                setSelectModel(false)
                if (param !== "Tout") {
                    setModelId(param.id)
                    setChoiceModel(param.name)
                    let sortModel = stockageContact.filter(contact => contact.model_id !== param.id)
                    stockContacts = [...stockContacts, ...sortModel]
                } else setChoiceModel('Tout')
            }

            if (categoryId && type !== "category" && type !== "model") {
                let sortCategory = stockageContact.filter(contact => contact.category_id !== categoryId)
                stockContacts = [...stockContacts, ...sortCategory]
            } else if (type === "category") {
                setSelectCategory(false)
                if (param !== 'Tout') {
                    setChoiceCategory(param.name)
                    setCategoryId(param.id)
                    let sortCategory = stockageContact.filter(contact => contact.category_id !== param.id)
                    stockContacts = [...stockContacts, ...sortCategory]
                } else setChoiceCategory('Tout')
            }

            if (colorSort && type !== "color") {
                let sortColor = stockageContact.filter(contact => contact.color !== colorSort)
                stockContacts = [...stockContacts, ...sortColor]
            } else if (type === "color") {
                setColorParamsSelect(false)
                if (param !== "Tout") {
                    setColorSort(param)
                    let sortColor = stockageContact.filter(contact => contact.color !== param)
                    stockContacts = [...stockContacts, ...sortColor]
                } else setColorSort('')
            }
            let newContacts = contact
            for (let i = 0; i < contact.length; i++) {
                for (let a = 0; a < stockContacts.length; a++) {
                    if (contact[i] && contact[i].id === stockContacts[a].id) {
                        newContacts.splice(i, 1)
                    }
                }
            }
            setSortContacts(newContacts)
            setLoad(false)
        }
    }

    const changeColor = async (contactId, color, index) => {
        const change = await fetch(`${url}/contact/update/${contactId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'authorization': token
            },
            body: JSON.stringify({
                color: color
            })
        })
        if (change) {
            if(change.status === 400) tokenExpire()
            const stock = sortContacts
            stock[index].color = color
            setSortContacts(stock)
            setDeleteBool(!deleteBool)
            setChooseColor(false)
        }
    }

    const deleteContact = async (id, index) => {
        if (window.confirm('êtes vous sûr de vouloir supprimer ces coordonnées ?')) {
            const deleted = await fetch(`${url}/contact/delete/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'authorization': token
                }
            })
            if (deleted) {
                if(deleted.status === 400) tokenExpire()
                const stock = sortContacts
                stock.splice(index, 1)
                setSortContacts(stock)
                setDeleteBool(!deleteBool)
            }
        }
    }

    useEffect(() => {

    }, [sortContacts, deleteBool])

    useEffect(() => {
        if (contacts && contacts.length > 40 && type === "free") setPopup(true)
        if (contacts && contacts.length > 9500 && type === "standard") setPopup(true)
    }, [contacts, type])

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
        <div className="containerModelArea">
            {popup && contacts && <PopupPremium display={popup} limit={contacts.length} />}
            {window.innerWidth > 1280 ?
                <Navbar type={"data"} />
                :
                <MenuBurger type={"data"} />}
            <div className="headSearchData">
                <div onClick={() => { setSelectModel(!selectModel) }} className="choiceSearchData">
                    <p onClick={() => { setSelectModel(!selectModel) }} className="textChoiceDataGet">{choiceModel}</p>
                </div>
                {choiceModel !== 'Tout' &&
                    <div onClick={() => { setSelectCategory(!selectCategory) }} className="choiceSearchData">
                        <p onClick={() => { setSelectCategory(!selectCategory) }} className="textChoiceDataGet">{choiceCategory}</p>
                    </div>}
                {contacts.length > 1 &&
                    <div className="containerColorParams">
                        {!colorSort ?
                            <img onClick={() => { setColorParamsSelect(!colorParamsSelect) }} src={require('./image/color_icon.png')} className="colorIconHead" alt="choose color" />
                            :
                            <div onClick={() => { setColorParamsSelect(!colorParamsSelect) }} className={`colorIcon${colorSort}Head`} />}
                        {colorParamsSelect &&
                            <div className="containerChoiceColorHead">
                                {colorSort && <img onClick={() => { sort('Tout', 'color') }} src={require('./image/color_icon.png')} className="colorIconHead" alt="choose color" />}
                                <div onClick={() => { sort('Green', 'color') }} className="colorGreen" />
                                <div onClick={() => { sort('Blue', 'color') }} className="colorBlue" />
                                <div onClick={() => { sort('Orange', 'color') }} className="colorOrange" />
                                <div onClick={() => { sort('Red', 'color') }} className="colorRed" />
                            </div>}
                        <img onClick={() => { setColorParamsSelect(!colorParamsSelect) }} src={require('./image/choice_icon.png')} alt="arrow choice" className="arrowChoice" />
                    </div>}
            </div>
            <div className="contentDataArea">
                {selectModel &&
                    <div className="listModelsData">
                        {modelId && <p className="textChoiceData" onClick={() => { sort('Tout', 'model') }}>Tout</p>}
                        {models.length && models.map(model => {
                            return (
                                <p className="textChoiceData" onClick={() => { return (setCategoryId(null)), sort(model, 'model') }}>{model.name}</p>
                            )
                        })}
                    </div>}
                {selectCategory &&
                    <div className="listCategorysData">
                        {categoryId && <p className="textChoiceData" onClick={() => { sort('Tout', 'category') }}>Tout</p>}
                        {categorys.length && categorys.map(category => {
                            return (
                                <p className="textChoiceData" onClick={() => { sort(category, 'category') }}>{category.name}</p>
                            )
                        })}
                    </div>}
                {sortContacts.length ? sortContacts.map((contact, index) => {
                    return (
                        <div className={contact.color && index === 0 ? `containerContactMargin${contact.color}` :
                            contact.color ? `containerContact${contact.color}` : index === 0 ? "containerContactMargin" : "containerContact"}>
                            <img onClick={() => { deleteContact(contact.id, index) }} src={require('./image/delete.png')} alt="supprimer icon" className="deleteData" />
                            <p className="contentInfoContact">{contact.phone}</p>
                            <p className="contentInfoContact">{contact.email}</p>
                            <div className="containerColors">
                                {!contact.color ?
                                    <img onClick={() => { setChooseColor(!chooseColor); setChooseColorId(contact.id) }} src={require('./image/color_icon.png')} className="colorIcon" alt="choose color" />
                                    :
                                    <div onClick={() => { setChooseColor(!chooseColor); setChooseColorId(contact.id) }} className={`colorIcon${contact.color}`} />}
                                {chooseColor && chooseColorId === contact.id &&
                                    <div className="containerChoiceColor">
                                        <div onClick={() => { changeColor(contact.id, "Green", index) }} className="colorGreen" />
                                        <div onClick={() => { changeColor(contact.id, "Blue", index) }} className="colorBlue" />
                                        <div onClick={() => { changeColor(contact.id, "Orange", index) }} className="colorOrange" />
                                        <div onClick={() => { changeColor(contact.id, "Red", index) }} className="colorRed" />
                                        <div onClick={() => { changeColor(contact.id, "", index) }} className="colorWhite" />
                                    </div>}
                            </div>
                        </div>
                    )
                })
                    : load && !timeOut ?
                        <img className="loadData" src={require('./image/load.gif')} alt="chargement" />
                        :
                        <p className="noResult">Aucun résultat</p>}
            </div>
        </div>
    )
}

export default DataArea