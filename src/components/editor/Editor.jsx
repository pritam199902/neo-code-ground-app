import React, { useState } from 'react'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'

import { Controlled as MyEditor } from "react-codemirror2"


function Editor({ displayName = "Title", language = "", value = "", onChange = {} }) {

    const [open, setOpen] = useState(true)

    function handleChange(editor, data, value) {
        onChange(value)
    }


    return (
        <div className={`editor-container ${open ? "" : "collapsed"}`}>
            <div className="editor-title">
                {displayName}
                <button onClick={()=>setOpen(!open)} className="open-close">
                    <FontAwesomeIcon color='#fff' icon={open ? faCompressAlt : faExpandAlt } />
                </button>
            </div>
            <MyEditor
                onBeforeChange={handleChange}
                value={value}
                className="editor-codemirror-wraper"
                options={{
                    theme: 'material',
                    mode: language,
                    lint: true,
                    lineWrapping: true,
                    lineNumbers: true,
                }}
            />
        </div>
    )
}

export default Editor