<template>
  <div class="col-md-12">
    <div class="card card-container">
      <!-- <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      /> -->
      <h2 class="text-center">Tambah Siswa</h2>
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="user.username"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="username"
            />
            <div
              v-if="submitted && errors.has('username')"
              class="alert-danger"
            >{{errors.first('username')}}</div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="user.email"
              v-validate="'required|email|max:50'"
              type="email"
              class="form-control"
              name="email"
            />
            <div
              v-if="submitted && errors.has('email')"
              class="alert-danger"
            >{{errors.first('email')}}</div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="user.password"
              v-validate="'required|min:6|max:40'"
              type="password"
              class="form-control"
              name="password"
            />
            <div
              v-if="submitted && errors.has('password')"
              class="alert-danger"
            >{{errors.first('password')}}</div>
          </div>

          <div class="form-group">
            <label for="nisn">Nisn</label>
            <input
              v-model="user.nisn"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="nisn"
            />
            <div
              v-if="submitted && errors.has('nisn')"
              class="alert-danger"
            >{{errors.first('nisn')}}</div>
          </div>

          <div class="form-group">
            <label for="nama">Nama</label>
            <input
              v-model="user.nama"
              v-validate="'required'"
              type="text"
              class="form-control"
              name="nama"
            />
            <div
              v-if="submitted && errors.has('nama')"
              class="alert-danger"
            >{{errors.first('nama')}}</div>
          </div>

          <div class="form-group">
            <label for="kelas">Kelas</label>
            <input
              v-model="user.kelas"
              v-validate="'required'"
              type="text"
              class="form-control"
              name="kelas"
            />
            <div
              v-if="submitted && errors.has('kelas')"
              class="alert-danger"
            >{{errors.first('kelas')}}</div>
          </div>

          <div class="form-group">
            <label for="alamat">Alamat</label>
            <input
              v-model="user.alamat"
              v-validate="'required'"
              type="text"
              class="form-control"
              name="alamat"
            />
            <div
              v-if="submitted && errors.has('alamat')"
              class="alert-danger"
            >{{errors.first('alamat')}}</div>
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block">Add</button>
                <button class="glow-on-hover btn-danger btn-block btn" >
                    <router-link to="/datasiswa" class="nav-link text-white btn"><b>Back</b></router-link>
                </button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}
          <button class="glow-on-hover btn-danger btn-block" >
        <router-link to="/datasiswa" class="nav-link text-white btn">Back</router-link>
    </button>
      </div>
    </div>
  </div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', '','','',''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/register');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>