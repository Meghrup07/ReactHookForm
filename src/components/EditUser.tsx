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
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getSingleUser } from "../services/UserServices";
import * as Yup from "yup";

function EditUser() {

    const { id } = useParams();

    const navigate = useNavigate()

    const role = [{ key: "admin", value: "Admin" }, { key: "teacher", value: "Teacher" }, { key: "student", value: "Student" }]

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

    const { handleSubmit, reset, control, formState: { errors } } = useForm({
        mode: "all", defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            mobileNumber: "",
            role: "",
            dob: "",
            pic: ""
        },
        resolver: yupResolver(validationSchema)
    })

    const handleFormSubmit = (userData: any) => {
        editUser(id, userData).then((res: any) => {
            alert("User updated successfully!");
            navigate("/")
        }).catch((error) => {
            alert(error)
        })
    }

    const getUserDetails = () => {
        getSingleUser(id)
            .then((res: any) => {
                reset(res.data);
            })
            .catch((error) => {
                alert(error);
            });
    };

    useEffect(() => {
        if (id) {
            getUserDetails();
        }
    }, [id]);


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
                                        error={!!errors.role}
                                        helperText={errors.role?.message || ""}
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
        </Container >
    )
}

export default EditUser