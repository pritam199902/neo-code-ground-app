import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import io from "socket.io-client"
import Header from '../common/Header'
import Editor from '../editor/Index'
import Dashboard from './Dashboard'
import Loading from "../common/Loading"


function Home(props) {
    const [socket, setSocket] = useState(null)




    const [state, setState] = useState({
        is_loading: true,
        list: [],
        opened_data: null,
        is_editor: false,
        editor_title: null,
        editor_id: null,
    })


    // const on_edit_title = (title) => {
    //     setState({ ...state, editor_title: title })
    // }

    const on_set_editor = ({ id, title }) => {
        // console.log({id, title});
        if (id && title) {

            return setState({ ...state, is_editor: true, editor_title: title || "--", editor_id: id || "" })
        }
        return setState({ ...state, is_editor: false, editor_title: null, editor_id: null })
    }


    useEffect(() => {
        let connection = io(`${window.location.origin}`, { auth: { ...props?.user } })
        if (connection) {
            setSocket(connection)
            setState({ ...state, is_loading: false })
        }

    }, [])

    return (
        <>
            <Header
                socket={socket}
                user={props.user}
                on_reload={props?.on_reload}
                is_editor={state.is_editor}
                title={state?.editor_title}
                id={state?.editor_id}
                on_set_editor={on_set_editor}
            />
            {
                state?.is_loading ? <Loading />
                    :
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <Dashboard socket={socket} user={props?.user} on_set_editor={on_set_editor} />
                            }
                        />
                        <Route
                            path='/:id'
                            element={
                                <Editor socket={socket} user={props?.user} on_set_editor={on_set_editor} />
                            }
                        />
                    </Routes>
            }



        </>
    )
}

export default Home