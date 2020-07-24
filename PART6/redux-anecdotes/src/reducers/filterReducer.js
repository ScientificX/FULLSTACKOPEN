const initialState = null


const reducer = (state=initialState, action) => {

    switch(action.type){
        case 'FILTER':
            return action.filt

        default:
            return initialState
    }
}


export const filterBy = (filterString) => {
    return {
        type: 'FILTER',
        filt: `${filterString}`
    }
}




export default reducer