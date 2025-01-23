import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  paste: JSON.parse(localStorage.getItem("paste")) || [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    // Function to add a new paste
    addToPaste: (state, action) => {
      const paste = action.payload;

      // Check if the paste already exists
      const existingPaste = state.paste.find((item) => item._id === paste._id);

      if (existingPaste) {
        toast.error("This paste already exists.");
      } else {
        // Add the new paste and update the localStorage
        state.paste = [...state.paste, paste];
        localStorage.setItem("paste", JSON.stringify(state.paste));
        toast.success("Paste created successfully");
      }
    },

    // Function to update an existing paste
    updateToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.paste.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        // Update paste and update localStorage
        state.paste[index] = paste;
        localStorage.setItem("paste", JSON.stringify(state.paste));
        toast.success("Paste updated");
      } else {
        toast.error("Paste not found for update.");
      }
    },

    // Function to reset all pastes
    resetAllPaste: (state) => {
      state.paste = [];
      localStorage.removeItem("paste");
      toast.success("All pastes cleared");
    },

    // Function to remove a paste by its ID
    removeFromPaste: (state, action) => {
      const pasteId = action.payload;

      // Remove paste by ID and update localStorage
      state.paste = state.paste.filter((item) => item._id !== pasteId);

      // If the paste was removed, update localStorage
      if (
        state.paste.length !==
        state.paste.filter((item) => item._id !== pasteId).length
      ) {
        localStorage.setItem("paste", JSON.stringify(state.paste));
        toast.success("Paste deleted");
      } else {
        toast.error("Paste not found");
      }
    },
  },
});

export const { addToPaste, updateToPaste, resetAllPaste, removeFromPaste } =
  pasteSlice.actions;

export default pasteSlice.reducer;