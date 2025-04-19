import { createListenerMiddleware } from "@reduxjs/toolkit";
import { globalCommunicator } from "../inter-module-communicator";
import { ROOT_STORE_TYPE } from "./store";
import { CONFIG_DATA_TYPE, setLoading } from "./rows.slice";

const listenerMiddleware = createListenerMiddleware<ROOT_STORE_TYPE>();

// Listen on all actions
listenerMiddleware.startListening({
  // return true in predicate to trigger effect
  predicate: (action, currentState, previousState) => {
    if (action.type === "rows/fetchCol/rejected") {
      return true;
    }

    return false;
  },
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const { configKeys, config } = state.grid;

    checkLoadingStatus(configKeys, config);
  },
});

// listen on only setLoading
listenerMiddleware.startListening({
  actionCreator: setLoading,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const { configKeys, config } = state.grid;

    checkLoadingStatus(configKeys, config);
  },
});

function checkLoadingStatus(
  configKeys: string[],
  config: Record<string, CONFIG_DATA_TYPE>,
) {
  let globalLoadingStopped = true;
  for (let i = 0; i < configKeys.length; i++) {
    const key = configKeys[i];
    if (config[key].loading.show) {
      globalLoadingStopped = false;
      break;
    }
  }

  if (globalLoadingStopped) {
    if (globalCommunicator.notifyAppLoaderStatus) {
      console.log("Loading is now false");
      globalCommunicator.notifyAppLoaderStatus(false);
    }
  }
}

export default listenerMiddleware;
