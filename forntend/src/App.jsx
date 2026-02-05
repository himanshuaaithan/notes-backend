import { useState, useEffect } from 'react'
import axios from "axios"

function App() {
  const [showdisplay, setshowdisplay] = useState("none");
  const [notes, setnotes] = useState([])
  const [updatenotedisplay, setupdatenotedisplay] = useState("none");
  const [id, setid] = useState(null)
  const [inputvalue, setinputvalue] = useState({
  })

  function fatchnotes() {
    axios.get("https://notes-backend-t2tn.onrender.com/api/note")
      .then(res => {
        setnotes(res.data.notes)
      })
  }

  useEffect(() => {
    fatchnotes()
  }, [])

  function submitHandler(e) {
    e.preventDefault()
    setshowdisplay("none")

    const { title, discription } = e.target.elements
    console.log(title.value, discription.value)

    axios.post("https://notes-backend-t2tn.onrender.com/api/note", {
      title: title.value,
      discription: discription.value
    })
      .then(res => {
        fatchnotes()
      })
  }

  function deleteHandler(noteID) {
    axios.delete("https://notes-backend-t2tn.onrender.com/api/note/" + noteID)
      .then(res => {
        fatchnotes()
      })
  }



  function updatenote(e) {
    e.preventDefault()
    const { title, discription } = e.target.elements

    axios.patch("https://notes-backend-t2tn.onrender.com/api/note/" + id, {
      title: inputvalue.title,
      discription: inputvalue.discription
    })
      .then(res => {
        fatchnotes()
      })

  }



  return (
    <>
      <div className="main">

        <div className="nav">
          <button onClick={() => {
            setshowdisplay("block")
          }}> <span><i className="ri-add-line"></i></span> </button>
          <h1>create notes</h1>
        </div>


        <div className="notesection">
          <div className="hero"><form style={{ display: showdisplay }} onSubmit={submitHandler} >
            <input name='title' type="text" placeholder='enter title' required /> <br />
            <input name='discription' type="text" placeholder='enter discription' required /> <br />
            <button>submit</button>
          </form>


            <div className="note">
              {notes.map(
                (note) => {

                  return <div key={notes._id} className="notes" >
                    <h1>{note.title}</h1>
                    <p>{note.discription}</p>

                    <div className="button">
                      <button onClick={() => {
                        setid(note._id)
                        setupdatenotedisplay("block")
                        setinputvalue({
                          title: note.title,
                          discription: note.discription
                        }
                        )

                      }}> <span><i class="ri-edit-line"></i></span></button>
                      <button onClick={() => {
                        deleteHandler(note._id)
                      }}> <span><i class="ri-delete-bin-line"></i></span> </button>
                    </div>
                  </div>
                }
              )}
            </div>

            <form onSubmit={updatenote} style={{ display: updatenotedisplay }}>
              <input type="text" value={inputvalue.title} onChange={(e) => {
                setinputvalue({ ...inputvalue, title: e.target.value })
              }} required /><br />
              <input type="text" onChange={(e) => {
                setinputvalue({ ...inputvalue, discription: e.target.value })
              }} value={inputvalue.discription} required /><br />
              <button onClick={() => {
                setupdatenotedisplay("none")
              }}>update</button>
            </form></div>
        </div>
      </div>
    </>
  )
}

export default App
