import { useState } from "react"
import axios from "axios"

const Post = ({posts,setPosts}) => {
  const initialState = {
    username: "",
    title: "",
    image: "",
    description: "",
    date: "",
    time: "",
  }

  const [postState, setPostState] = useState(initialState)

  const handleChange = (event)=>{
    setPostState({...postState,[event.target.name]: event.target.value})
  }

  const handleSubmit = async (event)=>{
    event.preventDefault()
    const response = await axios.post("http://localhost:3000/posts/createPost",postState)
    let postsList = [...posts]
    postsList.push(response.data)
    setPosts(postsList)
    setPostState(initialState)
  }


  return(
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>


      <label htmlFor="postTitle">Title:</label>
      <input type="text" name="postTitle" onChange={handleChange} value={postState.title} />



    </form>
  )

}

export default Post
