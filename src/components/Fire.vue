<template>
	<div class="fire-container">
		<gmap-marker :key="index" v-for="(fire, index) in wildFires" :position="{lat: fire.coordinates[1], lng: fire.coordinates[0]}"
		:clickable="true"
		:icon="fireMarker"/>
	</div>
</template>

<script>
const fireMarker = require('@/assets/fireemoji.png');

export default {
	props: ['loading'],
	data() {
		return {
			wildFires: [],
			fireMarker: {
				url: fireMarker,
				size: {width: 30, height: 45, f: 'px', b: 'px'},
				scaledSize: {width: 30, height: 45, f: 'px', b: 'px'}
			},
		}
	},
	methods: {
		events() {
			this.$emit('turnOnLoader')
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
				alert(err)
			})
		},
	},
	created() {
		this.events()
	}
}
</script>

<style>

</style>