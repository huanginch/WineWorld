<template>
    <div class="container pt-11">
        <h2 class="text-danger mb-5">會員專區</h2>
        <router-link to="/member/profile" class="fs-5">個人資料</router-link> |
        <router-link to="/member/orders" class="fs-5">訂單查詢</router-link> |
        <router-link to="/member/favorites" class="fs-5">我的收藏</router-link>
        <router-view></router-view>
    </div>
</template>
