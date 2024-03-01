import ApiService from "../../../services/api.service";
import moment from "moment";
import JwtService from "../../../services/jwt.service";
export default {
  async createPersonalInfoForRepresentative(context, _payload) {
    return new Promise((resolve, reject) => {
      ApiService.post("v1/representative/essentialInformation", _payload)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  async creatContactInfoForRepresentative(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post("v1/representative/contactinfo", payload)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async saveRepresentativeVerificationInfo(_, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post("v1/representative/verify/identity", payload)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async saveRepresentativeImageVerificationInfo(_, payload) {
    return new Promise((resolve, reject) => {
      ApiService.image("v1/representative/verify/identity", payload)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async saveRepresentativeImage(_, payload) {
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
  async saveRepresentativeImageCondition(_, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post("v1/representative/image/upload", payload)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  async deleteRepImage(_, payload) {
    return new Promise((resolve, reject) => {
      ApiService.delete(`v1/representative/remove-img/${payload}`)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async getRepresentativeData(context) {
    return new Promise((resolve, reject) => {
      ApiService.get("v1/representative-information")
        .then((data) => {
          context.commit("setRepresentativeData", data);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  async createRepresentative(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post("v1/representative-screen-name", payload)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  },
  async saveRepresentativeUploadDoc(_, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post("v1/rep-upload-doc", payload)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async getRepresentativeInfo(context, _) {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/representative/info/${JwtService.getUser().id}`)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });

  },

  async getImages(context, payload) {

  },
  async profilePercentage(context, payload) {
    let profileData;
    let percentage = 0;
    let fields = 0;
    let emptyFields = 0;

    // making network call

    await ApiService.get("v1/representative-information", payload)
      .then((data) => {
        profileData = data.data.data[0];

        // we need to delete some part of data to make this percentage working properly
        delete profileData["id"];
        delete profileData["user_id"];
        delete profileData["anybody_can_see"];
        // delete profileData["only_team_can_see"];
        delete profileData["team_connection_can_see"];
        delete profileData["is_agree"];
        delete profileData["created_at"];
        delete profileData["updated_at"];
        delete profileData["deleted_at"];
        delete profileData["data_input_status"];

        console.log("Profile Data");
        console.log(profileData);

        for (const _field in profileData) {
          // console.log(_field);
          // console.log(profileData[_field]);
          fields++;
          console.log(_field);

          if (
            profileData[_field] == null ||
            profileData[_field] == undefined ||
            profileData[_field].length == 0
          ) {
            emptyFields++;
          }
        }

        // calculating percentage
        // console.log(fields, emptyFields);
        if (emptyFields == 0) {
          context.commit("setPercentage", 100);
        } else {
          percentage = ((fields - emptyFields) / fields) * 100;
          // console.log(percentage);
          if (percentage > 100) {
            percentage = 100;
          }
          context.commit("setPercentage", percentage);
          return percentage;
        }
      })
      .catch((error) => {
        throw error;
      });

    // checking if fields are empty
  },
};
