import { useEffect, useState } from "react";
import Pic from "../components/Pic.jsx";
import Spinner from "../components/Spinner.jsx";
import "../App.css";

const api_key = import.meta.env.VITE_NASA_API_KEY;

export default function Mars() {
  const [photos, setPhotos] = useState([]);
  const [rover, setRover] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchPhotos() {
    if (!rover) {
      // If rover is not selected, do not fetch data
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=400&api_key=${api_key}&page=1`
      );
      const data = await response.json();
      setPhotos(data.photos);
    } catch (error) {
      console.error("Error fetching NASA data", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPhotos();
  }, [rover]); // Fetch only when the rover changes

  function changeHandler(event) {
    setRover(event.target.value);
  }

  return (
    <div className="bg-black h-auto bg-cover w-full">
      <div className="w-10/12 mx-auto flex flex-col sm:flex-row justify-between gap-2">
        {/* Hero Section */}
        <div className="mt-16 sm:w-[40%] sm:mt-0 flex flex-col items-center sm:items-start gap-4 justify-center">
          <p className="font-poppins mb-2 text-white font-bold text-5xl sm:text-5xl">
            <span className="glow">MARS</span>
          </p>
          <p className="text-white text-sm sm:text-base font-poppins italic">
            “The first human beings to land on Mars should not come back to
            Earth. They should be the beginning of a build-up of a
            colony/settlement, I call it a ‘permanence’.”
          </p>
          <p className="text-white font-md font-poppins">-Buzz Aldrin</p>
        </div>

        <div>
          <img src="../mars-hero.png" className="hover:animate-mars" alt="" />
        </div>
      </div>

      {/* Rover Section */}
      <div className="sm:w-10/12 text-white mt-8 sm:mt-4 mx-auto font-bold text-5xl flex justify-center font-poppins">
        <p className="text-center">Touching The Horizon</p>
      </div>

      <div className="h-1 mx-auto w-2/12 sm:w-3/12 mt-3 bg-green-600"></div>

      {/* Rover Info Section */}
      <div className="w-10/12 mt-16 mx-auto flex flex-col sm:flex-row justify-between gap-8 sm:gap-2">
        <div className="min-w-[350px]">
          <img src="../Curosity.png" className="object-contain" alt="" />
        </div>

        <div className="text-white sm:w-[40%] font-poppins">
          <p className="text-white font-bold text-center sm:text-left text-3xl mb-2">Curiosity</p>
          <p className="text-center sm:text-left">
            Also known as The Mars Science Laboratory, Curiosity was designed to
            explore the surface of Mars, which determined that Mars was once
            capable of supporting life. The rover was launched by an Atlas V rocket
            from Cape Canaveral, Florida, on November 26, 2011, and landed in Gale
            crater on Mars on August 6, 2012.
          </p>
        </div>
      </div>

      {/* Archive Section */}
      <div className="w-10/12 mt-16 mx-auto flex flex-col sm:flex-row justify-between gap-2">
        <div className="text-white sm:w-[40%] flex flex-col gap-2 font-poppins">
          <p className="text-white font-bold text-3xl text-center sm:text-left mb-2">Opportunity</p>
          <p className="text-center sm:text-left">
            Spirit and Opportunity (twins) landed on Mars January 3, January 24, 2004 PST
            (Jan. 4 and Jan. 25 UTC). Both rovers lived well beyond their planned 90-day missions.
            With data from the rovers, mission scientists have reconstructed an ancient past when
            Mars was awash in water. Spirit and Opportunity each found evidence for past wet
            conditions that possibly could have supported microbial life.
          </p>
        </div>

        <div className="w-[300px] mb-4 sm:mb-0 sm:w-[400px]">
          <img src="../sprit.png" className="object-contain" alt="" />
        </div>
      </div>

      {/* Archive Selection */}
      <div className="mx-auto w-10/12 mt-16">
        <p className="text-white font-poppins font-bold text-6xl text-center">ARCHIVES</p>
      </div>
      <div className="bg-green-600 w-2/12 h-1 mt-1 mx-auto"></div>

      <div className="w-10/12 mx-auto mt-8 flex flex-col gap-8 items-center justify-center">
        <select
          value={rover}
          onChange={changeHandler}
          className="w-10/12 p-2 rounded-lg text-black font-poppins"
        >
          <option value="" disabled>Select Rover...</option>
          <option value="curiosity">Curiosity</option>
          <option value="spirit">Spirit</option>
          <option value="opportunity">Opportunity</option>
        </select>

        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {photos.map((photo) => (
              <Pic key={photo.id} url={photo.img_src} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
