<template>
  <div>
    <LandingPageHeader />
    <div class="main-content">
      <h3 class="text-header-black">User Agreement </h3>
      <p>Last updated: 05/01/2022</p>
      <p>
        In reference to MatrimonyAssist.com (the Service) this User Agreement is about candidate and/or their representative registration or making enquiry about a candidate. Here a user refers to both the person submitting candidate profile for publication or the person making profile searches and enquires. 
      </p>
      <p>
       1. This User Agreement is effective upon acceptance for those users who accept it through registration of a candidate profile and/or submit searches or enquiries about a profile. This is valid from 05 January 2022 for all existing and new users. 
      </p>
      <p>2. Please read this Agreement carefully and make sure you understand it. If you do not understand the Agreement, or do not accept any part of it, then you may not use the Service.</p>
      <p>
        3. This User Agreement (Agreement), the Terms and Conditions and Privacy and Cookie Policy of matrimonyassist.com, the Mobile Device Terms and all other policies posted on our sites set out the terms on which Matrimonyassist.com offers you access to and use of our sites, services, applications, and tools (collectively 'Services'). You agree to comply with all of the above when accessing or using our Services. For information regarding the processing of personal data, please refer our Privacy and Cookie Policy.
      </p>
      <p>
        4. By registering a candidate onto the matrimonyassist.com and making enquiry about candidate(s), the user (the person submitting candidate’s details for publishing on matrimonyassist.com) and the enquirer (the person making enquiry about a candidate) accepts and agrees to be bound by these User Agreement terms and conditions in full.
      </p>
      <p>
      5. Upon receiving a user profile for publication or an enquiry about a profile, matrimonyassist.com team will take steps to verify your details.  
      </p>
      <p>6. Matrimonyassist.com may, without any responsibility to the user/enquirer, reject, cancel or require any publication of profile to be amended that it considers unsuitable or contrary to these Terms and remove, suspend or change the position of any such publication. </p>
    <p>7. The User/Enquirer guarantees to matrimonyassist.com that:</p>
    <p>(i) any information supplied in connection with the profile publication/enquiry is up-to-date, accurate, complete, true and not misleading;
(ii) it has obtained the consent from the candidate if the person is acting on behalf of such a candidate;
(iii) registration of profiles are legal, decent, honest and truthful; 
(iv) registration of profiles will not be prejudicial to the image or reputation of matrimonyassist.com or the website or the newsletter;
(v) registration of profiles submitted for publication online will be free from any viruses and any content submitted will cause no adverse effect on the operation of the website.
</p>
<p>8. Any person submitting candidate profile for publication on matrimonyassist.com and making enquiry about a candidate published on matrimonyassist.com guarantees that he or she has consent from the candidate to act on behalf of the said candidate to publish or make enquiry with matrimonyassist.com and the person will compensate matrimonyassist.com for any claim made by the said candidate against matrimonyassist.com.</p>
    <p>9. The use of matrimonyassist.com site is completely free to candidate or someone acting on behalf of candidate or someone making enquiry about a profile but not free to any agency wishes to place any advertisement on the site.</p>
    <p>10. To user, we do not ask for any payment. So, please do not share you bank or card details to anyone pretending to be from the Matrimonyassist.com.     </p>
    <p>11. Matrimonyassist.com accepts no responsibility for any interruption or delays users may experience in sending any profile for publishing on matrimonyassist.com site or any loss or damage to any published profile or any other materials. The user/enquirer guarantees that it has retained sufficient quality and quantity of all materials supplied to matrimonyassist.com.</p>
   <p>12. Matrimonyassist.com shall use its reasonable endeavours to publish profile as provided by the user but cannot guarantee that the published prolife will be of the same quality. </p>
    <p>13. Matrimonyassist.com cannot guarantee the time, dates and/or position of publication and all such decisions will be at the sole discretion of matrimonyassist.com. However, matrimonyassist.com will use reasonable efforts to comply with the wishes of user.</p>
    <p>14. In respect of publication of candidate profile on the matrimonyassist.com website, matrimonyassist.com does not guarantee continuous, uninterrupted access by users of the Website but will use reasonable efforts to provide this. </p>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/auth/Footer.vue";
import LandingPageHeader from "@/components/landing-page/LandingPageHeader.vue";
export default {
  name: "UserAgreement",
  components: {
    LandingPageHeader,
    Footer,
  },
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
  margin:10px auto;
  padding: 0 10px;
  @media (min-width: 320px) and (max-width: 480px) {
    padding: 0 20px;
  }
}
</style>