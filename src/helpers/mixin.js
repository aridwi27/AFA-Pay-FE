import Swal from 'sweetalert2'
export const mixins = {
  data () {
    return {
      webURL: process.env.VUE_APP_WEBURL,
      apiURL: process.env.VUE_APP_APIURL,
      Toast: Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      })
    }
  },
  methods: {
    // Format Currency
    formatPrice (value) {
      return value.toLocaleString().replace(/,/g, '.')
    },
    swalToast (icon, title) {
      this.Toast.fire({
        icon,
        title
      })
    },
    swalAlert (title, text, icon) {
      Swal.fire({
        icon,
        title,
        text
      })
    },
    swalLoading (title) {
      Swal.fire({
        title: title,
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading()
        }
      })
    },
    swalLoadingClose () {
      Swal.close()
    }
  }
}