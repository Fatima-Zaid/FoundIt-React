import { useState } from "react"
import axios from "axios"

const Comment = ({comments, setComments})=>{
const initialState = {
  username: "",
  description : ""
}
const [formState, setFormState] = useState(initialState)
const response = await axios.post("http://localhost:3000/comments/:postId",formState)
let commentsList = [...comments]
    commentsList.push(response.data)
    setComments(commentsList)
    setFormState(initialState)

}

export default Comment
