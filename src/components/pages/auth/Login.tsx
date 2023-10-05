import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginValidationSchema } from "../../../shared/validations/Validations";
import { useLoginMutation } from "../../../shared/store/api/loginApi";
import { authAction } from "../../../shared/store/slice/auth";
import { TLogin } from "../../../shared/types/types";
import { Form } from "../../common/Form";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation()

  const loginFromValue = useForm({ mode: "all", resolver: yupResolver(loginValidationSchema) });

  const loginHandler = async (user: TLogin) => {
    try {
      await login(user).unwrap().then((res) => {
        const token = res.result.token;
        dispatch(authAction.login({ token: token }));
        localStorage.setItem("token", token)
        navigate("/");
        toast.success("Login successfull!")
      })
    } catch (error) {
      toast.error('Invalid email or password')
    }
  };


  return (
    <>
      <Container sx={{ mt: 4 }} maxWidth="lg">
        <Card className="card" variant="outlined" sx={{ p: 4, maxWidth: 600 }}>
          <Typography className="text-center" variant="h4">
            Login
          </Typography>
          <div className="form mt-3">
            <Form reactFormContext={loginFromValue} onSubmit={loginHandler}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Form.Input name="email" label="Email" />
                </Grid>
                <Grid item xs={12}>
                  <Form.Input name="password" label="Password" />
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
            </Form>
          </div>
        </Card>
      </Container>
    </>
  );
}

export default Login;
