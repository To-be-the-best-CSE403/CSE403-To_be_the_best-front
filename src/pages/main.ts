if (typeof app === 'undefined' || typeof Dex === 'undefined') {
  console.error('Attempted to start in an unsupported website.');

  throw new Error('Attempted to start in an unsupported website.');
}

console.log('[ToBeTheBest] Starting main script');

const appReceive = app.receive.bind(app) as typeof app.receive;

app.receive = (data: string) => {
  console.log('[ToBeTheBest] Received:', data);
  const receivedRoom = data?.startsWith?.('>');

  appReceive(data);

  if (!receivedRoom) {
    return;
  }

  const roomId = data.slice(1, data.indexOf('\n'));
};
