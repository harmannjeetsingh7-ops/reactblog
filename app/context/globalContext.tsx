'use client';

import { createContext, useContext, ReactNode, useState } from "react";

type CounterContextType = {
    sessionCounter: number;
    increment: () => void;
    username: string | null;
    setUsername: (username: string | null) => void;
}

// make public
export const GlobalContext = createContext<CounterContextType | undefined>(undefined);

// create wrapper we can use in layout.tsx to make this available everywhere
export function GlobalProvider({ children }: { children: ReactNode }) {
    // use state hook to manage global counter var
    const [sessionCounter, setSessionCounter] = useState<number>(0);
    const [username, setUsername] = useState<string | null>(null);
    const increment = () => {
        setSessionCounter((currentCounter) => currentCounter + 1);
    }

    return (
        <GlobalContext.Provider value={{ sessionCounter, increment, username, setUsername }}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useSessionCounter() {
    const context = useContext(GlobalContext);
    if (!context) throw new Error("Counter needs a Provider");
    return context;
}
