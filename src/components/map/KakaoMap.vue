<template>
  <div id="map-container">
    <div id="map"></div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, watch } from "vue";
import {
  useAttractionStore,
  useCategoryStore,
  useLocation,
  useMapStore,
} from "../../stores/store";

const mapStore = useMapStore();
const locationStore = useLocation();
const map = ref(null);
const markers = ref([]);
const infowindow = ref(null);

function initMap() {
  const container = document.getElementById("map");

  let options;

  if (locationStore.location) {
    options = {
      center: new kakao.maps.LatLng(
        locationStore.location.latitude,
        locationStore.location.longitude
      ),
      level: 3,
    };
  } else if (mapStore.selectedLocationList.length > 0) {
    options = {
      center: new kakao.maps.LatLng(
        mapStore.selectedLocationList[0].latitude,
        mapStore.selectedLocationList[0].longitude
      ),
      level: 8,
    };
  } else {
    options = {
      center: new kakao.maps.LatLng(37, 127.5),
      level: 12,
    };
  }

  map.value = new kakao.maps.Map(container, options);
  const positions = mapStore.selectedLocationList.map((location) => ({
    content: `
      <div style="padding: 10px; margin-bottom: 10px; width:300px;">
        <div style="font-weight: bold; font-size: 18px; margin-bottom: 5px; width:300px;">${location.title}</div>
        <hr/>
        <div style="color: #555; width: 200px; word-wrap: break-word; width:300px;">${location.addr1}</div>
      </div>
    `,
    latlng: new kakao.maps.LatLng(location.latitude, location.longitude),
  }));

  // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
  var mapTypeControl = new kakao.maps.MapTypeControl();

  // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
  // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
  map.value.addControl(mapTypeControl, kakao.maps.ControlPosition.BOTTOMLEFT);

  // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
  var zoomControl = new kakao.maps.ZoomControl();
  map.value.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMRIGHT);

  for (var i = 0; i < positions.length; i++) {
    var marker = new kakao.maps.Marker({
      map: map.value,
      position: positions[i].latlng,
    });

    infowindow.value = new kakao.maps.InfoWindow({
      content: positions[i].content,
    });

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

    kakao.maps.event.addListener(marker, "click", makeClickListener(marker, i));
  }

  function makeOverListener(map, marker, infowindow) {
    return function () {
      infowindow.open(map, marker);
    };
  }

  function makeOutListener(infowindow) {
    return function () {
      infowindow.close();
    };
  }

  let selectedMarker;
  function makeClickListener(marker, index) {
    return function () {
      const attractionStore = useAttractionStore();
      attractionStore.showModal(mapStore.selectedLocationList[index]);

      axios
        .get(`http://localhost/attraction/view`, {
          params: {
            contentId: attractionStore.selectedAttraction.contentId,
          },
        })
        .then((response) => {
          attractionStore.selectedAttractionDes = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      axios
        .get(`http://localhost/attraction/review`, {
          params: {
            contentId: attractionStore.selectedAttraction.contentId,
          },
        })
        .then((response) => {
          attractionStore.selectedAttractionReview = response.data;
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
      selectedMarker = marker;
    };
  }
}

const categoryStore = useCategoryStore();

watch(
  () => mapStore.selectedLocationList,
  () => {
    initMap();
  },
  { deep: true }
);

watch(
  () => locationStore.location,
  () => {
    initMap();
  },
  { deep: true }
);

watch(
  () => categoryStore.selectedCategory.gugunCode,
  () => {
    initMap();
  },
  { deep: true }
);

onMounted(() => {
  //여기서 kakao 맵을 화면에 반영합니다.
  if (window.kakao && window.kakao.maps) {
    initMap(); //지도 초기화 - 상단에 function 선언해 있습니다.
  } else {
    const script = document.createElement("script");
    script.onload = () => kakao.maps.load(initMap);
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey={apikey}`;
    document.head.appendChild(script);
  }
});
</script>

<style scoped>
#map {
  height: 100vh;
}
#map-container {
}
</style>
