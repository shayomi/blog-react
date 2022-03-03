import React , {useState, useEffect, useContext}  from 'react'
import {useLocation, useParams} from "react-router-dom"
import MainLayout from "../../Layout/MainLayout"
import CommentComp from "../../Common/CommentComp"
import Comment from "../../Common/Comment"
import axios from "axios"
import { BLOG_URL } from "../../utils/urls"
import Skeleton from "react-loading-skeleton"
import moment from "moment"


const SingleBlog = (props) => {
  const [fetching, setFetching] = useState(true)
  const [activeBlog, setActiveBlog] = useState([])
  const params = useParams()


  useEffect(() => {
    axios.get(BLOG_URL + params.slug).then(
      (res) => {
        setActiveBlog(res.data)
        setFetching(false)
        console.log(res.data)
      },
      (err) => {
        console.log(err)
      }
    )
  }, [])



  return (
    <MainLayout>
      <div className="SingleBlog">
        <div className="cover-main" style = {{backgroundImage: `url("${!fetching && activeBlog.cover}")`}}/>
        <br />
          <div className="blogListContainer">
              <div className="blogList">
                <h3> {activeBlog.title} </h3>
                <div className="author">
                    Created by : , on {moment(new Date(activeBlog.created_at)).format("YYYY-MM-DD")}
                </div>
                <p dangerouslySetInnerHTML={{__html: activeBlog.content}} />

                <CommentComp id={activeBlog.id} />
                <Comment id={activeBlog.id} />

              </div>
              <div className="blogExtra"></div>
          </div>
        </div>
      </MainLayout>
  )
}

export default SingleBlog
