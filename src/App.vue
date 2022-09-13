<template>
  <div id="nav">
    <router-link v-for="route in routes" :key="route.path" :to="route.path">
      {{ route.name }} |
    </router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      routes: this.$router.getRoutes(),
    };
  },
};
</script>

<style lang="less">
@font-face {
  font-family: "font-28";
  src: url("~@/assets/fonts/28.woff2");
}
@font-face {
  font-family: "font-30";
  src: url("~@/assets/fonts/30.woff2");
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
