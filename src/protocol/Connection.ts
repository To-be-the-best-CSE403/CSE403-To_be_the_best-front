import TeamHandler from "./TeamHandler";

const WEBSOCKET_URL = 'wss://sim3.psim.us/showdown/websocket';
const TOBETHEBEST_PREFIX = '[ToBeTheBest Websocket]';

export const initInterception = () => {
    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
        console.log(`${TOBETHEBEST_PREFIX} Connection established`);
    };

    const teamHandler = new TeamHandler();
    socket.onmessage = (event) => {
        console.log(`${TOBETHEBEST_PREFIX} Received message:`, event.data);
    };
};