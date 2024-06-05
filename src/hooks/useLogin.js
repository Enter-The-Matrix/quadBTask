import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/slice/userSlice";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = (username) => {
    // console.log("user:", username);
    try {
      dispatch(setUser(username));
      setLoading(true);
      localStorage.setItem("user", JSON.stringify({ username: username }));
      toast.success("login Successful");
      navigate("/");
      setLoading(false);
    } catch (error) {
      toast.error("Error logging");
    }
  };

  return { login, loading };
}

export default useLogin;
