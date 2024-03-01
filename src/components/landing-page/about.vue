<template>
  <div>
    <LandingPageHeader class="header" />

    <div class="main-content">
      <h3 class="text-header-black">About Us</h3>
      <p>
        MatrimonyAssist is an online platform to facilitate conversation
        between families who are seeking marriage partners for their loved ones.
        In MatrimonyAssist, both the candidate and the family jointly play a
        vital role to find prospects.
      </p>
      <p>
        MatrimonyAssist has only one goal – that is to assist as many people as
        quick possible find compatible marriage partners.
      </p>
      <p>Our approach is easy, simple, traditional and contemporary.</p>
      <p>
        MatrimonyAssist is not a dating platform. This site has been
        particularly designed for sincere candidates and their families who are
        seriously looking for companionable marriage partners. Here, we
        introduce candidate in an anonymous environment with gradual approach
        supported by our team. This allows each member to decide when and to
        whom what information to show. Here both parties get plenty of
        opportunities to decide for themselves suitable candidate based on their
        selection criteria.
      </p>
      <p>
        Starting out on a journey to find a suitable marriage companion, or for
        someone you care about (son, daughter, niece, nephew, friend, colleague,
        or anyone really) is not easy as it should be. You might be getting
        increasingly worried, frustrated, facing delays and lack of choice in
        finding someone. MatrimonyAssist has been created for all of our
        extended family members who keep asking if we know someone for an
        aspiring bride and groom.
      </p>
      <p>
        MatrimonyAssist is a family and friends matrimonial introduction
        service to help you navigate traditions, sensitivities, keeping true to
        your values, and finding someone who is trying to do the same. It is a
        convenient and smart way to go about companion hunting, while involving
        family and friends on a secure portal, without too much sweat and
        stress.
      </p>

            <h4>Why MatrimonyAssist?</h4>
            <p>MatrimonyAssist. Why did we call it this name? Well,  when it comes to matrimonial matters,   parents, relatives, friends and well wishers cannot force a decision on their loved ones. Doing so has dire and serious mental, physical, economic and social health consequences with too many unhappy and depressed lives, suffering families and bad memories all round, including for friends and  extended family members. We wan to prevent that, or at least reduce those outcomes.</p>
    <p>We can all assist our loved ones find the best matrimonial partner or companion.  Often family, friends and well-wishers (representatives - of their best interest) like to team up at the request of their bride or groom (we call them the candidate) to assist them to find a suitable matrimonial partner, so we called this effort and online application MatrimonyAssist. </p>
    <p>MatrimonyAssist is for every family in our human community, for marriage is a treasured and valued institution that people of different faith and culture hold close to their heart. It is regarded as  stabilising force for versatile and prosperous communities that can produce the next generation of caring, empathetic and community oriented individuals brought up in extended family networks, though nowadays the connections are remote through technology across towns, cities and continents.  </p>
    <p>Marriage is an age-old and more often than not, faith-based commitment, guided by sets of values to love and cherish each other and be a critical and caring companion and friend for life. Every family and friends group holds up high hopes and plays a critical, affectionate and support role before, during and after marriage. What better way to make sure the family and friends also have a role in helping their loved one find and select a suitable and loving marriage partner and companion for their loved one.   Out of this desire to facilitate every family and friends group that wish to play this role, with the consent of their loved one,  at a time when the situation might be steeped in emotion and guided more by the heart than the mind, the family and friends can play the role of a team, with the objective of showering some ration and objectivity into critical and constructive assessment through asking probing and general questions to gauge a variety of information, including family background and upbringing, faith orientation, hobbies and interests, moral or ethical underpinning as deemed appropriate, education and economic standing,   as well as personal traits and characteristics and potential for growth and compatibility,  as best as possible.  </p>
   <p>Hopefully the decision making process then becomes more objective, with input from those who really care and would like to see the best outcome for their loved one, with a balanced assessment and decision on the next moves for what is often a heavily emotionally invested life changing decision for the bride and groom to be. The family and friends can play the role of the go-between, as they often do, in arranging meetings between the couples and families according to their own tradition, hopefully leading to marriage. </p>
    <p>It is not easy and may take a longer time period than one expects, even disappointments and near misses, with several tries. What is meant to be will happen, but one must try their best.  So these thoughts have resulted in our attempt to produce a marriage partner and companion finding application online on MatrimonyAssist, to identify and spot suitable prospects, before meeting them in person or arranging video meetings, if separated by far distances.</p>
    <p>We hope MatrimonyAssist will develop over time as well, with your support and feedback,  to help you in that important companion finding endeavour, saving you time, effort and struggle, hopefully, in your search for the one who is searching for you or your loved one, the best possible match and catch for life. We sincerely hope you find love, happiness, and this is the beginning of endless happy moments and memories. </p>
    <p>Best wishes from us. </p>
    </div>
    <Footer />
  </div>
</template>


<script>
import Footer from "@/components/auth/Footer.vue";
import LandingPageHeader from "@/components/landing-page/LandingPageHeader.vue";

export default {
  name: "About",
  components: {
    LandingPageHeader,
    Footer,
  },
  data() {
    return {
      isLoading: true,
      user: {},
      is_verified: 1,
    };
  },
  methods: {},
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
</style>