<template>
  <div id="title-date-container">
    <div id="input-container">
      <input
        v-if="!hasPlan"
        type="text"
        placeholder="제목을 입력해주세요"
        v-model="planTitle"
      />
      <div v-else>
        <h2>{{ planStore.plan.title }}</h2>
      </div>
    </div>

    <div class="date date-container" v-if="!hasPlan">
      <div class="svg">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.8667 12.8L10.6667 7.33333L13 5C14 4 14.3333 2.66667 14 2C13.3333 1.66667 12 2 11 3L8.66667 5.33333L3.2 4.13333C2.86667 4.06667 2.6 4.2 2.46667 4.46667L2.26667 4.8C2.13333 5.13333 2.2 5.46667 2.46667 5.66667L6 8L4.66667 10H2.66667L2 10.6667L4 12L5.33333 14L6 13.3333V11.3333L8 10L10.3333 13.5333C10.5333 13.8 10.8667 13.8667 11.2 13.7333L11.5333 13.6C11.8 13.4 11.9333 13.1333 11.8667 12.8Z"
            stroke="black"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
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
      <span>~</span>
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
      <div id="confirm-btn" @click="addPlan"><p>설정</p></div>
    </div>

    <div v-else>
      <div id="calender">
        <!-- <div id="day-cnt"><p>Day1</p></div> -->
        <div class="date-container">
          <div class="svg">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 1.3335C6.36819 1.3335 6.66667 1.63197 6.66667 2.00016V2.66683H9.33333V2.00016C9.33333 1.63197 9.63181 1.3335 10 1.3335C10.3682 1.3335 10.6667 1.63197 10.6667 2.00016V2.66683H12.6667C13.403 2.66683 14 3.26378 14 4.00016V12.6668C14 13.4032 13.403 14.0002 12.6667 14.0002H3.33333C2.59695 14.0002 2 13.4032 2 12.6668V4.00016C2 3.26378 2.59695 2.66683 3.33333 2.66683H5.33333V2.00016C5.33333 1.63197 5.63181 1.3335 6 1.3335ZM5.33333 4.00016H3.33333V6.00016H12.6667V4.00016H10.6667V4.66683C10.6667 5.03502 10.3682 5.3335 10 5.3335C9.63181 5.3335 9.33333 5.03502 9.33333 4.66683V4.00016H6.66667V4.66683C6.66667 5.03502 6.36819 5.3335 6 5.3335C5.63181 5.3335 5.33333 5.03502 5.33333 4.66683V4.00016ZM12.6667 7.3335H3.33333V12.6668H12.6667V7.3335Z"
                fill="black"
              />
            </svg>
          </div>
          <Datepicker
            v-model="dp2"
            :ref="inputs.dp2"
            class="datepicker"
            :locale="locale"
            :weekStartsOn="0"
            :inputFormat="inputFormat"
            :lower-limit="dp2From"
            :upper-limit="dp2To"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineRefs } from "../../../utils/helper";
import { ref, reactive, defineComponent, watch, computed } from "vue";
import Datepicker from "vue3-datepicker";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { usePlanStore, useDateStore } from "../../../stores/store";

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
    let dp2 = ref(new Date());
    const dp2From = ref(new Date(now.setDate(now.getDate())));
    const dp2To = ref(new Date(now.setDate(now.getDate())));

    // [from, to]'s value before changing value
    let oldVal = "";

    // dynamic refs
    const inputs = defineRefs(["dp1", "dp2From", "dp2To", "dp2", "dp3"]);

    const clickCalIcon = (refId) => {
      const dp = inputs[refId].value;
      //   console.log(dp);
      dp.inputRef.focus();
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
        console.log(dpFrom.input + " ~ " + dpTo.input);

        // 기간 저장!!!!
        duration.value.from = dpFrom.input;
        duration.value.to = dpTo.input;
      }, 10);
    };
    const isTodayOver = (date) => {
      return date > new Date();
    };

    let duration = ref({ from: "", to: "" });
    const planTitle = ref("");
    const planStore = usePlanStore();

    const addPlan = () => {
      if (duration.value.from > duration.value.to) {
        alert("기간을 잘못 설정");
      } else if (planTitle.value == "") {
        alert("제목 입력");
      }
      // day1 날짜 설정
      else {
        dp2.value = new Date(duration.value.from); // 시작 날짜로 picker 설정
        // plan store 저장
        const plan = {
          title: planTitle.value,
          startSchedule: duration.value.from,
          endSchedule: duration.value.to,
          userId: "ssafy",
          planDetail: [],
        };
        planStore.addPlan(plan);
        planTitle.value = "";
        // console.log(planStore.plan);
      }
    };

    // 출력을 위한 것
    const dateStore = useDateStore();
    watch(dp2, (newDp2) => {
      const formattedDate = format(newDp2, "yyyy-MM-dd");
      dateStore.selectDate(formattedDate);
      // console.log("store 저장 : " + dateStore.date);
      // console.log(dp2From);
      // console.log(dp2To);
    });

    const hasPlan = computed(() => {
      const plan = planStore.plan;
      return plan ? Object.keys(plan).length > 0 : false;
    });

    return {
      picked,
      locale,
      inputFormat,
      inputs,
      clickCalIcon,
      dp2From,
      dp2To,
      dp2,
      setOldValue,
      validateFromTo,
      isTodayOver,
      addPlan,
      planTitle,
      hasPlan,
      planStore,
    };
  },
});
</script>

<style scoped>
#title-date-container {
  width: 20.8125rem;
}
h2 {
  font-size: 1.25rem;
  font-weight: 700;
  width: 13rem;
  text-align: center;
  padding: 1.2rem;
  background-color: white;
}
input {
  width: 100%;
  padding: 0.4rem 0;
  border: none;
  border-bottom: 0.0625rem solid #e6e3e3;
  outline: none;
  box-sizing: border-box;
  width: 13rem;
  background-color: white;
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
}
#input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 6.4rem;
}
p {
  text-align: center;
  margin: 0;
  padding: 0;
}
#day-cnt {
  font-weight: bold;
  color: #f29561;
  font-size: 0.75rem;
  padding: 0 0 0 1rem;
}
#confirm-btn {
  color: white;
  text-align: center;
  background-color: #6499e9;
  border-radius: 3px;
  width: 2.2rem;
  cursor: pointer;
  padding: 0.158rem;
  font-size: 0.6rem;
  margin-left: 0.5rem;
}
h3 {
  text-align: center;
  font-size: 1.25rem;
  /* color: #6499e9; */
  margin: 1rem 0 1.5rem 0;
  padding: 0;
}
span {
  font-size: 1rem;
  padding: 0;
  margin: 0;
  text-align: center;
}
#calender {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  /* padding: 0 1rem; */
  /* margin-top: 0.2rem; */
  /* height: 10.75rem; */
  /* height: 5rem; */
  /* background-color: #6499e921; */
}
.date-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 0 1rem;
}
.svg {
  margin-right: 0.2rem;
}
#check-svg {
  cursor: pointer;
}
</style>
