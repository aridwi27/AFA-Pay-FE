<template>
  <div>
    <!-- Carrd Saldo -->
    <div class="row">
      <div class="card w-100 bg-theme text-white shadow-nm" style="border-radius:25px">
        <div class="card-body p-4">
          <div class="row">
            <div class="col-md-8 col-lg-10">
              <p class="my-2">Balance</p>
              <h1 class="font-weight-bold">Rp. {{formatPrice(Number(userData.credit))}}</h1>
              <p>+62{{userData.handphone}}</p>
            </div>
            <div class="col-md-4 col-lg-2 my-auto">
              <div class="d-flex flex-column align-items-center">
                <router-link to="/search" class="btn btnTrans d-block w-100 mb-2">
                  <p class="font-weight-bold mb-0"><i class="fas fa-arrow-up"></i> Transfer</p>
                </router-link>
                <button  @click="$bvModal.show('modalTopUp')" to="/topup" class="btn btnTrans d-block w-100 mt-2">
                  <p class="font-weight-bold mb-0"><i class="fas fa-plus"></i> Top Up</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Chart & History -->
    <div class="row mt-4">
      <div class="col-lg-6 col-md-6 pl-0">
        <div class="card shadow-nm" style="border-radius:25px">
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <h1><i class="fas fa-arrow-down text-success"></i></h1>
                <p class="mb-0">Income</p>
                <p class="font-weight-bold">Rp. {{formatPrice(Number(transRecap.totalIncome))}}</p>
              </div>
              <div class="col-6">
                <h1><i class="fas fa-arrow-up text-danger"></i></h1>
                <p class="mb-0">Expense</p>
                <p class="font-weight-bold">Rp. {{transRecap.totalExpense === null ? 0:formatPrice(Number(transRecap.totalExpense))}}</p>
              </div>
            </div>
            <div class="row">
              <div id="chartJS" class="col">
                <line-chart :chartData="arrPositive" :options="chartOptions" :chartColors="positiveChartColors"
                  label="Positive" />
              </div>
              <!-- <img src="https://i.ibb.co/8gqzyhG/chart-Sample.png" class="img-fluid" alt="" > -->
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 pr-0">
        <div class="card shadow-nm" style="border-radius:25px">
          <div class="card-body">
            <router-link to="/history" class="mb-0 text-main float-right">See All</router-link>
            <h5 class="font-weight-bold">Transaction History</h5>
            <div class="mt-2 hideScroll" style="overflow-y: scroll; height:50vh">
              <div v-for="(item, index) in transUser" :key="index">
                <div class="card border-0">
                  <div class="row no-gutters">
                    <div class="col-md-2 my-auto mx-auto">
                      <img :src="`${webURL}/images/${item.targetImage}`" class="card-img text-center" alt="...">
                    </div>
                    <div class="col-md-10">
                      <div class="card-body">
                       <div>
                          <p v-if="item.status ==='Pending'" class="float-right font-weight-bold mb-0 text-warning">Rp.{{formatPrice(Number(item.amount))}}</p>
                        <div v-else>
                          <p v-if="item.type ==='in'" class="float-right font-weight-bold mb-0 text-success">+ Rp.{{formatPrice(Number(item.amount))}}</p>
                          <p v-else class="float-right font-weight-bold mb-0 text-danger">- Rp.{{formatPrice(Number(item.amount))}}</p>
                        </div>
                       </div>
                        <p class="font-weight-bold mb-0">{{item.targetFirstName}} {{item.targetLastName}}</p>
                        <div>
                        <p v-if="item.info === 'Top Up'" class="card-text mb-0"><small class="text-muted">Top Up</small></p>
                        <p v-else class="card-text mb-0"><small class="text-muted">{{item.status}}</small></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal TopUp -->
    <b-modal id="modalTopUp" title="Top Up Credit" hide-header hide-footer>
      <form @submit.prevent="submitTopUp()" class="my-4">
        <div class="row">
          <div class="col">
            <p class="font-weight-bold text-center mb-0">Input Amount : </p>
            <input v-model="amount" type="number" class="form-control border-0 text-main text-center" placeholder="0.00"
              style="font-size:72px;overflow-y:hidden;color:var(--main-theme);resize:none;box-shadow: none;" />
        <div class="text-center">
          <button type="submit" class="btn btnMain font-weight-bold px-4 w-25 mr-2" style="border-radius:10px">Continue</button>
          <button type="button" @click="$bvModal.hide('modalTopUp')" class="btn btnSecondary font-weight-bold px-4 w-25 ml-2" style="border-radius:10px">Cancel</button>
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
  components: {
    LineChart
  },
  computed: {
    ...mapGetters({
      userData: 'auth/detailUser',
      transRecap: 'trans/transRecap',
      transUser: 'trans/transUser',
      userId: 'auth/userId',
      webURL: 'webURL'
    })
  },
  data () {
    return {
      amount: 0,
      sampleHistory: [
        { image: '../img/Rectangle%2025.161e8c33.png', name: 'Samuel Suhi', status: 'Transfer', type: 'in', amount: 50000 },
        { image: '../img/Rectangle%2025.161e8c33.png', name: 'Samuel Suhi', status: 'Transfer', type: 'out', amount: 50000 },
        { image: '../img/Rectangle%2025.161e8c33.png', name: 'Samuel Suhi', status: 'Transfer', type: 'in', amount: 50000 },
        { image: '../img/Rectangle%2025.161e8c33.png', name: 'Samuel Suhi', status: 'Transfer', type: 'in', amount: 50000 },
        { image: '../img/Rectangle%2025.161e8c33.png', name: 'Samuel Suhi', status: 'Transfer', type: 'out', amount: 50000 }
      ],
      arrPositive: { labels: ['Sat', 'Sun', 'mon', 'Tue', 'Wed', 'Thu', 'Fri'], data: [40, 25, 30, 35, 28, 40, 33] },
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
              color: 'rgba(0, 0, 0, 0)'
            }
          }],
          yAxes: [{
            gridLines: {
              color: 'rgba(0, 0, 0, 0)'
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
      transDetail: 'trans/detailTrans'
    }),
    submitTopUp () {
      this.swalLoading('Creating Request')
      const data = {
        user_id: this.userId,
        target_id: this.userId,
        amount: this.amount,
        info: 'Top Up',
        type: 'in'
      }
      this.addTrans(data)
        .then(async (res) => {
          await this.transDetail(res.data.id).then((result) => {
            console.log(result)
          })
          this.swalLoadingClose()
          this.swalAlert('Top Up Success', 'Your saldo already added', 'success')
          this.$bvModal.hide('modalTopUp')
          this.$router.push('/status')
        })
        .catch((err) => {
          console.log(err)
        })
      // console.log(data)
      // this.amount = 0
    }
  },
  mounted () {
    this.getUserTrans(this.queryTrans)
  }
}
</script>

<style>
</style>
