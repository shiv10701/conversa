let initial_state = {
    user_data: {},
    search_user: {},
    selected_chat: {},
    selected_chat_id: null,
    chats: [],
    messages: {},
    unseen_chats: {}
}
const reduce = (state = initial_state, action) => {
    switch (action.type) {
        case 'INIT_USER':
            return {
                ...state,
                user_data: { ...action.user_data }
            }
        case 'SEARCHUSER':
            return { ...state, search_user: { ...action.search_user_data } }
        case 'SETSELECTEDCHAT':
            return { ...state, selected_chat: { ...action.selected_chat } }
        case 'LOADCHATS':
            return { ...state, chats: action.all_chats }

        case 'ADDNEWCHAT':
            let all_chats;
            if (state.chats) {
                if (state.chats.length > 0) {
                    all_chats = state.chats
                    all_chats.push(action.new_chat)
                }
                else {
                    all_chats = [action.new_chat]
                }
            }
            else {
                all_chats = []
                all_chats.push(action.new_chat)
            }
            return { ...state, chats: all_chats }
        case 'SELECTEDCHATID':
            return { ...state, selected_chat_id: action.chat_id }
        case 'SETSEEN':
            return { ...state, unseen_chats: { ...state.unseen_chats, [action.chat_id]: 0 } }
        case 'SETMESSAGES':
            const msgs = []
            let chat_id;
            let new_unseen_chats = 0;
            if (action.chat_id) {
                chat_id = action.chat_id
            }
            else if (action.set_messages.chat_id) {
                chat_id = action.set_messages.chat_id
            }
            if (Array.isArray(state.messages[chat_id]) && !Array.isArray(action.set_messages)) {
                state.messages[chat_id].forEach((msg) => {
                    msgs.push(msg)
                })
                console.log(action.set_messages.sender?._id)
                new_unseen_chats = action.set_messages?._id !== state.user_data._id ? state.unseen_chats[chat_id] + 1 : state.unseen_chats[chat_id];
                msgs.push(action.set_messages)
                return { ...state, messages: { ...state.messages, [chat_id]: msgs }, unseen_chats: { ...state.unseen_chats, [chat_id]: new_unseen_chats } }
            }
            if (action.set_messages.length) {
                (action.set_messages).forEach(item => {
                    if (!item.receivedAt) {
                        if (item.sender._id !== state.user_data._id) {
                            new_unseen_chats = new_unseen_chats + 1;
                        }
                    }
                })
            }
            //the new_array  variable is used for the chats which are new like we search a user andd then send a message to them at that time it is used otherwise it is not used.
            let new_array;
            if (!Array.isArray(action.set_messages)) {
                new_array = []
                new_array.push(action.set_messages)
            }
            else {
                new_array = action.set_messages
            }
            return { ...state, messages: { ...state.messages, [chat_id]: new_array }, unseen_chats: { ...state.unseen_chats, [chat_id]: new_unseen_chats === 0 ? 0 : new_unseen_chats } }
        // --------------------------------Calling History --------------------------------
        case 'LOADCALLHISTORY':
            return { ...state, call_History: action.all_calls }
        default: return state
    }
}

export default reduce;