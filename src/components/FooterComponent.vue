<template>
    <section>
        <div class="footer container text-info">
            <div
            class="d-flex justify-content-between align-items-center border-2
            border-bottom border-info pt-5 pb-3 mb-3">
                <div class="d-flex flex-column">
                    <p>聯絡我們</p>
                    <a href="tel:+886-9-12345678">0912345678</a>
                    <a
                    href="mailto:huanginch329@gmail.com">huanginch329@gmail.com</a>
                </div>
                <p class="wineworld text-primary fs-5">Wine World</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <p class="text-center">
                    copyright @ 2023 Design:Selina / Code:int
                </p>
                <ul class="d-flex list-unstyled align-middle">
                    <li><a id="line" href="#" class="fs-4">
                        <iconify-icon icon="mingcute:line-app-fill"></iconify-icon>
                    </a></li>
                    <li><a id="fb" href="#" class="fs-4">
                        <iconify-icon icon="ri:facebook-circle-fill"></iconify-icon>
                    </a></li>
                    <li><a id="github" href="#" class="fs-4">
                        <iconify-icon icon="mdi:github"></iconify-icon>
                    </a></li>
                </ul>
            </div>
            <div v-if="isHome" class="expand-padding"></div>
        </div>
    </section>
</template>

<script>
export default {
  name: 'FooterComponent',
  props: ['isHome'],
};
</script>

<style>
.wineworld {
    font-family: Elephant, cursive;
}

.footer a {
    color: #535353
}

.footer a:hover {
    transition: all 0.3s ease-in-out;
    color: #fff;
}

.expand-padding {
    height: 100px;
}
</style>
