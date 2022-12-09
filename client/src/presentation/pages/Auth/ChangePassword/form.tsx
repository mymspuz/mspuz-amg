import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from '@mui/material'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import AnimateButton from '../../../components/extended/AnimateButton'
import { strengthColor, strengthIndicator } from '../../../../utils/password'

type TInitialFormValues = {
    oldPassword: string
    newPassword: string
    confirmPassword: string
    submit: boolean
}

const initialFormValues: TInitialFormValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    submit: false
}

const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .max(20, 'Длина не должна превышать 20 символов')
        .required('Обязательное поле'),
    newPassword: Yup.string()
        .max(20, 'Длина не должна превышать 20 символов')
        .required('Обязательное поле'),
    confirmPassword: Yup.string()
        .max(20, 'Длина не должна превышать 20 символов')
        .required('Обязательное поле')
        .oneOf([Yup.ref('newPassword'), null], 'Пароли должны совпадать'),
})

const FormChangePassword = ({ ...others }) => {
    const theme = useTheme()
    const [showPassword, setShowPassword] = useState(false)

    // @ts-ignore
    const customInput: object = theme.typography.customInput

    const [strength, setStrength] = useState(0)
    const [level, setLevel] = useState({label: '', color: ''})

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const changePassword = (value: string): void => {
        const temp = strengthIndicator(value)
        setStrength(temp)
        setLevel(strengthColor(temp))
    }

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Изменение пароля</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={initialFormValues}
                validationSchema={ChangePasswordSchema}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    setStatus({ success: false })
                    setErrors({ submit: 'Error message' })
                    setSubmitting(false)
                }}
            >
                {({
                      errors,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      isSubmitting,
                      isValid,
                      dirty,
                      touched,
                      values
                  }) => (
                        <form noValidate onSubmit={handleSubmit} {...others}>
                            <FormControl
                                fullWidth
                                error={Boolean(touched.oldPassword && errors.oldPassword)}
                                sx={{ ...customInput }}
                            >
                                <InputLabel htmlFor="outlined-adornment-old-password-change">Текущий пароль</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-old-password-change"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.oldPassword}
                                    name="oldPassword"
                                    label="Текущий пароль"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                                size="large"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    inputProps={{}}
                                />
                                {touched.oldPassword && errors.oldPassword && (
                                    <FormHelperText error id="standard-weight-helper-text-old-password-change">
                                        {errors.oldPassword}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <FormControl
                                fullWidth
                                error={Boolean(touched.newPassword && errors.newPassword)}
                                sx={{ ...customInput }}
                            >
                                <InputLabel htmlFor="outlined-adornment-new-password-change">Новый пароль</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-new-password-change"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.newPassword}
                                    name="newPassword"
                                    label="Новый пароль"
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        handleChange(e)
                                        changePassword(e.target.value)
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                                size="large"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    inputProps={{}}
                                />
                                {touched.newPassword && errors.newPassword && (
                                    <FormHelperText error id="standard-weight-helper-text-new-password-change">
                                        {errors.newPassword}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            {strength !== 0 && (
                                <FormControl fullWidth>
                                    <Box sx={{ mb: 2 }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <Box
                                                    style={{ backgroundColor: level?.color }}
                                                    sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle1" fontSize="0.75rem">
                                                    {level?.label}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </FormControl>
                            )}

                            <FormControl
                                fullWidth
                                error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                sx={{ ...customInput }}
                            >
                                <InputLabel htmlFor="outlined-adornment-confirm-password-change">Подтверждение пароля</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-confirm-password-change"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.confirmPassword}
                                    name="confirmPassword"
                                    label="Подтверждение пароля"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                                size="large"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    inputProps={{}}
                                />
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <FormHelperText error id="standard-weight-helper-text-confirm-password-change">
                                        {errors.confirmPassword}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <Box sx={{ mt: 2 }}>
                                <AnimateButton
                                    direction={'right'}
                                    offset={10}
                                    scale={{hover: 1, tap: 0.9}}
                                    type={'slide'}
                                >
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting || !(isValid && dirty)}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Изменить
                                    </Button>
                                </AnimateButton>
                            </Box>
                        </form>
                  )}
            </Formik>
        </>
    )
}

export default FormChangePassword