import React, {useState, useEffect} from 'react'
import './CardListResponse.css'
import url from '../../../../../api/url';
import origin from '../../../../../api/origin';
import ContentEditable from 'react-contenteditable'
import useGlobalState from '../../../../../hooks/useGlobalState';
import useGlobalStateAddingCard from '../../../../../hooks/useGlobalStateAddingCard';

const CardListResponse = (props) => {
    const [contentEditable] = useState(React.createRef())
    const [inputValue, setInputValue] = useState({html: props.content})
    const [classIconUpdate] = useState('updateIconRes')
    const [classJoinRes, setClassJoinRes] = useState('joinIconRes')
    const { connectClassActive } = useGlobalState();
    const {addingCard} = useGlobalStateAddingCard()
    const [updating, setUpdating] = useState(false)
    const [userId, setUserId] = useState()
    const [modelId, setModelId] = useState()
    const [token, setToken] = useState()

    useEffect(() => {
        if(localStorage.getItem('userId')){
            setUserId(localStorage.getItem('userId'))
            setToken(localStorage.getItem('token'))
        }
        setModelId(localStorage.getItem('modelId'))
    }, [])
    
    const deleteResponse = async () => {
        if(window.confirm(`es tu sûrs de vouloir supprimer la réponses ${props.content} et toutes ses relations ?`)){
            const result = await fetch(`${url}/relation/deleteAllRelationResponse/${props.id}/${userId}/${modelId}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type' :'application/json',
                  'Acces-Control-Allow-Origin' : {origin},
                  'authorization': token
                }
            })
            if(result){
                const result2 = await fetch(`${url}/container/deleteContainerRelationResponse/${props.id}/${userId}/${modelId}`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type' :'application/json',
                      'Acces-Control-Allow-Origin' : {origin},
                      'authorization': token
                    }
                })
                if(result2){
                    const result3 = await fetch(`${url}/response/delete/${props.id}/${userId}/${modelId}`, {
                        method: 'DELETE',
                        headers: {
                          'Content-Type' :'application/json',
                          'Acces-Control-Allow-Origin' : {origin},
                          'authorization': token
                        }
                    })
                    if(result3) addingCard()
                }
            }
        }
    }

    const ValidUpdateResponse = () => {
            let name = inputValue.html.replace('&nbsp;', '')
            name = name.replace('<div>', '')
            name = name.replace('<br>', '')
            name = name.replace('</div>', '')
            fetch(`${url}/response/update/${props.id}/${userId}/${modelId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': `${origin}`,
                  'authorization': token
                },
                body: JSON.stringify({
                content: name
                })
            })
            addingCard()
            setUpdating(false)
        }

    const updateResponse = (name) => {
        setUpdating(true)
        setInputValue({html: name})
    }

    const changeInput = (event) => {
        if(inputValue.html.split('').length < 100){
            setInputValue({ html: event.target.value })
        }
    }

    const joinResponse = () => {
        let valid = true
        fetch(`${url}/chatbot/relation/find/${userId}/${modelId}`)
        .then(res => res.json())
        .then(res => {
            for(let i = 0; i < res.length; i++){
                if(res[i].response_id === props.id){
                    valid = false
                }
            }
            if(valid === true){
                setClassJoinRes('joinIconResActive')
                connectClassActive()
                try{
                    fetch(`${url}/relation/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type' :'application/json',
                        'Acces-Control-Allow-Origin' : {origin},
                        'authorization': token
                    },
                    body: JSON.stringify({
                        response_id : props.id,
                        onchange : true,
                        user_id : userId,
                        model_id : modelId
                    })
                    });
                } catch (error)  {
                    console.log(error);
            }
            } else {
                alert('reponse déja attribuée')
            }
            
        })
    }

    onmousedown = function(event) {
        setClassJoinRes('joinIconRes')
    }

    return(
        <div className="containerCardList">
            {updating === true ?
                <div className="contentCardList">
                    <ContentEditable
                    className="contentQuestionInputCard"
                    innerRef={contentEditable}
                    html={inputValue.html}
                    disabled={false}
                    onChange={changeInput}
                    tagName='article'
                    />
                    <button onClick={ValidUpdateResponse} className="validUpdateCard">Valider</button>
                </div>
            :
                <div className="contentCardList">
                    <p className="textTitleCardRes">{props.content}</p>
                    <div className="containericon">
                        <img alt="join icon" onClick={joinResponse} src={require('../image/join_icon.png')} className={classJoinRes}/>
                        <img alt="update icon" onClick={() => {updateResponse(props.content)}} src={require('../image/update_icon.png')} className={classIconUpdate}/>
                        <img alt="delete icon" onClick={deleteResponse} src={require('../image/delete_icon.png')} className="deleteIconRes"/>
                    </div>
                </div>}
        </div>
    )
}

export default CardListResponse;