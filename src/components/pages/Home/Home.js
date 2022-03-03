import React, {useState, useEffect} from 'react'
import "./Home.css"
import axios from 'axios'
import { BLOG_URL } from "../../utils/urls"
import Skeleton from "react-loading-skeleton"
import moment from "moment"
import MainLayout from "../../Layout/MainLayout"
import {Link} from "react-router-dom"


const Home = (props) => {
  const [fetching, setFetching] = useState(true);
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    getBlogContent();
  }, [])

  const getBlogContent = () => {
    axios
      .get(BLOG_URL)
      .then(res => {
        setBlogList(res.data)
        setFetching(false)

      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <MainLayout>
      <div>
        <div className="banner">
          <h3> Arts and Tech </h3>
          <p> Keeping you informed about arts and techniology</p>
          <div className="searcBlog">
            <input placeholder="search blog contents" />
          </div>
        </div>

        <div className="blogListContainer">
          {fetching ? (
              <div className="blogList">
                <Skeleton height={200} />
                <br />
                <Skeleton height={200} />
              </div>
          ):(
          <div className="blogList">
            {console.log(blogList)}
            {
              blogList.map((item, id) =>
                <BlogCard key={id} data={item}/>)
            }
          </div>
         )}

          <div className ="blogExtra">
            <h4> Top Blog </h4>
              <BlogCardExtra/>
              <BlogCardExtra/>
              <BlogCardExtra/>
              <BlogCardExtra/>
              <BlogCardExtra/>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const RemoveTag = (content) => {
  const Regex = /(<([^>]+)>)/gi
  const Regex2=/(&([a-z]+);)/gi
  return content.replace(Regex, '').replace(Regex2, '')
}

const BlogCard = (props) => {
  console.log(props.data)
  return (
    <div className="blogCard" key={props.id}>
      <div className="blogImage" style={{backgroundImage: `url("${props.data.cover}")`}}> </div>
        <div className="blogContent">
          <div className="blogTitle">{props.data.title}</div>
            <p>
             {RemoveTag(props.data.content).toString().substring(0,100)}
             {RemoveTag(props.data.content).toString().length>100 && "..."}
            </p>
            <Link to={`/${props.data.slug}`}>
              <button> Continue Reading </button>
            </Link>
            <div className="footer">
                Created by : {props.data.author.username}, on {moment(new Date(props.data.created_at)).format("YYYY-MM-DD")}
            </div>
      </div>
    </div>
  )
}

const BlogCardExtra = (props) => {
  return (
    <div className="blogCardExtra">
      <div className="blogImage" />
        <div className="blogContent">
          <div className="blogTitle">Blog Title</div>
            <button> Read Blog </button>
            <div className="footer">
                Created by : shayomi, on 22-05-2020
            </div>
          </div>
    </div>
  )
}

export default Home
