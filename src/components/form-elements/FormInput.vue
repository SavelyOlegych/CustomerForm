<template>
  <label class="form-input">
    <span class="form-input__text">{{ fieldName }}</span>
    <input
      class="form-input__input"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.currentTarget.value)"
    >
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
    fieldName: String
  }
};
</script>

<style lang="scss" scoped>
.form-input {
  display: flex;
  flex-direction: column;
  
  &__text {
    margin-bottom: 3px;
    color: grey;
  }
  
  &__input {
    border: none;
    border-radius: 15px;
    padding: 10px 10px;
    outline: none;
    margin-top: auto;
  }
}
</style>