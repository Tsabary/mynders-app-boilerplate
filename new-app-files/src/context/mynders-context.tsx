import React, { createContext } from "react";
import { MyndersAppProps } from "mynders";


type MyndersContextProps = Partial<MyndersAppProps>;
export const MyndersContext = createContext<MyndersContextProps>({});

interface MyndersProviderProps
  extends React.PropsWithChildren<{}>,
  MyndersContextProps {}

export const MyndersProvider: React.FC<MyndersProviderProps> = ({
  children,
  user,
  folderId,
  encryptData,
  encryptFile,
  decryptData,
  decryptFile,
  isNavigatedFrom,
  setLocalStorage,
  getLocalStorage,
}) => {
  return (
    <MyndersContext.Provider
      value={{
        user,
        folderId,
        encryptData,
        encryptFile,
        decryptData,
        decryptFile,
        isNavigatedFrom,
        setLocalStorage,
        getLocalStorage,
      }}
    >
      {children}
    </MyndersContext.Provider>
  );
};
