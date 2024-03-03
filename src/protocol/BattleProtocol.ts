export const initBattle = (playerName: string, opponentName: string) => {
  return `>battle-gen9randombattle-tobethebest
|init|battle
|title|${playerName} vs. ${opponentName}
|j|${playerName}
`;
};

export const sendRequest = request => `>battle-gen9randombattle-tobethebest
|request|${JSON.stringify(request)}
`;
