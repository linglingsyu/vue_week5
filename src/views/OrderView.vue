<template>
  <div class="container">
    <div class="mt-4">
      <h1>我的結帳資料</h1>
      <div class="my-5 row justify-content-center">
        <v-form
          @submit="onSubmit"
          ref="form"
          class="col-md-6"
          v-slot="{ errors }"
        >
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <v-field
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email"
              rules="required|email"
            ></v-field>
            <error-message
              name="email"
              class="invalid-feedback"
            ></error-message>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <v-field
              id="name"
              name="name"
              type="text"
              label="姓名"
              class="form-control"
              :class="{ 'is-invalid': errors['name'] }"
              placeholder="請輸入姓名"
              rules="required"
            ></v-field>
            <error-message name="name" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <v-field
              id="tel"
              name="tel"
              label="電話"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['tel'] }"
              placeholder="請輸入電話"
            ></v-field>
            <error-message name="tel" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <v-field
              id="address"
              name="address"
              label="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['address'] }"
              placeholder="請輸入地址"
              rules="required"
            ></v-field>
            <error-message
              name="address"
              class="invalid-feedback"
            ></error-message>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea
              id="message"
              class="form-control"
              cols="30"
              rows="10"
              v-model="message"
            ></textarea>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-danger">送出訂單</button>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Field as vField, Form as vForm, ErrorMessage } from 'vee-validate'
import { mapActions, mapState } from 'pinia'
import cartStore from '@/store/cartStore.js'
export default {
  name: 'cartView',
  data() {
    return {
      message: '',
    }
  },
  mounted() {},
  components: {
    vForm,
    vField,
    ErrorMessage,
  },
  methods: {
    ...mapActions(cartStore, ['addOrder']),
    async onSubmit(values, { resetForm }) {
      const data = {
        user: values,
        message: this.message,
      }
      const res = await this.addOrder(data)
      if (res.data.success) {
        alert(res.data.message)
      }
      resetForm()
      this.message = ""
    },
  },
  computed: {
    ...mapState(cartStore, ['carts']),
  },
  watch: {},
}
</script>
