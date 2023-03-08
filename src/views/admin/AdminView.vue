<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-3 ps-0">
                <router-view name="aside"></router-view>
            </div>
            <div class="col-8">
                <router-view name="main"></router-view>
            </div>
        </div>
    </div>
</template>
