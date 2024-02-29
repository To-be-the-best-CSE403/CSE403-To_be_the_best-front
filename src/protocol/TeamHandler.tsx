import { Protocol, Args } from '@pkmn/protocol';

class TeamHandler implements Protocol.Handler {
  '|request|'(args: Args['|request|']) {
    const request = Protocol.parseRequest(args[1]);
    if (request.requestType === 'team') {
      const teamRequest = request as Protocol.TeamRequest;
      console.log('[ToBeTheBest] Catching protocol team request');
      console.log(teamRequest);
    }
  }
}

export default TeamHandler;
