import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  state() {
    return {
			representativeInfo:{
				gender: '',
				dob: '',
				occupation: ''
			},
			representativeResidence:{
				country: '',
				city: '',
				specifiedAddress: '',
			},
			representativePermanentAddress:{
				postCode:'',
				country:'',
				city:'',
				homeAddress: '',
			},
			phoneNumber: '',
			emailAddress: '',
			profilePercentage: 0,
		};
  },
  mutations,
  actions,
  getters,
};
