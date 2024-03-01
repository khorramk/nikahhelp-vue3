<template>
  <footer>
    <div class="container py-3">
      <div class="text-center">
        <router-link to="/">
          <img
            src="@/assets/Icons/Logo/1x/black-logo.png"
            height="50"
            alt="logo"
          />
        </router-link>
      </div>
      <ul class="footer-menu mt-3">
        <li>
          <a href=""
            ><router-link to="/about" class="color-primary">
              About
            </router-link></a
          >
        </li>
        <li>
          <a href="">
            <router-link to="/privacy-cookie-policy" class="color-primary">
              Privacy & Cookie Policy
            </router-link></a
          >
        </li>
        <li>
          <a href=""
            ><router-link to="/terms_condition" class="color-primary">
              Terms & Conditions
            </router-link></a
          >
        </li>
        <li>
          <a href=""
            ><router-link to="/safety_guidance" class="color-primary">
              Safety & Guidance
            </router-link></a
          >
        </li>
        <li>
          <a href=""
            ><router-link to="/user-agreement" class="color-primary">
              User Agreement
            </router-link></a
          >
        </li>
        <li>
          <a href=""
            ><router-link to="/help" class="color-primary">
              Help & Support
            </router-link></a
          >
        </li>
       </ul>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
footer {
  border-top: 1px solid $border-default;

  .footer-menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    li {
      padding: 5px 10px;
    }
  }
}
.color-primary:hover {
  text-decoration: underline;
}
</style>