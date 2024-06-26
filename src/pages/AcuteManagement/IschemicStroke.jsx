import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import camelCase from "lodash.camelcase";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const IschemicStroke = () => {
  const [step, setStep] = useState(1);
  const { patientsId, patientsName } = useParams();
  const [results, setResults] = useState({});
  const [nihssScore, setNihssScore] = useState("");
  const axiosPublic = useAxiosPublic();
  const from = location.state?.from?.pathname || `/patients/${patientsId}`;
  const navigate = useNavigate();

  const handleNextStep = (result, nextStep) => {
    setResults(prevResults => ({ patientId: patientsId, patientName: patientsName, ...prevResults, ...result }));
    setStep(nextStep);
  };

  useEffect(() => {
    // Fetch initial data if needed
  }, [patientsId]);

  const handlePreviousStep = (prevStep) => {
    setStep(prevStep);
  };

  const convertKeysToCamelCase = (obj) => {
    return Object.keys(obj).reduce((acc, key) => {
      acc[camelCase(key)] = obj[key];
      return acc;
    }, {});
  };

  const handleSubmitAssessment = async () => {
    const finalResults = { ...results };
 
    const camelCaseResults = convertKeysToCamelCase(finalResults);

    console.log(camelCaseResults);
    // console.log(finalResults);

    const addRes = await axiosPublic.post("/ischemic", camelCaseResults);
    console.log(addRes.data);
    if (addRes.data.insertedId) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Assessment file is added`,
        showConfirmButton: false,
        timer: 3500,
      });
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="h-screen flex flex-col items-center bg-gray-100 text-gray-900 p-4">
      <p className="text-blue-700 font-semibold text-xl mb-4">
        ID: {patientsId}
      </p>
      <p className="text-blue-700 font-semibold text-2xl mb-4">
        Name: {patientsName}
      </p>
      <div className="container mx-auto flex flex-col lg:flex-row justify-center items-start p-4 bg-white rounded-lg shadow-md">
        <div className="w-full lg:w-3/4 p-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Acute Management of Ischemic Stroke
            </h2>
          </div>
          {step === 1 && (
            <div className="text-center">
              <p className="mb-4">Suspected Acute Stroke?</p>
              <div className="flex space-x-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    handleNextStep({ "Suspected Acute Stroke": "Yes" }, 2)
                  }
                >
                  Yes
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    handleNextStep({ "Suspected Acute Stroke": "No" }, 10)
                  }
                >
                  No
                </button>
              </div>
            </div>
          )}
          {step === 2 && results["Suspected Acute Stroke"] === "Yes" && (
            <div className="text-center">
              <p className="mb-2 text-lg text-text-primary font-bold">
                Perform Non-Contrast CT Head
              </p>
              <p className="mb-4 text-text-secondary font-semibold">
                This imaging is used to determine if there is a haemorrhage.
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() =>
                  handleNextStep({ "Non-Contrast CT Head": "Done" }, 3)
                }
              >
                Proceed
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4"
                onClick={() => handlePreviousStep(1)}
              >
                Previous
              </button>
            </div>
          )}
          {step === 3 && (
            <div className="text-center">
              <p className="mb-4">Hemorrhage Present?</p>
              <div className="flex space-x-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    handleNextStep(
                      {
                        Procedure:
                          "Follow the Intracerebral Hemorrhage (ICH) pathway.",
                      },
                      10
                    )
                  }
                >
                  Yes
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleNextStep({ Hemorrhage: "No" }, 4)}
                >
                  No
                </button>
              </div>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => handlePreviousStep(2)}
              >
                Previous
              </button>
            </div>
          )}
          {step === 4 && (
            <div className="text-center">
              <p className="mb-4">Time of Onset of Symptoms?</p>
              <p className="mb-4 text-text-secondary font-semibold">
                This is crucial to determine the eligibility for various
                treatments.
              </p>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    handleNextStep({ "Time of Onset": "<4.5 Hours" }, 5)
                  }
                >
                  {"<4.5 Hours"}
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    handleNextStep({ "Time of Onset": "4.5-6 Hours" }, 5)
                  }
                >
                  4.5-6 Hours
                </button>
              </div>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => handlePreviousStep(3)}
              >
                Previous
              </button>
            </div>
          )}
          {step === 5 && (
            <div className="text-center">
              <p className="mb-4">NIHSS Score?</p>
              <div className="flex flex-col items-center">
                <input
                  type="number"
                  className="mb-4 p-2 border border-gray-300 rounded"
                  value={nihssScore}
                  onChange={(e) => setNihssScore(e.target.value)}
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    const score = parseInt(nihssScore, 10);
                    if (score < 6) {
                      handleNextStep(
                        {
                          "NIHSS Score": nihssScore,
                          Procedure: "Administer thrombolysis.",
                        },
                        10
                      );
                    } else {
                      handleNextStep({ "NIHSS Score": nihssScore }, 6);
                    }
                  }}
                >
                  Submit Score
                </button>
              </div>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => handlePreviousStep(4)}
              >
                Previous
              </button>
            </div>
          )}
          {step === 6 && results["NIHSS Score"] >= 6 && (
            <div className="text-center">
              <p className="mb-2 text-lg text-text-primary font-bold">
                Perform a CT Angiography (CTA) to check for Large Vessel
                Occlusion
              </p>
              <p className="mb-4">CTA Results?</p>
              <div className="flex space-x-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    handleNextStep(
                      {
                        CTA: "LVO Present",
                        Procedure: "Refer for thrombectomy.",
                      },
                      10
                    )
                  }
                >
                  LVO Present
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    handleNextStep(
                      {
                        CTA: "No LVO",
                        Procedure: "Conservative treatment.",
                      },
                      10
                    )
                  }
                >
                  No LVO
                </button>
              </div>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => handlePreviousStep(5)}
              >
                Previous
              </button>
            </div>
          )}
          {step === 10 && (
            <div className="text-center">
              <p className="mb-4">Final Decision:</p>
              <ul>
                {Object.entries(results)
                  .filter(([key]) => key !== 'patientId' && key !== 'patientName')
                  .map(([key, value], index) => (
                    <li key={index}>
                      {key}: {value}
                    </li>
                  ))}
              </ul>
              <button
                className="bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmitAssessment}
              >
                Submit Assessment
              </button>
            </div>
          )}
        </div>
        <div className="w-full lg:w-1/4 p-4 bg-gray-100 border-l-2 border-gray-300">
          <h3 className="text-xl font-bold mb-4">Previous Answers</h3>
          <ul>
            {Object.entries(results)
              .filter(([key]) => key !== 'patientId' && key !== 'patientName')
              .map(([key, value], index) => (
                <li key={index} className="mb-2">
                  <span className="font-semibold">{key}:</span> {value}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IschemicStroke;
