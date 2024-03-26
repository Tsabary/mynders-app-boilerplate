import "./styles.css";
import icon from "./assets/icon_duo.png";
import { generateBackgroundPattern, MyndersAppProps } from "mynders";
import { MyndersProvider } from "./context/mynders-context";
import useMynders from "./hooks/useMynders";
import BuildInstructions from "./components/BuildInstructions";

function Plugin() {
  const { user, folderId } = useMynders(); // Use this hook to access data and methods provided by mynders inside any component in your plugin code

  console.log("Current Mynders user id: ", user._id);
  console.log("Current Mynders user name (if defined): ", user.name);
  console.log("Current Mynders folder id: ", folderId);

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
      <h1 className="text-5xl font-bold mt-4">Your Mynders Plugin</h1>
      <BuildInstructions />
    </div>
  );
}
const PluginContainer = React.memo((props: MyndersAppProps) => (
  <MyndersProvider {...props}>
    <App />
  </MyndersProvider>
));
export default PluginContainer;
