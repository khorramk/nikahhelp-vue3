export default {
  setTeamId(state, team_id) {
    state.team_id = team_id;
  },
  setCreateTeamStep(state, step) {
    state.create_team_step = step;
  },
  setUserTeamList(state, teamList) {
    state.team_list = [];
    state.team_list = teamList;
  },
  setTeamInfo(state, payload) {
    state.teamInfo = payload;
  },
  setNewTeamInfo(state, payload) {
    state.newTeamInfo = payload;
  },
};
