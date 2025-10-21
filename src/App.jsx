import { useEffect, useState } from "react"
import axios from "axios"
import "./App.css"

const App = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      try {
        let response = await axios.get()
        setPosts(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }, [])

  return (<>


  </>)
}

export default App
