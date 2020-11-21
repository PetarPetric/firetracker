<template>
	<div class="main">
		<h1> Your GeoLocation</h1>
		<p>{{coordinates.lat}} Latitude, {{coordinates.lng}} Longtitude</p>
		<GmapMap
			map-type-id="terrain"
			:center="{lat: coordinates.lat, lng: coordinates.lng}"
			:zoom='3'
			style="width: 70vw; height: 80vh; margin: auto;"
			ref="mapRef"
		>
		<gmap-marker :position="{lat: coordinates.lat, lng: coordinates.lng}" :clickable="true" 
		:icon="markerOptions"/>
		</GmapMap>
	</div>
</template>

<script>
const mapMarker = require('@/assets/fireemoji.png');

export default {
	data() {
		return {
			coordinates: {
				map: null,
				lat: 0,
				lng: 0
			},
			markerOptions: {
				url: mapMarker,
				size: {width: 30, height: 45, f: 'px', b: 'px'},
				scaledSize: {width: 30, height: 45, f: 'px', b: 'px'}
			},
			wildFires: [],
		}
	},
	methods: {
		events() {
			this.axios.get('https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories/8')
			.then(res => {
			console.log(res.data.events)
			})
			.catch(err => {
				console.log(err)
			})
		}
	},
	created() {
		this.$getLocation({})
		.then(coordinates => {
			console.log(coordinates)
			this.coordinates = coordinates
		})
		.catch(err => {
			alert(err)
		})
		this.events()
	},
}
</script>

<style scoped>
.main {
	text-align: center;
}
</style>