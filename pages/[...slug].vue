<template>
  <main>
    <!-- <div>home slug</div> -->
    <ContentDoc>
      <template v-slot="{ doc }">
        <article>
          <h1>{{ doc.title }}</h1>
          <ContentRenderer :value="doc" />
        </article>
      </template>
      <template #not-found>
        <div class="text-center h-20 flex justify-center items-center">
          <p>😅 对应文章未找到</p>
        </div>
      </template>
      <template #empty>
        <div class="text-center h-20 flex justify-center items-center">
          <h1>😅 Document is empty</h1>
        </div>
      </template>
    </ContentDoc>
  </main>
</template>
