<template>
    <div class="small-loading">
        <div class="spinner-border text-success" :class="{ 'd-none': !active }" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SmallLoading',
  props: ['active'],
};
</script>
