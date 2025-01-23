import React, { useEffect } from "react";
import "../index.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const allpaste = useSelector((state) => state.paste.paste);
  const paste = allpaste.filter((p) => p._id === id)[0];

  return (
    <div className="flex  flex-col items-center">
      <div>
        <input
          className="p-2 rounded-2xl mt-2"
          type="text"
          placeholder="enter Title"
          disabled
          value={paste.title}
        />
      </div>

      <div>
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] bg-black p-4 text-white"
          placeholder="Write code here"
          value={paste.content}
          disabled
          rows={20}
        ></textarea>
      </div>
    </div>
  );
};

export default ViewPaste;
