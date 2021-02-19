import Constants from "expo-constants";
import axios from "redaxios";

const api = axios.create({
  baseURL: Constants.manifest.extra.API_URL,
});

// Used for debugging purpose (i'm sure react native cache this value...)
console.log(Constants.manifest.extra.API_URL);

export const loginOrCreate = (name) => {
  return api.post("/login", {
    name,
  });
};

export const createGame = (playerId, againstComputer) => {
  return api.post("/games", {
    playerId,
    againstComputer,
  });
};

export const joinGame = (gameId, playerId) => {
  return api.post(`/games/${gameId}/join`, {
    playerId,
  });
};

export const getGame = (id) => {
  return api.get(`/games/${id}`);
};

export const getGames = () => {
  return api.get("/games");
};

export const addMarble = (gameId, playerId, position) => {
  return api.post(`/games/${gameId}/addMarble`, {
    playerId,
    position,
  });
};

export const rotateQuarter = (gameId, playerId, rotation) => {
  return api.post(`/games/${gameId}/rotateQuarter`, {
    playerId,
    rotation,
  });
};

export const getAdvice = (gameId, playerId) => {
  return api.get(`/games/${gameId}/advice`, {
    playerId,
  });
};

export const askComputerToPlay = (gameId) => {
  return api.post(`/games/${gameId}/computer/play`);
};
