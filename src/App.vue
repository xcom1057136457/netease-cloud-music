<template>
  <router-view />
</template>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  background-color: #f9f9f9;
  font-family: "appleFont" !important;
}

@font-face {
  font-family: "appleFont";
  src: url("./assets/font/PingFang.ttf");
  font-weight: normal;
  font-style: normal;
}

audio:focus {
  outline: none;
}
</style>
