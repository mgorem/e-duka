import React from 'react'
import { useSelector } from "react-redux" // select any information from our store
import { selectIsLoggedIn } from '../../redux/slice/authSlice'


const ShowOnLogin = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (isLoggedIn) {
        return children
    }
    return null
}

export const ShowOnLogout = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (!isLoggedIn) {
        return children
    }
    return null
}

export default ShowOnLogin