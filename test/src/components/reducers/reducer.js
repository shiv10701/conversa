const reduce=(state=[],action)=>{
    switch(action.type){
        case 'INIT_USER':
            return [...state,{
                    user_data:{...action.user_data},
                    completed:false
            }]
        default: return state
    }
}

export default reduce;