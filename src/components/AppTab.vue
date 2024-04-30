<script lang="ts" setup>
import { computed, ref } from "vue";

const selectedTab = ref<string>("All");

const options = computed(() => {
  return ["All", "Paid", "Unpaid", "Overdue"];
});

const emit = defineEmits<{
  (e: "change", v: string): void;
}>();

function handleTabClick(value: string) {
  selectedTab.value = value;
  emit('change', value.toLowerCase())
}
</script>
<template>
  <div class="h-14 flex border-b w-full">
    <button
      @click="handleTabClick(option)"
      v-for="(option, index) in options"
      :key="index"
      :class="[selectedTab == option ? 'border-primary border-b-2' : '']"
      class="text-tab-color text-[15px] lg:mr-10 px-4"
    >
      {{ option }}
    </button>
  </div>
</template>
