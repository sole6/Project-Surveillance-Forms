import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button } from "@material-ui/core";
import { renderField } from "../form/form-util";

import MEDICAL_FIELDS from "../../constants/medicalCenter-fields";
import {
  BIOGRAPHICALDATA,
  CONTACTINFO,
  UNDERLYING,
  ADDRESS,
  SYMPTOMS,
  RISKS,
} from "../../constants/common-keys";
import MedicalInitialState from "./MedicalCentersInitialState";

import ReCAPTCHA from "react-google-recaptcha";
import { isEmpty, get } from "lodash";
import config from "../../config";

const TEST_SITE_KEY = config.captchaKey;
const DELAY = 1500;

const MedicalCentersEntryForm = ({ onSubmit, lang, langCode }) => {
  const [formValues, setFormValues] = useState({
    ...MedicalInitialState,
  });

  const [clear, setClear] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [isCaptchaExpired, setIsCaptchaExpired] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, DELAY);
  });

  const handleChange = (value) => {
    setCaptchaText(value);
    if (value === null) {
      setIsCaptchaExpired(true);
    }
  };

  const asyncScriptOnLoad = () => {
    console.log("scriptLoad - reCaptcha Ref-", React.createRef());
  };

  const handleFieldChange = (field) => (value) => {
    console.log(field, ": ", value);
    if (UNDERLYING.includes(field)) {
      setFormValues({
        ...formValues,
        underlyingConditions: {
          ...formValues.underlyingConditions,
          [field]: value,
        },
      });
    } else if (BIOGRAPHICALDATA.includes(field)) {
      setFormValues({
        ...formValues,
        biographicalData: {
          ...formValues.biographicalData,
          [field]: value,
        },
      });
    } else if (CONTACTINFO.includes(field)) {
      setFormValues({
        ...formValues,
        biographicalData: {
          ...formValues.biographicalData,
          contactInformation: {
            ...formValues.biographicalData.contactInformation,
            [field]: value,
          },
        },
      });
    } else if (ADDRESS.includes(field)) {
      setFormValues({
        ...formValues,
        biographicalData: {
          ...formValues.biographicalData,
          contactInformation: {
            ...formValues.biographicalData.contactInformation,
            address: {
              ...formValues.biographicalData.contactInformation.address,
              [field]: value,
            },
          },
        },
      });
    } else if (SYMPTOMS.includes(field)) {
      setFormValues({
        ...formValues,
        symptoms: {
          ...formValues.symptoms,
          [field]: value,
        },
      });
    } else if (RISKS.includes(field)) {
      setFormValues({
        ...formValues,
        riskFromContact: {
          ...formValues.riskFromContact,
          [field]: value,
        },
      });
    } else {
      setFormValues({
        ...formValues,
        [field]: value,
      });
    }
  };

  const fields = MEDICAL_FIELDS(lang, handleFieldChange, langCode, formValues);

  const renderFormField = (property) => {
    const field = fields.find((f) => f.property === property);
    if (!field) {
      return null;
    }
    return renderField(field, clear);
  };

  const renderSectionHeader = (label) => {
    return (
      <Typography className="sectionheader" variant="h2">
        {label}
      </Typography>
    );
  };

  const renderSubsectionheader = (label) => {
    return (
      <Typography className="subsectionheader" variant="h5">
        {label}
      </Typography>
    );
  };

  const handleSubmit = () => {
    onSubmit(formValues).then(() => {
      console.log(formValues);
      // clear form values
      setFormValues({});
      setClear(clear + 1);
    });
  };

  const isFormValid = () => {
    let isValid = true;
    if (!isEmpty(captchaText) && !isCaptchaExpired) {
      fields.forEach((f) => {
        if (f.onValidate) {
          if (f.property === "email") {
            isValid =
              isValid &&
              f.onValidate(
                get(
                  formValues,
                  `biographicalData.contactInformation.${f.property}`
                )
              );
          } else {
            isValid =
              isValid &&
              f.onValidate(get(formValues, `biographicalData.${f.property}`));
          }
        }
      });
    } else {
      isValid = false;
    }
    return isValid;
  };

  const renderForm = () => {
    return (
      <form autoComplete="off">
        {renderSectionHeader(lang.t("healthFacilitiesApplicationForm"))}
        {renderSubsectionheader(lang.t("basicInformation"))}
        <Grid container spacing={4}>
          {renderFormField("firstName")}
          {renderFormField("middleName")}
          {renderFormField("lastName")}
          {renderFormField("age")}
          {renderFormField("dateOfBirth")}
          {renderFormField("gender")}
          {renderFormField("preferredLanguage")}
          {renderFormField("occupation")}
          {formValues.biographicalData.occupation === "other"
            ? renderFormField("occupationOther")
            : null}
          {renderFormField("nationality")}
          {renderFormField("passportNumber")}
          {renderFormField("governmentIssuedId")}
        </Grid>

        {renderSubsectionheader(lang.t("contactInformation"))}
        <Grid container spacing={4}>
          {renderFormField("country")}
          {renderFormField("region")}
          {renderFormField("city")}
          {renderFormField("customField1")}
          {renderFormField("customField2")}
          {renderFormField("postalCode")}
          {renderFormField("street")}
          {renderFormField("building")}

          {renderFormField("email")}
          {renderFormField("phoneNumber")}
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            {renderSubsectionheader(lang.t("symptoms"))}
            {renderFormField("fever")}
            {renderFormField("cough")}
            {renderFormField("shortnessOfBreath")}
            {renderFormField("fatigue")}
            {renderFormField("headache")}
            {renderFormField("runnyNose")}
            {renderFormField("feelingUnwell")}
          </Grid>
          <Grid item xs={12} sm={4}>
            {renderSubsectionheader(lang.t("underlyingConditions"))}
            {renderFormField("chronicLungDisease")}
            {renderFormField("heartDisease")}
            {renderFormField("liverDisease")}
            {renderFormField("renalDisease")}
            {renderFormField("autoimmuneDisease")}
            {renderFormField("cancer")}
            {renderFormField("diabetes")}
            {renderFormField("hiv")}
            {renderFormField("pregnancy")}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderSubsectionheader(lang.t("riskFromContact"))}
            {renderFormField("hasRecentlyTraveled")}
            {renderFormField("contactWithSuspected")}
            {renderFormField("contactWithConfirmed")}
            {renderFormField("worksAtOrVisitedHealthFacility")}
          </Grid>
        </Grid>
        {renderSubsectionheader(lang.t("caller"))}
        <Grid container spacing={4}>
          {renderFormField("callerType")}
          {renderFormField("callDate")}
        </Grid>
        {isLoaded && (
          <ReCAPTCHA
            style={{ paddingTop: 20 }}
            ref={React.createRef()}
            sitekey={TEST_SITE_KEY}
            onChange={handleChange}
            asyncScriptOnLoad={asyncScriptOnLoad}
          />
        )}
        <Box mt={4} textAlign="right">
          <Button
            onClick={handleSubmit}
            variant="contained"
            size="large"
            disabled={!isFormValid()}
          >
            {lang.t("submit")}
          </Button>
        </Box>
      </form>
    );
  };

  return <Box>{renderForm()}</Box>;
};

export default MedicalCentersEntryForm;
