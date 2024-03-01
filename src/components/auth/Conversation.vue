<template>
     <div class="conversation section-padding position-relative">
      <div class="container">
         <div class="panel">
            <h2 class="text-center color-white" style="font-size: 45px"> Four steps to your first conversation</h2>
            <div class="iconLine">
               <span class="alignImageLine">
                  <img src="@/assets/Icons/form.svg" alt="Icon" id="firstStepImageLine">
                  <img src="@/assets/Icons/tick 1.svg" alt="Icon" id="firstStepImageLine" class="imageTick">
                  <img src="@/assets/Icons/search.svg" alt="Icon" id="firstStepImageLine" class="imageSearch">
                  <img src="@/assets/Icons/connected.svg" alt="Icon"  id="firstStepImageLine" class="imageConn">
               </span>
            </div>
               
            <div class="row">
               <div class="col-12 col-sm-6 col-xl-3 mb-3">
                  <div class="item">
                     <img class="static-img" src="@/assets/Icons/form.svg" alt="Icon">
                     <span>Complete profile, create team & submit for approval</span>
                  </div>
               </div>
               <div class="col-12 col-sm-6 col-xl-3 mb-3">
                  <div class="item">
                     <img class="static-img" src="@/assets/Icons/tick 1.svg" alt="Icon" >
                     <span>ID is checked and select subscription package  </span>
                  </div>
               </div>
               <div class="col-12 col-sm-6 col-xl-3 mb-3">
                  <div class="item">
                     <img class="static-img" src="@/assets/Icons/search.svg" alt="Icon">
                     <span>Find suitable matches and request to connect with teams</span>
                  </div>
               </div>
               <div class="col-12 col-sm-6 col-xl-3 mb-3">
                  <div class="item last">
                     <img class="static-img" src="@/assets/Icons/connected.svg" alt="Icon">
                     <span>Once connected, communicate & find out more</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

       <img src="@/assets/icon/bg_layer_1.svg" alt="bg" class="position-absolute bg-layer-1 layer-1" />
       <img src="@/assets/icon/bg_layer_1_1.svg" alt="bg" class="position-absolute bg-layer-1-1" />
   </div>
</template>

<style scoped lang="scss">
@import '@/styles/base/_variables.scss';

.static-img {
   width: 30px;
   margin-bottom: 10px;

   @media (min-width: 1199px) {
      display: none;
        
   }
}

.conversation{
    .panel{
       h2{
          margin-bottom:40px;
       }
       padding: 50px;
        .step-line{
            width: 80%;
            margin: 20px auto;
            display: block;
            @media(max-width: 991px){
               display: none;
            }
        }
        .item{
            position: relative;
            color: $color-white;
            text-align: center;
            padding: 20px;
            height: calc(100% - 15px);
            @media(max-width: 991px){
                   border: 1px solid $border-white;
                   margin-bottom: 15px;
            }
            span {
               display: inline-block;
               margin-top: 15px;
            }
            &::after{
                position: absolute;
                content: "";
                height: 80px;
                width: 1px;
                background: $bg-white;
                right: -13px;
                @media(max-width: 991px){
                   display: none;
                }
            }
            &.last::after{
                display: none;
            }
        }
    }
}

#firstStepImageLine
{
     height: 45px;
     
}
.panel {
   background-color: #7e80c2;
}
.alignImageLine
{
  position: absolute;
  margin-top: -22px;
  margin-left: -2px;
  margin-right: -10px;
  box-sizing: border-box;

   @media (max-width: 1199px) {
      display: none;
        
   } 
  
  
}

.iconLine {
  position: relative;
  height: 1px;
  background-color: #ddd;
  border: 1px solid #ddd;
  margin: 0 110px 0 100px;
  box-sizing: border-box;

   @media (max-width: 1199px) {
      display: none;
        
   } 
  
  
}

.imageTick {
   padding-right: 220px;
   padding-left: 200px;
   z-index: 1;
}

.imageSearch {
   z-index: 1;
   padding-right: 215px;

}

.imageConn {
   z-index: 1;
   margin-right: -10px;
   padding-right: -10px;
   box-sizing: border-box;
}
.bg-layer-1 {
  bottom: 30px;
  right: 30px;
  width: 7%;
}
.bg-layer-1-1 {
  bottom: 28px;
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
  0%   {right: 30px; bottom: 30px;}
  25%  {right: 50px; bottom: 10px;}
  50%  {right: 50px; bottom: 40px;}
  75%  {right: 40px; bottom: 60px;}
  100% {right: 30px; bottom: 30px;}
}
</style>