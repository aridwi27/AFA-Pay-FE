<template>
  <div>
    <div class="card shadow-nm" style="border-radius:25px">
      <div class="card-body px-5">
        <h5 class="font-weight-bold mb-4">Manage Phone Number</h5>
        <p class="text-secondary w-50 mb-2">You can only delete the phone number and then you must add another phone number.
        </p>
        <!-- ConfirmPin -->
        <form action="" class="my-5">
          <div class="row">
            <div class="col-12">
              <div class="form-group mb-5">
              <label class="text-secondary">Primary</label>
                <div class="input-group mb-3 text-secondary">
                  <input readonly type="text" value="+62 813 9387 7946" class="font-weight-bold classname form-control border-0 shadow-sm" >
                  <div class="input-group-prepend ">
                    <span class="input-group-text bg-white border-0 shadow-sm"><i class="far fa-trash-alt"></i></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
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
      code: 0,
      newCode: 0
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
