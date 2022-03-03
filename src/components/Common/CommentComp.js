import React, {useState, useContext} from 'react'
import axios from 'axios'
import { BLOG_COMMENT_URL } from "../utils/urls"
import {store} from "../stateManagement/store"
import {CommentTriggerAction} from "../stateManagement/actions"

const CommentComp = (props) => {

  const [commentData, setCommentData] = useState({ blog_id:props.id })
  const [loading, setLoading] = useState(false)
  const {dispatch} = useContext(store)


  const onChange = (e) =>{
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value
    })
  }


  const onSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    axios.post(BLOG_COMMENT_URL,commentData).then(
      (res)=>{
        console.log(res.data)
        setLoading(false)
        alert("comment submitted.")
        setCommentData({ blog_id:props.id })
        dispatch({type: CommentTriggerAction, payload: true})
      },
      (err)=>{
        console.log(err.response.data)
        setLoading(false)
      }
    )
    console.log(commentData)
  }



  return (
    <div className="comment-comp">
      <h3> Write a comment </h3>
      <form onSubmit={onSubmit}>
        <input
          placeholder = "Enter Your Name"
          name ="name"
          value={commentData.name || ""}
          onChange ={onChange}
        />
        <textarea
          placeholder = "Enter Your Comment"
          rows={6}
          name ="comment"
          value={commentData.comment || ""}
          onChange ={onChange}
          required
        />

        <button type="submt" disabled={loading}>{loading ? "Submitting...": "Submit"}</button>
      </form>
    </div>
  )
}

export default CommentComp
