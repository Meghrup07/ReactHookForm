import {
  Button,
  Card,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TUserCreate, TUserDetails } from "../../types/types";
import { useGetSingeUserQuery, useNewPostMutation, useUpdateUserMutation } from "../../shared/store/api/api";
import { addUserValidationSchema } from "../../shared/validations/Validations";
import { skipToken } from "@reduxjs/toolkit/dist/query";


function AddUser() {

  const { id } = useParams();

  const { data } = useGetSingeUserQuery(id ?? skipToken);

  const isAdd = !id;

  const navigate = useNavigate();

  const [newPost] = useNewPostMutation();

  const [updatePost] = useUpdateUserMutation();

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
    resolver: yupResolver(addUserValidationSchema),
  });
  const role = [
    { key: "admin", value: "Admin" },
    { key: "teacher", value: "Teacher" },
    { key: "student", value: "Student" },
  ];

  const formSubmitHandler = (data: TUserCreate) => {
    return isAdd
      ? createUser(data)
      : updateUser({ id, ...data });
  };

  const createUser = (userData: TUserCreate) => {
    newPost(userData).unwrap().then((res) => {
      alert("User Added Successfully!");
      navigate("/");
    }).catch((error) => {
      alert(error)
    });
  }

  const updateUser = (userData: TUserDetails) => {
    updatePost(userData).unwrap().then((res) => {
      alert("User updated successfully!")
      navigate("/");
    }).catch((error) => {
      alert(error)
    })
  }

  return (
    <Container sx={{ mt: 4 }} maxWidth="lg">
      <Card variant="outlined" sx={{ p: 4 }}>
        <Typography variant="h4" className="text-center" sx={{ mb: 4 }}>
          Add User
        </Typography>

        <form onSubmit={handleSubmit(formSubmitHandler)}>
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
                    type="date"
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
              {isAdd
                ? "Save"
                : "Update"}
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

export default AddUser;
