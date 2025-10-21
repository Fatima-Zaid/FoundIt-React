import { useEffect, useState } from "react"
import axios from "axios"
import Post from "./components/Post"
import "./App.css"

const App = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      try {
        let response = await axios.get("http://localhost:3000/posts")
        setPosts(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }, [])

  return (<>
  <Post posts={posts} setPosts={setPosts}/>
  <h1>Lost items:</h1>
  {
    posts?.map((post)=>(
      <div key={post._id} className="post">
        <h3>Title: {post.title}</h3>
        <img src={post.img} alt="" />
        <h5>Description: {post.description}</h5>
        <h5>Date: {post.date}</h5>
        <h5>Time: {post.time}</h5>

      </div>
    ))
  }

  </>)
}

export default App
