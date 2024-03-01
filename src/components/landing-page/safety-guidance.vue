<template>
  <div>
    <LandingPageHeader />
    <div class="main-content">
      <h3 class="text-header-black">Safety and Guidance </h3>
      <p>
        We want users of MatrimonyAssist to be safe and protected from exploitation while using this site.  There are many tips that you are aware of to keep yourself safe online including not sharing your password with others, selecting a longer password that is made up of small and capital letters as well as numbers, for example. You might also be aware of people pretending to be in extreme hardship or financial difficulty or need a sum of money for a period of time after having formed a trusting relationship. Please be aware of these scams that will leave you both financially and emotionally drained and trouble should you have the misfortune to become a victim. 
      </p>
      <p>
        We discuss a particular type of fraud that are specific to dating or matrimonial websites, termed romance scam. 
      </p>
      <p>‘Romance fraud’ or ‘romance scam’ is not a new phenomenon. It has always existed in the society where victims are scammed by someone with whom they have formed a social, emotional or romantic relationship. However, over the years, the sophistication and frequency of scams have increased by many folds, and online dating has made it a lot easier for fraudsters. </p>
      <p>
        Feeling affection for another person arising out of kinship, or personal ties, or affection based on admiration or common interests is natural. Sometimes people also look for  a companion to fill emptiness and boredom in  their life. Unfortunately, fraudsters take advantage of this situation.
      </p>
      <p>
        Romance scam is uniquely enticing, and fraudsters gradually work their way into your confidence and trust. The fraudsters use various psychological manipulation tactic to trick their targets and eventually achieve their goals, i.e.  to steal their heart and money. 
      </p>
      <p>
        Romance scammers create fake profiles and contact their targets through popular social media sites like Instagram, Facebook, or Google Hangouts. The scammers strike up a relationship with their targets to build their trust, sometimes talking or chatting several times a day. Then, they make up a story and ask for money.
      </p>
      <h5>MatrimonyAssist is not a dating site</h5>
      <p>The first and foremost is that MatrimonyAssist is not a dating site. It is for those who are seriously seeking a life companion for marriage. It is a team-based online matrimonial platform to register and search for prospective marriage partner and life companion. </p>
    <p>Teams are here to protect, advise and assist the bride or bridegroom, the candidate. Team members other than the candidate are called representatives, because they represent the best interest of the candidate and are close to their heart in terms of relationship. The candidate and their representatives can search, find and assess suitable prospects, shortlisting ones that look promising, which can then  be discussed in the team chat by the team members for compatibility before contacting the other team with questions, queries and seeking further clarification. If a suitable candidate is found, then a connection request is sent to the other team - which if accepted, then triggers chat between two connected teams. After detailed considerations and weighing up the likely possibility of a match next steps, including face to face meeting (with chaperons present) can take in accordance with ones custom and tradition. It does not matter where in the world the family members and friends are located, they can join a team to help their loved ones to find a suitable companion for marriage.</p>
    <p>In MatrimonyAssist, a candidate must belong to a team and be represented by team member(s). A team just could be a family or consists of members of family and friends. Both the candidate and the team members jointly play a crucial  role in finding prospects.    </p>
    <p>In designing MatrimonyAssist, we have taken every possible measure to ensure that it is safe, secure and private. Nonetheless, any system can be misused by a tiny minority who are dishonest and have bad intention. Below, we have listed some suggestions as to what precautions one can take to safeguard themselves and their loved one from fraud:  </p>
    <p>
<ul style="list-style-type: disc"> 

<li>Do not share any personal, contact (phone, email, social media), and address details unless you have reasons to believe the family/person you are dealing with is genuine. It's a good idea to arrange a face-to-face meeting between representatives first in a neutral place, like a busy cafe, so you can decide what is appropriate to share.</li>

<li>Using instant messaging in MatrimonyAssist two teams can chat with  each other. If you are not absolutely sure about potential team and their candidate, then never send or accept any connection request to or from them. </li>
<li>When you receive connection request from any team, before accepting, discuss between your team members and pay attention if your friends or family say they are concerned about the connection request. </li>
<li>If you have any doubt about the other team, stop communicating with them immediately. MatrimonyAssist has a facility to block the other team. You can also report to the MatrimonyAsssit Admin Team  about any malpractice. </li>
<li>Do a reverse image search of a suspected  person’s profile picture to see if it is associated with another name or with details that does not  match up – this can be a sign of  a  scam.</li>
</ul>
    </p>
    <p>Please bear these points in mind and  you can always report or seek clarification from  the MatrimonyAssist Admin Team for guidance.</p>
    
    <h5>Why do we request ID for the candidate and at least one representative?  </h5>
    <p>We want you, your friends and family members that are assisting  in the search for a marriage partner and life companion,  to be confident that every candidate on MatrimonyAssist is a genuine person.  </p>
    <p>In addition at least one other person in their team knows them and that person is a real person, whose ID has been verified also. </p>
    <p>This will help enhance trust between teams that are connecting and chatting with each other and  reduce romance scams. We can take appropriate administrative and legal action against those who act in bad faith if they are known and their IDs have been verified. </p>
    <p>We also want to deter people from registering who are likely to cause nuisance and have no real intention of looking for a marriage partner and a life companion. </p>
    <p>We have zero tolerance for such behaviour and if this means some people may not join MatrimonyAssist as they do not wish to be verified, then it is  a decision we respect. </p>
    <p>We believe it is not acceptable to take advantage of the emotions and trust of genuine people who are on MatrimonyAssist to find a loving, caring, honest, ethical, emotionally mature  and compatible life long companion and marriage partner. </p>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/auth/Footer.vue";
import LandingPageHeader from "@/components/landing-page/LandingPageHeader.vue";
export default {
  name: "SafetyAndGuidance",
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