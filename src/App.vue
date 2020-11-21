<template>
	<div id="app">
		<Map />
	</div>
</template>

<script>
import Map from './components/Map.vue'

export default {
  name: 'App',
  components: {
    Map
  }
}
</script>

<style>

* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

</style>
