<template>
	<div class="main">
		<h1> Your GeoLocation</h1>
		<p>{{coordinates.lat}} Latitude, {{coordinates.lng}} Longtitude</p>
		<GmapMap
			map-type-id="terrain"
			:center="{lat: coordinates.lat, lng: coordinates.lng}"
			:zoom='2'
			style="width: 70vw; height: 80vh; margin: auto;"
			ref="mapRef"
		>
		<gmap-marker :key="index" v-for="(fire, index) in wildFires" :position="{lat: fire.coordinates[1], lng: fire.coordinates[0]}"
		:clickable="true"
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
			let events = res.data.events
			console.log(events)
			for(let event of events) {
				let newObj = {}
				newObj['date'] = event.geometries[0].date
				newObj['coordinates'] = event.geometries[0].coordinates
				this.wildFires.push(newObj)
			}
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
	},
	beforeMount() {
		this.events()
	}
}
</script>

<style scoped>
.main {
	text-align: center;
}
</style>