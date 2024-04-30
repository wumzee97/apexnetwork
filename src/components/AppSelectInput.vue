<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import IconChevronDown from "../components/icons/IconChevronDown.vue";

import type { IOptions } from "../types";

const props = defineProps<{
  options: IOptions[];
  modelValue: IOptions;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: IOptions): void;
}>();

</script>

<template>
  <div class="w-full">
    <Listbox
      :model-value="props.modelValue"
      @update:modelValue="(value) => emit('update:modelValue', value)"
    >
      <div class="relative mt-1">
        <ListboxButton
          class="relative cursor-default py-2 pl-3 pr-10 text-left h-14 w-full bg-[#FAFAFA] rounded-xl font-medium px-5 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block truncate">{{ modelValue.text }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <IconChevronDown class="ui-open:rotate-180" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full p-3 overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active }"
              v-for="(option, index) in props.options"
              :key="index"
              :value="option"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-[#F9FAFB]' : '',

                  'relative cursor-default select-none flex items-center pl-10 pr-4 h-14  rounded-lg',
                ]"
              >
                <span
                  :class="
                    option.value == 'active'
                      ? 'bg-primary'
                      : option.value == 'inactive'
                      ? 'bg-warning'
                      : option.value == 'paid'
                      ? 'bg-[#8C62FF]'
                      : option.value == 'unpaid'
                      ? 'bg-[#D4A701]'
                      : option.value == 'overdue'
                      ? 'bg-[#FD6A6A]'
                      : ''
                  "
                  class="h-1.5 w-1.5 rounded-full mr-2"
                  v-if="option.marked"
                ></span>
                <span
                  :class="[
                    option.value == 'active'
                      ? 'text-primary'
                      : option.value == 'inactive'
                      ? 'text-warning'
                      : option.value == 'paid'
                      ? 'text-[#8C62FF]'
                      : option.value == 'unpaid'
                      ? 'text-[#D4A701]'
                      : option.value == 'overdue'
                      ? 'text-[#FD6A6A]'
                      : '',

                    'block truncate font-medium',
                  ]"
                  >{{ option.text }}</span
                >
                
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
