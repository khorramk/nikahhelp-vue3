import axios from "axios";
import ApiService from "../../../services/api.service";
import JwtService from "../../../services/jwt.service";
export default {
  async createCandidate(context, payload) {
    const response = await ApiService.post("v1/candidate/create", payload)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("response", response);
  },

  //Shared
  async getCountries(context, _) {
    const response = await ApiService.get("v1/utilities/countries");
    context.commit("setCountries", response.data.data);
  },
  async getStudyLevelOptions(context, _) {
    const response = await ApiService.get("v1/studylevels");
    context.commit("setStudyLevelOptions", response.data.data.studylevels);
  },
  async getReligionOptions(context, _) {
    const response = await ApiService.get("v1/religions");
    context.commit("setReligionOptions", response.data.data.religions);
  },
  async getOccupations(context, _) {
    const response = await ApiService.get("v1/occupations");
    context.commit("setOccupations", response.data.data.occupations);
  },

  //Preference Info
  async getPreference(context, _) {
    const response = await ApiService.get(
      `v1/candidate/preference/${JwtService.getUserId()}`
    );

    console.log("API Response", response.data.data);
    context.commit("setPreference", response.data.data);
  },
  async savePreferenceInfoAbout(context, payload) {
    
    return new Promise((resolve, reject) => {
      ApiService.post(`v1/candidate/preference-about`, payload)
        .then((data) => {
          console.log(data.data.data);
          //context.commit('setUserTeamList', data.data.data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async savePreferenceRatingInfo(context, payload) {
    
    return new Promise((resolve, reject) => {
      ApiService.post(`v1/candidate/preference-rating`, payload)
        .then((data) => {
          console.log(data.data.data);
          //context.commit('setUserTeamList', data.data.data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async updatePreference(context, payload) {
    console.log(payload.data);
    const response = await axios.post(
      "v1/candidate/preference/" + payload.userId + "?_method=PATCH",
      payload.data,
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    console.log(response.data);
    if (response.data.status_code == 200) {
      context.commit("setPrefUpdateApiStatus", true);
    }
  },
  async getPersonalInfo(context, _) {
    const response = await ApiService.get("v1/candidate/personal-info");

    console.log("Personal Info", response.data.data);
    context.commit("setPersonalInfo", response.data.data);
  },
  async savePersonalEssentialInfo(_, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post("v1/candidate/personal-essentialInformation", payload)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async savePersonalGeneralInfo(_, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post("v1/candidate/personal-generalinformation", payload)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async savePersonalContactInfo(_, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post("v1/candidate/personal-cotactinformation", payload)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async savePersonalMoreAboutInfo(_, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post("v1/candidate/personal-more-about", payload)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async savePersonalMoreAboutFile(_, payload) {
    return new Promise((resolve, reject) => {
      ApiService.image("v1/candidate/personal-more-about", payload)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
    });
  },


async saveCandidateUploadDoc(_, payload) {
  return new Promise((resolve, reject) => {
    ApiService.post("v1/candidate-upload-doc", payload)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
},

  async saveVerificationInfo(_, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post("v1/candidate/personal-verification-info", payload)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async saveImageVerificationInfo(_, payload) {
    return new Promise((resolve, reject) => {
      ApiService.image("v1/candidate/personal-verification-info", payload)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
    });
  },
  async updatePersonalInfo(context, payload) {
    await axios
      .post(
        "v1/candidate/personal-info/" + payload.userId + "?_method=PATCH",
        payload.data,
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        }
      )
      .then((response) => {
        console.log("API response", response.data);
        if (response.data.status_code == 200) {
          context.commit("setPIUpdateApiStatus", true);
        }
      })
      .catch((error) => {
        console.log({ error }); // this will log an empty object with an error property
        return false;
      });
  },
  async getFamilyInfo(context, payload) {
    const response = await ApiService.get(
      `v1/candidate/family-info?uid=${JwtService.getUserId()}`
    );

    console.log("API Response", response.data.data);
    context.commit("setFamilyInfo", response.data.data);
  },
  async updateFamilyInfo(_, payload) {
   
    return new Promise((resolve, reject) => {
      ApiService.post("v1/candidate/family-info?_method=PATCH", payload)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  toggleFIUpdateApiStatus(context) {
    context.commit("toggleFIUpdateApiStatus");
  },
  async getImages(context, _) {
   
    return new Promise((resolve, reject) => {
      ApiService.get("v1/candidate/image-upload")
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async uploadImages(_, payload) {
    return new Promise( async (resolve, reject) => {
      let user = JSON.parse(localStorage.getItem("user"));
        ApiService.post(`img/${user.id}${payload.folder}`, payload.image)
        .then(data => data.data)
        .then(data => {
            console.log(data, 'image upload response')
            resolve(data)
        }).
      catch(data => console.log(data));
    });
  },
  async deleteImage(_, payload) {
    return new Promise((resolve, reject) => {
      ApiService.delete(`v1/candidate/image-upload/${payload}`)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async deleteImageDir(_, payload) {
    return new Promise((resolve, reject) => {
      let user = JSON.parse(localStorage.getItem("user"));
      ApiService.delete(`img/${user.id}/${payload.folder}`)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async getCandidateAllInfo(context, _) {
    const response = await ApiService.get(
      `v1/candidate/info/${JwtService.getUserId()}`
    );

    console.log("API Response", response.data.data);
    context.commit("setCandidateAllInfo", response.data.data);
  },
  async getImageSharingSettings() {
    return new Promise((resolve, reject) => {
      const user=JwtService.getUser()
      ApiService.get(`v1/candidate/info/${user.id}`)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
