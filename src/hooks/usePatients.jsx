import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePatients = () => {
  const axiosPublic = useAxiosPublic();
  const { refetch,isLoading, data: patients = [] } = useQuery({
    queryKey: ["patient"],
    queryFn: async () => {
      // const res = await axiosPublic.get(`/carts?email=${user.email}`);
      const res = await axiosPublic.get("/patient");
      return res.data;
    },
  });

  return [patients, refetch ,isLoading];
};
export default usePatients;
