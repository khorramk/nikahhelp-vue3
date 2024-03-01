import ApiService from "../../../services/api.service";

export default {
  async loadBlockedCandidates(context) {
    const response = await ApiService.get("v1/block-list");
    console.log("Block List: ", response.data.data);
    //Throw Error from here

    context.commit("setBlockedCandidates", response.data.data);
  },
  async unblockCandidate(context, payload) {
    const response = await ApiService.get(`v1/unblock-candidate/${payload}`);
    console.log("Unblocking", response.data);
  },
  async blockCandidate(context, payload) {
    const response = await ApiService.post(`v1/store-block-list`, payload);
    console.log("blocking", response.data);
  },
};
