<template>
  <var-paper :elevation="2" class="container p-2 px-8">
    <nav>
      <!-- <ContentNavigation v-slot="{ navigation }"> -->
      <!-- <div>{{ navigation }}</div> -->
      <!-- <ul>
          <li v-for="link of navigation" :key="link._path">
            <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
          </li>
        </ul> -->
      <!-- </ContentNavigation> -->
    </nav>
    <ContentDoc v-slot="{ doc }">
      <!-- <div>{{ doc }}</div> -->
      <h1 class="text-3xl text-center mt-10 mb-4">{{ doc.title }}</h1>
      <div
        class="flex justify-center items-center space-x-4 mb-10 text-gray-700 text-sm"
      >
        <p>
          <span>发布于</span>
          <nuxt-link class="underline ml-1" :to="doc._path">{{
            formatDate(doc.date)
          }}</nuxt-link>
        </p>
        <p>
          <span>归类</span>
          <nuxt-link class="underline ml-1" :to="doc._dir">
            {{ doc._dir }}
          </nuxt-link>
        </p>
        <p v-if="Array.isArray(doc.tags)">
          <span>Tag</span>
          <nuxt-link
            :to="`/tags/${item}`"
            v-for="(item, index) of doc.tags"
            :key="index"
            v-text="item"
            class="ml-1 underline"
          >
          </nuxt-link>
        </p>
      </div>
      <div class="mb-10 border-b-2 border-gray-200" />

      <ProseBlockquote v-if="doc.description">{{
        doc.description
      }}</ProseBlockquote>
      <!-- <article class="prose"> -->
      <ContentRenderer
        class="prose mt-8 w-full max-w-none"
        tag="article"
        :value="doc"
      />
      <!-- </article> -->
    </ContentDoc>
    <div class="my-10 border-b-2 border-gray-200" />
  </var-paper>
</template>
<script lang="ts" setup>
// console.log(data);
// const category =

const route = useRoute();

const { data } = await useAsyncData("home", () =>
  queryContent(route.path).findOne(),
);
console.log(4, data);

const { data: navigation } = await useAsyncData("navigation", () =>
  fetchContentNavigation({
    //  where({
    //     _dir: {
    //       $in: ["blogs", "podcasts"],
    //     },
    //   }),
    //   sort({ date: -1 })
  }),
);
console.log(navigation, 3);

// const con = useContentHelpers();
// console.log(22, con);

// const { data } = await useAsyncData("home", () => queryContent("/").findOne());
// console.log(4, data);
// const { flatUnwrap } = useUnwrap();
// console.log(flatUnwrap);
</script>

<style></style>
