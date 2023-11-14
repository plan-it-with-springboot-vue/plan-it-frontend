<template>
  <div style="width: 100%">
    <!-- <p>1. Basic usage</p>
    <div class="date">
      <font-awesome-icon
        icon="fa-solid fa-calendar-days"
        transform="down-2.5 right-20"
        style="z-index: 1; cursor: default"
        @click="clickCalIcon('dp1')"
      />
      <Datepicker
        v-model="picked"
        :ref="inputs.dp1"
        class="datepicker"
        :locale="locale"
        :weekStartsOn="0"
        :inputFormat="inputFormat"
        :clearable="true"
      />
      <button type="button" @click="getCalValue('dp1')">Get Value</button>
    </div>

    <hr /> -->

    <p>2. Upper and lower limits</p>
    <div class="date">
      <span>From:</span>
      <Datepicker
        v-model="dp2From"
        :ref="inputs.dp2From"
        class="datepicker"
        :locale="locale"
        :weekStartsOn="0"
        :inputFormat="inputFormat"
        @focus="setOldValue($event.target.value)"
        @update:modelValue="validateFromTo('from', 'dp2From', 'dp2To')"
      />
      <span style="margin-left: 20px">To:</span>
      <Datepicker
        v-model="dp2To"
        :ref="inputs.dp2To"
        class="datepicker"
        :locale="locale"
        :weekStartsOn="0"
        :inputFormat="inputFormat"
        @focus="setOldValue($event.target.value)"
        @update:modelValue="validateFromTo('to', 'dp2From', 'dp2To')"
      />
    </div>
    <div
      style="
        margin-top: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <Datepicker
        v-model="dp2"
        :ref="inputs.dp2"
        class="datepicker"
        :locale="locale"
        :weekStartsOn="0"
        :inputFormat="inputFormat"
        :lower-limit="dp2From"
        :upper-limit="dp2To"
        :clearable="true"
      />
    </div>

    <hr />

    <!-- <p>3. Disabled dates</p>
    <div class="date">
      <font-awesome-icon
        icon="fa-solid fa-calendar-days"
        transform="down-2.5 right-20"
        style="z-index: 1; cursor: default"
        @click="clickCalIcon('dp3')"
      />
      <Datepicker
        v-model="dp3"
        :ref="inputs.dp3"
        class="datepicker"
        :locale="locale"
        :weekStartsOn="0"
        :inputFormat="inputFormat"
        :disabledDates="{ predicate: isTodayOver }"
      />
    </div> -->
  </div>
</template>

<script>
import { ref, reactive, defineComponent, watch } from "vue";
// vue3-datepicker
import Datepicker from "vue3-datepicker";
import { ko } from "date-fns/locale";
import { defineRefs } from "../../../utils/helper";

export default defineComponent({
  name: "App",
  components: {
    Datepicker,
  },
  setup() {
    // :weekStartsOn="0" 'Sunday' is first
    const picked = ref(new Date());
    const locale = reactive(ko);
    const inputFormat = ref("yyyy-MM-dd");

    // dp2
    const now = new Date();
    const dp2 = ref(new Date());
    const dp2From = ref(new Date(now.setDate(now.getDate() - 7)));
    const dp2To = ref(new Date(now.setDate(now.getDate() + 14)));

    // 출력을 위한 것
    watch(dp2, (newDp2) => {
      console.log(newDp2);
      // console.log(dp2From);
      // console.log(dp2To);
    });

    console.log(dp2);
    // [from, to]'s value before changing value
    let oldVal = "";

    // dp3
    const dp3 = ref(new Date());

    // refs
    const datepicker1 = ref(null);
    // dynamic refs
    const inputs = defineRefs(["dp1", "dp2From", "dp2To", "dp2", "dp3"]);

    const clickCalIcon = (refId) => {
      const dp = inputs[refId].value;
      //   console.log(dp);
      dp.inputRef.focus();
    };
    const getCalValue = (refId) => {
      //   console.log(refId);

      console.log(datepicker1.value.input);
      // ref="datepicker1"

      // const dp = inputs[refId].value;
      //   console.log(dp);
      //   alert(dp.input);
    };
    const setOldValue = (val) => {
      // 예전 날짜 출력
      console.log(val);
      oldVal = val;
    };
    const validateFromTo = (target, refFrom, refTo) => {
      setTimeout(() => {
        const dpFrom = inputs[refFrom].value;
        const dpTo = inputs[refTo].value;
        //// 요기!!!! From To!!!!
        // alert(dpFrom.input + " ~ " + dpTo.input);

        if (dpFrom.input > dpTo.input) {
          alert("Validation Error!!");

          //새로운 날짜 계산?
          let date = null;
          if (oldVal) {
            const arrOldVal = oldVal.split("-");
            date = new Date(
              Number(arrOldVal[0]),
              Number(arrOldVal[1]) - 1,
              Number(arrOldVal[2])
            );
          }
          //   console.log(date);

          if (target === "from") {
            dp2From.value = date;
          } else if (target === "to") {
            dp2To.value = date;
          }
          return;
        }
      }, 10);
    };
    const isTodayOver = (date) => {
      return date > new Date();
    };

    return {
      picked,
      locale,
      inputFormat,
      // datepicker1,
      inputs,
      clickCalIcon,
      getCalValue,
      dp2From,
      dp2To,
      dp2,
      setOldValue,
      validateFromTo,
      dp3,
      isTodayOver,
    };
  },
});
</script>

<style scoped>
div {
  text-align: center;
}
div.date {
  display: inline-flex;
}
</style>
