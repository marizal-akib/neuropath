import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://neuro-path-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;