<template>
  <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header text-white">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <img
                  v-if="product.image"
                  class="img-fluid"
                  :src="product.image"
                  alt="主要圖片"
                />
              </div>
              <hr />
              <div class="mb-2">
                <div
                  class="mb-3"
                  v-for="(img, index) in product.imagesUrl"
                  :key="'img' + index"
                >
                  <img
                    v-if="img.length > 0"
                    class="img-fluid"
                    style="width: 100px"
                    :src="img"
                    alt="圖片"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <h1 class="mb-3">{{ product.title }}</h1>
              <ul>
                <li>{{ product.content }}</li>
              </ul>
              <div class="d-flex align-items-center mb-3">
                <div>
                  <span class="fw-light">促銷價</span
                  ><span class="px-2 text-danger fs-2"
                    >{{ product.price }}
                  </span>
                  <span
                    class="px-1 text-muted text-decoration-line-through mx-2"
                    >{{ product.origin_price }}</span
                  >元
                </div>
              </div>
              <div class="row align-items-center mb-3">
                <div class="col row">
                  <label
                    for="qty"
                    class="col-2 col-form-label col-form-label-sm"
                    >購買數量</label
                  >
                  <div class="col-3">
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      value="1"
                      id="qty"
                      min="1"
                    />
                  </div>
                </div>
              </div>
              <div class="row align-items-center mb-3">
                <div class="col row">
                  <label
                    for="coupon"
                    class="col-2 col-form-label col-form-label-sm"
                    >使用優惠券</label
                  >
                  <div class="col-3">
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      id="coupon"
                    />
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <button type="button" class="btn btn-primary">
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import productStore from '@/store/productStore.js'
import { Modal } from 'bootstrap'
export default {
  name: 'productModal',
  mounted() {
    this.productModal = new Modal(this.$refs.productModal)
  },
  data() {
    return {
      product: {
        stock: '',
        title: '',
        category: '',
        origin_price: '',
        price: '',
        unit: '',
        description: '',
        content: '',
        is_enabled: 1,
        image: '',
        imagesUrl: [],
      },
      productModal: null,
    }
  },
  props: ['productData'],
  methods: {
    ...mapActions(productStore, ['updateProduct', 'upload']),
    openModal() {
      this.product = { ...this.productData }
      this.productModal.show()
    },
    async submitHandler() {
      const res = await this.updateProduct(this.action, this.product)
      if (res.status === 200) {
        this.productModal.hide()
      }
    },
    fileChange(e) {
      this.file = e.target.files[0]
    },
    async uploadImage() {
      if (!this.file) return false
      const formData = new FormData()
      formData.append('file-to-upload', this.file)
      const res = await this.upload(formData)
      if (res.data.success) {
        this.product.image = res.data.imageUrl
      } else {
        alert(res.data.message)
      }
    },
  },
  watch: {
    productData(newVal, oldVal) {
      this.product = newVal
      if (!this.product.imagesUrl) {
        this.product.imagesUrl = []
      }
    },
  },
}
</script>
