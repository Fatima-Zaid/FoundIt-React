import { useState } from "react"
import axios from "axios"

const Post = ({ posts, setPosts }) => {
  const initialState = {
    username: "",
    title: "",
    image: "",
    description: "",
    date: "",
    time: "",
  }

  const [postState, setPostState] = useState(initialState)

  const handleChange = (event) => {
    setPostState({ ...postState, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await axios.post(
      "http://localhost:3000/posts/createPost",
      postState
    )
    let postsList = [...posts]
    postsList.push(response.data)
    setPosts(postsList)
    setPostState(initialState)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        onChange={handleChange}
        value={postState.username}
      />

      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        onChange={handleChange}
        value={postState.title}
      />

      <label htmlFor="image">Upload Image:</label>
      <input
        type="file"
        name="image"
        onChange={handleChange}
        value={postState.image}
      />

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        name="description"
        onChange={handleChange}
        value={postState.description}
      />

      <label htmlFor="date">Date:</label>
      <input
        type="date"
        name="date"
        onChange={handleChange}
        value={postState.date}
      />

      <label htmlFor="time">Time:</label>
      <input
        type="time"
        name="time"
        onChange={handleChange}
        value={postState.time}
      />

      <button>Submit</button>
    </form>
  )
}

export default Post
