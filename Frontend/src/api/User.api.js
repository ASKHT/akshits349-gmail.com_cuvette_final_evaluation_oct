import axios from "axios"
import { BASE_URL } from "../constants/constant";
import { toast } from "react-hot-toast";
export const userpollandquiz = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log(token)
    const {data} = await axios.get(`${BASE_URL}/user/pollandquiz`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    toast.error(error.response.data.message)
  }
};