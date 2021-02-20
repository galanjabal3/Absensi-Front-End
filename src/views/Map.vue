<template>
  <div v-if="currentAbsen" class="edit-form py-3 container"><br><br>
    <div id="uji">
        <div >
            <div class="row">
              <div class="col-md-12 col-md-offset-1">
                <div class="lead-form">
                  <div class="row">
                  <div class="col-sm-6">
                  <h2>Lokasi {{ currentAbsen.username }} </h2>
                  </div>
                  <div class="col-sm-6">
                    <button class="glow-on-hover btn-primary btn" >
                      <router-link to="/absensi" class="nav-link text-white btn">Kembali</router-link>
                    </button>
                  </div>
                  </div><br>
                  <div class="row">
                    <div class="col-md-12">
                    <input type="text" class="form-control input-lg" placeholder="Enter Place Name" v-model="latlng" disabled>
                    </div><br><br><br>
                    <div class="col-md-6"><h5> Latitude : {{ currentAbsen.lat }}</h5></div>
                    <div class="col-md-6"><h5> Longitude : {{ currentAbsen.lng }}</h5></div><br><br>
                    <div class="col-md-12"  v-bind:class="{ 'not-visible' : active }" >
                    <iframe frameborder="0" style="width: 100%; height: 350px; border:0" v-bind:src="'https://www.google.com/maps/embed/v1/place?key=AIzaSyDwgeYC36l4W8BZlV2kOqGl671dYXGRK_Q&q='+ latlng" allowfullscreen></iframe>
                    </div>
                  </div>
                </div><!-- end of .lead-form -->
              </div> <!-- end of .col-md-6.col-md-offset-3 -->
            </div> <!-- end of .row -->
          </div> <!-- end of .container -->
        <p class="mt-3">{{ message }}</p>
      </div>
    </div>
  <div v-else class="container"><br><br>
    <h3 >Terjadi kesalahan Memuat Data. Coba lagi ...</h3><br><br>
      <button class="glow-on-hover " >
        <router-link to="/absensi" class="nav-link text-white btn">Kembali</router-link>
    </button><br><br>
  </div>
</template>

<script>
import AbsenDataService from "../services/AbsenDataService";

export default {
  name: "map",
  data() {
    return {
      currentAbsen: null,
      message: "",
      lat: "",
      lng: "",
      active : true
    };
  },
  watch: {
    lat: function() {
      this.latitude = this.currentAbsen.lat;
      this.active = true;
      if (this.lat.length >= 3) {
        this.active = false;
        this.lookupCoordinates();
      }
    },
    lng: function() {
      this.longitude = this.currentAbsen.lng;
      this.active = true;
      if (this.lng.length >= 3) {
        this.active = false;
        this.lookupCoordinates();
      }
    }
  },
  methods: {
    getAbsen(id) {
      AbsenDataService.get(id)
        .then((response) => {
          this.currentAbsen = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = "";
    this.getAbsen(this.$route.params.id);
  },
  computed: {
    latlng: {
      get() {
        return `${this.currentAbsen.lat} ${this.currentAbsen.lng}`;
      },
      set(newValue) {
        const m = newValue.match(/(\S*)\s+(.*)/);

        this.currentAbsen.lat = m[1];
        this.currentAbsen.lng = m[2];
      }
    }
  }
};
</script>

<style scoped>
.glow-on-hover {
    width: 100%;
    height: 50px;
    border: none;
    outline: none;
    color: #fff;
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
}

.glow-on-hover:before {
    content: '';
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left:-2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    border-radius: 10px;
}

.glow-on-hover:active {
    color: rgb(3, 7
, 2)
}

.glow-on-hover:active:after {
    background: transparent;
}

.glow-on-hover:hover:before {
    opacity: 1;
}

.glow-on-hover:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(22, 134, 219);
    left: 0;
    top: 0;
    border-radius: 10px;
}

@keyframes glowing {
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
}
</style>