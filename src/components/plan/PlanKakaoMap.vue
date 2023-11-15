<template>
  <div id="map-container">
    <div id="map"></div>
  </div>
</template>

<script setup>
import { toRaw, ref, onMounted, watch } from "vue";
import { useLocation, useMapStore } from "../../stores/store";

const locationStore = useLocation();

//생성한 map정보를 담을 곳(반응형 아니어도 된다는데....우선 반응형으로 만들었음)
const map = ref(null);
//임시 마커 정보1
// const markerPositions1 = ref([
//   [33.452278, 126.567803],
//   [33.452671, 126.574792],
//   [33.451744, 126.572441],
// ]);
// //임시 마커 정보2
// const markerPositions2 = ref([
//   [37.499590490909185, 127.0263723554437],
//   [37.499427948430814, 127.02794423197847],
//   [37.498553760499505, 127.02882598822454],
//   [37.497625593121384, 127.02935713582038],
//   [37.49629291770947, 127.02587362608637],
//   [37.49754540521486, 127.02546694890695],
//   [37.49646391248451, 127.02675574250912],
// ]);
//생성한 마커를 담을 변수
const markers = ref([]);
//마커위에 info창 띄울 때 필요
const infowindow = ref(null);

//카카오map을 생성해서 화면에 반영하기 위한 initMap 메소드

const positions = ref([]);
// const location = locationStore.location;
const options = ref({});

//mounted에서 해당 메소드를 이용해서 지도를 생성할 예정
function initMap() {
  const container = document.getElementById("map");

  options.value = {
    center: new kakao.maps.LatLng(
      locationStore.location.latitude,
      locationStore.location.longitude
      // 38.47884469,
      // 128.4391216
    ), // 지도의 중심좌표
    level: 8, // 지도의 확대 레벨
  };

  //지도 객체를 등록합니다.
  //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
  map.value = new kakao.maps.Map(container, options.value);

  // Create the positions array by mapping over selectedLocation
  // const positions = selectedLocation.map((location) => ({
  //   content: `<div>${location.title}</div>`,
  //   latlng: new kakao.maps.LatLng(
  //     locationStore.location.latitude,
  //     locationStore.location.longitude
  //   ),
  // }));

  const positions = {
    content: `<div>${location.title}</div>`,
    latlng: new kakao.maps.LatLng(
      locationStore.location.latitude,
      locationStore.location.longitude
    ),
  };

  // for (var i = 0; i < positions.value.length; i++) {
  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    map: map.value, // 마커를 표시할 지도
    // position: positions[i].latlng, // 마커의 위치
    position: positions.latlng, // 마커의 위치
  });

  // 마커에 표시할 인포윈도우를 생성합니다
  infowindow.value = new kakao.maps.InfoWindow({
    // content: positions[i].content, // 인포윈도우에 표시할 내용
    content: positions.content, // 인포윈도우에 표시할 내용
  });

  // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
  // 이벤트 리스너로는 클로저를 만들어 등록합니다
  // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
  kakao.maps.event.addListener(
    marker,
    "mouseover",
    makeOverListener(map.value, marker, infowindow.value)
  );
  kakao.maps.event.addListener(
    marker,
    "mouseout",
    makeOutListener(infowindow.value)
  );
  // }

  // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
  function makeOverListener(map, marker, infowindow) {
    return function () {
      infowindow.open(map, marker);
    };
  }

  // 인포윈도우를 닫는 클로저를 만드는 함수입니다
  function makeOutListener(infowindow) {
    return function () {
      infowindow.close();
    };
  }
}

watch(
  () => locationStore.location,
  (newLocation) => {
    console.log(newLocation);
    initMap();
    // options.value = {
    //   center: new kakao.maps.LatLng(
    //     newLocation.latitude,
    //     newLocation.longitude
    //     // 38.47884469,
    //     // 128.4391216
    //   ), // 지도의 중심좌표
    //   level: 8, // 지도의 확대 레벨
    // };
  },
  { deep: true }
);

onMounted(() => {
  //여기서 kakao 맵을 화면에 반영합니다.
  //카카오 라이브러리 정보 및 map을 확인

  if (window.kakao && window.kakao.maps) {
    initMap(); //지도 초기화 - 상단에 function 선언해 있습니다.
    console.log(locationStore.location);
  } else {
    //카카오map 라이브러리 정보 셋팅
    // script태그를 생성해서 apikey를 셋팅해야합니다.
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load(initMap);
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey={apikey}`;
    document.head.appendChild(script);
  }
});
</script>

<style scoped>
/* map을 표현하는 부분의 사이즈가 작으면 화면에 
  안보일 수 있어요................... */
#map {
  height: 100vh;
}
#map-container {
}
</style>
