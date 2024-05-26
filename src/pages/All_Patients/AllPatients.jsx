import { Link } from "react-router-dom";
import Card from "../../components/Card";
import usePatients from "../../hooks/usePatients";

const AllPatients = () => {
  const [patients, isLoading] = usePatients();

  console.log(patients);

  return (
    <div>
      {isLoading ? (
        <>
          <div className="min-h-screen container mx-auto bg-gray-100 p-4 flex items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {patients.map((patient) => (
                <Link to={`/patients/${patient._id}`} key={patient._id}>
                  <Card
                    id={` #id${patient._id}`}
                    name={patient.name}
                    age={patient.age}
                    gender={patient.gender}
                  />
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="loading loading-infinity loading-lg"></div>
        </div>
      )}
    </div>
  );
};

export default AllPatients;
