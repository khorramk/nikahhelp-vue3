<template>
  <div class="find-partner section-padding position-relative">
      <div class="container">
         <h2 class="color-primary text-center mb-4">Find the right marrige partner with</h2>
         <div class="panel brb-0">
            <h2 class="text-center color-white mb-0">MatrimonyAssist</h2>
         </div>

         <div class="card-facility-wrapper">
            <div class="wrapper-border">
               <div class="card-facility-border"></div>
               <div class="card-facility rounded">
                  <ul class="facility-list">
                     <li class="item"><img src="@/assets/icon/tick_2.svg" alt="icon" id = "checkIcon"> <span>Avoid romance scams</span></li>
                     <li class="item"><img src="@/assets/icon/tick_2.svg" alt="icon" id = "checkIcon"><span>Verified Candidate IDs to ensure all profiles are genuine</span></li>
                     <li class="item"><img src= "@/assets/icon/tick_2.svg" alt="icon" id = "checkIcon"><span>Facility to involve family and friends</span></li>
                     <li class="item"><img src="@/assets/icon/tick_2.svg" alt="icon" id = "checkIcon"><span>Benefit from their collective wisdom & experience</span></li>
                     <li class="item"><img src="@/assets/icon/tick_2.svg" alt="icon" id = "checkIcon"><span>Shortlist candidates using over 100 information points</span></li>
                     <li class="item"><img src="@/assets/icon/tick_2.svg" alt="icon" id = "checkIcon"><span>Get to know prospects & their family well before any face to face meeting</span></li>
                     <li class="item"><img src="@/assets/icon/tick_2.svg" alt="icon" id = "checkIcon"><span>If you are looking for someone to date, not here I am afraid</span></li>
                     <li class="item"><img src="@/assets/icon/tick_2.svg" alt="icon" id = "checkIcon"><span>By registering let them know the conversation can begin</span></li>
                  </ul>
               </div>
            </div>
         </div>
         <div class="panel brt-0 d-flex flex-column justify-content-between flex-md-row align-items-center">
            <!-- <h3 class="text-center color-white mb-md-1" id="search-begin" >Let your companion search begin</h3> -->
            <h3 class="text-center color-white mb-md-1" id="search-begin" >Someone must be searching for you</h3>
            <button class="btn btn-round btn-parter-search" id="startBtn" @click="goToSignUpPage"><span>Start here</span></button>
         </div>
      </div>

    <img src="@/assets/icon/bg_layer_1.svg" alt="bg" class="position-absolute bg-layer-1 layer-1" />
    <img src="@/assets/icon/bg_layer_1_1.svg" alt="bg" class="position-absolute bg-layer-1-1" />
    <img src="@/assets/icon/bg_layer_2.svg" alt="bg" class="position-absolute bg-layer-2" />
    <img src="@/assets/icon/bg_layer_2_1.svg" alt="bg" class="position-absolute bg-layer-2-1 layer-2" />
   </div>
</template>

<script>
   export default {
   name: "FindPartner",
   methods: {
      goToSignUpPage() {
         this.$router.push('/signup');
      }
   },
   };
</script>

<style scoped lang="scss">
@import '@/styles/base/_variables.scss';
.find-partner{
    .card-facility-wrapper{
       position: relative;
        padding: 100px 0;
        @media(max-width: 991px){
            padding: 40px 0;
       }
        
        background: url('~@/assets/Bottom image.jpg') no-repeat center center;
        .wrapper-border {
           position: relative;
           max-width: 400px;
           margin: 0 auto;
            .card-facility-border{
               position: absolute;
               content: "";
               background: transparent;
               left: 15px;
               top: -22px;
               bottom: -25px;
               right: -20px;
               border: 3px solid $border-primary;
               border-radius: 10px;
               transform: rotate(5deg);
               @media(max-width: 991px){
                  display: none;
               }
            }

            .card-facility{
               background: #ffffffd9;
               box-shadow: 0 0 5px #ddd;
               padding: 35px;
               position: relative;
               z-index: 1;
               .item{
                  display: flex;
                  align-items: center;
                  margin-bottom: 15px;
                  img{
                     margin-right: 8px;
                  }
                 span {
                   opacity: 0.7;
                 }
               }
            }
         }
      }
   }

   .panel {
      background-color: #7e80c2;
   }

   #search-begin {
      font-family: "Rochester", cursive;
      font-weight: normal;
      font-size: 35px;
      box-sizing: border-box;
      letter-spacing: 2px;
      
      
   }

   #startBtn {
      font-family: "Rochester", cursive;
      font-size: 25px ;
      padding: 0px 30px 0px 30px;
      text-align: center;
      font-weight: bold;
      box-sizing: border-box;
      letter-spacing: 2px;
      border-color:  #7e80c2;
      color:  #7e80c2;
   }

   #checkIcon {
      height: 25px;
   }
.bg-layer-1 {
  bottom: 400px;
  right: 30px;
  width: 7%;
}
.bg-layer-1-1 {
  bottom: 400px;
  right: 32px;
  width: 7%;
}
.bg-layer-2 {
  top: 80px;
  left: 70px;
  width: 7%;
}
.bg-layer-2-1 {
  top: 80px;
  left: 70px;
  width: 7%;
}
.layer-1 {
  animation-name: layer-1;
  animation-duration: 4s;
  animation-iteration-count: infinite;
}
@keyframes layer-1 {
  0%   {right: 30px; bottom: 400px;}
  25%  {right: 50px; bottom: 380px;}
  50%  {right: 20px; bottom: 360px;}
  75%  {right: 0; bottom: 380px;}
  100% {right: 30px; bottom: 400px;}
}
.layer-2 {
  animation-name: layer-2;
  animation-duration: 4s;
  animation-iteration-count: infinite;
}
@keyframes layer-2 {
  0%   {left: 70px; top: 80px;}
  25%  {left: 40px; top: 60px;}
  50%  {left: 30px; top: 100px;}
  75%  {left: 70px; top: 60px;}
  100% {left: 70px; top: 80px;}
}
.btn-parter-search {
  border: none;
  text-align: center;
  transition: all 0.5s;
  cursor: pointer;
}

.btn-parter-search span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.btn-parter-search span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}
.btn-parter-search:hover {
  border-radius: 40px;
}
.btn-parter-search:hover span {
  padding-right: 20px;
}

.btn-parter-search:hover span:after {
  opacity: 1;
  right: 0;
}
</style>