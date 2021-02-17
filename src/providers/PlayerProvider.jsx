import React, { createContext, useState } from "react";

export const PlayerContext = createContext();

export default ({ children }) => {
  const playerState = useState({});

  return (
    <PlayerContext.Provider value={playerState}>
      {children}
    </PlayerContext.Provider>
  );
};
