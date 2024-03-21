<template>
  <div class="form-select">
    <span class="form-select__text">{{ fieldName }}</span>
    <div
      class="form-select__selected"
      :class="{
        'form-select__selected--empty': selected.length === 0,
        'form-select__selected--error': error
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
        v-for="(value, key) in options"
        :key="key"
        @click="clickOption"
      >
        <input
          class="form-select__radio-input"
          type="radio"
          :value="key"
          :checked="selected.includes(key)"
        >
        <div class="form-select__radio-text">{{ value }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import SelectTriangleIcon from "@/components/icons/SelectTriangleIcon.vue";

export default {
  name: "FormMultiselect",
  components: { SelectTriangleIcon },
  props: {
    options: Object,
    fieldName: String,
    selected: Array,
    error: [String, undefined],
  },
  data() {
    return {
      showList: false,
    };
  },
  computed: {
    selectedText() {
      return this.selected.length > 0 ?
        this.selected.map(item => this.options[item]).join(", ") :
        "Не выбрано";
    },
  },
  methods: {
    clickOption(e) {
      const input = e.currentTarget.querySelector("input");

      if (input.checked === true) {
        this.$emit("removeElement", input.value);
      } else {
        this.$emit("addElement", input.value);
      }

      input.checked = !input.checked;
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