import { useEffect, useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("taskifyUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return user;
}
