import React, { createContext, useContext, useState } from "react";

type Visit = {
  restaurantId: string;
  date: string;
};

type AppContextType = {
  wallet: Visit[];
  addVisit: (restaurantId: string) => boolean;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: any) {
  const [wallet, setWallet] = useState<Visit[]>([]);

  const addVisit = (restaurantId: string) => {
    const today = new Date().toDateString();

    const alreadyVisited = wallet.find(
      (v) => v.restaurantId === restaurantId && v.date === today
    );

    if (alreadyVisited) {
      return false; 
    }

    setWallet([...wallet, { restaurantId, date: today }]);
    return true; 
  };

  return (
    <AppContext.Provider value={{ wallet, addVisit }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
};
