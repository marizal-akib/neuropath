import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Patients = () => {
  const patient = useLoaderData();
  const { _id, name, age, gender } = patient[0];

  const axiosPublic = useAxiosPublic();

  const { isLoading: isLoadingIschemic, data: ischemic = [] } = useQuery({
    queryKey: ["ischemic"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/ischemic/${_id}`);
      return res.data;
    },
  });

  console.log(ischemic[0]);

  const [showIschemicResult, setShowIschemicResult] = useState(false);
  const [showHaemorrhagicResult, setShowHaemorrhagicResult] = useState(false);

  const toggleIschemicResult = () => setShowIschemicResult(!showIschemicResult);
  const toggleHaemorrhagicResult = () => setShowHaemorrhagicResult(!showHaemorrhagicResult);

  // Define the keys you want to hide
  const hiddenKeys = ["_id", "patientId", "patientName"];

  // Utility function to convert camelCase to normal case
  const camelCaseToNormal = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before capital letters
      .replace(/^./, (firstChar) => firstChar.toUpperCase()); // Capitalize the first letter
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
      <div className="flex flex-col md:flex-row">
        {/* Left side for patient details */}
        <div className="md:w-1/2 p-6 bg-gray-100">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">{name}</h2>
          <p className="mt-2 text-gray-600">Age: {age}</p>
          <p className="mt-1 text-gray-600">Gender: {gender}</p>
          <p className="mt-1 text-gray-600">ID: {`#${_id}`}</p>

          <div className="mt-8">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2">
              Acute Management Results
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  className="text-blue-600 hover:text-blue-800 focus:outline-none"
                  onClick={toggleIschemicResult}
                >
                  Ischemic Stroke Assessment Result
                </button>
                {showIschemicResult && (
                  <div className="mt-2 ml-4">
                    {isLoadingIschemic ? (
                      <p className="text-gray-500">Loading...</p>
                    ) : Object.keys(ischemic[0] || {}).length > 0 ? (
                      <ul className="list-disc list-inside">
                        {Object.entries(ischemic[0])
                          .filter(([key]) => !hiddenKeys.includes(key))
                          .map(([key, value]) => (
                            <li key={key} className="text-gray-600">
                              <strong>{camelCaseToNormal(key)}:</strong> {value}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">Assessment needed.</p>
                    )}
                  </div>
                )}
              </li>
              <li>
                <button
                  className="text-blue-600 hover:text-blue-800 focus:outline-none"
                  onClick={toggleHaemorrhagicResult}
                >
                  Haemorrhagic Stroke Assessment Result
                </button>
                {showHaemorrhagicResult && (
                  <div className="mt-2 ml-4">
                    <p className="text-gray-500">Assessment needed.</p>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
        {/* Right side for buttons */}
        <div className="md:w-1/2 p-6 border-t md:border-t-0 md:border-l border-gray-200">
          <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2">
            Acute Management Pathways
          </h3>
          <ul className="mb-4 space-y-2">
            <li>
              <Link to={`/ischemic/${_id}/${name}`}>
                <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
                  Ischemic Stroke
                </button>
              </Link>
            </li>
            <li>
              <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
                Haemorrhagic Stroke
              </button>
            </li>
          </ul>
          <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2">
            Long Term Management
          </h3>
          <ul className="mb-4 space-y-2">
            <li>
              <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
                Choice on Antithrombotic Therapy
              </button>
            </li>
            <li>
              <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
                Cardiovascular Risk Factor Targets
              </button>
            </li>
            <li>
              <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
                Choice of Anti Hypertensive Medications
              </button>
            </li>
            <li>
              <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
                Choice of Anti Diabetic Medications
              </button>
            </li>
            <li>
              <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
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
              <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
                CHA2DS2Vasc Score
              </button>
            </li>
            <li>
              <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
                HASBLED Score
              </button>
            </li>
            <li>
              <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
                ORBIT Score
              </button>
            </li>
            <li>
              <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
                ABC/2 Score
              </button>
            </li>
            <li>
              <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
                ICH Score
              </button>
            </li>
            <li>
              <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
                qRISK Score
              </button>
            </li>
          </ul>
          <ul className="space-y-2">
            <li>
              <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
                Link to Your Training Modules
              </button>
            </li>
            <li>
              <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
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
