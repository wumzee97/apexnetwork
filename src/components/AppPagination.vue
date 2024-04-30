<script lang="ts" setup>
import { ref } from "vue";
import IconChevronDown from "./icons/IconChevronDown.vue";


const currentPage = ref(1);

const props = defineProps<{
  pages: number
}>()

const emit = defineEmits<{
  (e: "change", v: number): void;
}>();



function handleClickPaginationBtn(value: number) {
  currentPage.value = value;
  emit('change', value)
}

function handleClickPrevious() {
  currentPage.value--;
  emit('change', currentPage.value)
}
function handleClickNext() {
  currentPage.value++;
  emit('change', currentPage.value)
}
function shouldShowPageInMenu(page: number) {
  return (
    isCurrentPage(page) || isNextOrPreviousPage(page) || isFirstOrLastPage(page)
  );
}

function isCurrentPage(page: number) {
  if (page === currentPage.value) {
    return true;
  }
}

function isNextOrPreviousPage(page: number) {
  const current = currentPage.value;
  if (page + 1 === current || page - 1 === current) {
    return true;
  }
}

function isFirstOrLastPage(page: number) {
  if (page === 1 || page === props.pages) {
    return true;
  }
}
</script>

<template>
  <div class="flex">
    <div class=" flex">
      <button class="w-10 h-10 flex items-center justify-center " :disabled="currentPage == 1" @click="handleClickPrevious"><IconChevronDown class="rotate-90" /></button>
      <template v-for="page in props.pages" :key="page">
        <button @click="handleClickPaginationBtn(page)"
          :class="[
            currentPage == page
              ? 'text-primary font-bold bg-[#E7F7EF] rounded-xl '
              : 'text-[#A0AEC0]', !shouldShowPageInMenu(page) ? 'hidden' :'',
            'w-10 h-10 text-sm flex items-center justify-center',
          ]"
        >
          {{ page }}
        </button>
      </template>
      <button :disabled="currentPage == props.pages" class="w-10 h-10 flex items-center justify-center " @click="handleClickNext"><IconChevronDown class="rotate-[270deg]" /></button>
    </div>
  </div>
</template>


<style scoped>
    button.hidden + :not(.hidden)::before {
    content: '...';
    display: inline-block;
    margin-right: 0.4rem;
}

</style>