import { Link } from "react-router-dom";

import logo from "../../assets/Logo.png";

const Home = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-base text-text-primary">
      <div className="text-center lg:mt-0 mb-8 ">
        <img className="mb-2 w-32 mx-auto lg:w-40" src={logo} alt="" />
        <p className="text-text-secondary lg:text-lg">
          Your companion in stroke management.
        </p>
      </div>
      <div className="flex justify-center  space-x-4">
        <Link to={"/add-patient"}>
          <button className="lg:w-40 w-28 bg-[#274968] text-sm hover:bg-blue-400  text-white font-bold py-2 px-4 rounded">
            Add New Patient
          </button>
        </Link>
        <Link to={"/all-patient"}>
          <button className="lg:w-40 w-28 text-sm bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary">
            View Patients
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
