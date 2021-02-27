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
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"
              />
              <button @click="onPickFile" class="btn btnMain my-2">
                Upload Photo
              </button>
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
import { paymentMixin } from '../helpers/mixin'
export default {
  mixins: [paymentMixin],
  components: {
    headers,
    Sidebar,
    Footer
  },
  data () {
    return {
      image: null
    }
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
      actionsDetUser: 'auth/userDetail',
      actionsUpdate: 'auth/updateUser'
    }),
    logout () {
      const check = confirm('Do you want to logout?')
      if (check) {
        this.onLogout()
        this.$router.push('/')
      }
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
      const fd = new FormData()
      fd.append('image', files[0])
      this.actionsUpdate(fd).then((result) => {
        this.actionsDetUser()
        this.swalAlert('Update Photo Success', '', 'success')
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
