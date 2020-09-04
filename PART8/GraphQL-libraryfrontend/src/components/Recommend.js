import React from 'react'
import {useQuery} from '@apollo/client'
import {ME} from '../queries'

const Recommend = ({show}) => {

    const result = useQuery(ME)

    if (!show) {
        return null
    }
    if (result.loading){
        return(
            <p> Loading .... </p>
        )
    }

    const favouriteGenre = result
    console.log("Thsi is result from Recommend", favouriteGenre)
    return (
            <>


            </>
    )
}

export default Recommend
