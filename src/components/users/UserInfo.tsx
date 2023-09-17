import { Button, Card, Container, Typography } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingeUserQuery } from "../../shared/store/api/api";


function UserInfo() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data } = useGetSingeUserQuery(id ?? skipToken);

  return (
    <Container sx={{ mt: 4 }} maxWidth="lg">
      <Card variant="outlined" sx={{ p: 4 }}>
        <Typography variant="h4" className="text-center">
          User Info
        </Typography>
        <div className="mt-4 text-end">
          <Button
            onClick={() => navigate("/")}
            type="button"
            variant="contained"
            color="primary"
          >
            Back to Users
          </Button>
        </div>
        {data && (
          <div className="detail-card mt-5" key={data.id}>
            <div className="card-description">
              <Typography className="card-description-title">
                {data.firstName} {data.lastName}
              </Typography>

              <Typography className="card-description-profession">
                Email: {data.email}
              </Typography>

              <Typography className="card-description-company">
                Mobile No: {data.mobileNumber}
              </Typography>

              <Typography className="card-description-company">
                Role: {data.role}
              </Typography>

              <div className="card-description-social">
                <Typography className="card-description-social-follow">
                  DOB: {data.dob}
                </Typography>
              </div>
            </div>
            <img alt="img" src={data.pic} className="card-image" />
          </div>
        )}
      </Card>
    </Container>
  );
}

export default UserInfo;
