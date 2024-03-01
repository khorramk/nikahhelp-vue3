// import moment from 'moment';
export default {
  setFamilyInfo(state, payload) {
    state.familyinformation.fathersName = payload.fi_father_name;
    state.familyinformation.fathersProfession = payload.fi_father_profession;
    state.familyinformation.mothersName = payload.fi_mother_name;
    state.familyinformation.mothersProfession = payload.fi_mother_profession;
    state.familyinformation.siblings = payload.fi_siblings_desc;
    state.familyinformation.countryOfOrigin = payload.fi_country_of_origin;
    state.familyinformation.otherFamilyInfo = payload.fi_family_info;
  },
  setPreference(state, payload) {
   
    state.preference = payload.preference;
  },
  toggleFIUpdateApiStatus(state) {
    state.familyinformation.updateApiStatus =
      !state.familyinformation.updateApiStatus;
  },
  setStudyLevelOptions(state, payload) {
    state.study_level_options = payload;
  },
  setReligionOptions(state, payload) {
    state.religion_options = payload;
  },
  setOccupations(state, payload) {
    state.occupations = payload;
  },
  setCountries(state, payload) {
    state.countries = payload;
  },
  setPersonalInfo(state, payload) {
    state.personalinformation = payload;
    // state.personalinformation.first_name = payload.first_name;
    // state.personalinformation.last_name = payload.last_name;
    // state.personalinformation.screen_name = payload.screen_name;
    // state.personalinformation.dob = payload.personal.dob; //moment(payload.personal.dob, "YYYY-MM-DD");
    // state.personalinformation.mobile_number = payload.personal.mobile_number;
    // state.personalinformation.mobile_country_code =
    //   payload.personal.mobile_country_code;
    // state.personalinformation.telephone_no = payload.personal.per_telephone_no;
    // state.personalinformation.gender = payload.personal.per_gender;
    // state.personalinformation.height = payload.personal.per_height;
    // state.personalinformation.employment_status =
    //   payload.personal.per_employment_status;
    // state.personalinformation.education_level_id =
    //   payload.personal.per_education_level_id;
    // state.personalinformation.religion_id = payload.personal.per_religion_id;
    // state.personalinformation.ethnicity = payload.personal.per_ethnicity;
    // state.personalinformation.mother_tongue =
    //   payload.personal.per_mother_tongue;
    // state.personalinformation.nationality = payload.personal.per_nationality;
    // state.personalinformation.country_of_birth =
    //   payload.personal.per_country_of_birth;
    // state.personalinformation.current_residence =
    //   payload.personal.per_current_residence;
    // state.personalinformation.address = payload.personal.per_address;
    // state.personalinformation.marital_status =
    //   payload.personal.per_marital_status;
    // state.personalinformation.have_children =
    //   payload.personal.per_have_children;
    // state.personalinformation.currently_living_with =
    //   payload.personal.per_currently_living_with;
    // state.personalinformation.willing_to_relocate =
    //   payload.personal.per_willing_to_relocate;
    // state.personalinformation.smoker = payload.personal.per_smoker ? 1 : 0;
    // state.personalinformation.language_speak =
    //   payload.personal.per_language_speak;
    // state.personalinformation.hobbies_interests =
    //   payload.personal.per_hobbies_interests;
    // state.personalinformation.food_cuisine_like =
    //   payload.personal.per_food_cuisine_like;
    // state.personalinformation.things_enjoy = payload.personal.per_things_enjoy;
    // state.personalinformation.thankfull_for =
    //   payload.personal.per_thankfull_for;
    // state.personalinformation.about = payload.personal.per_about;
    // console.log("mutation finish");
  },
  setPIUpdateApiStatus(state, flag) {
    state.personalinformation.updateApiStatus = flag;
  },
  setPrefUpdateApiStatus(state, flag) {
    state.preference.updateApiStatus = flag;
  },
  setImages(state, payload) {
    state.imageupload = payload;
  },
  setCandidateAllInfo(state, payload) {
    state.review = payload;
  },
};
