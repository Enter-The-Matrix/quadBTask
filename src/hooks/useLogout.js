import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slice/userSlice";

function useLogout() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const logout = () => {
    try {
      dispatch(setUser(null))
      setLoading(true);
      localStorage.removeItem("user");
      toast.success("login Successful");
    } catch (error) {
      toast.error("Error logging");
    }
  };

  return { logout, loading };
}

export default useLogout;
