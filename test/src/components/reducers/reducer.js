let initial_state={
    user_data:{},
    search_user:{},
    selected_chat:{},
    selected_chat_id:null,
    chats:[],
    messages:{}
}
const reduce=(state=initial_state,action)=>{
    switch(action.type){
        case 'INIT_USER':
            return {...state,
                    user_data:{...action.user_data}
            }
        case 'SEARCHUSER':
            return {...state,search_user:{...action.search_user_data}}
        case 'SETSELECTEDCHAT':
            return {...state,selected_chat:{...action.selected_chat}}
        case 'LOADCHATS':
            return {...state,chats:action.all_chats}
        case 'SELECTEDCHATID':
            return {...state,selected_chat_id:action.chat_id}
        case 'SETMESSAGES':
            const msgs=[]
            let chat_id;
            if(action.chat_id){
                chat_id=action.chat_id
            }
            else if(action.set_messages.chat_id){
                chat_id=action.set_messages.chat_id
            }
            if(action.set_messages===""){
                return {...state,messages:[]}
            }
            // else if(state.messages.length===0){
            //     return {...state,messages:action.set_messages}
            // }
            else{
                if(state.messages[chat_id]){
                    state.messages[chat_id].forEach((msg)=>{msgs.push(msg)})
                msgs.push(action.set_messages)
                return {...state,messages:{...state.messages,[chat_id]:msgs}}
            }
                return {...state,messages:{...state.messages,[chat_id]:action.set_messages}}
            }
        default: return state
    }
}

export default reduce;