import { defineStore } from 'pinia'
import { API } from '@/helper/api.js'
const api_path = 'elsasyu'
export default defineStore('loginStore', {
  state: () => ({}),
  getters: {},
  actions: {
    async login(data) {
      try {
        // console.log(data)
        const res = await API.post('admin/signin', data)
        const { token, expired } = res.data
        await this.setCookie(token, expired)
        location.href = '/vue_week4/product'
        // this.$router.push({ name: 'Home' })
      } catch (error) {
        alert('登入失敗')
        console.dir(error)
      }
    },
    setCookie(token, expired) {
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
    },
    async checkLogin() {
      try {
        const res = await API.post('api/user/check')
        return res.data.success
      } catch (error) {
        console.dir(error)
        return false
      }
    },
  },
})
