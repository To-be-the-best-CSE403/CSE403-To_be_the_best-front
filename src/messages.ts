import { PREFIX_MESSAGE, BOT_ROOM } from "./constants";

export const MESSAGES = {
    BATTLESUGGESTION_OPEN: 'BATTLESUGGESTION_OPEN',
    TRAINER_OPEN: 'TRAINER_OPEN',
    FROM_BOT: 'FROM_BOT',
    FROM_PLAYER: 'FROM_PLAYER',
};

export const sendFromBot = (message: string) => {
    console.log(`${PREFIX_MESSAGE} Sending from bot:\n${message}`);
    window.postMessage({ type: MESSAGES.FROM_BOT, room: BOT_ROOM, message: message }, '*');
}