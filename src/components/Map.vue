<template>
	<div class="main">
		<Header />
		<Loader v-if="loading" />
		<GmapMap
			map-type-id="terrain"
			:center="{lat: coordinates.lat, lng: coordinates.lng}"
			:zoom='3'
			style="width: 100vw; height: 85vh; margin: auto;"
			ref="mapRef"
		>
		<Fire @turnOnLoader="turnLoader" :loading="loading"/>
		<gmap-marker :position="{lat: coordinates.lat, lng: coordinates.lng}" :icon="manMarker" />
		</GmapMap>
		<div class="footer">
			<h3> Your GeoLocation</h3>
			<p>{{coordinates.lat}} Latitude, {{coordinates.lng}} Longtitude</p>
		</div>
	</div>
</template>

<script>
import Loader from '@/components/Loader.vue';
import Header from '@/components/Header.vue';
import Fire from '@/components/Fire.vue';

const manMarker = require('@/assets/manemoji.png');

export default {
	components: {
		Loader,
		Header,
		Fire
	},
	data() {
		return {
			loading: false,
			coordinates: {
				lat: 0,
				lng: 0,
			},
			manMarker: {
				url: manMarker,
				size: {width: 20, height: 20, f: 'px', b: 'px'},
				scaledSize: {width: 20, height: 20, f: 'px', b: 'px'}
			},
		}
	},
	methods: {
		turnLoader() {
			this.loading = true;
		}
	},
	created() {
		this.$getLocation({})
		.then(coordinates => {
			console.log(coordinates)
			this.coordinates = coordinates
			this.loading = false;
		})
		.catch(err => {
			this.loading = false;
			alert(err)
		})
	},
}
</script>

<style scoped>
.main {
	text-align: center;
}

.footer {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #B32E1F;
	color: white;
	height: 10vh;
}

.footer > h3 {
	padding-bottom: 15px;
}
</style>