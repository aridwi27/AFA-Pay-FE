<template>
<div>
  <div class="d-block d-lg-none d-md-none ">
    <!-- Header -->
    <div>
      <div v-if="!detailSaldo">
        <div class="card w-100 bg-theme text-white shadow-nm"
          style="border-bottom-left-radius: 25px;border-bottom-right-radius: 25px">
          <div class="card-body">
            <h1 class="float-right mt-4"><i class="far fa-bell"></i></h1>
            <div class="row">
              <div class="col-3 my-auto">
                <img :src="`${webURL}/images/${userData.image}`" class="img-fluid h-80 w-100 "
                  style="object-fit:cover;border-radius:8px" alt="">
              </div>
              <div class="col-9" @click="toggleDetailSaldo()">
                <p class="my-2">Balance</p>
                <h3 class="font-weight-bold">
                  Rp. {{ formatPrice(Number(userData.credit)) }}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <!-- Button Confirm -->
        <div class="my-3">
          <div class="row mx-2">
            <div class="col-6">
              <button class="btn btnSecondary d-block w-100 mb-2" style="height:60px;border-radius:15px"
                @click="linkTo('search')">
                <p class="font-weight-bold mb-0">
                  <i class="fas fa-arrow-up"></i><span class="text-dark"> Transfer
                  </span> </p>
              </button>
            </div>
            <div class="col-6">
              <button @click="$bvModal.show('modalTopUp')" class="btn btnSecondary d-block w-100 mb-2"
                style="height:60px;border-radius:15px">
                <p class="font-weight-bold mb-0">
                  <i class="fas fa-arrow-up"></i> <span class="text-dark">Top Up</span>
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="card w-100 bg-theme text-white shadow-nm"
          style="border-bottom-left-radius: 25px;border-bottom-right-radius: 25px">
          <div class="card-body mt-3">
            <h5 @click="toggleDetailSaldo()" class="font-weigh-bold"><i class="fas fa-arrow-left mr-4"></i> Transaction</h5>
            <div class="row mt-5">
              <div class="col-6">
                <div class="row">
                  <div class="col-2 my-auto">
                    <h5><i class="fas fa-arrow-down text-success"></i></h5>
                  </div>
                  <div class="col-10">
                    <p class="mb-0">Income</p>
                    <p class="font-weight-bold">
                      Rp.{{ transRecap.totalIncome === undefined ? 0 : formatPrice(Number(transRecap.totalIncome))}}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="row">
                  <div class="col-2 my-auto">
                    <h5><i class="fas fa-arrow-up text-danger"></i></h5>
                  </div>
                  <div class="col-10">
                    <p class="mb-0">Expense</p>
                    <p class="font-weight-bold">
                      Rp.{{ transRecap.totalExpense === undefined ? 0 : formatPrice(Number(transRecap.totalExpense))}}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="detailSaldo" class="mt-3">
      <h5 class="font-weight-bold ml-4">In This Week</h5>
      <div v-if="transUser.length > 0" id="chartJS" class="col">
        <line-chart :chartData="arrPositive" :options="chartOptions" :chartColors="positiveChartColors" />
      </div>
    </div>
    <!-- Transaction History -->
    <div>
    <div v-if="isLoadingM" class="row w-100" style="min-height:60vh">
      <div class="col-12 py-5 my-5 text-center">
        <b-spinner style="width: 4rem; height: 4rem;" variant="info"></b-spinner>
        <h5 class="mt-4">Preparing Your Data ...</h5>
      </div>
    </div>
    <div v-else class="card shadow-nm" style="border-radius: 25px">
      <div class="card-body">
        <router-link to="/history" class="mb-0 text-main float-right">See All</router-link>
        <h5 class="font-weight-bold">Transaction History</h5>
        <div v-if="transUser.length > 0" class="mt-2 hideScroll" style="overflow-y: scroll; min-height: 50vh">
          <div v-for="(item, index) in transUser" :key="index">
            <div class="card border-0">
              <div class="row no-gutters">
                <div class="col-md-2 col-2 my-auto mx-auto">
                  <img v-if="Number(loginId) === Number(item.target_id)"
                    :src="`${webURL}/images/${item.userImage}`" class="card-img text-center" alt="...">
                  <img v-else :src="`${webURL}/images/${item.targetImage}`" class="card-img text-center"
                    alt="...">
                </div>
                <!-- Start Canceled -->
                <div v-if="item.status === 'Canceled'" class="col-md-10 col-10">
                  <div @click="detailTrans(item.id)" class="card-body">
                    <p class="float-right font-weight-bold mb-0 text-secondary">
                      Rp.{{formatPrice(Number(item.amount))}}</p>
                    <div>
                      <p v-if="Number(loginId) === Number(item.target_id)" class="font-weight-bold mb-0">
                        {{item.userFirstName}} {{item.userLastName}}</p>
                      <p v-else class="font-weight-bold mb-0">{{item.targetFirstName}} {{item.targetLastName}}</p>
                    </div>
                    <p class="card-text mb-0"><small class="text-muted">Transfer {{item.status}}</small></p>
                  </div>
                </div>
                <!-- End Canceled -->
                <!-- Start Pending -->
                <div v-else-if="item.status === 'Pending'" class="col-md-10 col-10">
                  <div @click="popUpConfirm(item.id)" class="card-body">
                    <p class="float-right font-weight-bold mb-0 text-warning">
                      Rp.{{formatPrice(Number(item.amount))}}</p>
                    <div>
                      <p v-if="Number(loginId) === Number(item.target_id)" class="font-weight-bold mb-0">
                        {{item.userFirstName}} {{item.userLastName}}</p>
                      <p v-else class="font-weight-bold mb-0">{{item.targetFirstName}} {{item.targetLastName}}</p>
                    </div>
                    <p class="card-text mb-0"><small class="text-muted">Transfer {{item.status}}</small></p>
                  </div>
                </div>
                <!-- End Pending -->
                <!-- Start Success -->
                <div v-else class="col-md-10 col-10">
                  <div @click="detailTrans(item.id)" class="card-body">
                    <div>
                      <p v-if="Number(loginId) === Number(item.target_id)"
                        class="float-right font-weight-bold mb-0 text-success">+
                        Rp.{{formatPrice(Number(item.amount))}}</p>
                      <p v-else class="float-right font-weight-bold mb-0 text-danger">-
                        Rp.{{formatPrice(Number(item.amount))}}</p>
                    </div>
                    <div>
                      <p v-if="Number(loginId) === Number(item.target_id)" class="font-weight-bold mb-0">
                        {{item.userFirstName}} {{item.userLastName}}</p>
                      <p v-else class="font-weight-bold mb-0">{{item.targetFirstName}} {{item.targetLastName}}</p>
                    </div>
                    <p v-if="item.info === 'Top Up'" class="card-text mb-0"><small class="text-muted">Top Up
                        {{item.status}}</small></p>
                    <p v-else class="card-text mb-0"><small class="text-muted">Transfer {{item.status}}</small>
                    </p>
                  </div>
                </div>
                <!-- EndSuccess -->
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center">
          <h5 class="font-weight-bold my-4 text-secondary">You Have No Transaction</h5>
        </div>
      </div>
    </div>
    </div>
  </div>
      <b-modal id="confirmTransM" centered hide-header hide-footer>
      <div v-if="isLoadingConfirmM" class="row w-100">
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
          <button type="button" @click="confirmPendingTrans('Success')" class="btn btnMain font-weight-bold px-4 w-25 mr-2 font-weight-bold" style="border-radius:10px">Confirm</button>
          <button type="button" @click="confirmPendingTrans('Canceled')" class="btn btnSecondary font-weight-bold px-4 w-25 ml-2" style="border-radius:10px">Cancel</button>
        </div>
          </div>
        </div>
      </form>
    </b-modal>
</div>
</template>

<script>
// import axios from 'axios'
// import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import { paymentMixin } from '../helpers/mixin'
import LineChart from './LineChart'
export default {
  mixins: [paymentMixin],
  name: 'Dashboard',
  components: {
    LineChart
  },
  computed: {
    ...mapGetters({
      userData: 'auth/detailUser',
      transRecap: 'trans/transRecap',
      transUser: 'trans/transUser',
      webURL: 'webURL',
      pendingData: 'trans/transDetailUser'
    })
  },
  data () {
    return {
      detailSaldo: false,
      isLoadingM: true,
      isLoadingConfirmM: true,
      loginId: localStorage.getItem('id'),
      confirmedId: 0,
      amount: null,
      arrPositive: { labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'], data: [40, 25, 30, 35, 28, 40, 33] },
      positiveChartColors: {
        borderColor: 'rgba(99, 121, 244, 1)',
        pointBorderColor: 'rgba(99, 121, 244, 1)',
        pointBackgroundColor: 'rgba(99, 121, 244, 1)',
        backgroundColor: 'rgba(99, 121, 244, 1)'
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              // color: 'rgba(0, 0, 0, 0)'
              display: false
            }
          }],
          yAxes: [{
            gridLines: {
              // color: 'rgba(0, 0, 0, 0)'
              display: false
            },
            ticks: {
              display: false
            }
          }]
        }
      }
    }
  },
  methods: {
    ...mapActions({
      getUserTrans: 'trans/getUserTrans',
      userDetail: 'auth/userDetail',
      addTrans: 'trans/addTrans',
      transDetail: 'trans/detailTrans',
      confTrans: 'trans/confTrans'
    }),
    submitTopUp () {
      this.swalLoading('Creating Request')
      const data = {
        user_id: Number(localStorage.getItem('id')),
        target_id: Number(localStorage.getItem('id')),
        amount: this.amount,
        info: 'Top Up',
        type: 'in'
      }
      this.addTrans(data)
        .then(async (res) => {
          await this.transDetail(res.data.id).then((result) => {
            this.swalLoadingClose()
            this.swalAlert('Top Up Success', 'Your saldo already added', 'success')
            this.$bvModal.hide('modalTopUp')
            this.linkTo('status')
            this.amount = null
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
    },
    popUpConfirm (id) {
      this.$bvModal.show('confirmTransM')
      this.isLoadingConfirmM = true
      this.confirmedId = id
      this.transDetail(id)
        .then((res) => {
          this.isLoadingConfirmM = false
          // this.$bvModal.show('confirmTransM')
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
              this.$bvModal.hide('confirmTransM')
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
    mountUserTrans () {
      this.isLoadingM = true
      this.getUserTrans(this.queryTrans)
        .then((res) => {
          this.isLoadingM = false
        })
    },
    toggleDetailSaldo () {
      this.detailSaldo = !this.detailSaldo
    }
  },
  mounted () {
    this.mountUserTrans()
  }
}
</script>

<style>
</style>
