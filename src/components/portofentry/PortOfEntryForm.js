import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Slide,
  Dialog,
  List,
  ListItem,
  ListItemSecondaryAction,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { renderField } from "../form/form-util";
import PortOfEntryInitialState from "./PortOfEntryInitialState";
import { isEmpty, get } from "lodash";
import {
  BIOGRAPHICALDATA,
  CONTACTINFO,
  UNDERLYING,
  ADDRESS,
  SYMPTOMS,
  RISKS,
} from "../../constants/common-keys";
import PORT_OF_ENTRY_FIELDS from "../../constants/portOfEntry-fields";
import ReCAPTCHA from "react-google-recaptcha";
import DependantsForm from "../dependents/DependentsForm";

import config from "../../config";

const TEST_SITE_KEY = config.captchaKey;
const DELAY = 1500;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PortOfEntryForm = ({ onSubmit, lang, langCode }) => {
  const [formValues, setFormValues] = useState({
    ...PortOfEntryInitialState,
  });

  const [open, setOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [isCaptchaExpired, setIsCaptchaExpired] = useState(false);
  const [clear, setClear] = useState(0);

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

  const fields = PORT_OF_ENTRY_FIELDS(lang, handleFieldChange, langCode);

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
      // clear form values
      setFormValues({});
      setClear(clear + 1);
    });
  };

  const handleModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const handleDependentsAdd = (dependent) => {
    setOpen(false);
    const dependents = formValues.dependents || [];
    dependents.push(dependent);
    setFormValues({
      ...formValues,
      dependents,
    });
  };

  const renderForm = () => {
    return (
      <form autoComplete="off">
        {renderSectionHeader(lang.t("passengerDependentsRegistrationForm"))}
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
        {renderSubsectionheader(lang.t("travelInfo"))}
        <Grid container spacing={4}>
          {renderFormField("travelFromCountry")}
          {renderFormField("finalTransitCountry")}

          {renderFormField("flightNumber")}

          {renderFormField("seatNumber")}

          {renderFormField("stayingAtHotel")}

          {formValues.stayingAtHotel === "other" ? (
            <Grid item xs={12} md={4}>
              {renderFormField("hotelOther")}
            </Grid>
          ) : (
            ""
          )}
        </Grid>
        <Box mt={4} textAlign="left">
          {renderSubsectionheader(lang.t("dependents"))}
          <Button onClick={handleModal} variant="outlined" size="large">
            {lang.t("addDependent")}
          </Button>
          {!isEmpty(formValues.dependents) && (
            <Grid container item xs={12} md={4}>
              <List style={{ width: "100%" }}>
                {formValues.dependents.map((d, index) => {
                  const onRemoveDependent = () => {
                    const dependents = formValues.dependents.filter(
                      (d, i) => i !== index
                    );
                    setFormValues({
                      ...formValues,
                      dependents,
                    });
                  };

                  return (
                    <ListItem>
                      <Typography>{`${index + 1}. ${d.firstName} ${
                        d.lastName
                      }`}</Typography>
                      <ListItemSecondaryAction>
                        <Button onClick={onRemoveDependent}>Remove</Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          )}

          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <AppBar style={{ background: "blue" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography>
                  {lang.t("passengerDependentsRegistrationForm")}
                </Typography>
              </Toolbar>
            </AppBar>
            <Paper style={{ margin: 30, padding: 30 }}>
              <DependantsForm
                onSubmit={handleDependentsAdd}
                lang={lang}
                langCode={langCode}
              />
            </Paper>
          </Dialog>
        </Box>
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

export default PortOfEntryForm;
