import { Grid, TextField, Typography } from "@mui/material";
import { Fragment } from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function AddressForm() {
    const { control } = useFormContext()
    return (
        <Fragment>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Controller
                        control={control}
                        name="firstName"
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="First name"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                value={value || ''}
                                onChange={onChange}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        control={control}
                        name="lastName"
                        render={({ field: { value, onChange } }) => (
                            <TextField
                                required
                                id="lastName"
                                label="Last name"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                value={value || ''}
                                onChange={onChange}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} >
                    <Controller
                        name="addressDefault"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <TextField
                                required
                                id="addressDefault"
                                label="Default address"
                                fullWidth
                                autoComplete="given-address"
                                variant="standard"
                                value={value || ''}
                                onChange={onChange}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="city"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <TextField
                                required
                                id="city"
                                label="City"
                                fullWidth
                                autoComplete="shipping address-level2"
                                variant="standard"
                                value={value || ''}
                                onChange={onChange}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="state"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <TextField
                                id="state"
                                label="State/Province/Region"
                                fullWidth
                                variant="standard"
                                value={value || ''}
                                onChange={onChange}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="zip"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <TextField
                                required
                                id="zip"
                                label="Zip / Postal code"
                                fullWidth
                                autoComplete="shipping postal-code"
                                variant="standard"
                                value={value || ''}
                                onChange={onChange}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="country"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <TextField
                                required
                                id="country"
                                label="Country"
                                fullWidth
                                autoComplete="shipping country"
                                variant="standard"
                                value={value || ''}
                                onChange={onChange}
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </Fragment>
    )
}