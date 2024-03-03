if (typeof app === 'undefined') {
  throw new Error('Attempted to start in an unsupported website.');
}

console.log('[ToBeTheBest] Starting main script');

const appReceive = app.receive.bind(app) as typeof app.receive;

app.receive = (data: string) => {
  console.log('[ToBeTheBest] Received:', data);
  appReceive(data);
};

const appSend = app.send.bind(app) as typeof app.send;

app.send = (data: string, room: string) => {
  if (room && room.match(/tobethebest/)) {
    console.log('[ToBeTheBest] Send from player', data);
    window.postMessage({ type: 'FROM_PLAYER', data }, '*');
  } else {
    appSend(data, room);
  }
}

const handleFromBotMessage = (event: MessageEvent) => {
  if (!event.data || event.data.type !== 'FROM_BOT') {  // Can't use import in injected script
    return;
  }

  const data = event.data.data;
  app.receive(data);
}

window.addEventListener('message', handleFromBotMessage);
