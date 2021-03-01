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
                    <h2 style="color: #6379f4; font-weight: bold" class="d-inline">
                      AFA-Wallet
                    </h2>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <b-dropdown id="dropdown-right" variant="link" right class="float-right pl-3 mt-3 hideScroll" no-caret>
            <template #button-content>
              <b-icon icon="bell" style="color: black" aria-hidden="true"></b-icon>
            </template>
            <p class="pl-4 font-weight-bold">Recent Transaction</p>
            <div style="height:40vh;overflow-y:scroll" class="hideScroll">
              <b-dropdown-text v-for="(item, index) in transUser" :key="index" style="min-width:400px">
                <!-- Start Canceled -->
                <div @click="detailTrans(item.id)" v-if="item.status === 'Canceled' " class="card shadow-nm">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-2">
                        <i class="fas fa-ban text-secondary fa-2x"></i>
                      </div>
                      <div class="col-10">
                        <small v-if="Number(loginId) === Number(item.target_id)"
                          class="text-secondary mb-0 d-block">Transfer From {{item.userFirstName}} {{item.userLastName}}
                          {{item.status}}</small>
                        <small v-else class="text-secondary mb-0 d-block">Transfer To {{item.targetFirstName}}
                          {{item.targetLastName}} {{item.status}}</small>
                        <p class="font-weight-bold mb-0">Rp. {{formatPrice(Number(item.amount))}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Cancel -->
                <!-- Start Pending -->
                <div v-else-if="item.status === 'Pending' " class="card shadow-nm">
                  <div @click="popUpConfirm(item.id)" class="card-body">
                    <div class="row">
                      <div class="col-2">
                        <i v-if="item.status === 'Pending'" class="far fa-clock text-warning fa-2x"></i>
                      </div>
                      <div class="col-10">
                        <small v-if="Number(loginId) === Number(item.target_id)"
                          class="text-secondary mb-0 d-block">Transfer From {{item.userFirstName}}
                          {{item.userLastName}}</small>
                        <small v-else class="text-secondary mb-0 d-block">Transfer To {{item.targetFirstName}}
                          {{item.targetLastName}}</small>
                        <p class="font-weight-bold mb-0">Rp. {{formatPrice(Number(item.amount))}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Pending -->
                <!-- Start Success -->
                <div v-else class="card shadow-nm">
                  <div @click="detailTrans(item.id)" class="card-body">
                    <div class="row">
                      <div class="col-2">
                        <i v-if="Number(loginId) === Number(item.target_id)"
                          class="fas fa-arrow-up text-success fa-2x"></i>
                        <i v-else class="fas fa-arrow-down text-danger fa-2x"></i>
                      </div>
                      <div class="col-10">
                        <small v-if="item.info ==='Top Up'" class="text-secondary mb-0 d-block">Top Up Account
                          {{item.userFirstName}}</small>
                        <small v-else-if="Number(loginId) === Number(item.target_id)"
                          class="text-secondary mb-0 d-block">Transfer From {{item.userFirstName}}
                          {{item.userLastName}}</small>
                        <small v-else class="text-secondary mb-0 d-block">Transfer To {{item.targetFirstName}}
                          {{item.targetLastName}}</small>
                        <p class="font-weight-bold mb-0">Rp. {{formatPrice(Number(item.amount))}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Success -->
              </b-dropdown-text>
            </div>
            <!-- <i class="far fa-bell"></i> -->
            <p @click="linkTo('history')" class="pl-4 text-main text-center mb-0 mt-3">See More</p>
          </b-dropdown>
          <div class="float-right">
            <h5 class="font-weight-bold">{{ detUser.first_name }} {{ detUser.last_name }}</h5>
            <p v-if="detUser.handphone.length > 4" class="" style="color: rgba(58, 61, 66, 0.9)">
              {{ detUser.handphone }}
            </p>
            <router-link to="/addphone" v-else class="text-main">
              Add Your Phone Number
            </router-link>
          </div>
          <img v-if="detUser.image" class="float-right img-fluid mr-3" style="max-height: 55px"
            :src="`${webURL}/images/${detUser.image}`" alt="" />
          <!-- <div class="col-md-4 py-4 float-right" style="">
          </div> -->
        </div>
      </div>
    </div>
    <b-modal id="confirmTrans3" centered hide-header hide-footer>
      <div v-if="isLoadingConfirm" class="row w-100">
        <div class="col-12 text-center">
          <p class="font-weight-bold text-center mb-0">Confirm Transaction </p>
          <b-spinner class="mt-4 pt-4" style="width: 2rem; height: 2rem;" variant="info"></b-spinner>
          <p class="mt-4 text-secondary">Please Wait</p>
        </div>
      </div>
      <form v-else @submit.prevent="submitTopUp()" class="my-4">
        <div class="row">
          <div class="col">
            <p class="font-weight-bold text-center mb-0">Confirm Transaction </p>
            <table class="table-borderless table w-100 my-3 font-nunito">
              <tr>
                <td class="w-25 py-0 font-weight-bold">From</td>
                <td class="w-75 py-0">{{pendingData.userFirstName}} {{pendingData.userLastName}}</td>
              </tr>
              <tr>
                <td class="w-25 py-0 font-weight-bold">To</td>
                <td class="w-75 py-0">{{pendingData.targetFirstName}} {{pendingData.targetLastName}}</td>
              </tr>
              <tr>
                <td class="w-25 py-0 font-weight-bold">Date</td>
                <td class="w-75 py-0">{{formatDate(pendingData.created_at)}}</td>
              </tr>
              <tr>
                <td class="w-25 py-0 font-weight-bold">Info</td>
                <td class="w-75 py-0">{{pendingData.info}}</td>
              </tr>
              <tr>
                <td class="w-25 py-0 font-weight-bold">Amount</td>
                <td class="w-75 py-0">Rp.{{formatPrice(Number(pendingData.amount))}}</td>
              </tr>
            </table>
            <div class="text-center">
              <button type="button" @click="confirmPendingTrans('Success')"
                class="btn btnMain font-weight-bold px-4 w-25 mr-2 font-weight-bold"
                style="border-radius:10px">Confirm</button>
              <button type="button" @click="confirmPendingTrans('Canceled')"
                class="btn btnSecondary font-weight-bold px-4 w-25 ml-2" style="border-radius:10px">Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </b-modal>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { paymentMixin } from '../helpers/mixin'
export default {
  mixins: [paymentMixin],
  data () {
    return {
      isLoadingConfirm: true,
      loginId: localStorage.getItem('id'),
      income: '30000',
      outcome: '10000',
      confirmedId: 0
    }
  },
  computed: {
    ...mapGetters({
      detUser: 'auth/detailUser',
      webURL: 'webURL',
      transUser: 'trans/transUser',
      pendingData: 'trans/transDetailUser'
    })
  },
  methods: {
    ...mapActions({
      actionUserDetail: 'auth/userDetail',
      transDetail: 'trans/detailTrans',
      confTrans: 'trans/confTrans'
    }),
    popUpConfirm (id) {
      this.$bvModal.show('confirmTrans3')
      this.isLoadingConfirm = true
      this.confirmedId = id
      this.transDetail(id)
        .then((res) => {
          this.isLoadingConfirm = false
          // this.$bvModal.show('confirmTrans3')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    confirmPendingTrans (status) {
      this.swalLoading('Confirming Transaction')
      const data = {
        status
      }
      this.confTrans(data)
        .then(async (res) => {
          await this.transDetail(this.confirmedId)
            .then(async (res2) => {
              this.swalLoadingClose()
              this.$bvModal.hide('confirmTrans3')
              this.swalAlert(`Transaction ${status}`, 'The Credit Already Transfered', 'success')
              this.linkTo('status')
            })
            .catch((err) => {
              this.swalLoadingClose()
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    detailTrans (id) {
      this.swalLoading('Please Wait')
      this.transDetail(id)
        .then((res) => {
          this.swalLoadingClose()
          this.linkTo('status')
        })
        .catch((err) => {
          this.swalLoadingClose()
          console.log(err)
        })
    }
  },
  mounted () {
    this.actionUserDetail()
  }
}
</script>

<style scoped>
</style>
