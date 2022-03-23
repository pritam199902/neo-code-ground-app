import React from 'react'
import ReactLoading from 'react-loading';

function Loading(props) {
    return (
        <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
            <ReactLoading type={"spin"} color={props?.color || "#000"} height={24} width={24} />
        </div>
    )
}

export default Loading