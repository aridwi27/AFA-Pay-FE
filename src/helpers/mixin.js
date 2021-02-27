import Swal from 'sweetalert2'
export const paymentMixin = {
  data () {
    return {
      confirmedId: 0,
      mixin_webURL: process.env.VUE_APP_WEBURL,
      mixin_apiURL: process.env.VUE_APP_APIURL,
      Toast: Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      }),
      querySearch: {
        name: '',
        page: 1,
        sort: 'asc',
        limit: 5
      },
      queryTrans: {
        id: Number(localStorage.getItem('id')),
        page: 1,
        sort: 'desc',
        limit: 5,
        order: 'created_at',
        range: 'YEAR',
        status: ''
      },
      arrMonth: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Desember']
    }
  },
  methods: {
    // Format Currency
    formatPrice (value) {
      return value.toLocaleString().replace(/,/g, '.')
    },
    formatDate (date) {
      const month = this.arrMonth[new Date(date).getDay()]
      const dates = new Date(date).getMonth() + 1
      const years = new Date(date).getFullYear()
      const time = new Date(date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      return (`${month} ${dates}, ${years} - ${time}`)
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
    swalConfirm (title, text, icon) {
      return new Promise((resolve, reject) => {
        Swal.fire({
          title,
          text,
          icon,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.isConfirmed) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
      })
    },
    swalLogout (title, text, icon) {
      return new Promise((resolve, reject) => {
        Swal.fire({
          title,
          text,
          icon,
          showCancelButton: true,
          confirmButtonColor: '#6379F4',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Logout'
        }).then((result) => {
          if (result.isConfirmed) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
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
    },
    linkTo (route) {
      if (this.$route.name !== route) {
        this.$router.push(`/${route}`)
      }
    }
  }
}
