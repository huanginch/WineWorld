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
          單一麥芽威士忌和調和式威士忌有什麼差別? 價錢有差嗎?
        </button>
      </h2>
      <div
      id="collapseOne"
      class="accordion-collapse collapse show bg-info"
      aria-labelledby="headingOne"
      data-bs-parent="#accordionExample">
        <div class="accordion-body text-danger">
          「單一」是指單一間蒸餾廠，「麥芽」是指原料是麥芽。調和式則是混和了不同間酒廠的單一麥芽威士忌。因此單一麥芽威士忌比較能夠展現單一麥芽的風味特色。<br>
          通常單一麥芽威士忌的價格會比調和式威士忌貴，因為釀造單一麥芽威士忌的成本比較高，
          還有單一麥芽威士忌的稀有性也使得價格更高。調和式威士忌則是由多種不同的單一麥芽威士忌調配而成，能製作的量較大，成本相對較低，因此價格也相對較低。
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
          桶陳是什麼意思?
        </button>
      </h2>
      <div
      id="collapseTwo"
      class="accordion-collapse collapse bg-info text-danger"
      aria-labelledby="headingTwo"
      data-bs-parent="#accordionExample">
        <div class="accordion-body">
          是指威士忌陳年的方式之一，就是將威士忌陳年在木桶中，這樣的陳年方式可以使威士忌具有木桶香氣和口感，也能夠使威士忌具有褐色的顏色，通常威士忌桶成越久，酒越香，酒越貴。
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
         波本桶和雪莉桶是什麼?
        </button>
      </h2>
      <div
      id="collapseThree"
      class="accordion-collapse collapse bg-info text-danger"
      aria-labelledby="headingThree"
      data-bs-parent="#accordionExample">
        <div class="accordion-body">
          波本桶和雪莉桶是威士忌陳年中常用的木桶種類。波本桶是用波本橡木製成，波本橡木是來自西班牙的一種橡木，
          具有濃郁的香味，常用於釀造葡萄酒和威士忌。雪莉桶是用美國雪莉橡木製成，雪莉橡木具有清新的香味，常用於釀造威士忌。
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
          桶陳葡萄酒是什麼?和威士忌有關係嗎?
        </button>
      </h2>
      <div
      id="collapseFour"
      class="accordion-collapse collapse bg-info text-danger"
      aria-labelledby="headingFour"
      data-bs-parent="#accordionExample">
        <div class="accordion-body">
          桶陳葡萄酒是指葡萄酒在木桶中陳年的方式，通常葡萄酒在木桶中陳年可以增加酒的香氣和口感。
          和威士忌相比，桶成葡萄酒的陳年時間通常較短，主要是為了增加酒的香氣。而威士忌的桶陳則是為了使酒具有木桶的香氣和口感，陳年時間也比較長。
        </div>
      </div>
    </div>
  </div>
</template>
