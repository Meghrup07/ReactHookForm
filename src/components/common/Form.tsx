import { MenuItem, TextField } from "@mui/material";
import { Controller, FormProvider, useFormContext } from "react-hook-form";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import dayjs from "dayjs";
import FileUpload from "react-material-file-upload";

export const Form = (props: any) => {
    const { children, reactFormContext, onSubmit } = props;

    const handleSubmit = reactFormContext.handleSubmit;

    return (
        <FormProvider {...reactFormContext}>
            <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
        </FormProvider>
    );
};


Form.Input = function Input(props: any) {
    const { name, ...rest } = props;

    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field: { ref, ...restField } }) => (
                <TextField
                    fullWidth
                    inputRef={ref}
                    {...restField}
                    {...rest}
                    label={props.label}
                    error={!!errors[name]}
                    helperText={errors[name]?.message || ""}
                />
            )}
        />
    );
};


Form.Dropdown = function Dropdown(props: any) {

    const { name, options, ...rest } = props;

    const { control, formState: { errors } } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref, ...restField } }) => (
                <TextField
                    select
                    fullWidth
                    label={props.label}
                    variant="outlined"
                    inputRef={ref}
                    {...restField}
                    {...rest}
                    error={!!errors[name]}
                    helperText={errors[name]?.message || ""}
                >
                    {options.map((option: any) => {
                        return (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        );
                    })}
                </TextField>
            )
            }
        />
    );
};


Form.Datepicker = function Datepicker(props: any) {
    const { name, label } = props;
    const {
        control,
        setValue,
        formState: { errors, isDirty },
    } = useFormContext();

    const onDateSelect = (e: any) => {
        const selectedDate = moment.utc(e.$d).local().format();
        setValue(name, selectedDate, {
            shouldDirty: true,
            shouldValidate: true,
            shouldTouch: true,
        });
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, ...restField } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                            onChange={onDateSelect}
                            value={dayjs(value)}
                            label={label}
                            disableFuture={true}
                            slotProps={{
                                textField: {
                                    error: !!errors[name],
                                    // helperText: errors[name]?.message || "",
                                },
                            }}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            )}
        />
    )

}

Form.FileInput = function Input(props: any) {
    const { name, ...rest } = props;
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field: { value, ...restField } }) => (
                <FileUpload
                    multiple
                    {...restField}
                    {...rest}
                    buttonText="select file" />
            )}
        />
    );
};