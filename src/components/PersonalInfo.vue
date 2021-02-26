<template>
  <div>
    <div class="card shadow-nm" style="border-radius: 25px">
      <div class="card-body px-5">
        <h5 class="font-weight-bold float-right text-main" @click="clickEdit">
          Edit
        </h5>
        <h5 class="font-weight-bold mb-4">Personal Information</h5>
        <p class="text-secondary w-50 mb-2">
          We got your personal information from the sign up proccess. If you
          want to make changes on your information, contact our support.
        </p>
        <div v-if="showEdit">
          <form action="" @submit.prevent="changeUser" class="my-5">
            <div class="form-group">
              <label class="text-secondary">First Name</label>
              <input
                type="text"
                v-model="data.first_name"
                class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm"
              />
            </div>
            <div class="form-group">
              <label class="text-secondary">Last name</label>
              <input
                type="text"
                v-model="data.last_name"
                class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm"
              />
            </div>
            <div class="form-group">
              <label class="text-secondary">Verified Email</label>
              <input
                type="email"
                v-model="data.email"
                class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm"
              />
            </div>
            <div class="text-right">
              <button class="btn btnMain">Save Change</button>
            </div>
          </form>
        </div>
        <form v-else action="" class="my-5">
          <div class="form-group">
            <label class="text-secondary">First Name</label>
            <input
              readonly
              type="text"
              v-model="detUser.first_name"
              class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm"
            />
          </div>
          <div class="form-group">
            <label class="text-secondary">Last name</label>
            <input
              readonly
              type="text"
              v-model="detUser.last_name"
              class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm"
            />
          </div>
          <div class="form-group">
            <label class="text-secondary">Verified Email</label>
            <input
              readonly
              type="email"
              v-model="detUser.email"
              class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm"
            />
          </div>
          <div class="form-group">
            <label class="text-secondary">Phone Number</label>
            <div
              v-if="
                detUser.handphone === '+62-' ||
                detUser.handphone === '+62' ||
                detUser.handphone === ''
              "
              class="float-right"
            >
              <router-link to="/addphone" class="float-right text-main">
                Add Number</router-link
              >
              <p class="float-right text-secondary">Manage /</p>
            </div>
            <div v-else class="float-right">
              <p class="float-right text-secondary">Add Number</p>
              <router-link to="/managephone" class="float-right text-main"
                >Manage /
              </router-link>
            </div>
            <input
              readonly
              v-if="detUser.handphone === '+62-' || detUser.handphone === '+62'"
              type="text"
              value="No Phone Number"
              class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm"
            />
            <input
              readonly
              v-else
              type="text"
              :value="detUser.handphone"
              class="classname font-weight-bold form-control border-top-0 border-0 shadow-sm"
            />
          </div>
        </form>
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
      amount: 0,
      data: {
        first_name: '',
        last_name: '',
        email: ''
      },
      showEdit: false
    }
  },
  computed: {
    ...mapGetters({
      detUser: 'auth/detailUser'
    })
  },
  methods: {
    ...mapActions({
      actionsDetUser: 'auth/userDetail',
      actionsUpdate: 'auth/updateUser'
    }),
    formatAmount () {
      this.amount = this.formatPrice(this.amount)
    },
    clickEdit () {
      this.showEdit = !this.showEdit
    },
    detailUser () {
      this.actionsDetUser().then((response) => {
        this.data = {
          email: response.email,
          first_name: response.first_name,
          last_name: response.last_name
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    changeUser () {
      this.showEdit = !this.showEdit
      this.actionsUpdate(this.data).then((response) => {
        this.detUser()
        if (response.code === 500) {
          this.swalAlert('Update User', response.message, 'error')
        } else {
          this.swalAlert('Update User', response.message, 'success')
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.detailUser()
  }
}
</script>

<style>
</style>
