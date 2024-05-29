import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {

  const [rooms, setRooms] = useState(() => {
    const storedRooms = localStorage.getItem("rooms");
    return storedRooms ? JSON.parse(storedRooms) : { data: [], lastUpdated: null };
  });

  const updateRooms = (newRooms) => {
    const updatedRooms = {
      data: newRooms,
      lastUpdated: new Date().toISOString(),
    };
    setRooms(updatedRooms);
    localStorage.setItem("rooms", JSON.stringify(updatedRooms));
  };

  useEffect(() => {
    const storedRooms = localStorage.getItem("rooms");
    if (storedRooms) {
      setRooms(JSON.parse(storedRooms));
    }
  }, []);

  return (
    <DataContext.Provider
      value={{ rooms, updateRooms }}
    >
      {children}
    </DataContext.Provider>
  );
}
