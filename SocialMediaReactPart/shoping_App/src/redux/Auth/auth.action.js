import axios from "axios";
import { api, API_BASE_URL } from "../../Config/api";
import { GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./auth.actionType"; // ✅ Fix: Import LOGIN_SUCCESS


export const loginUserAction = (logindata) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        console.log("Sending Login Data:", logindata);

        const { data } = await axios.post(
            `${API_BASE_URL}/auth/signin`,
            logindata, // ✅ No need for JSON.stringify
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        console.log("Login Response Data:", data);

        if (data.token) { // ✅ Check for 'token' instead of 'jwt' if API uses 'token'
            localStorage.setItem("jwt", data.token);
        }

        dispatch({ type: LOGIN_SUCCESS, payload: data.token });

    } catch (error) {
        console.error("Login Error Response:", error.response?.data || error);
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response?.data?.message || "Login failed",
        });
    }
};



export const registerUserAction = (registerData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        console.log("Sending Data:", JSON.stringify(registerData)); // ✅ Debug Request Payload
        const { data } = await axios.post(
            `${API_BASE_URL}/auth/signup`,
            JSON.stringify(registerData),
            {
                headers: { "Content-Type": "application/json" }, // ✅ Ensure JSON format
            }
        );

        console.log("Response Data:", data);

        if (data.jwt) {
            localStorage.setItem("jwt", data.token); // key value pairs
        }

        dispatch({ type: LOGIN_SUCCESS, payload: data.token });
        return Promise.resolve(data); // Return a resolved promise with the data

    } catch (error) {
        console.error("Error Response:", error.response?.data || error);
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response?.data?.message || "Registration failed",
        });
        return Promise.reject(error); // Return a rejected promise with the error
    }
};



export const getProfileAction = (jwt) => async (dispatch) => {
    dispatch({ type: GET_PROFILE_REQUEST });

    try {
        const { data } = await axios.get(`${API_BASE_URL}/user/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        console.log("Profile Data:", data);

        dispatch({ type: GET_PROFILE_SUCCESS, payload: data });

    } catch (error) {
        console.error("Error Response:", error.response?.data || error);
        dispatch({
            type: GET_PROFILE_FAILURE,
            payload: error.response?.data?.message || "Get Profile failed",
        });
    }
};


export const updateProfileAction = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    try {
        const { data } = await api.put(`/api/users/update`, reqData);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAILURE,
            payload: error.response?.data?.message || "Update profile failed",
        });
    }
};

// Logout action
export const logoutAction = () => (dispatch) => {
    // Remove JWT token from localStorage
    localStorage.removeItem("jwt");
    
    // Dispatch logout action to reset the state
    dispatch({ type: LOGOUT });
    
    return Promise.resolve();
};