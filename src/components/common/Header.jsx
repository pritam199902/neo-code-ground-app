import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { logout } from '../../api/api'

function Header(props) {
    const params = useParams()

    const [title, setTitle] = useState(props?.title)

    useEffect(() => {
      setTitle(props?.title)
    }, [props?.title])
    

    // console.log("title: ", props?.title);

    const handleLogout = async () => {
        await logout()
        props?.on_reload()
    }

    const handleChange =(e)=>{
        setTitle(e.target.value)
    }

    const handleBlur =(e)=>{
        props?.socket?.emit('update-doc', { id: props?.id, title })
        props?.on_set_editor({id: props?.id, title: title})
        // console.log({id: props?.id, title: title});
    }

    return (
        <header className="header" >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                <div>
                    <Link to="/" style={{ color: "unset", textDecoration: 'none' }} >
                        <img src="./neo-logo.png" height={"30px"} style={{ marginRight: "15px" }} />
                    </Link>
                    {
                        props?.is_editor ?
                            <input
                                style={{ color: "#fff", backgroundColor: 'transparent', border: "none" }}
                                value={title|| ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            :
                            "Neo Code Ground"
                    }
                </div>
                <div style={{ display: "flex", flexDirection: 'column', alignItems: 'end' }} >
                    <span style={{ fontSize: '15px' }} >
                        {props?.user?.name}
                    </span>
                    <button className='btn btn-sm btn-link p-0' onClick={handleLogout} >logout</button>
                </div>
            </div>

        </header>
    )
}

export default Header