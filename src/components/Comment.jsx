import { useState } from "react"
import axios from "axios"

const Comment = ({ comments, setComments, postId }) => {
  const initialState = {
    username: "",
    description: "",
  }

  const [formState, setFormState] = useState(initialState)

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        ` https://foundit-3.onrender.com/comments/${postId}`,
        formState
      )

      setComments([...comments, response.data])
      setFormState(initialState)
    } catch (error) {
      console.error("Error submitting comment:", error)
    }
  }

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(` https://foundit-3.onrender.com/comments/${commentId}`)
      setComments(comments.filter((comment) => comment._id !== commentId))
    } catch (error) {
      console.error("Error deleting comment:", error)
    }
  }

  return (
    <div>
      <div className="commentList">
        <h4>Comments:</h4>
        {
          !comments || comments?.length === 0?(
            <p>No comments</p>
          ): (
            comments.map((comment)=>(
              <div key={comment._id} className="comment">
                <p>{comment.username} : {comment.description}</p>
                <button onClick={()=> handleDelete(comment._id  )}> Delete</button>
              </div>
            ))
          )
        }
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={formState.username}
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
    </div>
  )
}
export default Comment
