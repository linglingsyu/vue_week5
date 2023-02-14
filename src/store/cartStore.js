import { defineStore } from 'pinia'
import { API, api_path } from '@/helper/api.js'
export default defineStore('cartStore', {
  state: () => ({
    cartList: [],
    Loading: false,
  }),
  getters: {
    isLoading: ({ Loading }) => Loading,
    carts: ({ cartList }) => cartList,
  },
  actions: {
    async getCartList() {
      try {
        this.Loading = true
        const path = `/api/${api_path}/cart`
        const res = await API.get(path)
        // console.log(res)
        this.cartList = res.data.data.carts
        this.Loading = false
      } catch (error) {
        this.Loading = false
        console.dir(error)
        alert('error!')
      }
    },
    async updateCart(data) {
      try {
        this.Loading = true
        let path = `/api/${api_path}/cart`
        const res = await API.post(path, { data: data })
        await this.getCartList()
        this.Loading = false
        return res
      } catch (error) {
        console.dir(error)
        this.Loading = false
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
        this.Loading = true
        const path = `/api/${api_path}/cart/${id}`
        const res = await API.delete(path)
        this.Loading = false
        await this.getCartList()
        return res
      } catch (error) {
        this.Loading = false
        console.dir(error)
        alert('error!')
      }
    },
    async delAllCart() {
      try {
        this.Loading = true
        const path = `/api/${api_path}/carts`
        const res = await API.delete(path)
        this.Loading = false
        await this.getCartList()
        return res
      } catch (error) {
        this.Loading = false
        console.dir(error)
        alert('error!')
      }
    },
    async addOrder(data) {
      try {
        this.Loading = true
        const path = `/api/${api_path}/order`
        const res = await API.post(path, { data: data })
        this.Loading = false
        // console.log(res)
        return res
      } catch (error) {
        this.Loading = false
        console.dir(error)
        alert(error.response.data.message)
      }
    },
  },
})
