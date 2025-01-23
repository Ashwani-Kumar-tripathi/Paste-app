import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchparams, setSearchparams] = useSearchParams();
  const pasteId = searchparams.get("pasteId");
  const allpaste = useSelector((state) => state.paste.paste);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pasteId) {
      const paste = allpaste.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allpaste]);

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    setTitle("");
    setValue("");
    setSearchparams({});
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {pasteId ? "Update Your Paste" : "Create a New Paste"}
        </h1>

        <input
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 mb-4"
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 mb-4 min-h-[150px] resize-none"
          placeholder="Write your paste content here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={10}
        ></textarea>

        <button
          onClick={createPaste}
          className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-700 transition-all duration-200"
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>
    </div>
  );
};

export default Home;
