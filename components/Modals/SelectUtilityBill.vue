<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-xl mx-4">
        <h2 class="text-lg font-medium text-[#1D2739] mb-4 pl-6 pt-6">Select Utility Bill</h2>
        Selected ID: {{ selectedOption }}
        <div class="space-y-4 mb-6 border-t-[0.5px] pt-6 border-gray-100 h-96 overflow-y-auto">
          <div
            v-for="(option, idx) in billingCategories"
            :key="option.id"
            class="flex justify-between items-center pb-5 px-3 cursor-pointer items-center border-gray-100 border-b-[0.5px] last:border-b-0"
          >
            <label :for="option.id" class="ml-3 text-sm cursor-pointer text-gray-700">{{ option?.Name ?? 'Nil' }}</label>
            <input
              type="radio"
              :id="option.Id"
              :value="option.Id"
              v-model="selectedOption"
              name="utility"
              class="w-5 h-5 mr-6 text-[#1D2739] focus:ring-0 cursor-pointer focus:ring-offset-0"
            />
          </div>
        </div>
  
        <div class="flex justify-between gap-x-4 px-6 pb-6 pt-6 w-full">
          <button @click="closeModal" type="button" class="py-3.5 cursor-pointer text-sm px-4 w-full border-[#E4E7EC] border rounded-md bg-white text-[#292929] font-semibold">
            Cancel
          </button>
          <button @click="onContinue" type="button" class="py-3.5 cursor-pointer text-sm px-4 w-full rounded-md bg-[#292929] text-white font-semibold">
            Continue
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useFetchBillingCategories } from '@/composables/modules/home/useGetBillingCategories'
  import { ref, defineProps, defineEmits } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const { loading, billingCategories } = useFetchBillingCategories()
  
  // Define props and emits for external control
  const props = defineProps<{ isOpen: boolean }>()
  const emit = defineEmits(['close', 'submit'])
  
  // Data for utility bill options
  const selectedOption = ref<string | null>(null)
  
  // Close the modal
  const closeModal = () => {
    emit('close')
  }
  
  // Continue action (submit selected option)
  const onContinue = () => {
    if (selectedOption.value) {
      console.log('Selected option ID:', selectedOption.value)
      router.push({ path: '/dashboard/home/pay-bills', query: { billType: selectedOption.value } })
      emit('submit', selectedOption.value)
      closeModal()
    } else {
      alert('Please select a utility bill.')
    }
  }
  </script>
  
  <style scoped>
  /* Additional styling if necessary */
  </style>  