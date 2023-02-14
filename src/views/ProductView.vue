<template>
  <loading :active="isLoading" />

  <div class="container">
    <div class="mt-4">
      <h1>精選產品</h1>
      <div class="row g-3">
        <div
          class="col-4 flex-grow-0"
          v-for="product in products"
          :key="product.id"
        >
          <div class="card h-100">
            <img
              :src="product.image"
              style="width: 200px"
              class="card-img-top"
              alt="圖片"
            />
            <div class="card-body">
              <h5 class="card-title">{{ product.title }}</h5>
              <p class="card-text">
                {{ product.description }}
              </p>
              <a
                href="#"
                class="btn btn-primary"
                @click.prevent="viewDetail(product)"
                >查看細節</a
              >
              <a
                href="#"
                class="btn btn-outline-primary mx-2"
                @click.prevent="addCart(product.id)"
                >加入購物車</a
              >
              <!-- <a href="#" class="btn btn-outline-danger">直接購買</a> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-5 row justify-content-center">
      <!-- <v-form ref="form" class="col-md-6" v-slot="{ errors }">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <v-field
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
          ></v-field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <v-field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
          ></v-field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <v-field
            id="tel"
            name="電話"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
          ></v-field>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <v-field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
          ></v-field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
            id="message"
            class="form-control"
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
      </v-form> -->
    </div>
  </div>
  <productModal :productData="tempProduct" ref="productModal"></productModal>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import productStore from '@/store/productStore.js'
import cartStore from '@/store/cartStore.js'
import productModal from '@/components/ProductModal.vue'
export default {
  name: 'productView',
  data() {
    return {
      tempProduct: {},
    }
  },
  mounted() {
    this.getProductList()
    console.log(this.isLoading)
  },
  components: {
    productModal,
  },
  methods: {
    ...mapActions(productStore, ['getProductList']),
    ...mapActions(cartStore, ['updateCart']),
    viewDetail(product) {
      this.tempProduct = product
      this.$refs.productModal.openModal()
      console.log(product)
    },
    async addCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty: qty,
      }
      const res = await this.updateCart(data)
      if (res.data.success) {
        alert('成功加入購物車')
      } else {
        alert('加入購物車失敗')
      }
    },
  },
  computed: {
    ...mapState(productStore, ['products', 'isLoading']),
    ...mapState(cartStore, ['isLoading']),
  },
  watch: {},
}
</script>
