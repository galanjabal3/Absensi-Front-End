<template>
<div class="jumbotron">
  <div v-if="currentUser" class="edit-form py-3">
    <h2 class="headline text-center">Edit Pengguna</h2>
    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentUser.username"
        :rules="[(v) => !!v || 'Username is required']"
        label="Username"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentUser.email"
        :rules="[(v) => !!v || 'Email is required']"
        label="Email"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentUser.password"
        :rules="[(v) => !!v || 'Password is required']"
        label="Password"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentUser.nama"
        :rules="[(v) => !!v || 'Nama is required']"
        label="Nama"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentUser.nisn"
        :rules="[(v) => !!v || 'Nisn is required']"
        label="Nisn"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentUser.kelas"
        :rules="[(v) => !!v || 'Kelas is required']"
        label="Kelas"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentUser.alamat"
        :rules="[(v) => !!v || 'Alamat is required']"
        label="Alamat"
        required
      ></v-text-field>
      <!-- <v-divider class="my-5"></v-divider> -->

     <v-btn class="btn-primary mr-2 btn-lg btn" @click="deleteUser">
        Delete
      </v-btn>

      <v-btn class="btn-danger btn-lg btn" @click="updateUser">
        Update
      </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
    <button class="glow-on-hover btn-danger btn-block btn" >
        <router-link to="/datasiswa" class="nav-link text-white btn"><b>Back</b></router-link>
    </button>
  </div>

  <div v-else>
    <p>Please click on a User...</p>
  </div>
</div>
</template>

<script>
import SiswaDataService from "../services/SiswaDataService";

export default {
  name: "edit",
  data() {
    return {
      currentUser: null,
      message: "",
    };
  },
  methods: {
    getUser(id) {
      SiswaDataService.get(id)
        .then((response) => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentUser.id,
        username: this.currentUser.username,
        email: this.currentUser.email,
        password: this.currentUser.password,
        nama: this.currentUser.nama,
        nisn: this.currentUser.nisn,
        kelas: this.currentUser.kelas,
        alamat: this.currentUser.alamat
      };

      SiswaDataService.update(this.currentUser.id, data)
        .then((response) => {
          this.currentUser.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateUser() {
      SiswaDataService.update(this.currentUser.id, this.currentUser)
        .then((response) => {
          console.log(response.data);
          this.message = "The user was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteUser() {
      SiswaDataService.delete(this.currentUser.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "admin" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getUser(this.$route.params.id);
  },
};
</script>