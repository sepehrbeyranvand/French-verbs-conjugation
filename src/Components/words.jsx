import React, { useState, useEffect } from "react";

// VocabularyCard component to display each vocabulary word and its details
const VocabularyCard = ({
  word,
  number,
  meaning,
  difficulty,
  onDelete,
  onEdit,
}) => {
  const [hideit, sethideit] = useState(true);
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4 lg:w-[40%] transition-transform transform hover:scale-105">
      <div className="flex justify-between">
        <h3 className="text-xl font-bold mb-2 text-blue-800">Word: {word}</h3>
        <p>#{number}</p>
      </div>
      <div className="flex justify-start items-center gap-x-2 mb-4">
        <p
          style={hideit ? { visibility: "hidden" } : { visibility: "visible" }}
          className="text-gray-700  italic"
        >
          Meaning: {meaning}
        </p>
        <button
          className="cursor-pointer text-sm"
          onClick={() => sethideit(!hideit)}
        >
          {hideit && (
            <div className="flex justify-start relative top-0 right-24 items-center flex-row-reverse gap-x-2">
              <i className="fa fa-eye flex flex-row-reverse gap-x-1"></i>
              <p className="sm:text-xs lg:text-sm w-full">Show The Meaning</p>
            </div>
          )}
          {!hideit && <i className="fa fa-eye-slash"></i>}
        </button>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={difficulty === "easy"}
            readOnly
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="text-gray-700">Easy</span>
        </label>
        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={difficulty === "medium"}
            readOnly
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="text-gray-700">Medium</span>
        </label>
        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={difficulty === "hard"}
            readOnly
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="text-gray-700">Hard</span>
        </label>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onEdit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg px-3 py-1"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-1"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// Main VocabularyApp component
const VocabularyApp = () => {
  const [vocab, setVocab] = useState(""); // State for vocabulary word input
  const [meaning, setMeaning] = useState(""); // State for meaning input
  const [difficulty, setDifficulty] = useState("easy"); // State for difficulty level
  const [vocabList, setVocabList] = useState([]); // State for the list of vocabulary words
  const [editingIndex, setEditingIndex] = useState(null); // State for tracking which item is being edited

  // Load vocabulary from local storage when the component mounts
  useEffect(() => {
    const storedVocabList = JSON.parse(localStorage.getItem("vocabList")) || [];
    setVocabList(storedVocabList);
  }, []);

  // Function to save the vocabulary word and meaning
  const saveVocab = () => {
    if (vocab.trim() === "" || meaning.trim() === "") {
      alert("Please enter a vocabulary word and meaning.");
      return;
    }

    const newVocab = { word: vocab, meaning, difficulty }; // Create a new vocabulary object

    if (editingIndex !== null) {
      // If editing, update the existing item
      const updatedVocabList = vocabList.map((item, index) =>
        index === editingIndex ? newVocab : item
      );
      setVocabList(updatedVocabList); // Update state
    } else {
      // If not editing, add a new item
      const updatedVocabList = [...vocabList, newVocab]; // Update the vocabulary list
      setVocabList(updatedVocabList); // Update state
    }

    localStorage.setItem("vocabList", JSON.stringify(vocabList)); // Save to local storage
    resetFields(); // Clear input fields
  };

  // Function to delete a vocabulary item
  const deleteVocab = (index) => {
    const updatedVocabList = vocabList.filter((_, i) => i !== index); // Filter out the deleted item
    setVocabList(updatedVocabList); // Update state
    localStorage.setItem("vocabList", JSON.stringify(updatedVocabList)); // Update local storage
  };

  // Function to start editing a vocabulary item
  const editVocab = (index) => {
    const vocabToEdit = vocabList[index];
    setVocab(vocabToEdit.word);
    setMeaning(vocabToEdit.meaning);
    setDifficulty(vocabToEdit.difficulty);
    setEditingIndex(index);
  };

  // Function to reset input fields
  const resetFields = () => {
    setVocab("");
    setMeaning("");
    setDifficulty("easy");
    setEditingIndex(null);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen sm:flex flex-col justify-center items-center lg:w-full sm:w-[30vh]">
      <div className="mb-4 flex flex-col lg:flex-row lg:min-w-full sm:w-[40vh]">
        {/* Input for vocabulary word */}
        <div className="mb-2 sm:mb-0 sm:mr-2 w-full">
          <label className="block text-gray-700 font-semibold mb-1">
            Word:
          </label>
          <input
            type="text"
            placeholder="Enter vocabulary word"
            value={vocab}
            onChange={(e) => setVocab(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>
        {/* Input for meaning */}
        <div className="mb-2 sm:mb-0 sm:mr-2 w-full">
          <label className="block text-gray-700 font-semibold mb-1">
            Meaning:
          </label>
          <input
            type="text"
            placeholder="Enter meaning"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>
        {/* Dropdown for selecting difficulty */}
        <div className="mb-2 sm:mb-0 sm:mr-2 w-full">
          <label className="block text-gray-700 font-semibold mb-1">
            Difficulty:
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        {/* Button to save the vocabulary */}
        <div className="w-full sm:w-auto">
          <button
            onClick={saveVocab}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 w-full lg:relative lg:top-[1.7em]"
          >
            {editingIndex !== null ? "Update" : "Save"}
          </button>
        </div>
      </div>
      {/* Render the list of vocabulary cards */}
      <div className="flex justify-around lg:flex-row flex-wrap lg:items-center sm:items-start sm:flex-col p-[6em]">
        {vocabList.map((vocab, index) => (
          <VocabularyCard
            key={index}
            word={vocab.word}
            meaning={vocab.meaning}
            difficulty={vocab.difficulty}
            number={index + 1}
            onDelete={() => deleteVocab(index)} // Pass delete function
            onEdit={() => editVocab(index)} // Pass edit function
          />
        ))}
      </div>
    </div>
  );
};

export default VocabularyApp;
