import React from "react";

const OutputWindow = ({ outputDetails, additionalStyles }) => {
  // Calculate dynamic height based on output content
  const getOutputHeight = () => {
    if (!outputDetails || !outputDetails.output) return 120; // Better initial height
    const lines = outputDetails.output.split('\n').length;
    const minHeight = 120; // Better minimum height
    const maxHeight = 300; // Increased maximum height
    const lineHeight = 18; // Better line height for readability
    const calculatedHeight = Math.max(minHeight, Math.min(maxHeight, lines * lineHeight + 80)); // +80 for status and padding
    return calculatedHeight;
  };

  return (
    <div className={`!w-full flex flex-col ${additionalStyles}`} style={{ height: `${getOutputHeight()}px` }}>
      <h3 className="font-bold text-lg mb-2">Output</h3>
      
      {outputDetails?
        (outputDetails.submitted ? (
          <div className="w-full flex flex-col bg-dark-2 rounded-lg text-white p-2 font-mono text-sm overflow-y-auto" style={{ height: 'calc(100% - 40px)' }}>
            <p className="text-lg mb-2">
              Status:{" "}
              <span
                className={`${outputDetails.accepted ? "text-green-500" : "text-red-500"}`}
              >
                {outputDetails.accepted ? "ACCEPTED" : "REJECTED"}
              </span>
            </p>
            {!outputDetails.accepted && (
              <textarea
                value={outputDetails.output || ""}
                className="w-full bg-dark-2 resize-none text-xs border-none outline-none"
                style={{ height: 'calc(100% - 30px)' }}
                disabled
              ></textarea>
            )}
          </div>
        ) : (
          <div className="w-full flex flex-col bg-dark-2 rounded-lg text-white p-2 font-mono text-sm overflow-y-auto" style={{ height: 'calc(100% - 40px)' }}>
            <p className="text-xs text-blue-500">
              CPUTime: {outputDetails.cpuTime}s
            </p>
            <p className="text-xs text-blue-500 mb-2">
              Memory: {outputDetails.memory}b
            </p>
            <textarea
              value={outputDetails.output || ""}
              className="w-full bg-dark-2 resize-none border-none outline-none"
              style={{ height: 'calc(100% - 50px)' }}
              disabled
            ></textarea>
            </div>
        )) : (
          <div className="w-full flex flex-col bg-dark-2 rounded-lg text-white p-2 font-mono text-sm overflow-y-auto" style={{ height: 'calc(100% - 40px)' }} />
        )}
    </div>
  );
};

export default OutputWindow;
