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

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`)
      setPosts(posts.filter((post) => post._id !== postId))
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  return (
    <>
      <div className="title">
        <h1>Found It!</h1>
      </div>
      <section className="section">
        <div className="form">
          <Post posts={posts} setPosts={setPosts} />
        </div>

        <div className="list">
          <h1>Lost items:</h1>

          {posts?.length === 0 ? (
            <p>No posts available.</p>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="post-card">
                <h3>Title: {post.title}</h3>
                <img
                  src={`http://localhost:3000/${post.image}`}
                  alt={post.title}
                />{" "}
                <h5>Description: {post.description}</h5>
                <h5>Date: {post.date}</h5>
                <h5>Time: {post.time}</h5>
                <button onClick={() => handleDelete(post._id)}>
                  Delete Post
                </button>
                <Comment
                  postId={post._id}
                  comments={post.comments || []}
                  setComments={(updatedComments) =>
                    setPosts((prevPosts) =>
                      prevPosts.map((p) =>
                        p._id === post._id
                          ? { ...p, comments: updatedComments }
                          : p
                      )
                    )
                  }
                />
              </div>
            ))
          )}
        </div>
      </section>
    </>
  )
}

export default App
