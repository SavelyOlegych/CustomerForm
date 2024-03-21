<template>
  <label class="form-input">
    <span class="form-input__text">{{ fieldName }}</span>
    <input
      class="form-input__input"
      :class="{'form-input__input--error': error}"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.currentTarget.value)"
    >
    <span class="error-text" v-if="error">{{ error }}</span>
  </label>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    type: String,
    value: String,
    placeholder: {
      type: String,
      default: "",
    },
    fieldName: String,
    error: {
      type: [String, undefined],
    },
  },
};
</script>

<style lang="scss" scoped>
.form-input {
  display: flex;
  flex-direction: column;
  position: relative;

  &__text {
    margin-bottom: 3px;
    color: grey;
  }

  &__input {
    border: 1px solid transparent;
    border-radius: 15px;
    padding: 10px 10px;
    outline: none;
    margin-top: auto;

    &--error {
      border-color: $errorColor;
    }
  }
}
</style>