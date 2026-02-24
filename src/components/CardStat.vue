<!--
  CardStat - Carte de statistique pour le dashboard
-->

<template>
  <div @click="$emit('click')" 
       class="cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl">
    <div class="flex items-center gap-4 p-4 min-w-[150px] rounded-2xl shadow-md border-2"
         :class="variantClasses[variant]">
      <span class="text-3xl">{{ icon }}</span>
      <div class="flex flex-col">
        <span class="text-2xl font-bold">{{ value }}</span>
        <span class="text-xs uppercase tracking-wider opacity-80">{{ label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  value: {
    type: [Number, String],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value: string) => 
      ['default', 'pending', 'rh', 'tech', 'accepted', 'rejected', 'amber'].includes(value)
  }
})

defineEmits(['click'])

const variantClasses: Record<string, string> = {
  default: 'bg-gray-50 text-gray-800 border-gray-200',
  pending: 'bg-amber-50 text-amber-800 border-amber-200',
  rh: 'bg-blue-50 text-blue-800 border-blue-200',
  tech: 'bg-purple-50 text-purple-800 border-purple-200',
  accepted: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  rejected: 'bg-red-50 text-red-800 border-red-200',
  amber: 'bg-gradient-to-r from-amber-400 to-orange-400 text-white border-amber-500'
}
</script>