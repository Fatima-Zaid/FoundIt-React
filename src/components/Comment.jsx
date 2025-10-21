import { useState } from "react"
import axios from "axios"

const Comment = ({comments, setComments, postId})=>{
const initialState = {
  username: "",
  description : ""
}

const [formState, setFormState] = useState(initialState)

const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

const handleSubmit = async (e) => {
  e.preventDefault()
  try{
const response = await axios.post(`http://localhost:3000/comments/${postId}`,formState)

setComments([...comments, response.data])
setFormState(initialState)
  } catch(error) {
    console.error("Error submitting comment:", error)
  }
}


return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
      type="text"
      name ="username"
      onChange={handleChange}
      value ={formState.username}
      required
      />
      <label>Comment:</label>
      <textarea
        name="description"
        value={formState.description}
        onChange={handleChange}
        required
      ></textarea>

      <button type="submit">Post Comment</button>
    </form>
)
}
export default Comment
