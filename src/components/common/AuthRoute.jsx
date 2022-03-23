import React from 'react'
import { useNavigate, Route } from "react-router-dom"

function AuthRoute({ children: Component, ...props }) {
    const navigator = useNavigate()


    if (!props?.user) {
        // console.log(props.user);
        return navigator("/login")
    }

    return (
        <Route
            {...props}
            element={<Component user={props.user} />}
        />
    )
}

export default AuthRoute