import { TextField } from "@mui/material";
import { Controller, FormProvider, useFormContext } from "react-hook-form";

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
                    {...rest}
                />
            )}
        />
    );
};
