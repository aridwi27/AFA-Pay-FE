<template>
  <div class="card shadow-nm p-4 border-0" style="border-radius: 20px; width: 100%; height: 100%">
    <div>
      <span style="font-size: 15px; font-weight: 800">Search Reciever</span>
      <div class="form-group">
        <i class="fa fa-search position-absolute pl-3" style="color: #bdbbbb; padding-top: 10px"></i>
        <input v-model="searchName" @keyup="searchUser()" class="mt-3 form-control border-0"
          style="background: #f5f5f5; border-radius: 10px; padding-left: 40px" type="text"
          placeholder="Search reciever here" />
      </div>
      <div class="hideScroll" style="height:40vh;overflow-y:scroll">
        <div v-if="userSearch.lenght > 0">
          <div v-for="(user, index) in userSearch" :key="index">
            <div v-if="Number(user.id) !== Number(userId)" class="row card shadow-sm border-0 mt-2 p-2 mx-2">
              <div @click="createTrans(user.id, user.image, user.first_name, user.last_name, user.handphone)"
                class="d-flex ml-2">
                <img width="50px" :src="`${webURL}/images/${user.image}`" alt="image" />
                <div class="ml-2">
                  <div>
                    <span style="font-weight: 800" class="d-block">{{ user.first_name }}
                      {{ user.last_name }}
                    </span>
                  </div>
                  <span style="font-size: 12px" class="d-block">{{
            user.handphone
          }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <!-- {{paginationSearch}} -->
        <div class="row w-100 mt-4">
          <div class="col-2 d-flex justify-content-left">
            <p class="mb-0 my-auto">Page : {{ querySearch.page }}</p>
          </div>
          <div class="col-5 d-flex justify-content-center">
            <!-- <p class="mb-0 my-auto">Select :</p> -->
            <p v-for="(index, page) in paginationSearch.totalPage" :key="index" class="mb-0 btn btnMain mx-2"
              @click="getOrderLimitQuery(page + 1)">
              {{ page + 1 }}
            </p>
          </div>
          <div class="col-3">
            <b-form-select v-model="querySearch.sort" @change="getOrderLimitQuery(1)" size="sm"
              :options="optionSort">
            </b-form-select>
          </div>
          <div class="col-2">
            <b-form-select v-model="querySearch.limit" @change="getOrderLimitQuery(1)" size="sm"
              :options="optionLimit"></b-form-select>
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
      webURL: 'webURL',
      userId: 'auth/userId'
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
      this.$router.push('/transfer')
    },
    searchUser () {
      this.querySearch.name = this.searchName
      this.actionSearch(this.querySearch)
        .then((response) => {
          // console.log(response)
        })
        .catch((err) => {
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
