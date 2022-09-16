<template>
  <div class="custom-select" :tabindex="tabindex">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  mounted() {
    this.$emit('input', this.selected);
  },
};
</script>

<style scoped>
.custom-select {
  padding: 0px;
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;
  display: block;
  width: 100%;
  font-weight: 400;
  line-height: 1.5;
  font-size: small;
  word-wrap: normal;
  margin: 0;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  font-family: inherit;
}
.custom-select:focus {
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.125);
  box-shadow: none;
}
.custom-select .selected {
  cursor: pointer;
  user-select: none;
}
.custom-select .open {
  width: 100%;
  height: 1.65rem;
}
.custom-select .selected:after {
  position: absolute;
  content: '';
  border: 5px solid transparent;
  border-color: #fff transparent transparent transparent;
}

.custom-select .items {
  color: gray;
  overflow: hidden;
  position: absolute;
  width: inherit;
  background-color: white;
  left: 0;
  right: 0;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  z-index: 1;
}

.custom-select .items div {
  color: gray;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
  padding: 0.5rem;
}

.custom-select .items div:hover {
  background-color: #194e9c;
  padding: 0.5rem;
  color: white;
}

.custom-select .items div:focus {
  background-color: #7ba9ec;
}

.selectHide {
  display: none;
}
</style>
