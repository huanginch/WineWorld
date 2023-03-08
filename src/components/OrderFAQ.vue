<template>
  <div class="accordion text-white" id="accordionExample">
    <div class="accordion-item mb-6">
      <h2 class="accordion-header" id="headingOne">
        <button
        class="accordion-button fw-medium fs-4" type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseOne"
        aria-expanded="true"
        aria-controls="collapseOne">
            運費怎麼算?
        </button>
      </h2>
      <div
      id="collapseOne"
      class="accordion-collapse collapse show bg-info"
      aria-labelledby="headingOne"
      data-bs-parent="#accordionExample">
        <div class="accordion-body text-danger">
          全台滿3000免運費，未滿以100/一箱計算，離島運費120/一箱
        </div>
      </div>
    </div>
    <div class="accordion-item mb-6">
      <h2 class="accordion-header" id="headingTwo">
        <button
        class="accordion-button collapsed border-top border-info fw-medium fs-4"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseTwo"
        aria-expanded="false"
        aria-controls="collapseTwo">
          何時能收到貨?
        </button>
      </h2>
      <div
      id="collapseTwo"
      class="accordion-collapse collapse bg-info text-danger"
      aria-labelledby="headingTwo"
      data-bs-parent="#accordionExample">
        <div class="accordion-body">
          匯款後大約3~5個工作天會送達。
        </div>
      </div>
    </div>
    <div class="accordion-item mb-6">
      <h2 class="accordion-header" id="headingThree">
        <button
        class="accordion-button collapsed border-top border-info fw-medium fs-4"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseThree"
        aria-expanded="false"
        aria-controls="collapseThree">
         可以寄送到海外嗎?
        </button>
      </h2>
      <div
      id="collapseThree"
      class="accordion-collapse collapse bg-info text-danger"
      aria-labelledby="headingThree"
      data-bs-parent="#accordionExample">
        <div class="accordion-body">
            很抱歉，我們沒有提供海外運送服務。
        </div>
      </div>
    </div>
    <div class="accordion-item mb-6">
      <h2 class="accordion-header" id="headingFour">
        <button
        class="accordion-button collapsed border-top border-info fw-medium fs-4"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseFour"
        aria-expanded="false"
        aria-controls="collapseFour">
          我收到的貨有問題，該怎麼辦?
        </button>
      </h2>
      <div
      id="collapseFour"
      class="accordion-collapse collapse bg-info text-danger"
      aria-labelledby="headingFour"
      data-bs-parent="#accordionExample">
        <div class="accordion-body">
          請透過電話或Line與客服聯繫，我們將馬上為您處理
          電話: 0912256342
          Line: 0912256342
        </div>
      </div>
    </div>
    <div class="accordion-item mb-6">
      <h2 class="accordion-header" id="headingFive">
        <button
        class="accordion-button collapsed border-top border-info fw-medium fs-4"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseFive"
        aria-expanded="false"
        aria-controls="collapseFive">
          加入會員的差別?
        </button>
      </h2>
      <div
      id="collapseFive"
      class="accordion-collapse collapse bg-info text-danger"
      aria-labelledby="headingFive"
      data-bs-parent="#accordionExample">
        <div class="accordion-body">
          加入後才可購買商品，否則只能瀏覽。
        </div>
      </div>
    </div>
  </div>
</template>
