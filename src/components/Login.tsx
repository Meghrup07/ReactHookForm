import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authAction } from "../store/auth";

function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Please Enter valid email"),
    password: Yup.string().required("Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all", resolver: yupResolver(validationSchema) });

  const loginHandler = () => {
    dispatch(authAction.login());
    navigate("/");
  };

  return (
    <Container sx={{ mt: 4 }} maxWidth="lg">
      <Card className="card" variant="outlined" sx={{ p: 4, maxWidth: 600 }}>
        <Typography className="text-center" variant="h4">
          Login
        </Typography>
        <div className="form mt-3">
          <form onSubmit={handleSubmit(loginHandler)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <TextField
                      fullWidth
                      label="Email"
                      inputRef={ref}
                      {...rest}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <TextField
                      fullWidth
                      label="password"
                      inputRef={ref}
                      {...rest}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <div className="text-center mt-4">
              <Button type="submit" color="success" variant="contained">
                Login
              </Button>
              <Button
                sx={{ ml: 2 }}
                type="button"
                color="primary"
                variant="contained"
              >
                Singup
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </Container>
  );
}

export default Login;
