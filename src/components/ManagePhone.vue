<template>
  <div>
    <div class="card shadow-nm" style="border-radius: 25px">
      <div class="card-body px-5">
        <h5 class="font-weight-bold mb-4">Manage Phone Number</h5>
        <p class="text-secondary w-50 mb-2">
          You can only delete the phone number and then you must add another
          phone number.
        </p>
        <!-- ConfirmPin -->
        <form action="" class="my-5">
          <div class="row">
            <div class="col-12">
              <div class="form-group mb-5">
                <label class="text-secondary">Primary</label>
                <div class="input-group mb-3 text-secondary">
                  <input
                    v-if="detUser.handphone === '+62'"
                    readonly
                    type="text"
                    value="-"
                    class="font-weight-bold classname form-control border-0 shadow-sm"
                  />
                  <input
                    v-else
                    readonly
                    type="text"
                    :value="detUser.handphone"
                    class="font-weight-bold classname form-control border-0 shadow-sm"
                  />
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white border-0 shadow-sm"
                      ><i
                        @click.prevent="delNumber"
                        class="far fa-trash-alt"
                        style="cursor: pointer"
                      ></i
                    ></span>
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
import { mapActions, mapGetters } from 'vuex'
import { paymentMixin } from '../helpers/mixin'
export default {
  mixins: [paymentMixin],
  data () {
    return {
      code: 0,
      newCode: 0
    }
  },
  computed: {
    ...mapGetters({
      detUser: 'auth/detailUser'
    })
  },
  methods: {
    ...mapActions({
      delPhone: 'auth/updateUser',
      actionsDetUser: 'auth/userDetail'
    }),
    formatAmount () {
      this.amount = this.formatPrice(this.amount)
    },
    delNumber () {
      if (this.detUser.handphone === '+62') {
        this.swalAlert('You don\'t have active phone number', '', 'info')
      } else {
        const data = {
          handphone: '+62'
        }
        this.delPhone(data).then(() => {
          this.swalAlert('Successfully delete number', '', 'success')
          this.actionsDetUser()
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style>
</style>
