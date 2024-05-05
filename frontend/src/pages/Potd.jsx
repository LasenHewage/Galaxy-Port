import { useEffect, useState } from "react";
import Spinner from "../components/Spinner.jsx";
import "../App.css";

const api_key = import.meta.env.VITE_NASA_API_KEY;

export default function Potd() {
  const [isVideo, setIsVideo] = useState(false);
  const [potd, setPotd] = useState({});
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`);
      const data = await response.json();
      setIsVideo(data.media_type === "video");
      setPotd(data);
    } catch (error) {
      console.error("Error in fetching image/video", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-black flex flex-col gap-10 bg-cover h-auto min-h-screen font-poppins text-white w-full">
      <div className="w-10/12 mt-8 mx-auto">
        <p className="text-5xl sm:text-6xl text-center font-bold potd-header">ASTRONOMY</p>
        <p className="text-lg sm:text-xl text-center font-bold">PICK OF THE DAY</p>
        <div className="bg-green-600 h-1 w-2/12 mx-auto"></div>
      </div>
      <div className="w-10/12 relative flex flex-col gap-10 justify-center items-center mx-auto">
        <p className="text-4xl sm:text-6xl text-center font-bold">{potd.title}</p>
        {loading ? (
          <Spinner />
        ) : isVideo ? (
          potd.url.includes("youtube.com") ? (
            <iframe
              width="100%"
              height="315"
              src={potd.url}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <video controls width="100%" height="65%">
              <source src={potd.url} />
              Your browser can't play this video :-(
            </video>
          )
        ) : (
          <img alt="picoftheday" className="rounded-xl w-3/4" src={potd.url} />
        )}
        <p className="font-poppins text-center text-lg mb-8">{potd.explanation}</p>
      </div>
    </div>
  );
}
