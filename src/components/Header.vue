<template>
  <div class="shadow-nm" style="border-radius: 25px">
    <div class="container">
      <div class="row">
        <div class="col-md-12 py-4">
          <table class="table d-inline table-borderless">
            <tbody>
              <tr>
                <td>
                  <router-link to="/home">
                    <h2
                      style="color: #6379f4; font-weight: bold"
                      class="d-inline"
                    >
                      Zwallet
                    </h2>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <b-dropdown
            id="dropdown-right"
            variant="link"
            right
            class="float-right pl-3 mt-3"
            no-caret
          >
            <template #button-content>
              <b-icon
                icon="bell"
                style="color: black"
                aria-hidden="true"
              ></b-icon>
            </template>
            <b-dropdown-text style="width: 500px">
              Today
              <div class="card" style="border-radius: 10px">
                <div class="card-body">
                  <i
                    class="fas fa-arrow-down float-left fa-2x mr-3"
                    style="color: #4cedb3"
                  ></i>
                  <div class="float-left">
                    <p class="">Transfered from Joshua Lee</p>
                    <h5 class="" style="color: #43484f">Rp220.000</h5>
                  </div>
                </div>
              </div>
            </b-dropdown-text>
            <b-dropdown-text style="width: 500px">
              <div class="card" style="border-radius: 10px">
                <div class="card-body">
                  <i
                    class="fas fa-arrow-up float-left fa-2x mr-3"
                    style="color: red"
                  ></i>
                  <div class="float-left">
                    <p class="">Netflix subscription</p>
                    <h5 class="" style="color: #43484f">Rp149.000</h5>
                  </div>
                </div>
              </div>
            </b-dropdown-text>

            <!-- <i class="far fa-bell"></i> -->
          </b-dropdown>

          <div class="float-right">
            <h5>{{ detUser.first_name }} {{ detUser.last_name }}</h5>
            <p
              v-if="detUser.handphone.length > 4"
              class=""
              style="color: rgba(58, 61, 66, 0.9)"
            >
              {{ detUser.handphone }}
            </p>
            <router-link to="/addphone" v-else class="text-main">
              Add Your Phone Number
            </router-link>
          </div>
          <img
            v-if="detUser.image"
            class="float-right img-fluid mr-3"
            style="max-height: 55px"
            :src="`${webURL}/images/${detUser.image}`"
            alt=""
          />
          <!-- <div class="col-md-4 py-4 float-right" style="">
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { paymentMixin } from '../helpers/mixin'
export default {
  mixins: paymentMixin,
  data () {
    return {
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
      actionUserDetail: 'auth/userDetail'
    })
  },
  mounted () {
    this.actionUserDetail()
    // console.log(this.$store.getters['auth/getToken'])
    // console.log(this.$store.getters['auth/detailUser'])
  }
}
</script>

<style scoped>
</style>
