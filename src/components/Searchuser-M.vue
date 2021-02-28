<template>
<div>
   <div class="card w-100 bg-theme text-white shadow-nm"
    style="border-bottom-left-radius: 25px;border-bottom-right-radius: 25px">
    <div class="card-body mt-3">
      <h5 @click="linkTo('home')" class="font-weigh-bold"><i class="fas fa-arrow-left mr-4"></i> Find Receiver</h5>
    <div class="form-group">
        <i class="fa fa-search position-absolute pl-3" style="color: #bdbbbb; padding-top: 10px"></i>
        <input v-model="searchName" @keyup="searchUser()" class="mt-3 form-control border-0"
          style="background: #f5f5f5; border-radius: 10px; padding-left: 40px" type="text"
          placeholder="Search reciever here" />
      </div>
    </div>
  </div>
  <div class="card shadow-nm p-4 border-0" style="border-radius: 20px; width: 100%; height: 100%">
    <div>
      <span style="font-size: 15px; font-weight: 800">Search Reciever</span>
      <div class="hideScroll" style="min-height:40vh;overflow-y:scroll">
        <div v-if="isLoading" class="row w-100">
          <div class="col-12 py-5 my-5 text-center">
            <b-spinner style="width: 4rem; height: 4rem;" variant="info"></b-spinner>
            <h5 class="mt-4">Preparing Your Data ...</h5>
          </div>
        </div>
        <div v-else-if="userSearch.length < 1" class="row w-100">
          <div class="col-12 py-5 my-5 text-center">
            No Result
          </div>
        </div>
        <div v-else style="height:50vh;overflow-y:scroll" class="hideScroll">
          <div v-for="(user, index) in userSearch" :key="index">
            <div v-if="Number(user.id) !== Number(loginId)" class="row card shadow-sm border-0 mt-2 p-2 mx-2">
              <div @click="createTrans(user.id, user.image, user.first_name, user.last_name, user.handphone)"
                class="d-flex ml-2">
                <img width="50px" :src="`${webURL}/images/${user.image}`" alt="image" />
                <div class="ml-2">
                  <div>
                    <span style="font-weight: 800" class="d-block">{{ user.first_name }}
                      {{ user.last_name }}
                    </span>
                  </div>
                  <span v-if="user.handphone === '+62-' || user.handphone === '+62'" style="font-size: 12px" class="d-block text-danger font-italic">No Phone Number Detected</span>
                  <span v-else style="font-size: 12px" class="d-block">{{ user.handphone }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- {{paginationSearch}} -->
      <div class="row w-100 mt-4">
        <div class="col-12 col-lg-6 col-sm-6 hideScroll text-center mb-4 mb-lg-0" style="overflow-x:scroll">
              <b-form-radio-group id="btn-radios-2" @change="searchUser()" v-model="querySearch.page"
                button-variant="outline-primary" :options="paginationUser" buttons></b-form-radio-group>
          </div>
        <div class="col-6 col-lg-3 col-md-3">
          <b-form-select v-model="querySearch.sort" @change="getOrderLimitQuery(1)" size="sm" :options="optionSort">
          </b-form-select>
        </div>
        <div class="col-6 col-lg-3 col-md-3">
          <b-form-select v-model="querySearch.limit" @change="getOrderLimitQuery(1)" size="sm" :options="optionLimit">
          </b-form-select>
        </div>
      </div>
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
      loginId: localStorage.getItem('id'),
      isLoading: true,
      searchName: '',
      optionLimit: [
        { value: 5, text: 'Limit 5' },
        { value: 10, text: 'Limit 10' },
        { value: 15, text: 'Limit 15' }
      ],
      optionSort: [
        { value: 'asc', text: 'Ascending' },
        { value: 'desc', text: 'Descending' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      userSearch: 'auth/userSearch',
      paginationSearch: 'auth/paginationSearch',
      paginationUser: 'auth/paginationUser',
      webURL: 'webURL'
    })
  },
  methods: {
    ...mapActions({
      actionSearch: 'auth/searchUser',
      actionSelect: 'auth/selectTarget'
    }),
    createTrans (id, image, firstName, lastName, handphone) {
      const data = {
        id,
        image,
        first_name: firstName,
        last_name: lastName,
        handphone
      }
      this.actionSelect(data)
      this.linkTo('transfer')
    },
    searchUser () {
      this.isLoading = true
      this.querySearch.name = this.searchName
      this.actionSearch(this.querySearch)
        .then((response) => {
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
          console.log(err)
        })
    },
    getOrderLimitQuery (page) {
      this.querySearch.page = page
      this.searchUser()
    }
  },
  mounted () {
    this.searchUser()
  }
}
</script>
