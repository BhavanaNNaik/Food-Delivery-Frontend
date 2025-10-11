import {useState} from "react"
import api from "../services/api"
import { useNavigate } from "react-router-dom"

const Register=()=>{
    const[user, setUser]=useState({
          username:"",
          email: "",
          password: "",
          phone: "",
          address: "",
          role: "USER"

    }
      

    )

}

export default Register