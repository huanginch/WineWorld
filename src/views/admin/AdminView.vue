<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-3 ps-0">
                <RouterView name="aside"/>
            </div>
            <div class="col-8">
                <RouterView name="main"/>
            </div>
        </div>
    </div>
</template>
