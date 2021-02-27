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
              padding-top: 2%;
            "
          >
            <button class="btn btnMain float-right" @click="$bvModal.show('modalTopUp')">
              <i class="fas fa-plus"></i> Top Up</button>
            <p class="" style="font-weight: bold">How To Top Up</p>
            <div
              class="card mb-2 mt-5"
              style="
                background: #ffffff;
                box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
                border-radius: 10px;
              "
            >
              <div class="card-body">
                <p class="card-text" style="color: #7a7886">
                  <span class="mr-3" style="color: #6379f4; font-weight: bold"
                    >1
                  </span>
                  Go to the nearest ATM or you can use E-Banking.
                </p>
              </div>
            </div>

            <div
              class="card mb-2"
              style="
                background: #ffffff;
                box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
                border-radius: 10px;
              "
            >
              <div class="card-body">
                <p class="card-text" style="color: #7a7886">
                  <span class="mr-3" style="color: #6379f4; font-weight: bold"
                    >2
                  </span>
                  Type your security number on the ATM or E-Banking.
                </p>
              </div>
            </div>
            <div
              class="card mb-2"
              style="
                background: #ffffff;
                box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
                border-radius: 10px;
              "
            >
              <div class="card-body">
                <p class="card-text" style="color: #7a7886">
                  <span class="mr-3" style="color: #6379f4; font-weight: bold"
                    >3
                  </span>
                  Select “Transfer” in the menu
                </p>
              </div>
            </div>
            <div
              class="card mb-2"
              style="
                background: #ffffff;
                box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
                border-radius: 10px;
              "
            >
              <div class="card-body">
                <p class="card-text" style="color: #7a7886">
                  <span class="mr-3" style="color: #6379f4; font-weight: bold"
                    >4
                  </span>
                  Type the virtual account number that we provide you at the
                  top.
                </p>
              </div>
            </div>
            <div
              class="card mb-2"
              style="
                background: #ffffff;
                box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
                border-radius: 10px;
              "
            >
              <div class="card-body">
                <p class="card-text" style="color: #7a7886">
                  <span class="mr-3" style="color: #6379f4; font-weight: bold"
                    >5
                  </span>
                  Type the amount of the money you want to top up.
                </p>
              </div>
            </div>
            <div
              class="card mb-2"
              style="
                background: #ffffff;
                box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
                border-radius: 10px;
              "
            >
              <div class="card-body">
                <p class="card-text" style="color: #7a7886">
                  <span class="mr-3" style="color: #6379f4; font-weight: bold"
                    >6
                  </span>
                  Read the summary details
                </p>
              </div>
            </div>
            <div
              class="card mb-2"
              style="
                background: #ffffff;
                box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
                border-radius: 10px;
              "
            >
              <div class="card-body">
                <p class="card-text" style="color: #7a7886">
                  <span class="mr-3" style="color: #6379f4; font-weight: bold"
                    >7
                  </span>
                  Press transfer / top up
                </p>
              </div>
            </div>
            <div
              class="card mb-5"
              style="
                background: #ffffff;
                box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
                border-radius: 10px;
              "
            >
              <div class="card-body">
                <p class="card-text" style="color: #7a7886">
                  <span class="mr-3" style="color: #6379f4; font-weight: bold"
                    >8
                  </span>
                  You can see your money in Zwallet within 3 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
       <b-modal id="modalTopUp" title="Top Up Credit" centered hide-header hide-footer>
      <form @submit.prevent="submitTopUp()" class="my-4">
        <div class="row">
          <div class="col">
            <p class="font-weight-bold text-center mb-0">Input Amount :</p>
            <input
              v-model="amount"
              type="number"
              class="form-control border-0 text-main text-center"
              placeholder="0.00"
              style="
                font-size: 72px;
                overflow-y: hidden;
                color: var(--main-theme);
                resize: none;
                box-shadow: none;
              "
            />
            <div class="text-center">
              <button
                type="submit"
                class="btn btnMain font-weight-bold px-4 w-25 mr-2"
                style="border-radius: 10px"
              >
                Continue
              </button>
              <button
                type="button"
                @click="$bvModal.hide('modalTopUp')"
                class="btn btnSecondary font-weight-bold px-4 w-25 ml-2"
                style="border-radius: 10px"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </b-modal>
      <Footer />
    </div>
  </div>
</template>

<script>
import headers from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import { paymentMixin } from '../helpers/mixin'
import { mapActions } from 'vuex'
export default {
  mixins: [paymentMixin],
  components: {
    headers,
    Sidebar,
    Footer
  },
  data () {
    return {
      topup: '',
      amount: 0
    }
  },
  methods: {
    ...mapActions({
      transDetail: 'trans/detailTrans',
      addTrans: 'trans/addTrans'
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
            this.amount = 0
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
