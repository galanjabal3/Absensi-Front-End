<template>
  <div class="jumbotron">
    <div v-if="!submitted">
      <div style="max-width: 100%; margin: 0 auto; height: 100%; display: flex; align-items: center; justify-content: space-between" >
        <input
          type="text"
          class="form-control"
          id="input"
          required
          v-model="this.currentUser.username"
          name="username" disabled
        />
        <input
          type="text"
          class="form-control"
          id="input"
          required
          v-model="this.coordinates.lat"
          name="lat" disabled
        />
        <input
          type="text"
          class="form-control"
          id="input"
          required
          v-model="this.coordinates.lng"
          name="lng" disabled
        />

      </div> <br>
      <button @click="saveAbsen" class="btn btn-primary btn-block">Click to Absens</button>
    </div>

    <div v-else>
      <button class="btn btn-danger btn-block" href @click.prevent="logOut"  >
        <h3 class="text-center">Selamat Anda telah Berhasil Absen...!</h3>
        <font color="black">          
          <font-awesome-icon icon="sign-out-alt" /> Keluar
        </font>
      </button><br/>
    </div><br/>
  </div>
</template>

<script>
import AbsenDataService from "../services/AbsenDataService";

export default {
  name: "absen",
  data() {
    return {
      coordinates: {
        lat: 0,
        lng: 0
      },
        absen: {
          id: null,
          username: "",
          lat: "",
          lng: ""
        },
      submitted: false
    };
  },
  created() {
      // get user's coordinates from browser request
      this.$getLocation({})
      .then(coordinates => {
        this.coordinates = coordinates;
      })
      .catch(error => alert(error));
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  methods: {
    saveAbsen() {
      var data = {
        username: this.currentUser.username,
        lat: this.coordinates.lat,
        lng: this.coordinates.lng

      };

      AbsenDataService.create(data)
        .then(response => {
          this.absen.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    // greet: function (event) {
    //   // this di dalam metode merujuk ke Vue instance
    //   alert('kamu telah berhasil absen ' + this.currentUser.username + ' !')
    // // event adalah bawaan DOM event
    //   if (event) {
    //     alert('Smk Bina Nusantara Semarang')
    //   }
    // },
    newAbsen() {
      this.submitted = false;
      this.absen = {};
    },
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>