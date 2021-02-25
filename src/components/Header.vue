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
          <i class="far fa-bell float-right pl-3 mt-3"></i>
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
