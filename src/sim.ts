import { PREFIX } from './constants';
import { MESSAGES, sendFromBot } from './messages';
import { initBattle, sendRequest } from './protocol/BattleProtocol';
import { AnyObject, BattleStreams, PokemonSet, RandomPlayerAI, Streams } from '@pkmn/sim';
/**
 * Challenge a bot to a battle
 * @param playerName the name of the player
 * @param team the team of the player
 * @param gametype the gametype of the battle
 */
export const battleBot = (playerName: string, team: PokemonSet[]) => {
  console.log(`${PREFIX} Challenging bot`);
  const botName = 'ToBeTheBest_Bot';

  sendFromBot(initBattle(playerName, botName));

  const p1 = { name: playerName, team };
  const p2 = { name: botName, team };
  simulateBattle(p1, p2);
};

interface PlayerSpec {
  name: string;
  team: PokemonSet[];
}

const simulateBattle = (p1spec: PlayerSpec, p2spec: PlayerSpec) => {
  const streams = BattleStreams.getPlayerStreams(new BattleStreams.BattleStream());
  const spec = { formatid: 'gen9random' };

  const p1 = new Player(streams.p1);
  const p2 = new RandomPlayerAI(streams.p2);

  void p1.start();
  void p2.start();

  void (async () => {
    for await (const chunk of streams.omniscient) {
      const message = `${chunk.replace(/\|t:.+\n?/gm, '')}`;  // Remove timestamps messages
      sendFromBot(message);
    }
  })();

  void streams.omniscient.write(`>start ${JSON.stringify(spec)}
>player p1 ${JSON.stringify(p1spec)}
>player p2 ${JSON.stringify(p2spec)}`);

  window.addEventListener('message', p1.handleFromPlayerMessage);
};

class Player extends BattleStreams.BattlePlayer {
  constructor(playerStream: Streams.ObjectReadWriteStream<string>, debug = false) {
    super(playerStream, debug);
  }

  handleFromPlayerMessage = (event: MessageEvent) => {
    if (!event.data || event.data.type !== MESSAGES.FROM_PLAYER) {
      return;
    }

    const message = event.data.message;
    const regexCmd = /^\/choose\s+(\w+)\s+(\d+)/;
    const matchCmd = message.match(regexCmd);

    if (matchCmd) {
      const cmd = matchCmd[1];
      const arg = matchCmd[2];
      this.choose(`${cmd} ${arg}`);
    }
  };

  receiveRequest(request: AnyObject) {
    if (request.wait) {
      // wait request
    } else if (request.forceSwitch) {
      // switch request
      sendFromBot(sendRequest(request));
    } else if (request.active) {
      // move request
      sendFromBot(sendRequest(request));
    } else {
      // team preview
    }
  }
}
