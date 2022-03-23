import React, { useState } from 'react'
import { post_signup } from '../../api/api'
import Loading from '../common/Loading'

function Signup(props) {
    const [state, setState] = useState({
        name: "",
        email: '',
        password: "",
        confirmPassword: "",

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
        if (!state?.name || !state?.email || !state?.password || !state?.confirmPassword) return alert("Please fill all the field!")

        if (state?.password !== state?.confirmPassword) {
            setState({ ...state, password: "", confirmPassword: "" })
            return alert("Password and Confirm Password didn't match!")
        }

        const data = {
            name: state?.name,
            email: state?.email,
            password: state?.password
        }
        setState({ ...state, is_loading: true })
        const res = await post_signup(data)
        if (!res || res?.error) {
            alert("Fail to signup!")
            return setState({ ...state, is_loading: false, password: '', confirmPassword: "" })
        }
        alert(res?.message)
        setState({ ...state, is_loading: false, password: '', confirmPassword: "", email: '', name: "" })
        return props.on_change_page(true)


    }

    return (
        <div className='container' >
            <div className="row">
                <div className="col-lg-6 col-md-6 m-auto">

                    <div className="card my-5">
                        <div className="card header">

                            <h4 className='text-center' >
                                Signup
                            </h4>
                        </div>
                        <div className="card-body">
                            <form className='px-4' onSubmit={onSubmit} >
                                <input
                                    className='form-control my-2'
                                    disabled={state.is_loading}
                                    placeholder='Name'
                                    name="name"
                                    value={state.name}
                                    onChange={onEdit}
                                />
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
                                <input
                                    type="password"
                                    disabled={state.is_loading}
                                    className='form-control my-2'
                                    placeholder='Confirm password'
                                    name="confirmPassword"
                                    value={state.confirmPassword}
                                    onChange={onEdit}
                                />
                                <div className='mt-4' style={{ display: 'flex', justifyContent: "space-between" }}>
                                    <button
                                        type='submit'
                                        className='btn btn-dark px-4'
                                        disabled={state.is_loading}
                                    >
                                        {state.is_loading ? <Loading color="#fff" /> : "Signup"}
                                    </button>
                                    <button
                                        type='submit'
                                        className='btn px-4'
                                        disabled={state.is_loading}
                                        onClick={() => props.on_change_page(true)}
                                    >
                                        Go To Login
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

export default Signup