import { useState } from "react";
import conjugationFR from "conjugation-fr";
import Swal from "sweetalert2";
import { Link, NavLink } from "react-router-dom";

export default function Conjugation({ darkMode }) {
  const [data, setData] = useState("");
  const [selectedTense, setSelectedTense] = useState("");
  const [keyboard, setKeyboard] = useState(false);
  const [items, setItems] = useState([]);
  const [wrongVerb, setWrongVerb] = useState(0);

  const tenses = [
    { label: "Choose one", value: "Choose one" },
    { label: "Présent", value: "présent" },
    { label: "Futur", value: "futur" },
    { label: "Passé composé", value: "passé-composé" },
    { label: "Imparfait", value: "imparfait" },
    { label: "Infinitif présent", value: "infinitif-présent" },
    { label: "Passé simple", value: "passé-simple" },
    { label: "Plus-que-parfait", value: "plus-que-parfait" },
    { label: "Passé antérieur", value: "passé-antérieur" },
    { label: "Futur antérieur", value: "futur-antérieur" },
    { label: "Présent conditionnel", value: "présent-conditionnel" },
    { label: "Passé conditionnel", value: "passé-conditionnel" },
    { label: "Présent subjonctif", value: "présent-subjonctif" },
    { label: "Imparfait subjonctif", value: "imparfait-subjonctif" },
    {
      label: "Subjonctif plus-que-parfait",
      value: "subjonctif-plus-que-parfait",
    },
    { label: "Impératif présent", value: "impératif-présent" },
    { label: "Impératif passé", value: "impératif-passé" },
    { label: "Participe présent", value: "participe-présent" },
    { label: "Participe passé", value: "participe-passé" },
  ];

  const clicka = () => {
    if (data === "" || selectedTense === "") {
      Swal.fire("warning", "Make sure that the inputs are filled!", "warning");
    } else {
      try {
        const conj = conjugationFR.findTense(data, selectedTense);
        if (conj === null || conj === undefined) {
          Swal.fire("Error", 'Unable to find verb "' + data + '"', "error");
        } else {
          setItems(conj);
        }
      } catch (error) {
        if (wrongVerb < 3) {
          Swal.fire("Error", error.message, "error");
          setWrongVerb(wrongVerb + 1);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'Unable to find verb "' + data + '"',
            footer:
              '<a class="text-[#007BFF]" href="mailto: sepehr7797@gmail.com">Do You Need Help? Contact Me</a>',
          });
        }
      }
    }
  };

  return (
    <div className="flex mt-[10vh] min-h-screen flex-col gap-6 p-4 w-full overflow-x-hidden">
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="flex w-full justify-center flex-row-reverse">
          <button
            className=" bg-blue-500 hover:bg-blue-600 transition-all .5s ease-in-out duration-200 rounded-e-md text-white lg:w-[5%] sm:w-[10%]"
            onClick={clicka}
          >
            <i className="fa fa-search"></i>
          </button>
          <input
            className="bg-white p-2 lg:w-[50%] sm:w-[65%] outline-none rounded-s-md focus:ring-2 transition-all .5s ease-linear duration-200"
            placeholder="Write a verb such as Aller , Manger and etc."
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-center gap-4">
          <select
            className="lg:w-[15%] cursor-pointer sm:w-[30%] p-2 rounded-sm outline-none focus:ring-2 transition-all .3s ease-linear duration-200"
            value={selectedTense}
            onChange={(e) => setSelectedTense(e.target.value)}
          >
            {tenses.map((tense, i) => (
              <option key={i} value={tense.value}>
                {tense.label}
              </option>
            ))}
          </select>
          {!keyboard && (
            <i
              onClick={() => setKeyboard(!keyboard)}
              className="fa fa-keyboard-o text-2xl cursor-pointer"
              style={darkMode ? { color: "white" } : { color: "black" }}
            ></i>
          )}
          {keyboard && (
            <div className="flex gap-3">
              <button
                className="text-white size-8 rounded-md  bg-[#445760] hover:bg-[#445790] transition-all .4s ease-linear duration-200"
                onClick={() => setData(data + "ê")}
              >
                ê
              </button>
              <button
                className="text-white size-8 rounded-md  bg-[#445760] hover:bg-[#445790] transition-all .4s ease-linear duration-200"
                onClick={() => setData(data + "è")}
              >
                è
              </button>
              <button
                className="text-white size-8 rounded-md bg-[#445760] hover:bg-[#445790] transition-all .4s ease-linear duration-200"
                onClick={() => setData(data + "é")}
              >
                é
              </button>
              <button
                className="text-white size-8 rounded-md bg-[#445760] hover:bg-[#445790] transition-all .4s ease-linear duration-200"
                onClick={() => setData(data + "ç")}
              >
                ç
              </button>
              <button
                className="size-8 rounded-md"
                onClick={() => setKeyboard(!keyboard)}
              >
                <i
                  className="fa fa-close"
                  style={darkMode ? { color: "white" } : { color: "black" }}
                ></i>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <table className="table-auto rounded-md w-[50%] text-left">
          <thead>
            <th className={darkMode ? `text-white py-2` : `py-2`}>
              {selectedTense}
            </th>
          </thead>
          <tbody>
            {items ? (
              items.map((e, i) => (
                <tr
                  key={i}
                  className={`bg-white ${
                    i % 2 === 0 ? "bg-gray-200" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2">
                    {e.pronoun} <span className="text-red-400">{e.verb}</span>
                  </td>
                </tr>
              ))
            ) : (
              <p>Not Found</p>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <a
          href="/word"
          className="bg-purple-600 hover:bg-purple-700 transition-all .5s ease-in-out duration-200 float-right text-white p-2 rounded-s-lg relative top-[0] -right-5 w-16"
        >
        Word
        </a>
      </div>
    </div>
  );
}
