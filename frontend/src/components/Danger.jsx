export default function Danger({ ast }) {
  // Validate that the data we need is defined
  const name = ast.name ?? "Unknown";
  const isHazardous = ast.is_potentially_hazardous_asteroid ?? false;
  
  const closeApproach = ast.close_approach_data && ast.close_approach_data[0] 
    ? ast.close_approach_data[0]
    : {}; // Fallback to an empty object

  const dateTime = closeApproach.close_approach_date_full || "N/A";
  const relativeVelocity = parseFloat(
    closeApproach.relative_velocity?.kilometers_per_second
  ) || 0; // Default to 0 if not available
  const missDistance = parseFloat(closeApproach.miss_distance?.astronomical) || 0; // Same here
  
  // Break dateTime into date and time
  const [day, time] = dateTime.split(" ") ?? ["N/A", "N/A"];

  return (
    <div className="w-10/12 mx-auto my-5 p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col md:flex-row justify-between">
      {/* Left section: Asteroid details */}
      <div className="md:w-1/2 flex flex-col text-white">
        <h3 className="text-xl font-bold">Asteroid: {name}</h3>
        <p>
          Hazardous:{" "}
          {isHazardous ? (
            <span className="text-red-600">True</span>
          ) : (
            <span className="text-green-600">False</span>
          )}
        </p>
        <p>Date: {day}</p>
        <p>Time: {time}</p>
      </div>

      {/* Right section: Velocity and distance */}
      <div className="md:w-1/2 flex flex-col text-white mt-4 md:mt-0">
        <p>
          Relative Velocity: {relativeVelocity.toFixed(2)} km/s
        </p>
        <p>
          Miss Distance: {missDistance.toFixed(6)} AU
        </p>
        <a
          href={ast.nasa_jpl_url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-200 underline transition"
        >
          Learn more
        </a>
      </div>
    </div>
  );
}
