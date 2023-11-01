export type TMemberList = {
    message: string,
    result: {
        count: number,
        users: [
            {
                address: string;
                city: string;
                country: string;
                countryCode: string;
                createdAt: string;
                email: string;
                firstName: string;
                gender: string;
                instituteId: string;
                isActive: boolean;
                isDeleted: boolean;
                lastName: string;
                memberId: string;
                phoneNumber: string;
                postalCode: string;
                profilePic: string;
                roleType: string;
                state: string;
                updatedAt: string;
                userAndInstitutesId: string;
                userId: string;
                userRole: string;
                userRoleId: string;
                _id: string;
            }
        ]
    }
}