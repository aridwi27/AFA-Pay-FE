<template>
  <div>
    <div style="min-height:88vh;" class="card-body">
      <h5 @click="linkTo('home')" class=""><i class="fas fa-arrow-left"></i></h5>
      <div style="overflow-y:scroll;height:75vh">
        <div class="text-center">
        <img :src="`${webURL}/images/${detUser.image}`" class="rounded mx-auto d-block" width="100px" alt="profile" />
        <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked" />
        <button @click="onPickFile" class="btn btnMain my-2">
          Upload Photo
        </button>
        <h4 class="font-weight-bold mb-3" style="color: #4d4b57">
          {{ detUser.first_name }} {{ detUser.last_name }}
        </h4>
        <p v-if="
                  detUser.handphone === '+62' ||
                  detUser.handphone === '+62-' ||
                  detUser.handphone === ''
                " style="color: #7a7886">
          No Phone Number
        </p>
        <p v-else style="color: #7a7886">{{ detUser.handphone }}</p>
      </div>
      <div class="card mb-3" style="
                background: #e5e8ed;
                border-radius: 10px;
                margin: 0 auto;
                float: none;
              ">
        <router-link to="/personalinfo" style="text-decoration: none" class="card-body">
          <h5 class="d-inline" style="font-weight: bold; color: #4d4b57">
            Personal Information
          </h5>
          <img src="../assets/image/arrow-left.png" class="float-right" alt="" />
        </router-link>
      </div>
      <div class="card mb-3" style="
                background: #e5e8ed;
                border-radius: 10px;
                margin: 0 auto;
                float: none;
              ">
        <router-link to="/changepassword" style="text-decoration: none" class="card-body">
          <h5 class="d-inline" style="font-weight: bold; color: #4d4b57">
            Change Password
          </h5>
          <img src="../assets/image/arrow-left.png" class="float-right" alt="" />
        </router-link>
      </div>
      <div class="card mb-3" style="
                background: #e5e8ed;
                border-radius: 10px;
                margin: 0 auto;
                float: none;
              ">
        <router-link to="/changepin" style="text-decoration: none" class="card-body">
          <h5 class="d-inline" style="font-weight: bold; color: #4d4b57">
            Change PIN
          </h5>
          <img src="../assets/image/arrow-left.png" class="float-right" alt="" />
        </router-link>
      </div>
      <div @click="toggleNotif" class="card mb-3" style="
                background: #e5e8ed;
                border-radius: 10px;
                margin: 0 auto;
                float: none;
              ">
        <div class="card-body" style="text-decoration:none">
          <h5 class="d-inline" style="font-weight: bold; color: #4d4b57">
            Notification
          </h5>
          <div class="float-right">
            <h5 v-if="toggleStatus" class="mb-0 text-main"><i class="fas fa-toggle-on"></i></h5>
            <h5 v-else class="mb-0 text-main"><i class="fas fa-toggle-off"></i></h5>
          </div>
        </div>
      </div>
      <div class="card mb-5" style="
                background: #e5e8ed;
                border-radius: 10px;
                margin: 0 auto;
                float: none;
              ">
        <div @click="logout" style="cursor: pointer" class="card-body">
          <h5 class="d-inline" style="font-weight: bold; color: #4d4b57">
            Logout
          </h5>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { paymentMixin } from '../helpers/mixin'
export default {
  mixins: [paymentMixin],
  data () {
    return {
      toggleStatus: true,
      image: null
    }
  },
  computed: {
    ...mapGetters({
      detUser: 'auth/detailUser',
      webURL: 'webURL'
    })
  },
  methods: {
    ...mapActions({
      actionsDetUser: 'auth/userDetail',
      actionsUpdate: 'auth/updateUser',
      onLogout: 'auth/logout'
    }),
    logout () {
      this.swalLogout('Do you want to logout?', '', 'warning').then((result) => {
        if (result) {
          this.onLogout()
          this.$router.push('/')
        }
      })
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      // this.swalLoading('Uploading Photo')
      const files = event.target.files
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
        // this.swalLoadingClosed()
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
      const fd = new FormData()
      fd.append('image', files[0])
      this.actionsUpdate(fd).then((result) => {
        this.actionsDetUser()
        if (result.code === 500) {
          this.swalAlert('Update Photo Fail', '', 'error')
        } else {
          this.swalAlert('Update Photo Success', '', 'success')
        }
        // this.swalLoadingClosed()
      }).catch((err) => {
        // this.swalLoadingClosed()
        console.log(err)
      })
    },
    toggleNotif () {
      this.toggleStatus = !this.toggleStatus
    }
  }
}
</script>

<style>

</style>
