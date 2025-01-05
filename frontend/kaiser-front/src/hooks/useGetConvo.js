import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConvo = () => {
  const [loading, setLoading] = useState(false);
  const [convo, setConvo] = useState([]);

  useEffect(() => {
    const getConv = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/user/getUsers", {
            method: "GET",
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConvo(data)
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    };

    getConv();
  }, []);

  return { loading, convo };
};

export default useGetConvo;
