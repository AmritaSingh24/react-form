import React, { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./registration.css";

import {
  Paper,
  Box,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Registration = () => {
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Fullname is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    age: Yup.string().required("Age is required"),
    mobile: Yup.string()
      .required("Mobile Number is required")
      .min(10, "Invalid number")
      .max(10, "Invalid number"),
    addresses: Yup.array().of(
      Yup.object().shape({
        addressline1: Yup.string()
          .required("Address line1 is required")
          .min(6, "Address line2 be at least 6 characters"),
        addressline2: Yup.string()
          .required("Address line2 is required")
          .min(6, "Address line2 must be at least 6 characters"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        pincode: Yup.string()
          .required("Pincode is required")
          .min(6, "Invalid pincode")
          .max(6, "Invalid pincode"),
      })
    ),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "Accept Terms and conditions is required"
    ),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  const numberofaddress = 1;

  // useEffect(() => {
  //   const newval = parseInt(numberofaddress || 0);
  //   const oldval = fields.length;
  //   if (newval > oldval) {
  //     for (let i = oldval; i < newval; i++) {
  //       append({
  //         addressline1: "",
  //         addressline2: "",
  //         city: "",
  //         state: "",
  //         pincode: "",
  //       });
  //     }
  //   }
  // }, [numberofaddress]);

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Paper className="card">
      <Box px={3} py={3}>
        <Typography variant="h6" align="center" className="heading">
          Registration Form
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="fullname"
              name="fullname"
              label="Full Name"
              fullWidth
              margin="dense"
              {...register("fullname")}
              error={errors.fullname ? true : false}
            />
            <Typography variant="inherit" color="error.main">
              {errors.fullname?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              margin="dense"
              {...register("email")}
              error={errors.email ? true : false}
            />
            <Typography variant="inherit" color="error.main">
              {errors.email?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="age"
              name="age"
              label="Age"
              fullWidth
              margin="dense"
              {...register("age")}
              error={errors.age ? true : false}
            />
            <Typography variant="inherit" color="error.main">
              {errors.age?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="mobile"
              name="mobile"
              label="Mobile Number"
              type="number"
              fullWidth
              margin="dense"
              {...register("mobile")}
              error={errors.mobile ? true : false}
            />
            <Typography variant="inherit" color="error.main">
              {errors.mobile?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="demo-simple-select-label" required>
                Occupation
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Occupation"
                onChange={handleChange}
              >
                <MenuItem value={10}>Frontend Developer</MenuItem>
                <MenuItem value={20}>Backend Developer</MenuItem>
                <MenuItem value={30}>Full Stack Developer</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="inherit" color="error.main">
              {errors.confirmPassword?.message}
            </Typography>
          </Grid>
          {fields.map((address, i) => {
            return (
              <Grid container sx={{ border: 1 }} py={2} marginY={2}>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "0 20px 20px 20px",
                  }}
                >
                  <Typography>Address #{i + 1}</Typography>
                  <Box>
                    <IconButton
                      color="primary"
                      sx={{ border: 1, margin: "0 10px" }}
                      size="small"
                      onClick={() =>
                        append({
                          addressline1: "",
                          addressline2: "",
                          city: "",
                          state: "",
                          pincode: "",
                        })
                      }
                    >
                      <AddIcon size="small" />
                    </IconButton>
                    <IconButton
                      color="primary"
                      sx={{ border: 1 }}
                      size="small"
                      onClick={() => remove(i)}
                    >
                      <RemoveIcon size="small" />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={5.75} marginX={1.2}>
                  <TextField
                    required
                    id="addressline1"
                    name={`addresses[${i}]addressline1`}
                    label="Address line1"
                    type="text"
                    fullWidth
                    margin="dense"
                    {...register(`addresses.${i}.addressline1`)}
                    error={errors.addresses?.[i]?.addressline1 ? true : false}
                  />
                  <Typography variant="inherit" color="error.main">
                    {errors.addresses?.[i]?.addressline1?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={5.75} marginX={1}>
                  <TextField
                    required
                    id="addressline2"
                    name={`addresses[${i}]addressline2`}
                    label="address line2"
                    type="text"
                    fullWidth
                    margin="dense"
                    {...register(`addresses.${i}.addressline2`)}
                    error={errors.addresses?.[i]?.addressline2 ? true : false}
                  />
                  <Typography variant="inherit" color="error.main">
                    {errors.addresses?.[i]?.addressline2?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3.8} marginX={1.3}>
                  <TextField
                    required
                    id="city"
                    name={`addresses[${i}]city`}
                    label="City"
                    type="text"
                    fullWidth
                    margin="dense"
                    {...register("city")}
                    error={errors.addresses?.[i]?.city ? true : false}
                  />
                  <Typography variant="inherit" color="error.main">
                    {errors.addresses?.[i]?.city?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3.8} marginX={0.4}>
                  <TextField
                    required
                    id="state"
                    name={`addresses[${i}]state`}
                    label="State"
                    type="text"
                    fullWidth
                    margin="dense"
                    {...register("state")}
                    error={errors.addresses?.[i]?.state ? true : false}
                  />
                  <Typography variant="inherit" color="error.main">
                    {errors.addresses?.[i]?.state?.message}
                  </Typography>
                </Grid>
                <Grid item sm={3.8} marginX={1}>
                  <TextField
                    required
                    id="pincode"
                    name={`addresses[${i}]pincode`}
                    label="Pincode"
                    type="number"
                    fullWidth
                    margin="dense"
                    {...register("pincode")}
                    error={errors.addresses?.[i]?.pincode ? true : false}
                  />
                  <Typography variant="inherit" color="error.main">
                    {errors.addresses?.[i]?.pincode?.message}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Controller
                  control={control}
                  name="acceptTerms"
                  defaultValue="false"
                  inputRef={register()}
                  render={({ field: { onChange } }) => (
                    <Checkbox
                      color="primary"
                      onChange={(e) => onChange(e.target.checked)}
                    />
                  )}
                />
              }
              label={
                <Typography color={errors.acceptTerms ? "error" : "inherit"}>
                  I agree terms and conditions*
                </Typography>
              }
            />
            <br />
            <Typography variant="inherit" color="error.main">
              {errors.acceptTerms ? "(" + errors.acceptTerms.message + ")" : ""}
            </Typography>
          </Grid>
        </Grid>

        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Registration;
