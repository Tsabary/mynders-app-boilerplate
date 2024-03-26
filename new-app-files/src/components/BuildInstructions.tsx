import React from "react";

function BuildInstructions() {
  return (
    <ol className="list-decimal mt-6">
      <li>Edit Plugin.tsx</li>
      <li>
        Run{" "}
        <code className="bg-gray-200 px-2 py-0.5 rounded">npm run build</code>
      </li>
      <li>Upload your built *.umd.js file as a new Mynders plugin.</li>
    </ol>
  );
}

export default BuildInstructions;
