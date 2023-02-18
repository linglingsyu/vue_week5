<template>
  <div class="container">
    <div class="mt-4">
      <h1>我的購物車列表</h1>
      <div class="text-end" v-if="tempProduct.length">
        <button
          class="btn btn-outline-danger"
          type="button"
          @click="clearCart(null)"
        >
          清空購物車
        </button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th>單價</th>
          </tr>
        </thead>

        <tbody>
          <template v-if="tempProduct">
            <tr v-for="cart in tempProduct">
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="clearCart(cart.id)"
                >
                  <i class="fas fa-spinner fa-pulse"></i>
                  x
                </button>
              </td>
              <td>
                {{ cart.product.title }}
                <div class="text-success">已套用優惠券</div>
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <input
                      min="1"
                      type="number"
                      class="form-control"
                      v-model="cart.qty"
                      @change="
                        updateCart(
                          {
                            product_id: cart.product.id,
                            qty: cart.qty,
                          },
                          cart.id
                        )
                      "
                    />
                    <span class="input-group-text" id="basic-addon2">{{
                      cart.product.unit
                    }}</span>
                  </div>
                </div>
              </td>
              <td class="">
                {{ cart.product.price }}
                <small class="text-success">折扣價：</small>
                {{ cart.qty * cart.product.price }}
              </td>
            </tr>
            <tr v-if="!tempProduct.length">
              <td class="text-center" colspan="4">購物車沒有資料</td>
            </tr>
          </template>
        </tbody>
        <tfoot v-if="tempProduct.length">
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ getTotal }}</td>
          </tr>
          <!-- <tr>
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">{{}}</td>
          </tr> -->
        </tfoot>
      </table>
      <div class="text-end" v-if="tempProduct.length">
        <a href="/vue_week5/order" class="btn btn-outline-danger">下一步</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '@/store/cartStore.js'
export default {
  name: 'cartView',
  data() {
    return {
      tempProduct: {},
    }
  },
  mounted() {
    this.getCartList()
  },

  methods: {
    ...mapActions(cartStore, [
      'getCartList',
      'delOneCart',
      'delAllCart',
      'updateCart',
    ]),
    clearCart(id) {
      if (id !== null) {
        this.delOneCart(id)
      } else {
        // delete all
        this.delAllCart()
      }
    },
  },
  computed: {
    ...mapState(cartStore, ['carts']),
    getTotal() {
      return this.carts.reduce((prev, current) => {
        prev += current.product.price * current.qty
        console.log(prev)
        return prev
      }, 0)
    },
  },
  watch: {
    carts() {
      this.tempProduct = this.carts
    },
  },
}
</script>
