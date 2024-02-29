import TeamHandler from "../protocol/TeamHandler";

export default function MovePage() {

  const teamHandler = new TeamHandler();

  return (
    <div id="tobethebest-sidebar__container" data-testid="test-tobethebest-sidebar__container">
      <div id="tobethebest-sidebar-header" data-testid="test-tobethebest-sidebar-header">
        Move Suggestion
      </div>
    </div>
  );
}
