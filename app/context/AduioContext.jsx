import { createContext, useState } from "react";

export const AudioContext = createContext();

export function AudioProvider ({children}) {
    const [audio, setAudio] = useState(null);

    return (
        <AudioContext.Provider value={{audio, setAudio}}>
            {children}
        </AudioContext.Provider>
    );
}