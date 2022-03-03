import React ,{ useEffect, useState, useContext } from 'react'
import axios from "axios"
import { BLOG_COMMENT_URL } from "../utils/urls"
import CommentCard from "./CommentCard"
import {store} from "../stateManagement/store"
import {CommentTriggerAction} from "../stateManagement/actions"

const Comments = (props) => {
  const [fetching, setFetching] = useState(true)
  const [commentList, setCommentList] = useState([])

  const{state:{commentTrigger}, dispatch} = useContext(store)

  useEffect(() =>{
    if(commentTrigger){
      axios.get(BLOG_COMMENT_URL).then(
        res => {
          setCommentList(res.data)
          setFetching(false)
          console.log(res.data)
        },
        err => {
          console.log(err.response.data)
        }
      )
      dispatch({type: CommentTriggerAction, payload: false})
    }
  }, [props, commentTrigger])

  return (
    <div className="commentList">
      <h3>Comments</h3>
      {
        fetching && <i>loading...</i>
      }
      {!fetching && commentList.length < 1 ? (
          <h4> No Comments </h4>
        ) : (
        commentList.map((item, key)=> {
          return <CommentCard data={item} key={key} />
        })
      )}
    </div>
  )
}

export default Comments
