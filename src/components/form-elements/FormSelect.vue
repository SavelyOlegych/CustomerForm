<template>
  <div class="form-select">
    <span class="form-select__text">{{ fieldName }}</span>
    <div
      class="form-select__selected"
      :class="{
        'form-select__selected--empty': value === '',
        'form-select__selected--error': error,
      }"
      @click="toggleList"
    >
      {{ selectedText }}
    </div>
    <SelectTriangleIcon
      class="form-select__triangle"
      :class="{'form-select__triangle--rotated': showList}"
    />

    <span class="error-text" v-if="error">{{ error }}</span>

    <ul
      class="form-select__list"
      v-if="showList"
      v-click-outside="toggleList"
    >
      <li
        class="form-select__list-item"
        v-for="(text, key) in options"
        :key="key"
        @click="clickOption"
      >
        <input
          class="form-select__radio-input"
          type="radio"
          :value="key"
          :checked="key === value"
          ref="selectInput"
        >
        <div class="form-select__radio-text">{{ text }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import SelectTriangleIcon from "@/components/icons/SelectTriangleIcon.vue";

export default {
  name: "FormSelect",
  components: { SelectTriangleIcon },
  props: {
    options: Object,
    fieldName: String,
    value: String,
    error: [String, undefined],
  },
  data() {
    return {
      showList: false,
    };
  },
  computed: {
    selectedText() {
      return this.value !== "" ? this.options[this.value] : "Не выбрано";
    },
  },
  methods: {
    clickOption(e) {
      const input = e.currentTarget.querySelector("input");

      if (input.checked === false) {
        this.$emit("input", input.value);
        this.$refs.selectInput.forEach(input => input.checked = false);
        input.checked = true;
      }
    },
    toggleList() {
      this.showList = !this.showList;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/form-select";
</style>