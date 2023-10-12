<template>
  <ClientOnly>
    <div class="my-4">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>快速制作 Banner</UiCardTitle>
          <UiCardDescription>通过样式快速调整博客 Banner</UiCardDescription>
        </UiCardHeader>
        <UiCardContent class="space-y-4">
          <div class="space-y-2">
            <div class="flex space-x-2">
              <div class="w-1/3">
                <UiLabel for="width">宽 Width {{ config.width[0] }}px</UiLabel>
                <UiSlider
                  v-model="config.width"
                  :min="1"
                  :max="1000"
                  :step="1"
                />
              </div>
              <div class="w-1/3">
                <UiLabel for="width"
                  >高 Height {{ config.height[0] }}px</UiLabel
                >
                <UiSlider
                  v-model="config.height"
                  :min="1"
                  :max="1000"
                  :step="1"
                />
              </div>
            </div>
          </div>
          <div class="flex">
            <div class="w-1/3 space-y-2">
              <UiLabel for="config-background"
                >背景颜色 {{ config.hue[0] }}</UiLabel
              >
              <UiSlider v-model="config.hue" :min="0" :max="359" :step="1" />
            </div>
          </div>
          <div class="flex space-x-2">
            <div class="space-y-2 w-1/3">
              <UiLabel for="config-color">
                小人大小 {{ config.personSize[0] }}
              </UiLabel>
              <div>
                <UiSlider
                  v-model="config.personSize"
                  :min="1"
                  :max="Math.min(config.width[0], config.height[0])"
                  :step="1"
                />
              </div>
            </div>
            <div class="space-y-2 w-1/3">
              <UiLabel for="config-color"
                >小人 y 轴 {{ config.personY[0] }}</UiLabel
              >
              <div>
                <UiSlider
                  v-model="config.personY"
                  :min="-100"
                  :max="100"
                  :step="1"
                />
              </div>
            </div>
          </div>
          <div class="flex space-x-2">
            <div class="space-y-2 w-1/3">
              <UiLabel for="config-color">标题内容</UiLabel>
              <UiTextarea v-model="config.text" />
            </div>
            <div class="space-y-2 w-1/3">
              <UiLabel for="config-color"
                >文字 y 轴 {{ config.textY[0] }}</UiLabel
              >
              <div>
                <UiSlider
                  v-model="config.textY"
                  :min="1"
                  :max="100"
                  :step="1"
                />
              </div>
            </div>
            <div class="space-y-2 w-1/3">
              <UiLabel for="config-color"
                >文字大小 {{ config.fontSize[0] }}</UiLabel
              >
              <div>
                <UiSlider
                  v-model="config.fontSize"
                  :min="1"
                  :max="100"
                  :step="1"
                />
              </div>
            </div>
          </div>
        </UiCardContent>
        <UiCardFooter>
          <UiButton @click="onClickPng">确定</UiButton>
        </UiCardFooter>
      </UiCard>
    </div>
    <div>
      <p>原始内容</p>

      <div
        ref="raw"
        class="flex justify-center items-center flex-col relative overflow-hidden"
        :style="{
          width: config.width[0] + 'px',
          height: config.height[0] + 'px',
          background: 'hsl(' + config.hue[0] + ',48.1%,48.6%)',
          color: config.text,
        }"
      >
        <div
          class="absolute z-20 w-full text-center bg-white whitespace-pre-line left-0 -translate-y-1/2"
          v-html="config.text"
          :style="{
            color: 'hsl(' + config.hue[0] + ',48.1%,48.6%)',
            fontSize: config.fontSize[0] + 'px',
            top: config.textY[0] + '%',
          }"
        ></div>
        <div
          class="relative z-10"
          :style="{
            transform: 'translate(0, ' + config.personY[0] + '%)',
          }"
        >
          <img
            src="/boy.png"
            alt="boy"
            class=""
            :style="{
              width: config.personSize[0] + 'px',
              height: config.personSize[0] + 'px',
            }"
          />
        </div>
      </div>

      <p>生成的图片：</p>
      <div class="o" ref="node"></div>
    </div>
  </ClientOnly>
</template>
<script lang="ts" setup>
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
// import Button from "~/components/button/Button.vue";

const node = ref<HTMLDivElement>();
const raw = ref<HTMLDivElement>();

// 200deg 65% 72%
// 200,48.1,48.6
// hsl(180,48.1%,48.6%)

const config = ref({
  width: [600],
  height: [250],
  background: "blue",
  hue: [160],
  personSize: [200],
  text: "web worker podcast",
  personY: [0],
  textY: [10],
  fontSize: [22],
});

const route = useRoute();
const router = useRouter();

onMounted(() => {
  try {
    const _q = route.query.q;
    if (_q) {
      const _config = JSON.parse(_q as string);
      config.value = _config;
    }
  } catch (error) {
    console.log("解析参数错误，默认不处理");
  }
});

watchEffect(() => {
  // route.query.q = String(config.value);
  router.replace({
    query: {
      q: JSON.stringify(config.value),
    },
  });
});

const onClickPng = () => {
  if (node.value && raw.value) {
    toPng(raw.value)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        node.value!.appendChild(img);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  }
};
</script>

<style></style>
