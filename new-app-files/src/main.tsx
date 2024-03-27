import React from "react";
import ReactDOM from "react-dom/client";

import Plugin from "./Plugin.tsx";
import MyndersContainer from "./layout/MyndersContainer.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MyndersContainer>
      <Plugin
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
  </React.StrictMode>
);
