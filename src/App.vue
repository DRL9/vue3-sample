<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>|
    <router-link to="/test/list">List</router-link>|
    <router-link to="/svg_text">svg_text</router-link>
  </div>
  <router-view />
</template>

<style lang="less">
@font-face {
  font-family: "font-12";
  src: url("~@/assets/fonts/12.woff2");
}
@font-face {
  font-family: "font-17";
  src: url("~@/assets/fonts/17.woff2");
}
@font-face {
  font-family: "font-18";
  src: url("~@/assets/fonts/18.woff2");
}
@font-face {
  font-family: "font-20";
  src: url("~@/assets/fonts/20.woff2");
}
@font-face {
  font-family: "font-21";
  src: url("~@/assets/fonts/21.woff2");
}
@font-face {
  font-family: "font-22";
  src: url("~@/assets/fonts/22.woff2");
}
@font-face {
  font-family: "font-23";
  src: url("~@/assets/fonts/23.woff2");
}
@font-face {
  font-family: "font-24";
  src: url("~@/assets/fonts/24.woff2");
}
@font-face {
  font-family: "font-25";
  src: url("~@/assets/fonts/25.woff2");
}
@font-face {
  font-family: "font-27";
  src: url("~@/assets/fonts/27.woff2");
}
@font-face {
  font-family: "font-28";
  src: url("~@/assets/fonts/28.woff2");
}
@font-face {
  font-family: "font-2";
  src: url("~@/assets/fonts/2.woff2");
}
@font-face {
  font-family: "font-30";
  src: url("~@/assets/fonts/30.woff2");
}
@font-face {
  font-family: "font-31";
  src: url("~@/assets/fonts/31.woff2");
}
@font-face {
  font-family: "font-32";
  src: url("~@/assets/fonts/32.woff2");
}
@font-face {
  font-family: "font-33";
  src: url("~@/assets/fonts/33.woff2");
}
@font-face {
  font-family: "font-34";
  src: url("~@/assets/fonts/34.woff2");
}
@font-face {
  font-family: "font-35";
  src: url("~@/assets/fonts/35.woff2");
}
@font-face {
  font-family: "font-37";
  src: url("~@/assets/fonts/37.woff2");
}
@font-face {
  font-family: "font-38";
  src: url("~@/assets/fonts/38.woff2");
}
@font-face {
  font-family: "font-39";
  src: url("~@/assets/fonts/39.woff2");
}
@font-face {
  font-family: "font-44";
  src: url("~@/assets/fonts/44.woff2");
}
@font-face {
  font-family: "font-48";
  src: url("~@/assets/fonts/48.woff2");
}
@font-face {
  font-family: "font-49";
  src: url("~@/assets/fonts/49.woff2");
}
@font-face {
  font-family: "font-4";
  src: url("~@/assets/fonts/4.woff2");
}
@font-face {
  font-family: "font-51";
  src: url("~@/assets/fonts/51.woff2");
}
@font-face {
  font-family: "font-5";
  src: url("~@/assets/fonts/5.woff2");
}
@font-face {
  font-family: "font-6";
  src: url("~@/assets/fonts/6.woff2");
}
@font-face {
  font-family: "font-7";
  src: url("~@/assets/fonts/7.woff2");
}
@font-face {
  font-family: "font-8";
  src: url("~@/assets/fonts/8.woff2");
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
