<template></template>
  
<script setup lang='ts'>
import { ref } from 'vue';
import { baseUrl } from '../../../config/baseUrl';

const playlists = ref()

const getPlaylist = async () => {
  const res = await fetch(`${baseUrl}/top/playlist?limit=10&order=new`)
  const data = await res.json()
}

getPlaylist()

</script>
  
<style>
</style>