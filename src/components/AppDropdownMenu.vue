<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import IconDotsVertical from "./icons/IconDotsVertical.vue";
import IconCloseShape from "./icons/IconCloseShape.vue"
</script>

<template>
  <div class=" text-left">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class=""
        >
         <IconDotsVertical />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 mt- z-10 w-[154px] origin-top-right divide- divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
        <MenuButton class="ml-[140px] h-0 -mt-[12px]">
        
        <IconCloseShape   />
        </MenuButton>
          <div class="px-1 py-1 -mt-6">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-[#E7F7EF] ' : 'text-content-body',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium',
                ]"
              >
                Edit
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-[#E7F7EF] ' : 'text-content-body',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium',
                ]"
              >
                View Profile
              </button>
            </MenuItem>
          </div>
          

          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-[#E7F7EF] text-[#D30000]' : 'text-[#D30000]',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium',
                ]"
              >
                Delete
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
