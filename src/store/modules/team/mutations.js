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
  setUserTeamsVerificationStatus(state, payload) {
    payload.forEach((team, index) => {
      let hasVerifiedRep = false;
      let hasVerifiedCandidate = false;

      team.team_members.forEach((member) => {
        if (member.user_type == "Representative" && member.user.status == 3) {
          hasVerifiedRep = true;
        } else if (member.user_type == "Candidate" && member.user.status == 3) {
          hasVerifiedCandidate = true;
        }
      });

      if (hasVerifiedRep && hasVerifiedCandidate) {
        state.team_list[index].is_verified = true;
      } else {
        state.team_list[index].is_verified = false;
      }
    });
  },
  setTeamInfo(state, payload) {
    state.teamInfo = payload;
  },
  setNewTeamInfo(state, payload) {
    state.newTeamInfo = payload;
  },
};
