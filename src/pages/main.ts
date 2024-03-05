if (typeof app === 'undefined') {
  throw new Error('Attempted to start in an unsupported website.');
}

console.log('[ToBeTheBest] Starting main script');

const appReceive = app.receive.bind(app) as typeof app.receive;

app.receive = (data: string) => {
  appReceive(data);
};

const appSend = app.send.bind(app) as typeof app.send;

app.send = (data: string, room: string) => {
  if (room && room.match(/tobethebest/)) {
    console.log('[ToBeTheBest] [Message] Sending from player:\n', data);
    window.postMessage({ type: 'FROM_PLAYER', message: data }, '*');
  } else {
    appSend(data, room);
  }
}

const handleFromBotMessage = (event: MessageEvent) => {
  if (!event.data || event.data.type !== 'FROM_BOT') {  // Can't use import in injected script
    return;
  }

  const room = event.data.room;
  const message = event.data.message;
  const data = `>${room}\n${message}`
  app.receive(data);
}

window.addEventListener('message', handleFromBotMessage);
