<template>
  <div class="parent-container">
    <div v-show="isLoading">
        Loading ....
    </div>
    <div v-show="!isLoading" class="card top-contaner round-border">
      <div>
        <h3>Shortlisted Candidate</h3>
      </div>

      <div class="container-box">
        <div style="max-width: 100px">
          <button class="nextbtn" @mousedown="startCandidatePrev" @mouseleave="stop" @mouseup="stop" @touchstart="startCandidatePrev" @touchend="stop" @touchcancel="stop"><</button>
        </div>
        <div  id="card-deck" class="d-flex flex-row flex-nowrap overflow-auto" >
          <div v-for="(item,index) in shortListedCandidates" :key="index" class="card card-block mx-2" style="min-width: 600px">      
            <CandidateCard
              :candidate_name="item.candidate.name"
              :location="item.candidate.location"
              :religion="item.candidate.religion"
              :age="item.candidate.age"
              :ethenicity="item.candidate.ethnicity"
              hobby="hard coded"
            />
          </div>
        </div>
        <div style="max-width: 100px">
          <button class="nextbtn" @mousedown="startCandidateNext" @mouseleave="stop" @mouseup="stop" @touchstart="startCandidateNext" @touchend="stop" @touchcancel="stop">></button>
        </div>
      </div>
    </div>

    <div v-show="!isLoading" class="card top-contaner round-border">
      <div>
        <h3>Teamlisted Candidate</h3>
      </div>

      <div class="container-box">
        <div style="max-width: 100px">
          <button class="nextbtn" @mousedown="startPrevTeam" @mouseleave="stop" @mouseup="stop" @touchstart="startPrevTeam" @touchend="stop" @touchcancel="stop"><</button>
        </div>
        <div
          id="card-deck-team"
          class="d-flex flex-row flex-nowrap overflow-auto"
        >
          <div v-for="(item2,index2) in teamListedCandidates" :key="index2" class="card card-block mx-2" style="min-width: 600px">
            <CandidateCard
              :candidate_name="item2.candidate.name"
              :location="item2.candidate.location"
              :religion="item2.candidate.religion"
              :age="item2.candidate.age"
              :ethenicity="item2.candidate.ethnicity"
              hobby="hardcoded"
            />
          </div>
        </div>
        <div style="max-width: 100px">
          <button class="nextbtn" @mousedown="startNextTeam" @mouseleave="stop" @mouseup="stop" @touchstart="startNextTeam" @touchend="stop" @touchcancel="stop">></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CandidateCard from "@/components/shortlist/CandidateCard.vue";
// import axios from "axios";
import ApiService from '../../services/api.service';
export default {
	name: "ShortlistCandidate",
	components: {
		CandidateCard
	},
	data() {
		return {
            interval:false,
            isLoading: false,
            shortlistLoaded: false,
            teamlistLoaded: false,
			shortListedCandidates:[],
            teamListedCandidates:[]
		};
	},
	created() {
		// console.log("shortlist created");
        this.getShortlistedCandidates();
        this.getTeamlistedCandidates();
        // console.log(payload.token);
         

	},
	methods: {
        startNextTeam(){
            if(!this.interval){
                this.interval = setInterval(() => this.scrollNextTeam(), 30)	
            }
        },
        startPrevTeam(){
            if(!this.interval){
                this.interval = setInterval(() => this.scrollPrevTeam(), 30)	
            }
        },
        startCandidateNext(){
            if(!this.interval){
                this.interval = setInterval(() => this.scrollNext(), 30)	
            }
        },
        startCandidatePrev(){
            if(!this.interval){
                this.interval = setInterval(() => this.scrollPrev(), 30)	
            }
        },
        stop(){
            clearInterval(this.interval)
            this.interval = false
        },
        scrollPrevTeam(){
            // console.log("next team clicked");
            let card_deck_team = document.getElementById('card-deck-team');
            this.sideScroll(card_deck_team,'left',25,100,10);
        },
        scrollNextTeam(){
            // console.log("next team clicked");
            let card_deck_team = document.getElementById('card-deck-team');
            this.sideScroll(card_deck_team,'right',25,100,10);
        },
        scrollPrev(){
            // console.log("next clicked");
            let card_deck = document.getElementById('card-deck');
            this.sideScroll(card_deck,'left',25,100,10);
        },
        scrollNext(){
            // console.log("next clicked");
            let card_deck = document.getElementById('card-deck');
            this.sideScroll(card_deck,'right',25,100,10);
        },
        sideScroll(element,direction,speed,distance,step){
        let scrollAmount = 0;
        var slideTimer = setInterval(function(){
            if(direction == 'left'){
                element.scrollLeft -= step;
            } else {
                element.scrollLeft += step;
            }
            scrollAmount += step;
            if(scrollAmount >= distance){
                window.clearInterval(slideTimer);
            }
            }, speed);
        },
        getShortlistedCandidates(){
            let token = this.$store.state.auth.token;
            // console.log(token);
            let self = this;
            self.isLoading = true;
            ApiService.get('v1/short-listed-candidates')
            .then(response=>{
              // resolve(data);
                console.log("res:",response.data.data);
                if(response.data.status_code == 200){
                    let data = response.data.data;
                    for(let i=0;i<data.length;i++){
                        self.shortListedCandidates.push(data[i]);
                    }
                    self.shortlistLoaded = true;
                    
                    if(self.shortlistLoaded && self.teamlistLoaded){
                        self.isLoading = false;
                    }
                    // console.log(self.shortListedCandidates);
                }
            }).catch(error=>{
              // reject(error);
              console.log(error);
            })
            
            // axios
            // .get("v1/short-listed-candidates",{
            //     headers: {
            //     Authorization: `Bearer ${token}`,
            //     },
            // })
            // .then((response) => {
            //     // console.log("API response", response.data);
            //     if(response.data.status_code == 200){
            //         let data = response.data.data;
            //         for(let i=0;i<data.length;i++){
            //             self.shortListedCandidates.push(data[i]);
            //         }
            //         self.shortlistLoaded = true;
                    
            //         if(self.shortlistLoaded && self.teamlistLoaded){
            //             self.isLoading = false;
            //         }
            //         // console.log(self.shortListedCandidates);
            //     }
            // })
            // .catch((error) => {
            //     console.log({error}) // this will log an empty object with an error property
            //     self.isLoading = false;
            // });
        },
        getTeamlistedCandidates(){
            let token = this.$store.state.auth.token;
            // console.log(token);
            let self = this;
            self.isLoading = true;

            ApiService.get('v1/team-short-listed-candidates')
            .then(response=>{
              // resolve(data);
                console.log("res:",response.data.data);
                if(response.data.status_code == 200){
                    let data = response.data.data;
                    for(let i=0;i<data.length;i++){
                        self.teamListedCandidates.push(data[i]);
                    }
                    self.teamlistLoaded = true;
                    
                    if(self.shortlistLoaded && self.teamlistLoaded){
                        self.isLoading = false;
                    }
                    // console.log(self.shortListedCandidates);
                }
            }).catch(error=>{
              // reject(error);
              console.log(error);
            })
            
            // axios
            // .get("v1/team-short-listed-candidates",{
            //     headers: {
            //     Authorization: `Bearer ${token}`,
            //     },
            // })
            // .then((response) => {
            //     // console.log("API response", response.data);
            //     if(response.data.status_code == 200){
            //         let data = response.data.data;
            //         for(let i=0;i<data.length;i++){
            //             self.teamListedCandidates.push(data[i]);
            //         }
            //         self.teamlistLoaded = true;
                    
            //         if(self.shortlistLoaded && self.teamlistLoaded){
            //             self.isLoading = false;
            //         }
            //         // console.log(self.teamListedCandidates);
            //     }
            // })
            // .catch((error) => {
            //     console.log({error}) // this will log an empty object with an error property
            //     self.isLoading = false;
            // });
        }
	},
};
</script>
<style scoped>
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css";

html {
  overflow: scroll;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  width: 0; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}

.parent-container{
    min-width: 1400px;
}

.container-box {
  display: grid;
  grid-template-columns: 1fr 20fr 1fr; /* fraction*/
}


.nextbtn {
  height: 100%;
  width: 100%;
  background-color: #b3b3b3;
  color: #ffffff;
}

.top-contaner {
  margin: 10px;
  padding: 10px;
  float: none;
  overflow: hidden;
}

.round-border {
  border-radius: 15px;
}
/* Optional: show position indicator in red
::-webkit-scrollbar-thumb {
    background: #FF0000;
} */
</style>
