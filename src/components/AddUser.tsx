import {
    Button,
    Card,
    Container,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../services/UserServices";
import * as  Yup from "yup"
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { userDetails } from "../types/types";
function AddUser() {

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string().required("Email is required").email("Please enter valid email"),
        mobileNumber: Yup.string().required("Mobile no. is required")
            .matches(phoneRegExp, "Please enter valid mobile no.")
            .min(10, "Please enter valid mobile no.")
            .max(10, "Please enter valid mobile no."),
        dob: Yup.string().required("DOB is required"),
        role: Yup.string().required("Role is required"),
        pic: Yup.string()
    })

    const { handleSubmit, control, formState: { errors } } = useForm({
        mode: "all",
        resolver: yupResolver(validationSchema)
    })
    const role = [{ key: "admin", value: "Admin" }, { key: "teacher", value: "Teacher" }, { key: "student", value: "Student" }]

    const navigate = useNavigate();

    const formSubmitHandler = (userData: userDetails) => {
        addUser(userData).then((res: any) => {
            alert("User Added Successfully!")
            navigate("/")
        }).catch((error) => {
            alert(error);
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
                                render={({ field: { ref, ...rest } }) => <TextField
                                    fullWidth
                                    inputRef={ref}
                                    label="First name"
                                    variant="outlined"
                                    {...rest}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message || ""}
                                />}
                            />
                        </Grid>
                        <Grid item md={6} sx={{ mb: 1 }}>
                            <Controller
                                name="lastName"
                                control={control}
                                render={({ field: { ref, ...rest } }) => <TextField
                                    fullWidth
                                    inputRef={ref}
                                    label="Last name"
                                    variant="outlined"
                                    {...rest}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message || ""}
                                />}
                            />
                        </Grid>
                        <Grid item md={6} sx={{ mb: 1 }}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field: { ref, ...rest } }) => <TextField
                                    fullWidth
                                    inputRef={ref}
                                    label="Email"
                                    variant="outlined"
                                    {...rest}
                                    error={!!errors.email}
                                    helperText={errors.email?.message || ""}
                                />}
                            />
                        </Grid>
                        <Grid item md={6} sx={{ mb: 1 }}>
                            <Controller
                                name="mobileNumber"
                                control={control}
                                render={({ field: { ref, ...rest } }) => <TextField
                                    fullWidth
                                    inputRef={ref}
                                    label="Mobile No."
                                    variant="outlined"
                                    {...rest}
                                    error={!!errors.mobileNumber}
                                    helperText={errors.mobileNumber?.message || ""}
                                />}
                            />
                        </Grid>
                        <Grid item md={6} sx={{ mb: 1 }}>
                            <Controller
                                name="dob"
                                control={control}
                                render={({ field: { ref, ...rest } }) => <TextField
                                    fullWidth
                                    inputRef={ref}
                                    type="date"
                                    label="DOB"
                                    variant="outlined"
                                    {...rest}
                                    error={!!errors.dob}
                                    helperText={errors.dob?.message || ""}
                                />}
                            />
                        </Grid>
                        <Grid item md={6} sx={{ mb: 1 }}>
                            <Controller
                                name="role"
                                control={control}
                                render={({ field: { ref, ...rest } }) =>
                                    <TextField
                                        select
                                        fullWidth
                                        inputRef={ref}
                                        label="Role"
                                        variant="outlined"
                                        {...rest}
                                    >
                                        {role.map((roles) => (
                                            <MenuItem key={roles.key} value={roles.value}>{roles.value}</MenuItem>
                                        ))}
                                    </TextField>}
                            />
                        </Grid>
                        <Grid item md={6} sx={{ mb: 1 }}>
                            <Controller
                                name="pic"
                                control={control}
                                render={({ field: { ref, ...rest } }) => <TextField
                                    fullWidth
                                    inputRef={ref}
                                    label="Pic"
                                    variant="outlined"
                                    {...rest}
                                />}
                            />
                        </Grid>
                    </Grid>
                    <div className="mt-4 text-center">
                        <Button type="submit" variant="contained" color="success">
                            Save
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
        </Container >
    )
}

export default AddUser