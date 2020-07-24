
const initialState = null

const reducer = (state=initialState, action) => {

    switch(action.type){
        case 'NOTIF':
            return action.message + ' has been added'

        case 'NONOTIF':
            return null
        
        default:
            return initialState

    }
}


export const createNotif = (message, time) => {
    
   return  async (dispatch) => {
       dispatch({
        type: 'NOTIF',
        message: message
    })
    setTimeout( () => dispatch( {
        type: 'NONOTIF',
        
    }), time )
   }
}



export default reducer