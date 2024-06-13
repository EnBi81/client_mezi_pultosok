export const ReactAppMessageQueue: ReactAppInboundEventCenterType = ((): ReactAppInboundEventCenterType => {
  const appUpdatesQueue = createQueue<object>();

  return {
    appUpdate: appUpdatesQueue,
  };
})();

interface ReactAppInboundEventCenterType {
  appUpdate: ReactAppSingleMessageQueue<object>;
}

interface ReactAppSingleMessageQueue<Payload> {
  addQueueHandler: (listener: (Payload) => void) => { removeHandler: () => void };
  enqueue: (payload: Payload) => void;
}

function createQueue<Payload>(): ReactAppSingleMessageQueue<Payload> {
  let listeners = [];
  const queue: Payload[] = [];

  function enqueue(payload: Payload) {
    if (listeners.length > 0) {
      callEventListeners(payload);
      return;
    }

    queue.push(payload);
  }

  function callEventListeners(payload: Payload) {
    for (const listener of listeners) {
      try {
        listener(payload);
      } catch (e) {
        console.error('Error while executing listener: ', e);
      }
    }
  }

  function addQueueHandler(listener): { removeHandler: () => void } {
    listeners.push(listener);

    while (queue.length > 0) {
      const payload = queue.pop();
      if (payload === undefined) return;
      callEventListeners(payload);
    }

    return {
      removeHandler: () => {
        listeners = listeners.filter((l) => l !== listener);
      },
    };
  }

  return {
    addQueueHandler: addQueueHandler,
    enqueue: enqueue,
  };
}
