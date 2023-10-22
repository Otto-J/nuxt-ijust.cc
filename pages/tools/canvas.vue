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
            <div class="flex space-x-4">
              <div class="w-1/3 space-y-2">
                <UiLabel for="config-width"
                  >宽 Width {{ config.width[0] }}px</UiLabel
                >
                <UiSlider
                  id="config-width"
                  class="h-4"
                  v-model="config.width"
                  :min="1"
                  :max="1000"
                  :step="1"
                />
              </div>
              <div class="w-1/3 space-y-2">
                <UiLabel for="config-height"
                  >高 Height {{ config.height[0] }}px</UiLabel
                >
                <UiSlider
                  id="config-height"
                  class="h-4"
                  v-model="config.height"
                  :min="1"
                  :max="1000"
                  :step="1"
                />
              </div>
            </div>
          </div>
          <div class="flex space-x-4 items-center">
            <div class="w-1/3 space-y-2">
              <UiLabel for="config-background"
                >背景颜色 {{ config.hue[0] }}</UiLabel
              >
              <UiSlider
                id="config-background"
                class="h-4"
                v-model="config.hue"
                :min="0"
                :max="359"
                :step="1"
              />
            </div>
            <div class="w-1/3 flex flex-row space-x-2 items-center">
              <UiButton size="sm" variant="secondary" @click="rollBackground"
                >颜色 Roll</UiButton
              >
              <div class="flex flex-row space-x-2 items-center">
                <UiCheckbox
                  id="config-linear-enable"
                  v-model:checked="config.linearEnable"
                ></UiCheckbox>
                <UiLabel for="config-linear-enable">是否渐变</UiLabel>
              </div>
            </div>
          </div>
          <div class="flex space-x-4">
            <div class="space-y-2 w-1/3">
              <UiLabel for="config-person-size">
                小人大小 {{ config.personSize[0] }}
              </UiLabel>
              <div>
                <UiSlider
                  id="config-person-size"
                  class="h-4"
                  v-model="config.personSize"
                  :min="1"
                  :max="Math.min(config.width[0], config.height[0])"
                  :step="1"
                />
              </div>
            </div>
            <div class="space-y-2 w-1/3">
              <UiLabel for="config-person-y"
                >小人 y 轴 {{ config.personY[0] }}</UiLabel
              >
              <div>
                <UiSlider
                  id="config-person-y"
                  class="h-4"
                  v-model="config.personY"
                  :min="-100"
                  :max="100"
                  :step="1"
                />
              </div>
            </div>
          </div>
          <div class="flex space-x-4">
            <div class="space-y-2 w-1/3">
              <UiLabel for="config-text-y"
                >文字 y 轴 {{ config.textY[0] }}</UiLabel
              >
              <div>
                <UiSlider
                  id="config-text-y"
                  class="h-4"
                  v-model="config.textY"
                  :min="1"
                  :max="100"
                  :step="1"
                />
              </div>
            </div>
            <div class="space-y-2 w-1/3">
              <UiLabel for="config-text-size"
                >文字大小 {{ config.fontSize[0] }}</UiLabel
              >
              <div>
                <UiSlider
                  id="config-text-size"
                  v-model="config.fontSize"
                  class="h-4"
                  :min="1"
                  :max="100"
                  :step="1"
                />
              </div>
            </div>
          </div>

          <div class="space-y-2 w-full text-right">
            <UiLabel for="config-text">标题内容</UiLabel>
            <UiTextarea id="config-text" v-model="config.text" />
          </div>

          <div class="space-y-2 w-full">
            <UiLabel for="config-from-text">角标</UiLabel>
            <div class="flex items-center space-x-4">
              <UiInput
                id="config-from-text"
                class="w-40"
                v-model="config.fromText"
              />
              <div class="flex flex-row items-center space-x-2">
                <UiCheckbox
                  id="config-from-enable"
                  v-model:checked="config.fromEnable"
                ></UiCheckbox>
                <UiLabel for="config-from-enable">是否显示</UiLabel>
              </div>
            </div>
          </div>
        </UiCardContent>
        <UiCardFooter class="flex space-x-2 items-center">
          <UiButton @click="onClickPng">生成截图</UiButton>
          <UiButton variant="destructive" @click="reset">重置</UiButton>
        </UiCardFooter>
      </UiCard>
    </div>
    <div class="overflow-x-auto" style="max-width: 100vw">
      <p>原始内容</p>

      <div
        ref="raw"
        class="flex justify-center items-center flex-col relative transition-all duration-500"
        :style="backgroundConfig"
      >
        <div
          class="absolute z-20 w-full text-center bg-white whitespace-pre-line left-0 -translate-y-1/2 transition-all duration-500"
          v-text="config.text"
          :style="{
            color: 'hsl(' + config.hue[0] + ',48.1%,48.6%)',
            fontSize: config.fontSize[0] + 'px',
            top: config.textY[0] + '%',
            willChange: 'color',
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
        <div
          v-show="config.fromEnable"
          class="absolute right-3 bottom-3 z-10 text-white text-sm"
        >
          {{ config.fromText }}
        </div>
      </div>

      <p>生成的图片：</p>
      <div class="o" ref="node"></div>
    </div>
  </ClientOnly>
</template>
<script lang="ts" setup>
import { toPng } from "html-to-image";
import type { StyleValue } from "vue";

const node = ref<HTMLDivElement>();
const raw = ref<HTMLDivElement>();

// 200deg 65% 72%
// 200,48.1,48.6
// hsl(180,48.1%,48.6%)

const defaultModel = () => ({
  width: [600],
  height: [250],
  background: "blue",
  hue: [160],
  personSize: [230],
  text: "编写一个好标题",
  personY: [13],
  textY: [13],
  fontSize: [26],
  fromText: "@ijust.cc",
  fromEnable: true,
  linearEnable: true,
});

const config = ref(defaultModel());

const backgroundConfig = computed<StyleValue>(() => {
  const baseConfig: StyleValue = {
    width: config.value.width[0] + "px",
    height: config.value.height[0] + "px",
    // background: "hsl(" + config.value.hue[0] + ",48.1%,48.6%)",
    color: config.value.text,
    willChange: "background",
  };

  const mainColor = config.value.hue[0];
  const step = 50;
  // second + 50，如果到了 360，就减去 360
  const secondColor =
    mainColor + step > 360 ? mainColor + step - 360 : mainColor + step;

  // console.log(mainColor, secondColor, 44);
  if (config.value.linearEnable) {
    return {
      ...baseConfig,
      background:
        "linear-gradient(45deg, hsl(" +
        mainColor +
        ",48.1%,48.6%) 0%, hsl(" +
        secondColor +
        ",48.1%,48.6%) 100%",
    };
  } else {
    return {
      ...baseConfig,
      background: "hsl(" + mainColor + ",48.1%,48.6%)",
    };
  }
});

const route = useRoute();
const router = useRouter();

watch(
  () => config,
  (val) => {
    const _config = JSON.stringify(val.value);
    router.replace({
      query: {
        q: _config,
      },
    });
  },
  {
    deep: true,
  },
);

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

const rollBackground = () => {
  config.value.hue[0] = Math.floor(Math.random() * 360);
};

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

const reset = () => {
  // 清空 node.value 的 所有内容
  if (node.value) {
    node.value.innerHTML = "";
  }
  config.value = defaultModel();
};
</script>

<style></style>
