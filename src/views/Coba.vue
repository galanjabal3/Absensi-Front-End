<template>
  <div class="container"><br><br>
  <v-card class="table-bordered">
    <!-- <v-select
      v-model="enabled"
      :items="slots"
      label="Slot"
      clearable
    ></v-select> -->
    <!-- <v-text-field
      v-model="enabled"      
      disabled
    ></v-text-field> -->

    <v-card-title>
      DATA SISWA
      <v-spacer></v-spacer>
      <v-text-field
        v-model="username"
        append-icon="mdi-magnify"
        label="Search Username"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

     <v-card-actions class="glow-on-hover ">
            <router-link to="register" class="btn btn-lg  nav-link btn-block text-white">Tambah siswa</router-link>
     </v-card-actions>

    <v-data-table
      :headers="headers"
      :items="user"
      :search="username"
      :hide-default-header="hideHeaders"
      :show-select="showSelect"
      :loading="isLoading"
      item-key="name"
      class="elevation-1 table-bordered"
    >
      <template
        v-if="isEnabled('body')"
        v-slot:body="{ items }"
      >
        <thead>
          <tr class="text-center">
            <th>Username</th>
            <th>Email</th>
            <th>Password / Token</th>
            <th>Nama</th>
            <th>Nisn</th>
            <th>Kelas</th>
            <th>Alamat</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item.name"
          >
            <td>{{ item.username }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.password }}</td>
            <td>{{ item.nama }}</td>
            <td>{{ item.nisn }}</td>
            <td>{{ item.kelas }}</td>
            <td>{{ item.alamat }}</td>
            <td>
            <v-icon small class="mr-2" @click="editUser(item.id)">mdi-pencil</v-icon>         
            <v-icon small class="mr-2" @click="deleteUser(item.id), snackbar = true">mdi-delete</v-icon>
            </td>
          </tr>
        </tbody>
        <div class="text-center">
        <v-snackbar
            v-model="snackbar"
            :multi-line="multiLine"
          >
            {{ text }}

            <template v-slot:action="{ attrs }">
              <v-btn
                color="red"
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar> 
      </div><br/>
      </template>
    </v-data-table>
    </v-card>
  </div>
</template>

<script>
import SiswaDataService from "../services/SiswaDataService";

  export default {
    data () {
      return {
        user: [],
        currentUser: null,
        currentIndex: -1,
        username: "",
        enabled: 'body',
        search: null,
        slots: [
          'body'
        ],
        multiLine: true,
        snackbar: false,
        text: `Data Berhasil di Hapus`,
        headers: [
        { text: "Username", align: "username", sortable: false, value: "username" },
        { text: "Email", value: "email", sortable: false },
        { text: "Password / Token", value: "password", sortable: false },
        // { text: "Created At", value: "createdAt", sortable: false },
        { text: "Nama", value: "nama", sortable: false },
        { text: "NISN", value: "nisn", sortable: false },
        { text: "Kelas", value: "kelas", sortable: false },
        { text: "Alamat", value: "alamat", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
        ],
      }
    },
    methods: {
    // getColor (createdAt) {
    //     if (createdAt < 12) return 'red'
    //     else if (createdAt > 8) return 'orange'
    //     else return 'green'
    //   },
   retrieveUser() {
      SiswaDataService.getAll()
        .then(response => {
          this.user = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveUser();
      this.currentUser = null;
      this.currentIndex = -1;
    },

    editUser(id) {
      this.$router.push({ name: "map", params: { id: id } });
    },

    // setActiveAbsen(absen, index) {
    //   this.currentAbsen = absen;
    //   this.currentIndex = index;
    // },

    // removeAllAbsen() {
    //   SiswaDataService.deleteAll()
    //     .then(response => {
    //       console.log(response.data);
    //       this.refreshList();
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // },
    
    searchUsername() {
      SiswaDataService.findByUsername(this.username)
        .then(response => {
          this.user = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteUser(id) {
      SiswaDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    isEnabled (slot) {
        return this.enabled === slot
      }
  },
    computed: {
      showSelect () {
        return this.isEnabled('header.data-table-select') || this.isEnabled('item.data-table-select')
      },
      hideHeaders () {
        return !this.showSelect
      },
      isLoading () {
        return this.isEnabled('progress')
      }
    },

    watch: {
      enabled (slot) {
        if (slot === 'no-data') {
          this.items = []
        } else if (slot === 'no-results') {
          this.search = '...'
        } else {
          this.search = null
          this.items = []
        }
      }
    },
    mounted() {
    this.retrieveUser();
    }
  }
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