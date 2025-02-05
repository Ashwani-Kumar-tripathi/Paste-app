import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import { NavLink } from "react-router-dom";
import "../index.css";
import toast from "react-hot-toast";

const Paste = () => {
  const paste = useSelector((state) => state.paste.paste);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filterData = paste.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPaste(pasteId));
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 border-b-2 pb-2 border-gray-300">
        All Pastes
      </h1>

      <input
        className="p-2 rounded-2xl w-full max-w-xs sm:max-w-md mx-auto block mt-5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {filterData.length > 0 ? (
          filterData.map((paste) => (
            <div
              className="border p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white"
              key={paste?._id}
            >
              <div className="text-lg font-semibold border-b pb-2 mb-2">
                {paste.title}
              </div>
              <div className="text-sm text-gray-600 border p-2 rounded-lg bg-gray-50 h-24 overflow-y-auto">
                {paste?.content ? paste.content : "No content available"}
              </div>

              <div className="text-xs text-gray-500 mt-2">
                Created at:{" "}
                <span className="font-semibold">
                  {new Date(paste.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="flex flex-wrap gap-3 justify-center mt-4">
                <NavLink
                  to={`/?pasteId=${paste?._id}`}
                  className="flex items-center space-x-2 text-indigo-600 hover:text-white bg-transparent hover:bg-indigo-600 border-2 border-indigo-600 rounded-full py-2 px-4 transition-all duration-200 w-full sm:w-auto"
                >
                  ✏️ Edit
                </NavLink>

                <NavLink
                  to={`/paste/${paste?._id}`}
                  className="flex items-center space-x-2 text-green-600 hover:text-white bg-transparent hover:bg-green-600 border-2 border-green-600 rounded-full py-2 px-4 transition-all duration-200 w-full sm:w-auto"
                >
                  👁️ View
                </NavLink>

                <button
                  onClick={() => handleDelete(paste?._id)}
                  className="flex items-center space-x-2 text-red-600 hover:text-white bg-transparent hover:bg-red-600 border-2 border-red-600 rounded-full py-2 px-4 transition-all duration-200 w-full sm:w-auto"
                >
                  ❌ Delete
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard");
                  }}
                  className="flex items-center space-x-2 text-blue-600 hover:text-white bg-transparent hover:bg-blue-600 border-2 border-blue-600 rounded-full py-2 px-4 transition-all duration-200 w-full sm:w-auto"
                >
                  📋 Copy
                </button>

                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: paste.title,
                          text: paste.content,
                          url: window.location.href,
                        })
                        .then(() => toast.success("Shared successfully"))
                        .catch((error) =>
                          toast.error("Error sharing: " + error)
                        );
                    } else {
                      navigator.clipboard
                        .writeText(`${paste.title}\n${paste.content}`)
                        .then(() => toast.success("Copied to clipboard"))
                        .catch((error) =>
                          toast.error("Error copying: " + error)
                        );
                    }
                  }}
                  className="flex items-center space-x-2 text-teal-600 hover:text-white bg-transparent hover:bg-teal-600 border-2 border-teal-600 rounded-full py-2 px-4 transition-all duration-200 w-full sm:w-auto"
                >
                  🔗 Share
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">No results found</div>
        )}
      </div>
    </div>
  );
};

export default Paste;
