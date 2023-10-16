import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useCreateAlbumMutation } from '../../../../shared/store/api/gallery';
import { TAlbum, TAlbumUpdate } from '../../../../shared/types/gallery';
import { albumUpdateValidationSchema, albumValidationSchema } from '../../../../shared/validations/AlbumGallery';
import { Form } from '../../../common/Form'

function AddAlbum(props: any) {

    const { onSetUpdateValue } = props

    const [newAlbum] = useCreateAlbumMutation()

    const userFormValues = useForm({
        mode: "all",
        defaultValues: {
            albumName: ""
        },
        resolver: yupResolver(albumValidationSchema)
    });


    const formSubmitHandler = async (data: TAlbum) => {
        try {
            await newAlbum(data).unwrap();
            toast.success("Album created successfully!");
            userFormValues.reset();
        } catch (error: any) {
            toast.error(error)
        }
    };

    return (
        <>
            <Card variant="outlined" sx={{ p: 2, mb: 4 }}>
                <Typography variant="h6" className="text-center" sx={{ mb: 2 }}>
                    Add Album
                </Typography>
                <Form reactFormContext={userFormValues} onSubmit={formSubmitHandler}>
                    <Form.Input label="Album Name" name="albumName" />
                    <div className="mt-4 text-center">
                        <Button type="submit" variant="contained" color="success">
                            Save
                        </Button>
                    </div>
                </Form>
            </Card>
        </>
    )
}

export default AddAlbum