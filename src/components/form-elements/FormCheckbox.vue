<template>
  <label class="form-checkbox">
    <span class="form-checkbox__text">{{ fieldName }}</span>
    <input
      class="form-checkbox__input"
      type="checkbox"
      :checked="value"
      @change="$emit('input', $event.currentTarget.checked)"
    >
  </label>
</template>

<script>
export default {
  name: "FormCheckbox",
  props: {
    fieldName: String,
    value: Boolean,
  }
};
</script>

<style lang="scss" scoped>
.form-checkbox {
  display: flex;
  align-items: center;
  
  &__text {
    color: grey;
  }
  
  &__input {
    height: 17px;
    width: 17px;
    margin-left: 10px;
  }
}
</style>