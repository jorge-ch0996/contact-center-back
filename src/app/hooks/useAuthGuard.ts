import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import axios from "../utils/axios";

export default function useAuthGuard(initialValue: any) {
  const [storedToken, setStoredToken] = useLocalStorage("token", initialValue);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkToken();
  }, [storedToken])

  async function checkToken() {
    try {
      const resp: any = await axios.get("/check-token", {
        headers: {
          "Authorization": storedToken
        }
      })
      if (resp.status === 200) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  }
  return [storedToken, setStoredToken, isAuthenticated]
}