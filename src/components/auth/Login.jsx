import React, { useState } from 'react'
import { post_login } from "../../api/api"
import Loading from '../common/Loading'

function Login(props) {
    const [state, setState] = useState({
        email: '',
        password: "",
        is_loading: false
    })

    const onEdit = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!state.email || !state.password) {
            return alert("Empty email or password!")
        }
        const data = {
            email: state.email,
            password: state.password
        }
        setState({ ...state, is_loading: true })
        const res = await post_login(data)
        if ( !res || res?.error ) {
            alert(res.message || "Unable to login")
            return setState({ ...state, is_loading: false })
        }
        setState({ ...state, email: "", password: "", is_loading: false })
        alert(res?.message)
        return props?.on_reload()

    }

    return (
        <div className='container' >
            <div className="row">
                <div className="col-lg-6 col-md-6 m-auto">

                    <div className="card my-5">
                        <div className="card header">

                            <h4 className='text-center' >
                                Login
                            </h4>
                        </div>
                        <div className="card-body">
                            <form className='px-4' onSubmit={onSubmit} >
                                <input
                                    className='form-control my-2'
                                    disabled={state.is_loading}
                                    placeholder='Email'
                                    name="email"
                                    value={state.email}
                                    onChange={onEdit}
                                />
                                <input
                                    type="password"
                                    disabled={state.is_loading}
                                    className='form-control my-2'
                                    placeholder='Password'
                                    name="password"
                                    value={state.password}
                                    onChange={onEdit}
                                />
                                <div className='mt-4' style={{ display: 'flex', justifyContent: "space-between" }}>
                                    <button
                                        type='submit'
                                        className='btn btn-dark px-4'
                                        disabled={state.is_loading}
                                    >
                                        {state.is_loading ? <Loading color="#fff" /> : "Login"}
                                    </button>
                                    <button
                                        type='button'
                                        className='btn px-4'
                                        disabled={state.is_loading}
                                        onClick={() => props.on_change_page(false)}
                                    >
                                        {"Go Signup"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login