import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingeUserQuery, useUpdateUserMutation } from "../../store/api/api";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { TUserDetails } from "../../types/types";
import { editUserValidationSchema } from "../../shared/Validations";

function EditUser() {
  const { id } = useParams();

  const { data } = useGetSingeUserQuery(id ?? skipToken);

  const navigate = useNavigate();

  const role = [
    { key: "admin", value: "Admin" },
    { key: "teacher", value: "Teacher" },
    { key: "student", value: "Student" },
  ];

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    values: data,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      role: "",
      dob: "",
      pic: "",
    },
    resolver: yupResolver(editUserValidationSchema),
  });

  const [updatePost] = useUpdateUserMutation();

  const handleFormSubmit = (userData: TUserDetails) => {
    updatePost(userData).unwrap().then((res) => {
      alert("User updated successfully!")
      navigate("/");
    }).catch((error) => {
      alert(error)
    })
  };


  return (
    <Container sx={{ mt: 4 }} maxWidth="lg">
      <Card variant="outlined" sx={{ p: 4 }}>
        <Typography variant="h4" className="text-center" sx={{ mb: 4 }}>
          Edit User
        </Typography>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={3}>
            <Grid item md={6} sx={{ mb: 1 }}>
              <Controller
                name="firstName"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <TextField
                    fullWidth
                    inputRef={ref}
                    label="First name"
                    variant="outlined"
                    {...rest}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message || ""}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} sx={{ mb: 1 }}>
              <Controller
                name="lastName"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <TextField
                    fullWidth
                    inputRef={ref}
                    label="Last name"
                    variant="outlined"
                    {...rest}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message || ""}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} sx={{ mb: 1 }}>
              <Controller
                name="email"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <TextField
                    fullWidth
                    inputRef={ref}
                    label="Email"
                    variant="outlined"
                    {...rest}
                    error={!!errors.email}
                    helperText={errors.email?.message || ""}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} sx={{ mb: 1 }}>
              <Controller
                name="mobileNumber"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <TextField
                    fullWidth
                    inputRef={ref}
                    label="Mobile No."
                    variant="outlined"
                    {...rest}
                    error={!!errors.mobileNumber}
                    helperText={errors.mobileNumber?.message || ""}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} sx={{ mb: 1 }}>
              <Controller
                name="dob"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <TextField
                    fullWidth
                    inputRef={ref}
                    label="DOB"
                    variant="outlined"
                    {...rest}
                    error={!!errors.dob}
                    helperText={errors.dob?.message || ""}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} sx={{ mb: 1 }}>
              <Controller
                name="role"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <TextField
                    select
                    fullWidth
                    inputRef={ref}
                    label="Role"
                    variant="outlined"
                    {...rest}
                    error={!!errors.role}
                    helperText={errors.role?.message || ""}
                  >
                    {role.map((roles) => (
                      <MenuItem key={roles.key} value={roles.value}>
                        {roles.value}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item md={6} sx={{ mb: 1 }}>
              <Controller
                name="pic"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <TextField
                    fullWidth
                    inputRef={ref}
                    label="Pic"
                    variant="outlined"
                    {...rest}
                  />
                )}
              />
            </Grid>
          </Grid>
          <div className="mt-4 text-center">
            <Button type="submit" variant="contained" color="success">
              Update
            </Button>
            <Button
              onClick={() => navigate("/")}
              type="button"
              sx={{ ml: 1 }}
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </Container>
  );
}

export default EditUser;
