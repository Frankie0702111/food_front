<template>
  <div class="container">
      <div class="content">
          <div class="title"><h2>Error 404</h2></div>
          <div>
              <h2>{{ message }}</h2>
              <!-- <router-link to="/">
                <h4>回首頁</h4>
              </router-link> -->
          </div>
      </div>
  </div>
</template>

<script>
import constantRoutes from "@/router/admin";
export default {
  name: 'Page404',
  methods: {
    check_path() {
      constantRoutes.map(e=>{
        let path = (e.path+='/login');
        if(path){
          this.$router.push('/');
        }
      });
    }
  },

  computed: {
    message() {
      return this.$route.path+'找不到頁面 !';
    },
  },

  mounted: function () {
    console.log("404 test : ",constantRoutes);
    this.check_path();
  }
};
</script>

<style scoped>
  .container {
    color: #B0BEC5;
    width: 100Vw;
    height: 100Vh;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .content {
      text-align: center;
      display: inline-block;
  }

  .title {
      font-size: 72px;
      margin-bottom: 40px;
  }
  .title h2{
    font-size: 1.5em;
  }
</style>

