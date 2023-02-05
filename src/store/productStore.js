import { defineStore } from 'pinia'
import { API, api_path } from '@/helper/api.js'
export default defineStore('productStore', {
  state: () => ({
    productList: [],
    nowPage: 1,
    limit: 10,
  }),
  getters: {
    products: ({ productList }) => productList,
  },
  actions: {
    async getProductList() {
      try {
        const path = `api/${api_path}/products/all`
        const res = await API.get(path)
        this.productList = res.data.products
      } catch (error) {
        console.dir(error)
        alert('error!')
      }
    },
    changePage(nowPage = 1) {
      this.nowPage = nowPage
    },
    async updateProduct(action, productData) {
      try {
        let path = `api/${api_path}/admin/product`
        let method = 'post'
        if (action === 'edit') {
          path += '/' + productData.id
          method = 'put'
          delete productData.id
        }
        const res = await API[method](path, { data: productData })
        await this.getProductList()
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
    async delProduct(id) {
      try {
        const path = `/api/${api_path}/admin/product/${id}`
        const res = await API.delete(path)
        delete this.productList[id]
        return res
      } catch (error) {
        console.dir(error)
        alert('error!')
      }
    },
    async upload(formdata) {
      try {
        const path = `/api/${api_path}/admin/upload`
        const res = await API.post(path, formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        return res
      } catch (error) {
        console.dir(error)
        alert('upload fail!')
      }
    },
  },
})
