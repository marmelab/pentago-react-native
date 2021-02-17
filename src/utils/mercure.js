import RNEventSource from "react-native-event-source";
import { API_URL, MERCURE_PUBLISH_URL } from "@env";

let eventSource = {};

export const listenGameEvent = (gameId, callback) => {
  // URL is a built-in JavaScript class to manipulate URLs
  const url = new URL(MERCURE_PUBLISH_URL);
  url.searchParams.append("topic", `${API_URL}/games/${gameId}`);
  eventSource = new RNEventSource(url);
  eventSource.onmessage = (event) => {
    // Not needed for now, but soon !
    // const data = JSON.parse(event.data);
    callback();
  };
};

export const closeConnection = () => {
  eventSource.close && eventSource.close();
};
