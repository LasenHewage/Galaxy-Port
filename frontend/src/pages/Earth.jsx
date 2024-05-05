import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import Danger from "../components/Danger.jsx";
import Spinner from "../components/Spinner.jsx";

const EPIC_URL = `https://api.nasa.gov/EPIC/api/natural/images`;
const api_key = import.meta.env.VITE_NASA_API_KEY;

export default function Earth() {
  // Initial state
  const [imageUrl, setImageUrl] = useState("");
  const [asteroids, setAsteroids] = useState([]);
  const [loadingEarth, setLoadingEarth] = useState(false);
  const [loadingAsteroids, setLoadingAsteroids] = useState(true);
  const [totalAsteroids, setTotalAsteroids] = useState(0);

  // Get current date for asteroids
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  // Fetch near-earth asteroids
  const fetchAsteroids = async () => {
    setLoadingAsteroids(true);
    try {
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formattedDate}&end_date=${formattedDate}&api_key=${api_key}`
      );
      const data = await response.json();

      setTotalAsteroids(data.element_count);
      setAsteroids(data.near_earth_objects[formattedDate]);
    } catch (error) {
      console.error("Error fetching near-earth objects:", error);
    } finally {
      setLoadingAsteroids(false);
    }
  };

  // Fetch latest Earth image from EPIC
  const fetchEarthImage = async () => {
    setLoadingEarth(true);
    try {
      const response = await fetch(EPIC_URL + `?api_key=${api_key}`);
      const data = await response.json();

      const earthImage = data[0].image;
      const dateParts = data[0].date.split(" ")[0].split("-");
      const imageDownloadUrl = `https://api.nasa.gov/EPIC/archive/natural/${dateParts[0]}/${dateParts[1]}/${dateParts[2]}/png/${earthImage}.png?api_key=${api_key}`;
      setImageUrl(imageDownloadUrl);
    } catch (error) {
      console.error("Error fetching Earth image:", error);
    } finally {
      setLoadingEarth(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchEarthImage();
    fetchAsteroids();
  }, []);

  // Download image
  const downloadImage = (fileName = "Earth-latest-image.png") => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  return (
    <div className="h-full w-full bg-gray-900 text-white">
      {/* Earth Image Section */}
      <section className="flex flex-col items-center gap-6 py-10 w-10/12 mx-auto rounded-3xl bg-black">
        <h1 className="text-4xl">Latest Image Of Earth</h1>
        {loadingEarth ? (
          <Spinner />
        ) : (
          <div className="w-10/12">
            <img
              src={imageUrl}
              alt="Earth"
              className="w-full rounded-3xl object-cover"
              loading="lazy"
            />
          </div>
        )}
        <button
          onClick={downloadImage}
          className="flex items-center gap-2 px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black rounded-xl transition-all duration-200"
        >
          Download <FaDownload />
        </button>
      </section>

      {/* Map Section
      <section className="flex flex-col items-center gap-6 py-10 w-10/12 mx-auto rounded-3xl bg-burger">
        <h2 className="text-3xl">Search Your Place</h2>
        <div className="w-10/12">
          <Map />
        </div>
      </section> */}

      {/* Near Earth Objects Section */}
      <section className="flex flex-col items-center gap-4 py-10 w-10/12 mx-auto rounded-3xl bg-black">
        <h2 className="text-3xl">Near Earth Objects</h2>
        <p className="text-lg md:text-2xl">Total Count: {totalAsteroids}</p>
        {loadingAsteroids ? (
          <Spinner />
        ) : (
          <div className="w-10/12">
            {asteroids.map((asteroid) => (
              <Danger key={asteroid.id} ast={asteroid} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
