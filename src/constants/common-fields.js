import { nameValidator, ageValidator } from "../validation/form/community";
import {
  GENDER_VALUE,
  COUNTRY_KEYS,
  REGION_KEYS,
  OCCUPATION_KEYS,
  NATIONALITY_KEYS,
  LANGUAGES_KEYS,
  CITY_KEYS,
  CUSTOMFIELD1_KEYS,
} from "./common-keys";
import { emailValidator } from "../validation/form/medical";

import AddressLocal from "../config/address_schema_locale";

const COMMON_FIELDS = (lang, handleFieldChange, langCode) => {
  return [
    {
      type: "text",
      label: lang.t("firstName"),
      property: "firstName",
      focus: false,
      onChange: handleFieldChange("firstName"),
      onValidate: nameValidator.validate,
      validationErrorMsg: lang.t(nameValidator.validationErrorMsg),
    },
    {
      type: "text",
      label: lang.t("middleName"),
      property: "middleName",
      focus: false,
      onChange: handleFieldChange("middleName"),
      validationErrorMsg: lang.t(nameValidator.validationErrorMsg),
    },
    {
      type: "text",
      label: lang.t("lastName"),
      property: "lastName",
      onChange: handleFieldChange("lastName"),
      onValidate: nameValidator.validate,
      validationErrorMsg: lang.t(nameValidator.validationErrorMsg),
    },
    {
      type: "number",
      label: lang.t("age"),
      property: "age",
      onChange: handleFieldChange("age"),
      onValidate: ageValidator.validate,
      validationErrorMsg: lang.t(ageValidator.validationErrorMsg),
    },
    {
      type: "date",
      label: lang.t("dateOfBirth"),
      property: "dateOfBirth",
      langCode: langCode,
      onChange: handleFieldChange("dateOfBirth"),
    },

    {
      type: "select",
      label: lang.t("gender.label"),
      property: GENDER_VALUE.property,
      onChange: handleFieldChange(GENDER_VALUE.property),
      choices: [
        { label: lang.t("gender.female"), value: GENDER_VALUE.female },
        { label: lang.t("gender.male"), value: GENDER_VALUE.male },
      ],
    },
    {
      type: "select",
      label: lang.t("preferredLanguage.label"),
      property: "preferredLanguage",
      onChange: handleFieldChange("preferredLanguage"),
      choices: LANGUAGES_KEYS.map((l) => ({
        label: lang.t(`preferredLanguage.${l}`),
        value: l,
      })),
    },
    {
      type: "select",
      label: lang.t("occupation.label"),
      property: "occupation",
      onChange: handleFieldChange("occupation"),
      choices: OCCUPATION_KEYS.map((r) => ({
        label: lang.t(`occupation.${r}`),
        value: r,
      })),
    },
    {
      type: "text",
      label: lang.t("occupationOther"),
      property: "occupationOther",
      onChange: handleFieldChange("occupationOther"),
    },
    {
      type: "select",
      label: lang.t("nationality.label"),
      property: "nationality",
      onChange: handleFieldChange("nationality"),
      choices: NATIONALITY_KEYS.map((r) => ({
        label: lang.t(`nationality.value.${r}`),
        value: r,
      })),
    },
    {
      type: "text",
      label: lang.t("passportNumber"),
      property: "passportNumber",
      onChange: handleFieldChange("passportNumber"),
    },
    {
      type: "text",
      label: lang.t("governmentIssuedId"),
      property: "governmentIssuedId",
      onChange: handleFieldChange("governmentIssuedId"),
    },

    {
      type: "text",
      label: lang.t("phoneNumber"),
      property: "phoneNumber",
      onChange: handleFieldChange("phoneNumber"),
    },
    //Address
    {
      type: AddressLocal.country.type,
      label: lang.t(`${AddressLocal.country.name}.label`),
      property: "country",
      active: AddressLocal.country.active,
      choices: COUNTRY_KEYS.map((c) => ({
        label: lang.t(`country.value.${c}`),
        value: c,
      })),
      onChange: handleFieldChange("country"),
    },
    {
      type: AddressLocal.region.type,
      label: lang.t(`${AddressLocal.region.name}.label`),
      property: "region",
      active: AddressLocal.region.active,
      choices: REGION_KEYS.map((r) => ({
        label: lang.t(`region.value.${r}`),
        value: r,
      })),
      onChange: handleFieldChange("region"),
    },
    {
      type: AddressLocal.city.type,
      label: lang.t(`${AddressLocal.city.name}.label`),
      property: "city",
      active: AddressLocal.city.active,
      choices: CITY_KEYS.map((r) => ({
        label: lang.t(`city.value.${r}`),
        value: r,
      })),
      onChange: handleFieldChange("city"),
    },
    {
      type: AddressLocal.postalCode.type,
      label: lang.t(`${AddressLocal.postalCode.name}`),
      property: "postalCode",
      active: AddressLocal.postalCode.active,
      onChange: handleFieldChange("postalCode"),
    },
    {
      type: AddressLocal.street.type,
      label: lang.t(`${AddressLocal.street.name}`),
      property: "street",
      active: AddressLocal.street.active,
      onChange: handleFieldChange("street"),
    },
    {
      type: AddressLocal.building.type,
      label: lang.t(`${AddressLocal.building.name}`),
      property: "building",
      active: AddressLocal.building.active,
      onChange: handleFieldChange("building"),
    },
    {
      type: AddressLocal.customField1.type,
      label: lang.t(`${AddressLocal.customField1.name}.label`),
      property: "customField1",
      active: AddressLocal.customField1.active,
      choices: CUSTOMFIELD1_KEYS.map((r) => ({
        label: lang.t(`${AddressLocal.customField1.name}.value.${r}`),
        value: r,
      })),
      onChange: handleFieldChange("customField1"),
    },
    {
      type: AddressLocal.customField2.type,
      label: lang.t(`${AddressLocal.customField2.name}`),
      property: "customField2",
      active: AddressLocal.customField2.active,
      onChange: handleFieldChange("customField2"),
    },
    {
      type: "text",
      label: lang.t("email"),
      property: "email",
      onChange: handleFieldChange("email"),
      onValidate: emailValidator.validate,
      validationErrorMsg: lang.t(emailValidator.validationErrorMsg),
    },
    {
      type: "switch",
      label: lang.t("hasRecentlyTraveled"),
      property: "hasRecentlyTraveled",
      onChange: handleFieldChange("hasRecentlyTraveled"),
      onLabel: lang.t("yes"),
      offLabel: lang.t("no"),
    },
    {
      type: "switch",
      label: lang.t("worksAtOrVisitedHealthFacility"),
      property: "worksAtOrVisitedHealthFacility",
      onChange: handleFieldChange("worksAtOrVisitedHealthFacility"),
      onLabel: lang.t("yes"),
      offLabel: lang.t("no"),
    },
    {
      type: "check",
      label: lang.t("chronicLungDisease"),
      property: "chronicLungDisease",
      onChange: handleFieldChange("chronicLungDisease"),
    },

    {
      type: "check",
      label: lang.t("heartDisease"),
      property: "heartDisease",
      onChange: handleFieldChange("heartDisease"),
    },

    {
      type: "check",
      label: lang.t("heartDisease"),
      property: "heartDisease",
      onChange: handleFieldChange("heartDisease"),
    },

    {
      type: "check",
      label: lang.t("liverDisease"),
      property: "liverDisease",
      onChange: handleFieldChange("liverDisease"),
    },
    {
      type: "check",
      label: lang.t("renalDisease"),
      property: "renalDisease",
      onChange: handleFieldChange("renalDisease"),
    },

    {
      type: "check",
      label: lang.t("autoimmuneDisease"),
      property: "autoimmuneDisease",
      onChange: handleFieldChange("autoimmuneDisease"),
    },

    {
      type: "check",
      label: lang.t("cancer"),
      property: "cancer",
      onChange: handleFieldChange("cancer"),
    },

    {
      type: "check",
      label: lang.t("diabetes"),
      property: "diabetes",
      onChange: handleFieldChange("diabetes"),
    },

    {
      type: "check",
      label: lang.t("hiv"),
      property: "hiv",
      onChange: handleFieldChange("hiv"),
    },

    {
      type: "check",
      label: lang.t("pregnancy"),
      property: "pregnancy",
      onChange: handleFieldChange("pregnancy"),
    },
    {
      type: "check",
      label: lang.t("fever"),
      property: "fever",
      onChange: handleFieldChange("fever"),
    },
    {
      type: "check",
      label: lang.t("cough"),
      property: "cough",
      onChange: handleFieldChange("cough"),
    },
    {
      type: "check",
      label: lang.t("fatigue"),
      property: "fatigue",
      onChange: handleFieldChange("fatigue"),
    },
    {
      type: "check",
      label: lang.t("shortnessOfBreath"),
      property: "shortnessOfBreath",
      onChange: handleFieldChange("shortnessOfBreath"),
    },
    {
      type: "check",
      label: lang.t("headache"),
      property: "headache",
      onChange: handleFieldChange("headache"),
    },

    {
      type: "check",
      label: lang.t("runnyNose"),
      property: "runnyNose",
      onChange: handleFieldChange("runnyNose"),
    },
    {
      type: "check",
      label: lang.t("feelingUnwell"),
      property: "feelingUnwell",
      onChange: handleFieldChange("feelingUnwell"),
    },
    {
      type: "switch",
      label: lang.t("contactWithSuspected"),
      property: "contactWithSuspected",
      onChange: handleFieldChange("contactWithSuspected"),
      onLabel: lang.t("yes"),
      offLabel: lang.t("no"),
    },
    {
      type: "switch",
      label: lang.t("contactWithConfirmed"),
      property: "contactWithConfirmed",
      onChange: handleFieldChange("contactWithConfirmed"),
      onLabel: lang.t("yes"),
      offLabel: lang.t("no"),
    },
  ];
};

export { COMMON_FIELDS };
