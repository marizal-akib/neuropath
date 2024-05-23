import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddPatients = () => {
  const [patient, setPatient] = useState({ name: "", age: "", gender: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevState) => ({ ...prevState, [name]: value }));
  };

  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(patient);
    navigate(from, { replace: true });
    Swal.fire({
      title: "Patient file has been created",
      icon: "success",
      showClass: {
        popup: `
    animate__animated
    animate__fadeInUp
    animate__faster
  `,
      },
    });
    // try {
    //   const response = await axios.post(
    //     "http://localhost:5000/patients",
    //     patient
    //   );
    //   console.log("Patient added:", response.data);
    // } catch (error) {
    //   console.error("There was an error adding the patient:", error);
    // }
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
            value={patient.name}
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
            value={patient.age}
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
            value={patient.gender}
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
