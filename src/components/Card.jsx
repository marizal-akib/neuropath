

const Card = ({ name, age, gender, id }) => {
    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">{name}</h2>
          <p className="text-gray-600">Age: {age}</p>
          <p className="text-gray-600">Gender: {gender}</p>
          <p className="text-gray-600">ID: {id}</p>
        </div>
      </div>
    );
  };
  

export default Card;