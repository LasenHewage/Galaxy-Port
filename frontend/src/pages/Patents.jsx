import pdfMake from 'pdfmake/build/pdfmake';
import { useEffect, useState } from 'react';
import { GiNotebook } from "react-icons/gi";
import { FaDownload } from "react-icons/fa";
import { Link } from 'react-router-dom';

const api_key= import.meta.env.VITE_NASA_API_KEY;

export default function Patents() {
  const [patents, setPatents] = useState([]);
  const [userInput, setUserInput] = useState("");

  async function fetchPatents() {
    try {
      const response = await fetch(`https://api.nasa.gov/techtransfer/patent/${userInput}?api_key=${api_key}`);
      const data = await response.json();
      console.log(data.results);
      if (data.results.length > 20) {
        setPatents(data.results.splice(0, 20));
      } else {
        setPatents(data.results);
      }
    } catch (error) {
      console.log("Couldn't fetch the patent you wanted");
    }
  }

  function changeHandler(event) {
    setUserInput(event.target.value);
  }

  useEffect(() => {
    fetchPatents();
  }, [userInput]);

  async function submitHandler(e) {
    e.preventDefault();
    if (patents.length === 0) {
      alert(`No matching patents with the name ${userInput}`);
      return;
    }

    const documentDefinition = {
      content: [
        { text: 'Patents', fontStyle: 15, lineHeight: 2 },
        { text: '\n' } // Add space before patents
      ]
    };

    patents.forEach(patent => {
      documentDefinition.content.push(
        {
          columns: [
            { text: 'Title:', width: 'auto' },
            { text: patent[2], width: 'auto' }
          ],
          lineHeight: 2
        },
        {
          columns: [
            { text: 'Image:', width: 'auto' },
            { text: patent[10], style: 'link', width: '*' }
          ],
          lineHeight: 2
        },
        {
          columns: [
            { text: 'Description:' },
          ],
          lineHeight: 2
        },
        {
          columns: [
            { text: patent[3] },
          ],
          lineHeight: 2
        },
        {
          text: '\n\n' // Add space between patents
        }
      );
    });

    pdfMake.createPdf(documentDefinition).download();
  }

  return (
    <div className="bg-black w-full min-h-screen flex flex-col lg:justify-evenly py-8 text-white font-poppins ">
      <div className="w-10/12 mx-auto gap-10 flex-col flex justify-center items-center">
        <div className="mt-8 text-center text-4xl font-bold sm:text-5xl ">
          Get Your Patents Here!
        </div>
        <p>
          <GiNotebook size="250" />
        </p>
        <form onSubmit={submitHandler} className="w-3/4 justify-center items-center flex flex-col gap-8">
          <input onChange={changeHandler} type="text" className="text-black w-full py-3 px-5 rounded-3xl" placeholder="Search patent..." />
          <button className="flex flex-row gap-2 p-4 items-center justify-center bg-yellow-400 font-bold hover:bg-yellow-300 text-black w-[200px] rounded-xl transition-all duration-200 ease-in">
            Download
            <FaDownload />
          </button>
        </form>
      </div>
      <div className="w-10/12 flex flex-col gap-8 mt-16 items-center justify-center mx-auto text-white font-poppins">
        <div className="text-5xl sm:text-6xl font-bold">
          About Us
          <div className="h-1 mx-auto w-2/12 sm:w-3/12 mt-1 bg-green-600"></div>
        </div>
        <Link to="/about" className="flex flex-row gap-2 p-4 items-center justify-center bg-yellow-400 font-bold hover:bg-yellow-300 text-black w-[200px] rounded-xl transition-all duration-200 ease-in">
          Click to know
        </Link>
      </div>
    </div>
  );
}
