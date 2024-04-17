let initial_state={
    user_data:{}
}
const reduce=(state=initial_state,action)=>{
    switch(action.type){
        case 'INIT_USER':
            return {...state,
                    user_data:{...action.user_data}
            }
            
        default: return state
    }
}

export default reduce;