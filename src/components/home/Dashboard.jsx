import { faBedPulse, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../common/Loading'

function Dashboard(props) {
    const navigation = useNavigate()

    const [state, setState] = useState({
        list: [],
        is_reload: false,
        is_loading: true,
        is_creating: false
    })


    const handleClick = ({ id, title }) => {
        // props?.on_set_editor({ title, id })
        return navigation(`/${id}`)
    }


    const handleCreateNew = async () => {
        setState({ ...state, is_creating: true })
        props?.socket?.emit("create-new", { user_id: props?.user?._id }, response => {
            // setState({ ...state, is_reload: !state?.is_reload })
            handleClick({ id: response?.id, title: response?.title })
        })
    }


    useEffect(() => {
        props?.on_set_editor(false)
        props?.socket?.emit('load-all-code', { user_id: props?.user?._id }, (data) => {
            setState({ ...state, is_loading: false, list: [...data], is_creating: false })
        })
    }, [state.is_reload])




    return (
        <div className='container py-5' >
            <h4>All Codes</h4>
            {
                state?.is_loading ? <Loading />
                    :
                    <div className='py-2' style={{ display: 'flex', alignItems: "center", justifyContent: "start", flexWrap: 'wrap' }} >
                        {/* create new card */}
                        <div className="card card-body item" style={{ justifyContent: "center", alignItems: "center", cursor: "pointer" }} onClick={handleCreateNew} >
                            {state?.is_creating ?
                                <Loading />
                                :
                                <FontAwesomeIcon icon={faPlus} style={{ fontSize: "50px", fontWeight: "bolder" }} />
                            }
                        </div>
                        {state?.list?.map((info, i) => {
                            const time = new Date(info?.last_update_on)
                            return (
                                <div key={i} className="card card-body item" onClick={() => handleClick({ id: info?.id, title: info?.title })} >
                                    <h5>
                                        {info?.title}
                                    </h5>

                                    <div>
                                        <div>
                                            <small style={{ color: '#aaa' }} >
                                                {time?.toDateString?.()}
                                                {/* {time?.toLocaleTimeString?.()} */}
                                            </small>
                                        </div>
                                        <small style={{ color: '#aaa' }} >
                                            {/* {time?.toDateString?.()}, */}
                                            {time?.toLocaleTimeString?.()}
                                        </small>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
            }

        </div>
    )
}

export default Dashboard