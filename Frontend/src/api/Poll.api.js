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
    if (!error.response) {
            toast.error(error.response.data.message);
            throw error;
        }
          toast.error(error.response.data.message);
  }
};
export const updatePoll= async ({category,questions,title,_id}) => {
  try {
    // console.log(questions)
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log(token)
    const {data} = await axios.put(`${BASE_URL}/poll/updatepoll/${_id}`,{ category,questions,title}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
     toast.success(data.message);
    return data;
  } catch (error) {
     if (!error.response) {
            toast.error(error.response.data.message);
            throw error;
        }
          toast.error(error.response.data.message);
  }
};


export const getPollApi = async (pollId) => {
    try {
        // console.log(pollId)
        const { data } = await axios.get(`${BASE_URL}/poll/${pollId}`);
        return data;
    } catch (error) {
        if (!error.response) {
            // toast.error(error.message);
            toast.error(error.response.data.message);
            throw error;
        }
          toast.error(error.response.data.message);  
    }
};
export const deletePollApi = async (pollId) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        const { data } = await axios.delete(`${BASE_URL}/poll/${pollId}`, {
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
         toast.error(error.response.data.message);  
    }
};

export const countPollApi = async (pollId, questionId, optionId) => {
    try {
        const { data } = await axios.put(`${BASE_URL}/poll/userAttempt`, { pollId, questionId, optionId });
        return data;
    } catch (error) {
        if (!error.response) {
           toast.error(error.response.data.message);
            throw error;
        }
      
    }
};