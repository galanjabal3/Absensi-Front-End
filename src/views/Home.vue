<template>
  <div><br><br>
    <Header/>
    <div class="jumbotron">
      <div class="container">
      <div class="card ">  
        <img src="../assets/anonymous.png" height="400px" class="card-img-top" alt="...">

    <div class="card-body"  id="Home"><br>
      <ul>
          <li><b>Leader :</b> Rizal muhaimin (front-end / back-end) &nbsp; <button @click="rizal" class="btn btn-success" style="height: 35px;">Profile</button> </li><br>
          <ul><b>Moderator :</b> Galan jabal nur Al Markum (front-end / back-end) &nbsp;<button @click="uji" class="btn btn-success" style="height: 35px;">Profile</button></ul><br>
          <ul><b>Member :</b> Azizi (front-end)</ul><br><hr>
          <ul><b>Sekolah:</b> Smk Bina Nusantara Mranggen</ul>
          <ul><b>Waktu Pembuatan:</b> 15-12-2020 s.d 18-01-2021</ul>
          <ul><b>Deskripsi:</b> Untuk mempermudah absen harian tanpa harus tatap muka</ul>
        </ul>
      </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "home",
  components: {
    Header
  },
  methods: {
    uji() {
      this.$router.push('/jabal');
    },
    rizal() {
      this.$router.push('/rizal');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>