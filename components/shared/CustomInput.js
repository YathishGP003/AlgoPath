import React from "react";

const CustomInput = ({ customInput, setCustomInput }) => {
  // Calculate dynamic height based on content
  const getTextareaHeight = () => {
    const lines = customInput.split('\n').length;
    const minHeight = 80; // Better minimum height
    const maxHeight = 250; // Increased maximum height
    const lineHeight = 22; // Better line height
    const calculatedHeight = Math.max(minHeight, Math.min(maxHeight, lines * lineHeight + 30));
    return calculatedHeight;
  };

  return (
    <>
      <textarea
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        style={{ height: `${getTextareaHeight()}px` }}
        className="focus:outline-none w-full border-2 border-light-4 bg-light-3 mt-2 rounded-lg p-2 font-mono resize-none transition-all duration-200"
      ></textarea>
    </>
  );
};

export default CustomInput;
