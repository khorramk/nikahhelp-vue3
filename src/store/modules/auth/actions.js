import axios from "axios";
import JwtService from "../../../services/jwt.service";
import router from '../../../router';
export default {
  async login(context, payload) {

    // clear twoFAMessage
    context.commit("setTwoFAMessage", {
      twoFAMessage: null,
    });

    // clear errorMessage
    context.commit("setErrorMessage", {
      errorMessage: null,
    });

    const form = new FormData();
    form.append('email', payload.email);
    form.append('password', payload.password);



    await axios.post("v1/login", payload).then( async (response) => {
      try {
        const token = response.data.data.token.access_token;
        let data = { token: token };
        JwtService.saveTokenAndUser(data);
        JwtService.setUser(response.data.data.user);
        context.commit("setUser", {
          token: response.data.data.access_token,
  
  
        });
  
        if(router.history._startLocation === '/login' || router.history._startLocation.includes('/emailVerify/') || router.history._startLocation.includes('/email-verification-success')) {
          router.push({ name: 'root' });
        } else {
          router.push({ path: `${router.history._startLocation}`});
        }
      } catch (e) {
        if(response.data.data.includes("A verification code was sent to your email.")) {
          console.log(response.data.data, 'error');
          context.commit("setTwoFAMessage", {
            twoFAMessage: response.data.data,
          });
        }
      }
    }).catch((e) => {
      let errorMessage;
      if(e.response.data.message.includes('Suspended') || e.response.data.message.includes('deleted')) {
        errorMessage = "Account suspended! Please contact MatrimonyAssist team through the help page.";
      } else {
        errorMessage = 'Invalid email or password';
      }
      context.commit("setErrorMessage", {
        errorMessage: errorMessage
      });
    });
  },
  async signup(context, payload) {
    const response = await axios.post("v1/register", payload);
    if (response.data.status_code === 200) {
      const token = response.data.data.token.access_token;
      let data = { token: token };
      response.data.data.user.is_verified = 0;
      JwtService.saveTokenAndUser(data);
      JwtService.setUser(response.data.data.user);
      context.commit("setUser", {
        token: response.data.data.access_token,
      });


      if (token) {
        router.push({
          name: "EmailVerification",
        })
      }
    }
    else {
      for (let key in response.data.data) {
        let msg = response.data.data[key][0];
        context.commit("setErrorMessage", {
          errorMessage: msg,
        });
        break;
      }
    }


  },
  async verify(_, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`/v1/emailVerify/${payload.token}`).then((data) => {
        resolve(data);
      })
        .catch((error) => {
          reject(error);
        });

    })
  },
  async forgetPassword(_, payload) {
    console.log(payload)
    const response = await axios.post("v1/forgot/password", payload);
    console.log(response);
  },
  async resetPassword(_, payload) {
    const response = await axios.post("v1/forgot/password/update", payload);
    console.log(response);
  },
  async logout(context) {
    console.log("Logging Out");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    // localStorage.removeItem("chat_currentconv");
    // localStorage.removeItem("chat_conversations");
    // localStorage.removeItem("chat_msgs");
    // localStorage.removeItem("chat_unreadrecords");
    // localStorage.removeItem("chat_coninfo");
    // localStorage.removeItem("chat_uinfo");
    context.commit("setUser", {
      token: null,
    });
    JwtService.destroyTokenAndUser();
  },

};
