import { useEffect } from "react";
import { init_user } from './actions/actions';
import { useDispatch } from 'react-redux'; 


function AssignUserData(props) {
    const dispatch = useDispatch();
    useEffect( () => {
         assign_user_data();
    },);
    console.log()

    async function assign_user_data(){
        const user_data= await JSON.parse(localStorage.getItem("user_data"))||null;
        if(user_data!==null){
            dispatch(init_user(user_data))
            console.log("inside assign user data")
        }
    }
    return null; 
}

export default AssignUserData;
