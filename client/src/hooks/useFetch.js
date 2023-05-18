import { useEffect, useState } from "react";
import axios from "axios";

const $api = axios.create({
  baseURL: 'http://localhost:8800/api'
})

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {console.log(url);
        const res = await $api.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async (url) => {
    setLoading(true);
    try {
      const res = await $api.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  return { data, loading, error, reFetch };
};

export default useFetch;
