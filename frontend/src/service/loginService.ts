import axios from "axios";


export const verifyJwt = async () => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_USER_BACKEND_URL}/verify-jwt`, {}, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
       
    console.log('**********HHHHHHHHHHHHHH************')
    console.log('verifyjet response' + response.data.seat.success)
    return response.data.seat.success
  } catch (error) {

    console.log('error verifying jwt' + error);
    return false
  }
};

