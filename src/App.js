import React, { useEffect, useState } from 'react'
import { Router, Route, Routes } from "react-router-dom"
import { get_profile } from './api/api'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Loading from './components/common/Loading'
import Home from "./components/home/index"

function App() {

    const [state, setState] = useState({
        is_loading: false,
        user: null,
        is_reload: false,
        is_login_page: true
    })


    const on_reload = () => {
        setState({ ...state, is_reload: !state.is_reload })
    }

    const on_change_page = (flag) => {
        setState({ ...state, is_login_page: flag || false })
    }



    useEffect(() => {
        let mount = true

        async function load() {
            const res = await get_profile()
            if (!res || res?.error) {
                return mount && setState({ ...state, is_loading: false, user: null })
            }
            return mount && setState({ ...state, is_loading: false, user: res?.data })
        }

        load()

        return () => {
            mount = false
        }
    }, [state.is_reload])



    return (
        <div>
            {
                state?.is_loading ?
                    <Loading />
                    :
                    state.user ?
                        <Home user={state.user} on_reload={on_reload} />
                        :
                        state.is_login_page ?
                            <Login on_change_page={on_change_page} on_reload={on_reload} />
                            :
                            <Signup on_change_page={on_change_page} />
            }
        </div>
    )
}

export default App