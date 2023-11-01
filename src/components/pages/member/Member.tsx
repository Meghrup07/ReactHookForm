import React from 'react'
import { useGetMemberQuery } from "../../../shared/store/api/member";
import { Card, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

function Member() {

    const { data: memberData } = useGetMemberQuery();

    const memberDetails = memberData?.result.users || []

    return (
        <>
            <Container sx={{ mt: 4 }} maxWidth="lg">
                <Card variant="outlined" sx={{ p: 4 }}>
                    <Typography variant="h4" className="text-center" sx={{ mb: 4 }}>
                        Users List
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Mobile No.</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {memberDetails?.map((member: any) => (
                                    <TableRow hover key={member._id}>
                                        <TableCell>{member.memberId}</TableCell>
                                        <TableCell>
                                            {member.firstName} {member.lastName}
                                        </TableCell>
                                        <TableCell>{member.email}</TableCell>
                                        <TableCell>{member.phoneNumber}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Container>
        </>
    )
}

export default Member