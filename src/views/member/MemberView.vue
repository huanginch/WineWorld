<template>
    <div class="container pt-11">
        <h2 class="text-danger mb-5">會員專區</h2>
        <RouterLink to="/member/profile" class="fs-5">個人資料</RouterLink> |
        <RouterLink to="/member/orders" class="fs-5">訂單查詢</RouterLink> |
        <RouterLink to="/member/favorites" class="fs-5">我的收藏</RouterLink>
        <RouterView></RouterView>
    </div>
</template>
