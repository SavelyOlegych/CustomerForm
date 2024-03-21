<template>
  <div class="container">
    <form class="customer-form" ref="form">
      <div class="customer-form__section">
        <h2 class="customer-form__section-title">Основные данные</h2>
        <div class="customer-form__section-elements">
          <FormInput
            class="customer-form__element"
            fieldName="Фамилия*"
            type="text"
            v-model="lastName"
            :error="lastNameError"
          />
          <FormInput
            class="customer-form__element"
            fieldName="Имя*"
            type="text"
            v-model="firstName"
            :error="firstNameError"
          />
          <FormInput
            class="customer-form__element"
            fieldName="Отчество"
            type="text"
            v-model="middleName"
          />
          <FormInput
            class="customer-form__element"
            fieldName="Дата рождения*"
            type="text"
            placeholder="ДД.ММ.ГГГГ"
            v-model="birthDate"
            :error="birthDateError"
          />
          <FormInput
            class="customer-form__element"
            fieldName="Номер телефона* (начинается с 7)"
            type="number"
            v-model="phone"
            :error="phoneError"
          />
          <FormInput
            class="customer-form__element"
            fieldName="Пол"
            type="text"
            v-model="gender"
          />
          <FormMultiselect
            class="customer-form__element"
            fieldName="Группа клиентов*"
            :options="customerGroups"
            :selected="selectedCustomerGroups"
            @addElement="addCustomerGroup"
            @removeElement="removeCustomerGroup"
            :error="selectedCustomerGroupsError"
          />
          <FormSelect
            class="customer-form__element"
            fieldName="Лечащий врач"
            :options="doctors"
            v-model="selectedDoctor"
          />
          <FormCheckbox
            class="customer-form__element customer-form__element--checkbox"
            fieldName="Не отправлять СМС"
            v-model="dontSendSms"
          />
        </div>
      </div>

      <div class="customer-form__section">
        <h2 class="customer-form__section-title">Адрес</h2>
        <div class="customer-form__section-elements">
          <FormInput
            class="customer-form__element"
            fieldName="Индекс"
            type="number"
            v-model="address.postalCode"
          />
          <FormInput
            class="customer-form__element"
            fieldName="Страна"
            type="text"
            v-model="address.country"
          />
          <FormInput
            class="customer-form__element"
            fieldName="Область"
            type="text"
            v-model="address.region"
          />
          <FormInput
            class="customer-form__element"
            fieldName="Город*"
            type="text"
            v-model="address.city"
            :error="addressCityError"
          />
          <FormInput
            class="customer-form__element"
            fieldName="Улица"
            type="text"
            v-model="address.street"
          />
          <FormInput
            class="customer-form__element"
            fieldName="Дом" 
            type="text" 
            v-model="address.building"
          />
        </div>
      </div>

      <div class="customer-form__section">
        <h2 class="customer-form__section-title">Паспорт</h2>
        <div class="customer-form__section-elements customer-form__section-elements--wide">
          <FormSelect
            class="customer-form__element"
            fieldName="Тип документа*"
            :options="passport.documentTypes"
            v-model="passport.selectedDocumentType"
            :error="selectedDocumentTypeError"
          />
          <FormInput 
            class="customer-form__element" 
            fieldName="Серия" type="number" 
            v-model="passport.series"
          />
          <FormInput
            class="customer-form__element" 
            fieldName="Номер"
            type="number"
            v-model="passport.number"/>
          <FormInput
            class="customer-form__element"
            fieldName="Кем выдан"
            type="text"
            v-model="passport.issuedBy"
          />
          <FormInput
            class="customer-form__element"
            fieldName="Дата выдачи*"
            type="text"
            placeholder="ДД.ММ.ГГГГ"
            v-model="passport.date"
            :error="passportDateError"
          />
        </div>
      </div>
      <div class="customer-form__bottom">
        <button
          class="customer-form__button"
          type="submit"
          @click.prevent="createCustomer"
        >
          Создать клиента
        </button>
        <span class="error-text" v-if="formInvalid">Есть ошибки в форме</span>
        <span class="customer-form__success-text" v-if="formSuccess">Клиент создан успешно</span>
      </div>
    </form>
  </div>
</template>

<script>
import FormMultiselect from "@/components/form-elements/FormMultiselect.vue";
import FormInput from "@/components/form-elements/FormInput.vue";
import FormSelect from "@/components/form-elements/FormSelect.vue";
import FormCheckbox from "@/components/form-elements/FormCheckbox.vue";
import { validationMixin } from "vuelidate";
import Validation from "@/mixins/Validation";

export default {
  components: { FormCheckbox, FormSelect, FormInput, FormMultiselect },
  mixins: [ validationMixin, Validation ],
  data() {
    return {
      firstName: "",
      lastName: "",
      middleName: "",
      birthDate: "",
      phone: "",
      gender: "",
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
      dontSendSms: false,
      address: {
        postalCode: "",
        country: "",
        region: "",
        city: "",
        street: "",
        building: "",
      },
      passport: {
        documentTypes: {
          passport: "Паспорт",
          birthCertificate: "Свидетельство о рождении",
          drivingLicense: "Вод. удостоверение",
        },
        selectedDocumentType: "",
        series: "",
        number: "",
        issuedBy: "",
        date: "",
      },
      formSuccess: false,
    };
  },
  computed: {
    formInvalid() {
      return this.$v.$anyError;
    }
  },
  methods: {
    addCustomerGroup(group) {
      this.selectedCustomerGroups.push(group);
    },
    removeCustomerGroup(group) {
      this.selectedCustomerGroups.splice(this.selectedCustomerGroups.indexOf(group), 1);
    },
    createCustomer() {
      this.$v.$touch();
      
      if (!this.$v.$anyError) {
        this.$v.$reset();
        this.resetForm();
        this.formSuccess = true;
        
        const timeout = setTimeout(() => {
          this.formSuccess = false;
          clearTimeout(timeout);
        }, 5000);
      } else {
        this.formSuccess = false;
      }
    },
    resetForm() {
      this.firstName = "";
      this.lastName = "";
      this.middleName = "";
      this.birthDate = "";
      this.phone = "";
      this.gender = "";
      this.selectedCustomerGroups = [];
      this.selectedDoctor = "";
      this.dontSendSms = false;

      this.address.postalCode = "";
      this.address.country = "";
      this.address.region = "";
      this.address.city = "";
      this.address.street = "";
      this.address.building = "";

      this.passport.selectedDocumentType = "";
      this.passport.series = "";
      this.passport.number = "";
      this.passport.issuedBy = "";
      this.passport.date = "";
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/base";

.customer-form {
  &__section {
    &:not(:last-child) {
      margin-bottom: 50px;
    }

    &-title {
      margin-bottom: 20px;
    }

    &-elements {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 25px 20px;

      @media (max-width: 767px) {
        grid-template-columns: repeat(2, 1fr);

        &--wide {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 479px) {
        grid-template-columns: 1fr;
        grid-gap: 25px 15px;
      }
    }
  }

  &__element {
    width: 100%;

    &--checkbox {
      @media (min-width: 767px) {
        margin-top: 15px;
      }
    }
  }

  &__bottom {
    position: relative;
  }
  
  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 20px;
    font-size: 20px;
    color: $whiteColor;
    border-radius: 7px;
    transition: all .2s;
    border: 0;
    cursor: pointer;
    background-color: royalblue;

    &:hover {
      color: royalblue;
      background-color: $whiteColor;
    }

    @media (max-width: 479px) {
      width: 100%;
    }
  }
  
  &__success-text {
    position: absolute;
    left: 10px;
    bottom: -17px;
    font-size: 14px;
    color: $successColor;
  }
}
</style>
