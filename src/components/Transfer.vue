<template>
  <div>
    <div class="card shadow" style="border-radius:25px">
      <div class="card-body">
        <h5 class="font-weight-bold">Transfer Money</h5>
        <div class="card border-0 mb-3 shadow-sm">
          <div class="row no-gutters pr-1">
            <div class="col-md-1 my-auto mx-auto">
              <img src="../assets/image/Rectangle 25.png" class="card-img text-center" alt="...">
            </div>
            <div class="col-md-11">
              <div class="card-body">
                <p class="font-weight-bold mb-0">Samuel Suhi</p>
                <p class="card-text mb-0"><small class="text-muted">+6289blabla</small></p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <p class="text-secondary mb-0">Type the amount you want to transfer and then</p>
          <p class="text-secondary mb-0">press continue to the next steps.</p>
        </div>
        <div class="text-center">
          <div class="row">
            <textarea v-model="amount" @keyup="formatAmount()" class="form-control border-0 text-main text-center" placeholder="0.00"
              style="font-size:72px;overflow-y:hidden;color:var(--main-theme);resize:none;box-shadow: none;" rows="1"></textarea>
          </div>
          <p class="font-weight-bold mb-0 mb-4">Rp. 120000 Available</p>
          <div class="row mt-4">
            <div class="col-3"></div>
            <div class="col-6">
              <div class="input-group mb-3 text-secondary">
                <div class="input-group-prepend ">
                  <span class="input-group-text bg-white border-top-0 border-left-0 border-right-0"><i
                      class="fas fa-pencil-alt"></i></span>
                </div>
                <input type="text" class="form-control border-top-0 border-left-0 border-right-0"
                  placeholder="Add some notes">
              </div>
            </div>
            <div class="col-3"></div>
          </div>
        </div>
        <div class="text-right">
          <button class="btn btnMain font-weight-bold px-4" style="border-radius:10px">Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { paymentMixin } from '../helpers/mixin'
export default {
  mixins: [paymentMixin],
  data () {
    return {
      amount: 0
    }
  },
  methods: {
    formatAmount () {
      this.amount = this.formatPrice(this.amount)
    }
  }
}
</script>

<style>

</style>
