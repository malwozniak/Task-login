<script lang="ts">
import { defineComponent, useAttrs } from 'vue';

export default defineComponent({
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { PropType } from 'vue';

import PreFormData from '@/components/Data.vue';

defineEmits(['submit']);
defineProps({
  title: {
    type: String,
    required: true,
  },
  validating: {
    type: Boolean,
    required: true,
  },
  submitting: {
    type: Boolean,
    required: true,
  },
  hasError: {
    type: Boolean,
    required: true,
  },
  errors: {
    type: Object as PropType<string[]>,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
});

const { class: attrsClass, onSubmit, ...attrsRest } = useAttrs();
</script>
