import React  from 'react'
import {useParams, BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/pages/Home/Home'
import SingleBlog from './components/pages/SingleBlogPage/SingleBlog'
import BlogCard from './components/pages/Home/Home'
import BlogCardExtra from './components/pages/Home/Home'
import MainLayout from "./components/Layout/MainLayout"


const Welcome = () => {
  return (
   <Router>
      <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:slug" element={ <SingleBlog />} />
      </Routes>
  </Router>
  )
}






export default Welcome
