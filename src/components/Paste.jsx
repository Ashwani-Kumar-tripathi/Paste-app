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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 border-b-2 pb-2 border-gray-300">
        All Pastes
      </h1>

      <input
        className="p-2 rounded-2xl w-full max-w-[600px] mx-auto block mt-5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-5">
        {filterData.length > 0 ? (
          filterData.map((paste) => (
            <div
              className="border p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white"
              key={paste?._id}
            >
              <div className="text-lg font-semibold border-b pb-2 mb-2">
                {paste.title}
              </div>
              <div className="text-sm text-gray-600 border p-2 rounded-lg bg-gray-50">
                {paste.content}
              </div>

              <div className="text-xs text-gray-500 mt-2">
                Created at:{" "}
                <span className="font-semibold">
                  {new Date(paste.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="flex flex-row gap-4 justify-evenly mt-4">
                <button>
                  <NavLink
                    to={`/?pasteId=${paste?._id}`}
                    className="flex items-center space-x-2 text-indigo-600 hover:text-white bg-transparent hover:bg-indigo-600 border-2 border-indigo-600 rounded-full py-2 px-4 transition-all duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.232 5.232a3 3 0 114.243 4.243L7.707 17H4v-3.707L14.768 5.232z"
                      />
                    </svg>
                    <span>Edit</span>
                  </NavLink>
                </button>

                <button>
                  <NavLink
                    to={`/paste/${paste?._id}`}
                    className="flex items-center space-x-2 text-green-600 hover:text-white bg-transparent hover:bg-green-600 border-2 border-green-600 rounded-full py-2 px-4 transition-all duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12c0 3.333-2.667 6-6 6s-6-2.667-6-6 2.667-6 6-6 6 2.667 6 6zm1.828-3.172c-2.335-2.334-5.561-3.828-9.172-3.828-3.61 0-6.837 1.494-9.172 3.828a1 1 0 000 1.414C3.163 9.12 6.391 7.625 10 7.625c3.609 0 6.837 1.495 9.172 3.828a1 1 0 000-1.414z"
                      />
                    </svg>
                    View
                  </NavLink>
                </button>

                <button
                  onClick={() => handleDelete(paste?._id)}
                  className="flex items-center space-x-2 text-red-600 hover:text-white bg-transparent hover:bg-red-600 border-2 border-red-600 rounded-full py-2 px-4 transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span>Delete</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard");
                  }}
                  className="flex items-center space-x-2 text-blue-600 hover:text-white bg-transparent hover:bg-blue-600 border-2 border-blue-600 rounded-full py-2 px-4 transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12H6v3h3V12zM9 6H6v3H9V6zm3 9h6v3h-6v-3zm0-6h6V6h-6v3z"
                    />
                  </svg>
                  <span>Copy</span>
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
                  className="flex items-center space-x-2 text-teal-600 hover:text-white bg-transparent hover:bg-teal-600 border-2 border-teal-600 rounded-full py-2 px-4 transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4-4 4m0-8l-4 4-4-4m4 4H3"
                    />
                  </svg>
                  <span>Share</span>
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
