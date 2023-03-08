<template>
    <div class="notfound text-center mt-10">
        <h1 class="mb-5">找不到頁面 :(</h1>
        <p>輸入的網址可能出錯了喔</p>
        <router-link to="/" class="text-decoration-underline">回首頁</router-link>
    </div>
</template>

<style lang="scss">
.notfound {

    h1 {
        font-size: 4.5rem;
    }

    p {
        font-size: 1.5rem;
    }
}
</style>
