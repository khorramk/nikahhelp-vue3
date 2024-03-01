<template ref="links">
  <div>
    <LandingPageHeader />

    <div class="main-content">
      <!-- <h3 class="text-header-black">Help & support</h3>
      <br />
      <h5>
        Have a question? We are happy to help. You may check our quick links
        first before contacting us.
      </h5> -->

      <br />
      <h4>Quick links</h4>
      <div class="quick-links">
        <div class="flex-container">
          <!-- <div><a href="#cannotLogIn">I can't login</a></div>
          <div><a href="#howToSignUp">How do I sign up?</a></div>
          <div><a href="#afterSubmit">What happens after submitting a profile?</a></div>
          <div><a href="#profileVisibility">What aspects of my profile are publicly visible?</a></div> -->
          <div 
            class="link"
            @click="goToLink('cannotLogIn')" 
            data-toggle="collapse" 
            data-target="#faqCollapse-2" 
            data-aria-expanded="true" 
            data-aria-controls="#faqCollapse-2"
          >
            <span>I can't login</span>
          </div>
          <div 
            class="link"
            @click="goToLink('howToSignUp')"
            data-toggle="collapse" 
            data-target="#faqCollapse-1" 
            data-aria-expanded="true" 
            data-aria-controls="#faqCollapse-1"
          >
            <span>How do I sign up?</span>
          </div>
          <div  
            class="link"
            @click="goToLink('afterSubmit')"
            data-toggle="collapse" 
            data-target="#faqCollapse-4" 
            data-aria-expanded="true" 
            data-aria-controls="#faqCollapse-4"
          >
            <span>What happens after submitting a profile?</span>
          </div>
          <div  
            class="link"
            @click="goToLink('profileVisibility')"
            data-toggle="collapse" 
            data-target="#faqCollapse-5" 
            data-aria-expanded="true" 
            data-aria-controls="#faqCollapse-5"
          >
            <span>What aspects of my profile are publicly visible?</span>
          </div>
        </div>
      </div>

      <!-- FAQ -->

      <section class="faq-section">
        <div class="container1">
          <div class="row">
            <!-- ***** FAQ Start ***** -->
            <div class="col-sm-12">
              <div class="faq-title row">
                <h4 class="col-12 col-md-6 d-flex align-items-center">Quick Guide</h4>
                <div class="col-12 col-md-6">
                  <form action="" @submit.prevent class="d-flex w-100">
                    <input class="search-input m-0 mr-1" type="text" v-model="searchQuery">
                    <input class="search-btn btn  m-0" type="submit" value="search">           
                  </form>
                </div>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="faq" id="accordion">
                <div v-for="(faq, index) in filteredFaqs" :key="index+'sdf'" class="card">
                  <div class="card-header" :id="'faqHeading-'+index">
                    <div class="mb-0">
                      <h5
                        class="faq-title"
                        data-toggle="collapse"
                        :data-target="'#faqCollapse-'+index"
                        :data-aria-expanded="true"
                        :data-aria-controls="'#faqCollapse-'+index"
                        :ref="faq.quicklink"
                      >
                        <span class="badge">{{index+1}}</span>{{faq.title}}
                      </h5>
                    </div>
                  </div>
                  <div
                    :id="'faqCollapse-'+index"
                    class="collapse"
                    :aria-labelledby="'faqHeading-'+index"
                    data-parent="#accordion"
                  >
                    <div class="card-body bg-light" v-html="faq.body">
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container2 mt-12">
          <h5>Still need help? Can't find what you're looking for? <span class="contact-team-link" @click="showContactForm=true"><a href="#send-us-email-header" id="go-to-contact-form" @click="goToContactForm">Contact the MatrimonyAssist team</a></span></h5>
        </div>
      </section>

      <!-- Contact form  --> 
      <div v-show="showContactForm" class="container1" id="send-us-email-header">
        <h4>SEND US AN EMAIL</h4>
        <p>
          Please provide as much
          detail as you can. We aim to get back to you within two working
          days. However, at busy times this may take a little longer.
        </p>
        <v-divider></v-divider>
        <form action="">
          <label for="query">What is your enquiry regarding?</label>
          <select id="query" name="query" v-model="query" class="rounded-pill bg-white">
            <option value="" disabled selected>Please select</option>
            <option value="feedback">Give feedback</option>
            <option value="suggestion">Offer suggestion</option>
            <option value="complaint">Make a complaint</option>
            <option value="general">General enquiry</option>
            <option value="media">Media enquiry</option>
            <option value="commercial">Commercial enquiry</option>
            <option value="advertisement">Advertisement enquiry</option>
            <option value="technica">Technical/website enquiry</option>
          </select>

          <label for="message">Your message</label>
          <textarea
            id="message"
            class="rounded bg-white"
            name="message"
            placeholder="Describe the issue (max. 1000 characters)"
            style="height: 200px"
            required
            value=""
            maxLength="1000"
            v-model="message"
          ></textarea>

          <!-- <label for="fname">What is your first name?</label>
          <input
            type="text"
            id="fname"
            class="rounded-pill bg-white"
            name="firstname"
            placeholder="First name"
            required
            v-model="firstname"
          />

          <label for="lname">What is your last name?</label>
          <input
            type="text"
            id="lname"
            class="rounded-pill bg-white"
            name="lastname"
            placeholder="Last name"
            required
            v-model="lastname"
          /> -->

          <label for="fullname">What is your name?</label>
          <input
            type="text"
            id="fullname"
            class="rounded-pill bg-white"
            name="fullanme"
            placeholder="Full name"
            required
            v-model="fullname"
          />

          <!-- <label for="telephone"
            >What is your preferred contact telephone number? (Optional)</label
          > -->
          <label for="telephone"
            >What is your contact number? (Optional)</label
          >
          <input
            type="text"
            id="telephone"
            class="rounded-pill bg-white"
            name="telephone"
            placeholder="Contact number"
            v-model="telephone"
          />

          <label for="email">What is your email address?</label>
          <input
            type="text"
            id="email"
            class="rounded-pill bg-white"
            name="email"
            placeholder="Email address"
            required
            v-model="email"
          />

          <p>
            By clicking 'Submit' you are agreeing to our
            <router-link to="terms_condition">terms & conditions</router-link> and
            <router-link to="privacy-cookie-policy">privacy and cookie policy</router-link>.
          </p>
          
          <div id="g-recaptcha"></div>
          <br/>
          <div v-if="showErrorMsg" class="text-danger my-3">Please provide all required information and complete the captcha.</div>
	        <button v-if="!submitBtnLoader" type="submit" value="Submit" @click.prevent="save" class="rounded-pill px-12 submit-btn" :disabled="reCaptchaNotCompleted">Submit</button>
	        <button v-else type="submit" value="Submit" @click.prevent="" class="rounded-pill px-12 submit-btn" :disabled="reCaptchaNotCompleted">Submit <span class="spinner-border spinner-border-sm text-light" role="status"></span></button>
          <!-- <div v-else class="spinner-border spinner-border-sm text-light" role="status"></div> -->
        </form>
        <br />
        <p v-if="false">
          To <a href="">unsubscribe from our emails</a>, please follow the link
          and enter your email address.
        </p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/auth/Footer.vue";
import LandingPageHeader from "@/components/landing-page/LandingPageHeader.vue";
import ApiService from "@/services/api.service";


export default {
  name: "Help",
  components: {
    LandingPageHeader,
    Footer,
  },

	data() {
		return {
      showContactForm: false,
			// firstname: '',
			// lastname: '',
      fullname: '',
			email: '',
			telephone: '',
			message: '',
			query: '',
      searchQuery: '',
      showErrorMsg: false,
      submitBtnLoader: false,
      faqs: [
        {
          id: 1,
          quicklink: 'whatIsMaast' ,
          title: 'What is MatrimonyAssist?',
          body: `MatrimonyAssist is an online platform designed to    facilitate
              conversation between families who are seeking marriage
              partners for their loved ones. In MatrimonyAssist, both
              the candidate and the family jointly play vital role in
              finding a prospect. Our goal is simple. We want to
              assist as many people as we can finding compatible
              marriage partners.
              
              MatrimonyAssist is a family and friends matrimonial
              introduction service to help you navigate traditions,
              sensitivities, keeping true to your values, and finding
              someone who is trying to do the same. It is a convenient
              and smart way to go about companion hunting, while
              involving family and friends on a secure portal, without
              too much sweat and stress.
                `
        },
        {
          id: 2,
          quicklink: 'howToSignUp',
          title: `How do I sign up with MatrimonyAssist?`,
          body: `Joining with MatrimonyAssist is very easy and simple.
                You sign up with a valid email address and create your
                own password. Once your email is verified, you have full
                access to the site to create your profile. Your profile
                also goes through a verification process. If everything
                is satisfactory, we publish your profile on to the site.` 
        },
        {
          id: 3,
          quicklink: 'cannotLogIn',
          title: 'I cannot login to the site.',
          body: `<p>
                Please ensure Caps Lock is off. The form fields are case
                sensitive. If you receive an error message “Login could
                not be completed due to unregistered account”. This
                means that either you don't have an online account, or
                you made a mistake with your email and/or your password.
              </p>
              <p>
                Please try logging in again ensuring that you have
                entered your email and password correctly. If you do not
                have a password that would mean you do not have an
                online account. If you don't have an online account,
                <a href="#" class="text-primary">please sign up for an online account</a>. If
                you continue to have difficulties logging in, please
                contact technical support team by email
                support@matrimonyassist.com where they will be happy to
                assist you.
              </p>`
        },
        {
          id: 4,
          title: `Can anyone register on to
                MatrimonyAssist site?`,
          body: `<p>
                MatrimonyAssist is open to families looking for
                prospects for their loved ones. Any candidate wants to
                join the site, must be aged 18 + and create a team with
                family members or a guardian or a representative. To
                represent the candidate, a guardian or a representative
                must have consent from the candidate to act on their
                behalf.
              </p>`
        },
        {
          id: 5,
          quicklink: 'afterSubmit',
          title: `What happens when after
                submitting a profile?`,
          body: `MatrimonyAssist team verifies your profile and contact
                you if further verification information is required.`,
        },
        {
          id: 6,
          quicklink: 'profileVisibility',
          title: `What aspects of my profile
                are publicly visible?`,
          body: `General public who are not registered with
                MatrimonyAssist can see anonymous information of a
                candidate. This includes your age, nationality,
                ethnicity, religion, and education level. However,
                members who are registered and verified by the
                MatrimonyAssist can view most of the information except
                your date of birth, phone number, email, and home
                address. Regarding image, avatar image is viewable to
                everyone all time. Your main and other images are
                viewable only if you have given permission to view at
                image setting of profile completion.`
        },
        {
          id: 7,
          title: 'How do I delete my profile from MatrmonyAssist?',
          body: `You can delete your profile from the setting menu. This
                will stop your profile appearing to the search result.
                However, if you want to completely delete profile from
                the MatrimonyAssist then you need to us a request at
                support@matrimonyassist.com`
        }

      ],
      reCaptchaNotCompleted: true,
		};
	},

  created() {
    this.initializeReCaptcha();
    window.enableSubmitButton = this.enableSubmitButton;
  },
  mounted() {
    console.log(window,'window')
  },


	methods: {
		save() {
      console.log('submit was clicked');
      this.submitBtnLoader = true;
      setTimeout(() => {
        console.log('timeout for 10 sec')
      }, 10000)
      if (this.fullname !== '' && 
        this.email !== '' && 
        this.message !== '' && 
        this.query !== '' && 
        grecaptcha.getResponse().length !== 0 &&
        this.reCaptchaNotCompleted !== true) {
          ApiService.post('v1/feed-back', {
            // firstname: this.firstname,
            // lastname: this.lastname,
            name: this.fullname,
            email: this.email,
            telephone: this.telephone,
            message: this.message,
            query: this.query,
          }).then((data) => {
            console.log(data);
            this.$success ({
              title: "Message sent successfully!",
              content: "Your message is sent. You'll be contacted through email",
              center: true,
            });
            this.fullname = '';
            this.email = '';
            this.telephone = '';
            this.message = '';
            this.query = '';
          }).catch((err) => {
            console.log(err.message);
          });
        } else {
          this.showErrorMsg = true;
        }
        this.submitBtnLoader = false;
		},
    initializeReCaptcha() {
      const recaptchaScript = document.createElement("script");
      recaptchaScript.setAttribute(
        "src",
        "https://www.google.com/recaptcha/api.js"
      );
      document.head.appendChild(recaptchaScript);
  
      let checkInterval = setInterval(function () {
        if (grecaptcha !== undefined) {
          clearInterval(checkInterval);
          console.log('recaptcha is ready');
          grecaptcha.ready(function () {
            grecaptcha.render("g-recaptcha", {
              sitekey: "6LcXRP4nAAAAAAruOpZwIvuOiEFwdLrjA-MEmtxZ",
              callback: "enableSubmitButton"
            });
          });
        }
        console.log('rener completed outside');
      }, 500);
    },

    enableSubmitButton(response) {
      console.log('enablesubmit button called', response);
      this.reCaptchaNotCompleted = false;
    },

    goToLink(link){
      let element = this.$refs[link][0];
      element.scrollIntoView({block:'center', behavior: 'smooth'});
    },

    goToContactForm() {
      document.getElementById('go-to-contact-form').click();
    }
	},
  computed: {
      filteredFaqs() {
          return this.faqs.filter(faq => (faq.title.toLowerCase().includes(this.searchQuery.toLowerCase())));
      }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.main-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  max-width: 1100px;
  margin: 10px auto;
  padding: 0 10px;
  @media (min-width: 320px) and (max-width: 480px) {
    padding: 0 20px;
  }
} 

.quick-links {
  background-color: #f5f5ff;
  padding: 15px;
  width: 100%;

  .link {
    color: $bg-primary;
    font-size: 15px;
    font-weight: 400;
    text-align: center;
    border-radius: 20px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
      box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
    }
  }
}
//Flex container
* {
  box-sizing: border-box;
}
.flex-container {
  display: flex;
  flex-direction: row;
  font-size: 18px;
  padding: 5px;
  justify-content: space-between;
}

.flex-container > div {
  padding: 20px;
  background-color: #fffefe;
  border-radius: 6px;
  flex: 1;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin: 10px;
}

/* Responsive layout - makes a one column-layout instead of two-column layout */
@media (max-width: 800px) {
  .flex-container {
    flex-direction: column;
  }
}

//contact form

/* Style inputs with type="text", select elements and textareas */
input[type="text"],
select,
textarea {
  width: 100%; /* Full width */
  padding: 12px; /* Some padding */
  border: 1px solid #ccc; /* Gray border */
  border-radius: 4px; /* Rounded borders */
  box-sizing: border-box; /* Make sure that padding and width stays in place */
  margin-top: 6px; /* Add a top margin */
  margin-bottom: 16px; /* Bottom margin */
  font-size: 16px;
  resize: vertical; /* Allow the user to vertically resize the textarea (not horizontally) */
}
label {
  font-size: 18px;
}

/* Style the submit button with a specific background color etc */
button {
  background-color: #3ab549;
  border: 1px solid #3ab549 !important;
  color: white;
  padding: 12px 20px;
  font-size: 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* When moving the mouse over the submit button, add a darker green color */
button:hover {
  background-color: white;
  color: #3ab549;
}

button:disabled {
  background-color: #3ab549;
  color: white;
  opacity: .5;
  cursor: not-allowed;
}

/* Add a background color and some padding around the form */
.container1 {
  border-radius: 5px;
  //background-color: #f1f1f1;
  background-color: #f5f5ff;
  padding: 20px;
}

.container2 {
  border-radius: 5px;
  background-color: #ffffff;
  padding: 20px;

  .contact-team-link {
    cursor: pointer;
    &:hover{
      text-decoration: underline; 
    }
  }

  h5 {
    font-weight: 100 !important;
  }
}
// FAQ CSS

.faq-section {
  //background: #f6f3f3;
  min-height: 85vh;
  padding: 5vh 0 0;
  width: 100%;

  .search-input {
    border: 1px solid $border-secondary;
    border-radius: 10px;
    height: 2.5rem;
    background-color: #fff;
  }

  .search-btn {
    background-color: $bg-primary;
    border: 1px solid $border-primary;
    border-radius: 10px;
    color: white;
    box-shadow: 0px 1px 3px #B2aaaa;

    &:hover {
      background-color: white;
      color: $bg-primary;
    }
  }
}
.faq-title h2 {
  position: relative;
  margin-bottom: 25px;
  display: inline-block;
  font-weight: 600;
  line-height: 1;
}
.faq-title h2::before {
  content: "";
  position: absolute;
  left: 50%;
  width: 60px;
  height: 2px;
  background: #e91e63;
  bottom: -25px;
  margin-left: -30px;
}
.faq-title p {
  padding: 0 190px;
  margin-bottom: 10px;
}

.faq {
  background: #ffffff;
  box-shadow: 0 2px 48px 0 rgba(0, 0, 0, 0.06);
  border-radius: 4px;
}

.faq .card {
  border: none;
  background: none;
  border-bottom: 1px dashed #cee1f8;
}

.faq .card .card-header {
  padding: 0px;
  border: none;
  background: none;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
}

.faq .card .card-header:hover {
  background: rgba(233, 30, 99, 0.1);
  padding-left: 10px;
}
.faq .card .card-header .faq-title {
  width: 100%;
  text-align: left;
  padding: 0px;
  padding-left: 30px;
  padding-right: 30px;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 1px;
  color: #3b566e;
  text-decoration: none !important;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  padding-top: 20px;
  padding-bottom: 20px;
}

.faq .card .card-header .faq-title .badge {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 14px;
  //float: left;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;
  text-align: center;
  //background: #e91e63;
  background: $color-secondary;
  color: #fff;
  font-size: 12px;
  margin-right: 20px;
}

.faq .card .card-body {
  padding: 30px;
  padding-left: 35px;
  padding-bottom: 16px;
  font-weight: 400;
  font-size: 16px;
  color: #6f8ba4;
  line-height: 28px;
  letter-spacing: 1px;
  border-top: 1px solid #f3f8ff;
}

.faq .card .card-body p {
  margin-bottom: 14px;
}

.submit-btn {
  box-shadow: 0px 1px 3px #B2aaaa;
}

@media (max-width: 991px) {
  .faq {
    margin-bottom: 30px;
  }
  .faq .card .card-header .faq-title {
    line-height: 26px;
    margin-top: 10px;
  }
}
</style>
