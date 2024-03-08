import React from "react";
import ReactDOM from "react-dom/client";
import { generateBackgroundPattern } from "mynders";

import App from "./App.tsx";
import MyndersContainer from "./layout/MyndersContainer.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <div
      style={{
        height: "100vh",
        ...generateBackgroundPattern("#e6ecf7", "#459af7"),
      }}
    >
      <MyndersContainer>
        <App
          user={{ _id: "Aa1234", email: "user@example.com" }}
          folderId="dummy-folder-id"
          encryptData={(data) => "mock encrypted data: " + data}
          encryptFile={() =>
            Promise.resolve(new Blob([], { type: "application/octet-stream" }))
          }
          decryptData={(data) => "Mock decrypted data: " + data}
          decryptFile={() =>
            Promise.resolve(new File([""], "dummy.txt", { type: "text/plain" }))
          }
        />
      </MyndersContainer>
    </div>
  </React.StrictMode>
);
