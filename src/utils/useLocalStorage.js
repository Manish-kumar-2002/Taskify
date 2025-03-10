import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return [data, setData];
}
