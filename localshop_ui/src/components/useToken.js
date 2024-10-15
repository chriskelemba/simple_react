import { useState } from "react";

export default function useToken() {
    const getToken = () => {
        return sessionStorage.getItem("accessToken");
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem("accessToken", userToken);
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token
    }
}