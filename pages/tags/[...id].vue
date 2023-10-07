<template>
  <div>tags:{{ tag }}</div>
</template>
<script lang="ts" setup>
const router = useRouter();

const route = useRoute();
const tag = route.params?.id?.[0];
</script>

<style></style>
