import ReactNativeEventSource from "react-native-event-source";

import { API_URL, MERCURE_PUBLISH_URL } from "@env";

let eventSource;

export const listenGameEvent = (gameId, callback) => {
  // URL is a built-in JavaScript class to manipulate URLs
  const url = new URL(MERCURE_PUBLISH_URL);
  url.searchParams.append("topic", `${API_URL}/games/${gameId}`);

  eventSource = new ReactNativeEventSource(url.toString());

  eventSource.onmessage = (event) => {
    // Not needed for now, but soon !
    // const data = JSON.parse(event.data);
    callback();
  };

  eventSource.onerror = (e) => {
    console.error(e);
  };

  eventSource.onopen = (e) => {
    console.log("opened", e);
  };
  console.log(eventSource);
};

export const closeConnection = () => {
  eventSource?.close();
};
