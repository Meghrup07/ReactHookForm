import {
  Button,
  Card,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useDeleteUserMutation, useGetUserQuery } from "../../../shared/store/api/api";
import dayjs from "dayjs";
// import { useGetMemberQuery } from "../../../shared/store/api/member";
import { toast } from "react-toastify";

function UserList() {
  const navigate = useNavigate();
  const { data } = useGetUserQuery();

  // const { data: memberData } = useGetMemberQuery();
  // console.log("🚀 ~ file: UserList.tsx:28 ~ UserList ~  memberData:", memberData)

  const [deletePost] = useDeleteUserMutation();

  const deleteHandler = async (id: any) => {
    try {
      if (window.confirm("Do you really want to delete?")) {
        await deletePost(id).unwrap().then(() => {
          toast.success("User Deleted Successfully!")
        })
      }
    } catch (error: any) {
      toast.error(error)
    }
  }

  return (
    <Container sx={{ mt: 4 }} maxWidth="lg">
      <Card variant="outlined" sx={{ p: 4 }}>
        <Typography variant="h4" className="text-center" sx={{ mb: 4 }}>
          Users List
        </Typography>
        <div className="text-end mb-5">
          <Button
            onClick={() => navigate("/add")}
            type="button"
            variant="contained"
          >
            Add User
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile No.</TableCell>
                <TableCell>Date of Birth </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((user: any) => (
                <TableRow hover key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.mobileNumber}</TableCell>
                  <TableCell>{dayjs(user.dob).format("DD/MM/YYYY")}</TableCell>
                  <TableCell>
                    <Button onClick={() => navigate(`/userInfo/${user.id}`)}>
                      <Tooltip title="View" placement="top">
                        <VisibilityIcon color="info" />
                      </Tooltip>
                    </Button>
                    <Button
                      onClick={() => navigate(`/edit/${user.id}`)}
                      sx={{ ml: 1 }}
                    >
                      <Tooltip title="Edit" placement="top">
                        <EditIcon color="primary" />
                      </Tooltip>
                    </Button>
                    <Button onClick={() => deleteHandler(user.id)} sx={{ ml: 1 }}>
                      <Tooltip title="Delete" placement="top">
                        <DeleteIcon color="error" />
                      </Tooltip>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}

export default UserList;
