<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
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

const formJson = computed(() =>
  JSON.stringify(
    props.form,
    (key, value) => {
      if (value === undefined) {
        return 'undefined';
      }

      if (typeof value === 'function') {
        return 'function';
      }

      if (value instanceof File) {
        return `File { name: ${value.name} }`;
      }

      return value;
    },
    2
  )
);
</script>
