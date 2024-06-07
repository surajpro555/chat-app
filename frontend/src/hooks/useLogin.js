import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {

    const [loading, setLoading] = useState(false);

    const { setAuthUser } = useAuthContext();

    const login = async ({username,password,}) => {
        
        const success = handleErrors({username,password,});

        if (!success) {
            return;
        }

        setLoading(true);
        
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await res.json();

            // console.log(data);

            if (data.error) {
                throw new Error(data.message);
            }

            //localstorage
            localStorage.setItem("chat-user", JSON.stringify(data));

            //contextapi
            setAuthUser(data);

            toast.success("Logged in successfully");

        } catch (error) {
            toast.error("An error occurred", error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;

function handleErrors({
    username,
    password,
}) {
    if (!username || !password) {
        toast.error("All fields are required");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}
