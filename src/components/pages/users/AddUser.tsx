import {
  Button,
  Card,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useGetSingeUserQuery, useNewPostMutation, useUpdateUserMutation } from "../../../shared/store/api/api";
import { addUserValidationSchema } from "../../../shared/validations/Validations";
import { Form } from "../../common/Form";
import { toast } from "react-toastify";
import { TUserCreate, TUserDetails } from "../../../shared/types/types";

const role = ["Admin", "Teacher", "Student"];

function AddUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAdd = !id;
  const { data } = useGetSingeUserQuery(id ?? skipToken);
  const [newPost] = useNewPostMutation();
  const [updatePost] = useUpdateUserMutation();

  const userFormValues = useForm({
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
    resolver: yupResolver(addUserValidationSchema)
  });

  const formSubmitHandler = (data: TUserCreate) => {
    return isAdd
      ? createUser(data)
      : updateUser({ id, ...data });
  };

  const createUser = async (userData: TUserCreate) => {
    try {
      newPost(userData).unwrap().then((res) => {
        toast.success("User Added Successfully!");
        navigate("/");
      })
    } catch (error: any) {
      toast.error(error)
    }
  }

  const updateUser = async (userData: TUserDetails) => {
    try {
      await updatePost(userData).unwrap().then((res) => {
        toast.success("User updated successfully!")
        navigate("/");
      })
    } catch (error: any) {
      toast.error(error);
    }

  }

  return (
    <Container sx={{ mt: 4 }} maxWidth="lg">
      <Card variant="outlined" sx={{ p: 4 }}>
        <Typography variant="h4" className="text-center" sx={{ mb: 4 }}>
          Add User
        </Typography>

        <Form reactFormContext={userFormValues} onSubmit={formSubmitHandler}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
              <Form.Input label="First Name" name="firstName" />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
              <Form.Input label="Last Name" name="lastName" />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
              <Form.Input label="Email" name="email" />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
              <Form.Input label="Mobile No." name="mobileNumber" />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
              <Form.Datepicker label="DOB" name="dob" />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
              <Form.Dropdown label="Role" name="role" options={role} />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
              <Form.Input label="Pic" name="pic" />
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
        </Form>
      </Card>
    </Container>
  );
}

export default AddUser;
