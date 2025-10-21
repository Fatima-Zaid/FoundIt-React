import { useEffect, useState } from "react"
import axios from "axios"
import Post from "./components/Post"
import "./App.css"
import Comment from "./components/Comment"

const App = () => {
  const [posts, setPosts] = useState([])


  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts")

        setPosts(response.data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      }
    }
    getPosts()
  }, [])

  return (
    <>
    <Post posts={posts} setPosts={setPosts}/>
      <h1>Lost items:</h1>

      {posts?.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="post-card">
            <h3>Title: {post.title}</h3>
            {post.img && <img src={post.img} alt={post.title} />}
            <h5>Description: {post.description}</h5>
            <h5>Date: {post.date}</h5>
            <h5>Time: {post.time}</h5>

            <Comment
              postId={post._id}
              comments={post.comments || []}
              setComments={(updatedComments) =>
                setPosts((prevPosts) =>
                  prevPosts.map((p) =>
                    p._id === post._id ? { ...p, comments: updatedComments } : p
                  )
                )
              }
            />
          </div>
        ))
      )}
    </>
  )
}

export default App
