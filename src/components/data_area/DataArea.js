import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import MenuBurger from '../menuBurger/MenuBurger'
import PopupPremium from '../popupPremium/PopupPremium'
import url from '../../api/url'
import './DataArea.scss'


const DataArea = () => {
    const [mails, setMails] = useState()
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
    const [contacts, setContacts] = useState()
    const [sortContacts, setSortContacts] = useState([])
    const [chooseColor, setChooseColor] = useState(false)
    const [chooseColorId, setChooseColorId] = useState()
    const [colorSort, setColorSort] = useState('')
    const [colorParamsSelect, setColorParamsSelect] = useState(false)
    const [load, setLoad] = useState(true)
    const [timeOut, setTimeOut] = useState(false)
    const [type, setType] = useState()
    const [popup, setPopup] = useState(false)

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
        } else {
            setUserId(sessionStorage.getItem('userId'))
            setToken(sessionStorage.getItem('token'))
            setType(sessionStorage.getItem('type'))
        }
    }, [])

    useEffect(() => {
        fetch(`${url}/model/findAll/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Acces-Control-Allow-Origin': { origin },
                'authorization': token
            }
        })
            .then(res => res.json())
            .then(res => setModels(res))
    }, [userId, token])

    useEffect(() => {
        fetch(`${url}/category/findAll/${userId}/${modelId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Acces-Control-Allow-Origin': { origin },
                'authorization': token
            }
        })
            .then(res => res.json())
            .then(res => {
                setCategorys(res)
                if (!categorySelect && res[0]) setCategorySelect(res[0].id)
            })
    }, [userId, modelId])

    useEffect(() => {
        fetch(`${url}/contact/findByUser/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Acces-Control-Allow-Origin': { origin },
                'authorization': token
            }
        })
            .then(res => res.json())
            .then(res => {
                if(type === "free" && res.length > 500) res.length = 500
                if(type === "standard" && res.length > 10000) res.length = 10000
                setContacts(res)
                setSortContacts(res)
            })
    }, [userId, chooseColor])


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

            if (categoryId && type !== "category") {
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

    const changeColor = (contactId, color) => {
        fetch(`${url}/contact/update/${contactId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': `${origin}`,
                'authorization': token
            },
            body: JSON.stringify({
                color: color
            })
        })
        setChooseColor(false)
    }

    useEffect(() => {
        if (contacts && contacts.length > 400 && type === "free") setPopup(true)
        if (contacts && contacts.length > 9500 && type === "standard") setPopup(true)
    }, [contacts, type])

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
                </div>
            </div>
            <div className="contentDataArea">
                {selectModel &&
                    <div className="listModelsData">
                        {modelId && <p className="textChoiceData" onClick={() => { sort('Tout', 'model') }}>Tout</p>}
                        {models.length && models.map(model => {
                            return (
                                <p className="textChoiceData" onClick={() => { sort(model, 'model') }}>{model.name}</p>
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
                            <p className="contentInfoContact">{contact.phone}</p>
                            <p className="contentInfoContact">{contact.email}</p>
                            <div className="containerColors">
                                {!contact.color ?
                                    <img onClick={() => { setChooseColor(!chooseColor); setChooseColorId(contact.id) }} src={require('./image/color_icon.png')} className="colorIcon" alt="choose color" />
                                    :
                                    <div onClick={() => { setChooseColor(!chooseColor); setChooseColorId(contact.id) }} className={`colorIcon${contact.color}`} />}
                                {chooseColor && chooseColorId === contact.id &&
                                    <div className="containerChoiceColor">
                                        <div onClick={() => { changeColor(contact.id, "Green") }} className="colorGreen" />
                                        <div onClick={() => { changeColor(contact.id, "Blue") }} className="colorBlue" />
                                        <div onClick={() => { changeColor(contact.id, "Orange") }} className="colorOrange" />
                                        <div onClick={() => { changeColor(contact.id, "Red") }} className="colorRed" />
                                        <div onClick={() => { changeColor(contact.id, "") }} className="colorWhite" />
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