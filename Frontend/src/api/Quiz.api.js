import axios from "axios"
import { BASE_URL } from "../constants/constant";
import { toast } from "react-hot-toast";
export const createquiz = async ({category,questions,title}) => {
  try {
    // console.log(questions)
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log(token)
    const {data} = await axios.post(`${BASE_URL}/quiz`,{ category,questions,title}, {
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
export const deleteQuizApi = async (quizid) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        console.log(quizid)
        const { data } = await axios.delete(`${BASE_URL}/quiz/${quizid}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        toast.success(data.message);
    } catch (error) {
        if (!error.response) {
             toast.error(error.response.data.message);
            throw error;
        }
       
    }
};