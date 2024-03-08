import "./styles.css";
import { generateBackgroundPattern, MyndersAppProps } from "mynders";
import icon from "./assets/icon_duo.png";

function App(props: MyndersAppProps) {
  const { user, folderId } = props;

  console.log("Current Mynders user: ", user);
  console.log("Current Mynders folder ID: ", folderId);

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center"
      style={{ ...generateBackgroundPattern() }}
    >
      <img
        src={icon}
        alt="logo"
        className="h-36 w-36 flex-shrink-0 flex-grow-0 pl-1 pr-2"
      />
      <h1 className="text-5xl font-bold mt-4">Your Mynders App</h1>
      <ol className="list-decimal mt-6">
        <li>Edit Plugin.tsx</li>
        <li>
          Run{" "}
          <code className="bg-gray-200 px-2 py-0.5 rounded">npm run build</code>
        </li>
        <li>Upload your built *.umd.js file as a new Mynders app.</li>
      </ol>
    </div>
  );
}

export default App;
