import axios from "axios"
import { BASE_URL } from "../constants/constant";
import { toast } from "react-hot-toast";


export const createpoll = async ({category,questions,title}) => {
  try {
    // console.log(questions)
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log(token)
    const {data} = await axios.post(`${BASE_URL}/poll`,{ category,questions,title}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
     toast.success("Data sent to backend successfully!");
    return data;
  } catch (error) {
    toast.error(error.response.data.message)
  }
};