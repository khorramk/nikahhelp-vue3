<template>
    <body>
      <div class="cookieContainer" v-if="!cookieDetailsVisible">
        <div class="highlighted">  
          <h6>Cookie Preference set up</h6>
        </div> 
        
        <div class="docText">
          <p>We use cookies to ensure our website works properly. To help us improve our service, we collect data to understand how people use our site. Click on the categories below to learn more about their purposes. You may choose which types of cookies to allow and can change your preferences at any time. Please note disabling cookies may affect your experience on the website. You can learn more about how we use cookies by visiting our <router-link to="/privacy-cookie-policy">Cookie and Privacy Policy.</router-link>
          </p>
          <v-btn style="margin: 20px 0px 20px 0px; color: #fff;" color="#6158a7" @click="$emit('allowAllCookies')">Allow All Cookies</v-btn>
        </div>

  
        <div class="highlighted mb-1">
          <h6>Manage Consent Preferences</h6>
        </div>
        <div class="headings my-2 d-flex justify-content-between">
          <h6>Essential and Necessary Cookies</h6>
          <span style="color: #8a2be2; padding: 0px 50px; font-size: 13px; font-weight: 600;">Alway Active</span>
        </div>
  
        <div class="docText">
          <p>These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. These cookies do not store any personally identifiable information.
          </p>
        </div>

        <div class="docText">
            <p style="color: #1976d2; cursor: pointer;" @click="cookieDetailsVisible = true">Cookies details (5)</p>
        </div>
      </div>
      <div v-else>
        <button @click="cookieDetailsVisible=false" small style="font-weight: bold; margin-left: 4px;">&lt; Cookie List</button>
        <div class="row m-2">
            <div class="col-12 cookie-details">
                <div>
                    <div class="d-flex">
                        <div class="flex-35">Name</div>
                        <div class="flex-65">m</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Host</div>
                        <div class="flex-65">m.stripe.com</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Duration</div>
                        <div class="flex-65">2 years</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Type</div>
                        <div class="flex-65">Third Party</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Category</div>
                        <div class="flex-65">Essential</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Purpose</div>
                        <div class="flex-65">For fraud detection. Helps Stripe assess the risk associated with an
                            attempted transaction on the website.
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-12 cookie-details">
                <div>
                    <div class="d-flex">
                        <div class="flex-35">Name</div>
                        <div class="flex-65">__stripe_mid</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Host</div>
                        <div class="flex-65">.nikah.arranzed.com</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Duration</div>
                        <div class="flex-65">1 year</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Type</div>
                        <div class="flex-65">First Party</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Category</div>
                        <div class="flex-65">Essential</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Purpose</div>
                        <div class="flex-65">Used by our payment provider, Stripe, in order to process payments on
                            checkout. This is set for fraud detection purposes and it helps Stripe to assess
                            the risk associated with an attempted transaction
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-12 cookie-details">
                <div>
                    <div class="d-flex">
                        <div class="flex-35">Name</div>
                        <div class="flex-65">__stripe_sid</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Host</div>
                        <div class="flex-65">.nikah.arranzed.com</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Duration</div>
                        <div class="flex-65">30 minutes</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Type</div>
                        <div class="flex-65">First Party</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Category</div>
                        <div class="flex-65">Essential</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Purpose</div>
                        <div class="flex-65">Used by our payment provider, Stripe, in order to process payments on
                            checkout. This is set for fraud detection purposes and it helps Stripe to assess
                            the risk associated with an attempted transaction.
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 cookie-details">
                <div>
                    <div class="d-flex">
                        <div class="flex-35">Name</div>
                        <div class="flex-65">cookie-perms</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Host</div>
                        <div class="flex-65">.stripe.com</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Duration</div>
                        <div class="flex-65">6 months</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Type</div>
                        <div class="flex-65">Third Party</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Category</div>
                        <div class="flex-65">Essential</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Purpose</div>
                        <div class="flex-65">Stripe Stores a user's cookie permissions
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 cookie-details">
                <div>
                    <div class="d-flex">
                        <div class="flex-35">Name</div>
                        <div class="flex-65">_GRECAPTCHA</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Host</div>
                        <div class="flex-65">www.google.com</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Duration</div>
                        <div class="flex-65"></div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Type</div>
                        <div class="flex-65">Third Party</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Category</div>
                        <div class="flex-65">Essential</div>
                    </div>
                    <div class="d-flex">
                        <div class="flex-35">Purpose</div>
                        <div class="flex-65">Used to filter spam traffic and allow only legitimate visitors to use the
                            website.
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </body>

  </template>
  <script>
  
  export default {
    name: 'CookiesPreference',
    data() {
        return {
            cookieDetailsVisible: false,
        }
    }
  }
  </script>
  
  
  <style scoped>
  .cookieContainer {
      text-align: justify;
      color: black;
      font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
      background-image: linear-gradient(#fcf5fb, #fae3f7, #d5f3ff);
      padding-bottom: 100px;
      margin-right: 20px;
      border-radius: 20px;
  }
  
  p {
      text-align: justify;
      font-size: 13px;
      font-weight: 600;
  }
  
  .highlighted h6 {
      padding: 30px 50px 0px 50px;
      font-size: 16px;
      font-weight: bold;
      color: rgb(13, 13, 110);
  }
  
  .docText {
      padding: 0px 50px 0px 50px;
  }
  
  .headings h6 {
      padding: 0px 50px 0px 50px;
      font-size: 13px;
      font-weight: bold;
      color: rgb(18, 18, 92);
  }
  .flex-35 {
    flex: 0 0 35%
  }
  .flex-65 {
    flex: 0 0 65%
  }
  .cookie-details {
    font-size: 12px; 
    background: #f8f8f8;
    margin-bottom: 5px;
  }
</style>