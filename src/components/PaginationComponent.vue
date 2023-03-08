<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
          <!-- if no previous page, disabled the button -->
          <li class="page-item" :class="{'disabled': current_page === 1}">
            <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="changePage(current_page - 1)">
                <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <!-- render pages, current page with active style -->
          <li
          class="page-item"
          v-for="(page, index) in total_pages"
          :key="index"
          :class="{'active': page === current_page}">
            <span class="page-link" v-if="page === current_page">{{ page }}</span>
            <a class="page-link" href="#" v-else @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <!-- if no next page, disabled the button -->
          <li class="page-item" :class="{'disabled': current_page === total_pages}">
            <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="changePage(current_page + 1)">
                <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
    </nav>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: ['current_page', 'total_pages'],
  methods: {
    changePage(page) {
      this.$emit('page-changed', page);
    },
  },
};
</script>
