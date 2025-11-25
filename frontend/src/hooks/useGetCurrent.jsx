
import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData, logoutUser } from "../redux/userSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });

        if (isMounted) {
          dispatch(setUserData(result.data));
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        if (isMounted) {
          dispatch(logoutUser()); 
        }
      } finally {
        if (isMounted) setLoading(false); 
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return loading; 
};

export default useGetCurrentUser;
