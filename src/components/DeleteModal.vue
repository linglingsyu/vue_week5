<template>
  <div
    ref="delProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="submitHandler">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
</template>

<script>
import { mapActions } from 'pinia'
import productStore from '@/store/productStore.js'
import { Modal } from 'bootstrap'
export default {
  name: 'delProductModal',
  mounted() {
    this.Modal = new Modal(this.$refs.delProductModal)
  },
  data() {
    return {
      Modal: null,
    }
  },
  props: ['productId'],
  methods: {
    ...mapActions(productStore, ['delProduct']),
    openModal() {
      this.Modal.show()
    },
    async submitHandler() {
      const res = await this.delProduct(this.productId)
      if (res.status === 200) this.Modal.hide()
    },
  },
}
</script>
