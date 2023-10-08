<template>
  <div class="w-full py-4">
    <var-cell>
      <template #icon>
        <icon size="28" name="openmoji:beating-heart" />
      </template>
      <div class="text-lg ml-2">
        <span>岁月如歌，我写了带这些 Tag 的公开文章。</span>
      </div>
    </var-cell>

    <div class="space-x-4 mt-4">
      <router-link
        v-for="tag of tags"
        :key="tag.name"
        :to="'/tags/' + tag.name"
      >
        <var-button type="success">
          {{ tag.name }} ({{ tag.number }})
        </var-button>
      </router-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
const { data } = await useAsyncData("tags", () =>
  queryContent("/")
    .where({
      _partial: false,
      _dir: {
        $in: ["blogs", "podcasts"],
      },
    })
    .only(["tags"])
    .find(),
);

// 循环 tags 返回 Array<{name:tag,number:1}>
const _tags = data.value
  ?.map((i) => i.tags)
  .flat()
  .filter((i) => !!i)
  .reduce((acc, cur) => {
    if (acc[cur]) {
      acc[cur] += 1;
    } else {
      acc[cur] = 1;
    }
    return acc;
  }, {}) as Record<string, number>;

const tags = Object.keys(_tags).map((key) => {
  const val = _tags[key];
  return {
    name: key,
    number: val,
  };
});
</script>

<style></style>
