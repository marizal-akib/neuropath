import { Link, useLoaderData } from "react-router-dom";

const Patients = () => {
  const patient = useLoaderData();
  const { _id, name, age, gender } = patient[0];

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
      <div className="flex flex-col md:flex-row">
        {/* Left side for patient details */}
        <div className="md:w-1/2 p-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">{name}</h2>
          <p className="mt-2 text-gray-600">Age: {age}</p>
          <p className="mt-1 text-gray-600">Gender: {gender}</p>
          <p className="mt-1 text-gray-600">ID: {` #id${_id}`}</p>
        </div>
        {/* Right side for buttons */}
        <div className="md:w-1/2 p-6 border-t md:border-t-0 md:border-l border-gray-200">
          <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2">
            Acute Management Pathways
          </h3>
          <ul className="mb-4 space-y-2">
            <Link to={"/ischemic"}>
              <button className="text-blue-600 hover:text-blue-800">
                Ischemic Stroke
              </button>
            </Link>
            <li>
              <button className="text-blue-600 hover:text-blue-800">
                Haemorrhagic Stroke
              </button>
            </li>
          </ul>
          <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2">
            Long Term Management
          </h3>
          <ul className="mb-4 space-y-2">
            <li>
              <button className="text-blue-600 hover:text-blue-800">
                Choice on Antithrombotic Therapy
              </button>
            </li>
            <li>
              <button className="text-blue-600 hover:text-blue-800">
                Cardiovascular Risk Factor Targets
              </button>
            </li>
            <li>
              <button className="text-blue-600 hover:text-blue-800">
                Choice of Anti Hypertensive Medications
              </button>
            </li>
            <li>
              <button className="text-blue-600 hover:text-blue-800">
                Choice of Anti Diabetic Medications
              </button>
            </li>
            <li>
              <button className="text-blue-600 hover:text-blue-800">
                Choice of Lipid Lowering Agents
              </button>
            </li>
          </ul>
          <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2">
            Investigation for Cryptogenic Stroke
          </h3>
          <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2">
            Relevant Risk Stratification Tools
          </h3>
          <ul className="mb-4 space-y-2">
            <li>
              <button className="text-blue-600 hover:text-blue-800">
                CHA2DS2Vasc Score
              </button>
            </li>
            <li>
              <button className="text-blue-600 hover:text-blue-800">
                HASBLED Score
              </button>
            </li>
            <li>
              <button className="text-blue-600 hover:text-blue-800">
                ORBIT Score
              </button>
            </li>
            <li>
              <button className="text-blue-600 hover:text-blue-800">
                ABC/2 Score
              </button>
            </li>
            <li>
              <button className="text-blue-600 hover:text-blue-800">
                ICH Score
              </button>
            </li>
            <li>
              <button className="text-blue-600 hover:text-blue-800">
                qRISK Score
              </button>
            </li>
          </ul>
          <ul className="space-y-2">
            <li>
              <button className="text-blue-600 hover:text-blue-800">
                Link to Your Training Modules
              </button>
            </li>
            <li>
              <button className="text-blue-600 hover:text-blue-800">
                Guideline Library
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Patients;
