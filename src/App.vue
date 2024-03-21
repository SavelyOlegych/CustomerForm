<template>
  <div>
    <FormInput fieldName="Имя*" type="text" v-model="firstName"/>
    <FormMultiselect
      fieldName="Группа клиентов*"
      :options="customerGroups"
      :selected="selectedCustomerGroups"
      @addElement="addCustomerGroup"
      @removeElement="removeCustomerGroup"
    />
    <FormSelect
      fieldName="Лечащий врач"
      :options="doctors"
      v-model="selectedDoctor"
    />
    <FormCheckbox fieldName="Не отправлять СМС" v-model="dontSendSms"/>
  </div>
</template>

<script>
import FormMultiselect from "@/components/form-elements/FormMultiselect.vue";
import FormInput from "@/components/form-elements/FormInput.vue";
import FormSelect from "@/components/form-elements/FormSelect.vue";
import FormCheckbox from "@/components/form-elements/FormCheckbox.vue";

export default {
  components: { FormCheckbox, FormSelect, FormInput, FormMultiselect },
  data() {
    return {
      firstName: "",
      dontSendSms: false,
      customerGroups: {
        vip: "VIP",
        problem: "Проблемные",
        oms: "ОМС",
      },
      selectedCustomerGroups: [],
      doctors: {
        ivanov: "Иванов",
        zaharov: "Захаров",
        chernysheva: "Чернышева",
      },
      selectedDoctor: "",
    }
  },
  methods: {
    addCustomerGroup(group) {
      this.selectedCustomerGroups.push(group);
    },
    removeCustomerGroup(group) {
      this.selectedCustomerGroups.splice(this.selectedCustomerGroups.indexOf(group), 1);
    },
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/base";
</style>
