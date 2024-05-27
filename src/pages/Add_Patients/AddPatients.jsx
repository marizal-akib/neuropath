import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
// {Object.entries(haemorrhagicResults).map(([key, value]) => (
//   <li key={key} className="text-gray-600">
//     <strong>{key}:</strong> {value}
//   </li>
const AddPatients = () => {
  const [formData, setFormData] = useState({ name: "", age: "", gender: "" });
  const axiosPublic = useAxiosPublic();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);

    const patient = {
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
    };

    const addRes = await axiosPublic.post("/newPatient", patient);
    console.log(addRes.data);
    if (addRes.data.insertedId) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `New patient file added`,
        showConfirmButton: false,
        timer: 3500,
      });
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md "
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Gender
          </label>
          <input
            type="text"
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Gender"
            className="input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="btn w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Patient
        </button>
      </form>
    </div>
  );
};

export default AddPatients;
