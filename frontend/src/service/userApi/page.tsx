import axiosInstance from '../../components/utils/axiosinstance';
import Cookies from 'js-cookie';

export const handleAxiosErrorlogin = (error: any) => {
    console.log(error)
    const errorMessage = error?.response?.data?.errorMessage || "Unexpected error occurred"
    console.log(errorMessage)
    return new Error(errorMessage)
}

    ;
export const signupApi = async (data: Record<string, any>) => {
    try {
        const response = await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_USER_BACKEND_URL}/signup`,
            data,
            { withCredentials: true }
        )
        Cookies.set('accessToken', response.data.access_token);
        return response;
    } catch (error: any) {
        console.log(error, "from api")
        throw error;
    }
};



export const loginApi = async (data: Record<string, any>) => {
    try {
        const response = await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_USER_BACKEND_URL}/login`,
            data,
            { withCredentials: true }
        );
        Cookies.set('accessToken', response.data.access_token);
        return response;
    } catch (error: any) {
        console.log(error, "from api")
        throw error;
    }
};



export const bookedSeatApi = async (data: number[]) => {
    try {
        console.log(data)
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_USER_BACKEND_URL}/seatBook`, data, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        return response;
    } catch (error: any) {
        console.log(error, "from api")
        throw error;
    }
};


export const bookedSeatbyOtherUser = async () => {
    try {
        const response = await axiosInstance.get(
            `${process.env.NEXT_PUBLIC_USER_BACKEND_URL}/bookedSeats`,
            { withCredentials: true }
        );
        return response;
    } catch (error: any) {
        console.log(error, "from api")
        throw error;
    }
};


export const resetBookings = async () => {
    try {

        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_USER_BACKEND_URL}/resetBookings`,{}, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        return response;
    } catch (error: any) {
        console.log(error, "from api")
        throw error;
    }
};

