import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../common/Loading";
import Editor from "./Editor";

function Index({ socket, user, on_set_editor }) {
  const params = useParams()
  const [html, setHtml] = useState("")
  const [css, setCss] = useState("")
  const [js, setJs] = useState("")
  const [srcDoc, setSrcDoc] = useState(`
  <html>
      <style>
      ${css}
      </style>
      <body >
      ${html}
      </body>
      <script>
        ${js}
      </script>
  </html>
  `)

  const [is_loading, setIs_loading] = useState(true)
  const [is_reload, setIs_reload] = useState(false)


  useEffect(() => {
    setSrcDoc(`
    <html>
        <style>${css}</style>
        <body > ${html} </body>
        <script>${js}</script>
    </html>
    `)

  }, [html, css, js])




  useEffect(() => {
    let mount = true

    socket.emit('get-code-by-id', { id: params?.id }, (data) => {
      // console.log("load data..", data);
      mount && on_set_editor({id : data?.id, title: data?.title})
      // console.log("code 
      mount && setCss(data?.css)
      mount && setHtml(data?.html)
      mount && setJs(data?.js)
      mount && setIs_loading(false)
    })

    return () => {
      mount = false
    }
  }, [is_reload])


  useEffect(() => {
    socket.on('update-doc', (data) => {
      if (data) {
        on_set_editor({id : data?.id, title: data?.title})
        setCss(data?.css)
        setHtml(data?.html)
        setJs(data?.js)
      }
      return
    })
  }, [])


  const handleChangeHtml = (value) => {
    setHtml(value)
    // setChange(!change)
    setTimeout(() => {
      socket?.emit('update-doc', { html: value, css, js, id: params?.id })
    }, 400)
  }

  const handleChangeCss = (value) => {
    setCss(value)
    // setChange(!change)
    setTimeout(() => {
      socket?.emit('update-doc', { html, css: value, js, id: params?.id })
    }, 400)
  }

  const handleChangeJs = (value) => {
    setJs(value)
    // setChange(!change)
    setTimeout(() => {
      socket?.emit('update-doc', { html, css, js: value, id: params?.id })
    }, 400)
  }




  return (
    <>
      {
        is_loading ? <Loading />
          :
          <>
            <div className="pane top-pane" >
              <Editor
                displayName="HTML"
                language="xml"
                value={html}
                onChange={handleChangeHtml}
              />
              <Editor
                displayName="CSS"
                language="css"
                value={css}
                onChange={handleChangeCss}
              />
              <Editor
                displayName="JS"
                language="javascript"
                value={js}
                onChange={handleChangeJs}
              />

            </div>
            <div className="pane" >
              <iframe
                srcDoc={srcDoc}
                title="output"
                // sandbox="allow-scripts"
                frameBorder="0"
                width="100%"
                height="100%"
              />
            </div>
          </>
      }
    </>
  );
}

export default Index;
