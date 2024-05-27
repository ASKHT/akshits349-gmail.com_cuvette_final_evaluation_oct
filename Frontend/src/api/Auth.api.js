import axios from "axios";
import { BASE_URL } from "../constants/constant";
import { toast } from "react-hot-toast";
export const register=async({email,name,password,confirmPassword})=>{
   try {
         const{ data}= await axios.post(`${BASE_URL}/auth/register`,{password,email,name,confirmPassword})
         localStorage.setItem("token",JSON.stringify(data.token));
         toast.success(data.message)
         return data;
   } catch (error) {
        toast.error(error.response.data.message)
         
   }

}

export const loginUser=async({email,password})=>{
      try {
        const{ data}= await axios.post(`${BASE_URL}/auth/login`,{password,email})
         localStorage.setItem("token",JSON.stringify(data.token));
         toast.success(data.message);
         return data;
      } catch (error) {
         toast.error(error.response.data.message)
      }
}