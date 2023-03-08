<template>
  <div id='deleteModal' class='modal text-black fade' tabindex='-1'>
    <div class='modal-dialog'>
      <div class='modal-content rounded-0'>
        <div class='modal-header'>
          <h5 class='modal-title'>再次確認</h5>
          <button
            type='button'
            class='btn-close'
            data-bs-dismiss='modal'
            aria-label='Close'
          ></button>
        </div>
        <div class='modal-body'>
          <p>{{ message }}</p>
        </div>
        <div class='modal-footer'>
          <button
            type='button'
            class='btn btn-secondary rounded-0'
            data-bs-dismiss='modal'
          >
            取消
          </button>
          <button
            type='button'
            class='btn btn-primary rounded-0'
            @click.prevent='
              hideModal();
              delFunc();
            '
          >
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteConfirmModal',
  props: ['message', 'delFunc'],
  data() {
    return {
      modal: null,
    };
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new window.bootstrap.Modal(
      document.getElementById('deleteModal'),
    );
  },
};
</script>
