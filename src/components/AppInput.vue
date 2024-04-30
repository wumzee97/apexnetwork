<script lang="ts" setup>
const props = defineProps<{
  placeholder?: string;
  type: string;
  modelValue: string | number | undefined;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: string): void;
  (e: "blur"): void;
}>();

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target) {
    emit("update:modelValue", target.value.trim());
  }
}
</script>
<template>
  <component
    is="input"
    :type="props.type"
    class="h-14 w-full bg-[#FAFAFA] rounded-xl px-5 font-medium focus:outline-none"
    :placeholder="props.placeholder"
    :value="props.modelValue"
    @input="handleInput"
    @blur="emit('blur')"
  ></component>
</template>
