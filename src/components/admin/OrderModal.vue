<template>
    <div
    class="modal fade"
    id="orderModal"
    tabindex="-1"
    aria-labelledby="orderModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content rounded-0">
            <div class="modal-header rounded-0 bg-secondary text-white">
                <h5 class="modal-title" id="orderModalLabel">訂單編號: {{ tempOrder.id }}</h5>
                <button
                type="button"
                class="btn-close bg-white rounded-0"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <VForm v-slot="{ errors }" @submit="submit">
                    <div class="mb-3">
                        <p>訂購人</p>
                        <div class="mb-3 d-flex justify-content-between">
                            <div>
                                <label for="orderUserName" class="form-label">姓名</label>
                                <VField
                                name="orderUserName"
                                v-model="tempOrder.user.name"
                                type="text"
                                class="form-control"
                                id="orderUserName"
                                rules="required"
                                :class="{
                                    'is-invalid': errors['orderUserName'],
                                    'is-valid': !errors['orderUserName']
                                    && tempOrder.user.name,
                                }"
                                >
                                </VField>
                                <ErrorMessage name="orderUserName"></ErrorMessage>
                            </div>
                            <div>
                                <label for="orderUserEmail" class="form-label">Email</label>
                                <VField
                                name="orderUserEmail"
                                v-model="tempOrder.user.email"
                                type="text"
                                class="form-control"
                                id="orderUserEmail"
                                rules="email|required"
                                :class="{
                                    'is-invalid': errors['orderUserEmail'],
                                    'is-valid': !errors['orderUserEmail']
                                    && tempOrder.user.email,
                                }"
                                ></VField>
                                <ErrorMessage name="orderUserEmail"></ErrorMessage>
                            </div>
                            <div>
                                <label for="orderUserTel" class="form-label">電話</label>
                                <VField
                                name="orderUserTel"
                                v-model="tempOrder.user.tel"
                                type="text"
                                class="form-control"
                                id="orderUserTel"
                                rules="numeric|required"
                                :class="{
                                    'is-invalid': errors['orderUserTel'],
                                    'is-valid': !errors['orderUserTel']
                                    && tempOrder.user.tel,
                                }"
                                ></VField>
                                <ErrorMessage name="orderUserTel"></ErrorMessage>
                            </div>
                        </div>
                        <label for="orderUserAddress" class="form-label">地址</label>
                        <VField
                        name="orderUserAddress"
                        v-model="tempOrder.user.address"
                        type="text"
                        class="form-control"
                        id="orderUserAddress"
                        rules="required"
                        :class="{
                            'is-invalid': errors['orderUserAddress'],
                            'is-valid': !errors['orderUserAddress']
                            && tempOrder.user.address,
                        }"
                        ></VField>
                        <ErrorMessage name="orderUserAddress"></ErrorMessage>
                    </div>
                    <hr>
                    <div class="mb-3">
                        <p>訂購商品</p>
                        <table class="table text-center align-middle">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>商品名稱</th>
                                    <th>數量</th>
                                    <th>單價</th>
                                    <th>小計</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="product in tempOrder.products" :key="product.id">
                                    <td>
                                        <button type="button" class="btn">
                                            <iconify-icon
                                            icon="material-symbols:delete-outline-sharp"
                                            class="text-primary"
                                            >
                                            </iconify-icon>
                                        </button>
                                    </td>
                                    <td>{{ product.product.title }}</td>
                                    <td>{{ product.qty }}</td>
                                    <td>{{ product.product.price }}</td>
                                    <td>{{ product.total }}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="4" class="text-end">總計:</td>
                                    <td>{{ tempOrder.total }}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div class="mb-3">
                        <label for="orderMessage" class="form-label">顧客留言</label>
                        <textarea
                        name="orderMessage"
                        id="orderMessage"
                        class="form-control"
                        disabled
                        :value="tempOrder.message"
                        ></textarea>
                    </div>
                    <div class="mb-3 d-flex justify-content-between align-items-center">
                        <div>
                            <p class="mb-0">總數量: {{ tempOrder.num }}</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <p class="mb-0" style="min-width: 100px;">訂單狀態:</p>
                            <select
                            v-model="tempOrder.status"
                            class="form-select"
                            default="0"
                            aria-label="Default select example">
                                <option value="0">已成立</option>
                                <option value="1">未處理</option>
                                <option value="2">已出貨</option>
                                <option value="3">已完成</option>
                            </select>
                        </div>
                        <p class="mb-0">付款狀態: {{ tempOrder.is_paid ? "已付款" : "未付款" }}</p>
                    </div>
                    <hr>
                    <div class="mb-3">
                        <label for="messages" class="form-label">店家留言</label>
                        <textarea
                        v-model="tempOrder.messages"
                        class="form-control" id="messages"
                        rows="3"></textarea>
                    </div>
                </VForm>
            </div>
            <div class="modal-footer">
                <button
                type="button"
                class="btn btn-outline-primary"
                data-bs-dismiss="modal">
                    取消
                </button>
                <button
                type="button"
                class="btn btn-secondary"
                @click="submit();
                this.closeModal();
                ">修改</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'orderModal',
  props: ['order'],
  data() {
    return {
      modal: null,
      tempOrder: {
        products: {},
        user: {},
      },
    };
  },
  watch: {
    order: {
      handler() {
        this.tempOrder = JSON.parse(JSON.stringify(this.order));
      },
      deep: true,
    },
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    submit() {
      this.$emit('update-order', this.tempOrder);
    },
  },
  mounted() {
    this.modal = new window.bootstrap.Modal(document.getElementById('orderModal'));
  },
};
</script>
