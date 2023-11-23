<template>
  <div id="map-container">
    <div id="map"></div>
  </div>
</template>

<script setup>
import { toRaw, ref, onMounted, watch } from "vue";
import {
  useAttractionStore,
  useLocation,
  useMapStore,
} from "../../stores/store";

const mapStore = useMapStore();
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
      level: 12,
    };
  } else if (mapStore.selectedLocationList.length > 0) {
    options = {
      center: new kakao.maps.LatLng(
        mapStore.selectedLocationList[0].latitude,
        mapStore.selectedLocationList[0].longitude
      ),
      level: 12,
    };
  } else {
    options = {
      center: new kakao.maps.LatLng(37, 127.5),
      level: 12,
    };
  }

  map.value = new kakao.maps.Map(container, options);

  let positions;

  if (locationStore.location === null) {
    positions = [
      ...mapStore.selectedLocationList.map((location) => ({
        content: `
      <div style="padding: 10px; margin-bottom: 10px; width:300px;">
        <div style="font-weight: bold; font-size: 18px; margin-bottom: 5px; width:300px;">${location.title}</div>
        <hr/>
        <div style="color: #555; width: 200px; word-wrap: break-word; width:300px;">${location.addr1}</div>
      </div>
    `,
        latlng: new kakao.maps.LatLng(location.latitude, location.longitude),
      })),
    ];
  } else {
    positions = [
      ...mapStore.selectedLocationList.map((location) => ({
        content: `
      <div style="padding: 10px; margin-bottom: 10px; width:300px;">
        <div style="font-weight: bold; font-size: 18px; margin-bottom: 5px; width:300px;">${location.title}</div>
        <hr/>
        <div style="color: #555; width: 200px; word-wrap: break-word; width:300px;">${location.addr1}</div>
      </div>
    `,
        latlng: new kakao.maps.LatLng(location.latitude, location.longitude),
      })),
      {
        content: `
      <div style="padding: 10px; margin-bottom: 10px; width:300px;">
        <div style="font-weight: bold; font-size: 18px; margin-bottom: 5px; width:300px;">${locationStore.location.title}</div>
        <hr/>
        <div style="color: #555; width: 200px; word-wrap: break-word; width:300px;">${locationStore.location.addr1}</div>
      </div>
    `,
        latlng: new kakao.maps.LatLng(
          locationStore.location.latitude,
          locationStore.location.longitude
        ),
      },
    ];
  }

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

    let selectedMarker = ref();

    kakao.maps.event.addListener(
      marker,
      "click",
      makeClickListener(selectedMarker, marker, i)
    );
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

  function makeClickListener(selectedMarker, marker, index) {
    return function () {
      const attractionStore = useAttractionStore();

      console.log(index);
      console.log(mapStore.selectedLocationList[index]);
    };
  }
}

const locationStore = useLocation();
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

onMounted(() => {
  //여기서 kakao 맵을 화면에 반영합니다.
  if (window.kakao && window.kakao.maps) {
    initMap(); //지도 초기화 - 상단에 function 선언해 있습니다.
  } else {
    const script = document.createElement("script");
    script.onload = () => kakao.maps.load(initMap);
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=`;
    document.head.appendChild(script);
  }
});
</script>

<style scoped>
#map {
  height: 100%;
}
#map-container {
}
</style>
