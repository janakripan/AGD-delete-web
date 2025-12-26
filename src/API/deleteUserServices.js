// api/user.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const deleteAccount = async (userId) => {
  const res = await axios.delete(
    `${BASE_URL}/User/delete-account`,
    {
      params: {
        userID: userId, 
      },
      headers: {
        accept: "*/*",
      },
    }
  );

  return res.data;
};
