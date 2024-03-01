<template>
  <div class="row header-text">
    <div class="col-md-12 text-center">
      <router-link to="/"
        ><img style="margin-top: 12px" class="logoimage" src="@/assets/Icons/Logo/1x/White logo.png" alt=""
      /></router-link>
    </div>
  </div>
</template>

<style scoped>
.header-text {
  min-height: 100px;
  background-color: #3a3091;
  color: #fff;
}
.logoimage {
  max-height: 80px;
}
.carousel-item {
  height: 65vh;
  min-height: 350px;
  background: no-repeat center center scroll;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>