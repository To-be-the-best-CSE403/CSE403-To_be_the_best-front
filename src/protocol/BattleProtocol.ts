export const initBattle = (playerName: string, opponentName: string) => {
  return `|init|battle
|title|${playerName} vs. ${opponentName}
|j|${playerName}`;
};

export const sendRequest = request => `|request|${JSON.stringify(request)}`;
