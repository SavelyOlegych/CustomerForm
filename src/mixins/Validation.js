import { maxLength, minLength, required } from "vuelidate/lib/validators";
import { isArrayNotEmpty, isDate, isPhone } from "@/helpers/customValidations";

export default {
  computed: {
    lastNameError() {
      if (!this.$v.lastName.required && this.$v.lastName.$dirty) {
        return "Введите фамилию";
      } else if (!this.$v.lastName.minLength && this.$v.lastName.$dirty) {
        return "Некорректная фамилия";
      }
    },
    firstNameError() {
      if (!this.$v.firstName.required && this.$v.firstName.$dirty) {
        return "Введите имя";
      } else if (!this.$v.firstName.minLength && this.$v.firstName.$dirty) {
        return "Некорректное имя";
      }
    },
    birthDateError() {
      if (!this.$v.birthDate.required && this.$v.birthDate.$dirty) {
        return "Введите дату рождения";
      } else if (!this.$v.birthDate.isDate && this.$v.birthDate.$dirty) {
        return "Введите дату в формате ДД.ММ.ГГГГ";
      }
    },
    phoneError() {
      if (!this.$v.phone.required && this.$v.phone.$dirty) {
        return "Введите номер телефона";
      } else if (!this.$v.phone.isPhone && this.$v.phone.$dirty) {
        return "Номер телефона должен начинаться с цифры 7";
      } else if ((!this.$v.phone.minLength || !this.$v.phone.maxLength) && this.$v.phone.$dirty) {
        return "Номер телефона должен содержать 11 цифр";
      }
    },
    selectedCustomerGroupsError() {
      if (!this.$v.selectedCustomerGroups.isArrayNotEmpty && this.$v.selectedCustomerGroups.$dirty) {
        return "Выберите группу";
      }
    },
    addressCityError() {
      if (!this.$v.address.city.required && this.$v.address.city.$dirty) {
        return "Введите город";
      } else if (!this.$v.address.city.minLength && this.$v.address.city.$dirty) {
        return "Некорректное название города";
      }
    },
    selectedDocumentTypeError() {
      if (!this.$v.passport.selectedDocumentType.required && this.$v.passport.selectedDocumentType.$dirty) {
        return "Выберите тип документа";
      }
    },
    passportDateError() {
      if (!this.$v.passport.date.required && this.$v.passport.date.$dirty) {
        return "Введите дату выдачи паспорта";
      } else if (!this.$v.passport.date.isDate && this.$v.passport.date.$dirty) {
        return "Введите дату в формате ДД.ММ.ГГГГ";
      }
    }
  },
  validations: {
    lastName: {
      required,
      minLength: minLength(2),
    },
    firstName: {
      required,
      minLength: minLength(2),
    },
    birthDate: {
      required,
      isDate,
    },
    phone: {
      required,
      minLength: minLength(11),
      maxLength: maxLength(11),
      isPhone
    },
    selectedCustomerGroups: {
      isArrayNotEmpty
    },
    address: {
      city: {
        required,
        minLength: minLength(2),
      }
    },
    passport: {
      selectedDocumentType: {
        required,
      },
      date: {
        required,
        isDate
      }
    }
  },
}