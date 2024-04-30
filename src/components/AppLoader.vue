<template>
  <div class="w-full h-[450px] items-center flex justify-center">
    <div class="flex flex-col justify-center gap-4">
      <span class="loader mx-auto  h-14 w-14 border-[5px] border-[#dbdcde] border-b-primary rounded-[50%] inline-block box-border "></span>
      <p class="text-gray-900 font-medium text-lg">Loading...</p>
    </div>
  </div>
</template>

<style scoped>
.loader {
 
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
