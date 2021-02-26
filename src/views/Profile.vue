<template>
  <div>
    <div class="h-100 bg-main">
      <headers />
      <div class="container py-4">
        <div class="row">
          <div class="col-md-3">
            <!-- INi adalah Sidebar -->
            <Sidebar />
          </div>
          <div
            class="col-md-9"
            style="
              background: #ffffff;
              box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
              border-radius: 25px;
              padding-top: 5%;
            "
          >
            <div class="text-center">
              <img
                :src="`${webURL}/images/${detUser.image}`"
                class="rounded mx-auto d-block"
                width="100px"
                alt="profile"
              />
              <b-dropdown
                id="dropdown-1"
                text="Edit"
                variant="primary"
                class="m-md-2 btnMain rounded"
              >
                <b-dropdown-item>Update</b-dropdown-item>
                <b-dropdown-item>Delete</b-dropdown-item>
              </b-dropdown>
              <!-- <div class="dropdown">
                <button
                  class="btn mb-3 dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style="color: #7a7886"
                >
                  <i class="fa fa-pencil"></i>
                  Edit
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <button class="dropdown-item" href="#">Update</button>
                  <button class="dropdown-item" href="#">Delete</button>
                </div>
              </div> -->
              <h4 class="font-weight-bold mb-3" style="color: #4d4b57">
                {{ detUser.first_name }} {{ detUser.last_name }}
              </h4>
              <p style="color: #7a7886">{{ detUser.handphone }}</p>
            </div>
            <div
              class="card w-50 mb-3"
              style="
                background: #e5e8ed;
                border-radius: 10px;
                margin: 0 auto;
                float: none;
              "
            >
              <router-link
                to="/personalinfo"
                style="text-decoration: none"
                class="card-body"
              >
                <h5 class="d-inline" style="font-weight: bold; color: #4d4b57">
                  Personal Information
                </h5>
                <img
                  src="../assets/image/arrow-left.png"
                  class="float-right"
                  alt=""
                />
              </router-link>
            </div>
            <div
              class="card w-50 mb-3"
              style="
                background: #e5e8ed;
                border-radius: 10px;
                margin: 0 auto;
                float: none;
              "
            >
              <router-link
                to="/changepassword"
                style="text-decoration: none"
                class="card-body"
              >
                <h5 class="d-inline" style="font-weight: bold; color: #4d4b57">
                  Change Password
                </h5>
                <img
                  src="../assets/image/arrow-left.png"
                  class="float-right"
                  alt=""
                />
              </router-link>
            </div>
            <div
              class="card w-50 mb-3"
              style="
                background: #e5e8ed;
                border-radius: 10px;
                margin: 0 auto;
                float: none;
              "
            >
              <router-link
                to="/changepin"
                style="text-decoration: none"
                class="card-body"
              >
                <h5 class="d-inline" style="font-weight: bold; color: #4d4b57">
                  Change PIN
                </h5>
                <img
                  src="../assets/image/arrow-left.png"
                  class="float-right"
                  alt=""
                />
              </router-link>
            </div>
            <div
              class="card w-50 mb-5"
              style="
                background: #e5e8ed;
                border-radius: 10px;
                margin: 0 auto;
                float: none;
              "
            >
              <div @click="logout" class="card-body">
                <h5 class="d-inline" style="font-weight: bold; color: #4d4b57">
                  Logout
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import headers from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    headers,
    Sidebar,
    Footer
  },
  computed: {
    ...mapGetters({
      detUser: 'auth/detailUser',
      webURL: 'webURL',
      onLogout: 'auth/logout'
    })
  },
  methods: {
    ...mapActions({
      actionsDetUser: 'auth/userDetail'
    }),
    logout () {
      const check = confirm('Do you want to logout?')
      if (check) {
        this.onLogout()
        this.$router.push('/')
      }
    }
  }
}
</script>
