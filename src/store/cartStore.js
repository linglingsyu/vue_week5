import { defineStore } from 'pinia'
import { API, api_path } from '@/helper/api.js'
export default defineStore('cartStore', {
  state: () => ({
    cartList: [],
  }),
  getters: {
    carts: ({ cartList }) => cartList,
  },
  actions: {
    async getCartList() {
      try {
        const path = `/api/${api_path}/cart`
        const res = await API.get(path)
        console.log(res)
        this.cartList = res.data.data.carts
      } catch (error) {
        console.dir(error)
        alert('error!')
      }
    },
    async updateCart(data) {
      try {
        let path = `/api/${api_path}/cart`
        const res = await API.post(path, { data: data })
        await this.getCartList()
        return res
      } catch (error) {
        console.dir(error)
        if (error?.response?.data) {
          let str = ''
          for (const item of error.response.data.message) {
            str += item + '\n'
          }
          alert(str)
        }
      }
    },
    async delOneCart(id) {
      try {
        const path = `​/api​/${api_path}​/cart​/${id}`
        const res = await API.delete(path)
        return res
      } catch (error) {
        console.dir(error)
        alert('error!')
      }
    },
    async delAllCart() {
      try {
        const path = `/api​/${api_path}​/carts`
        const res = await API.delete(path)
        return res
      } catch (error) {
        console.dir(error)
        alert('error!')
      }
    },
  },
})
