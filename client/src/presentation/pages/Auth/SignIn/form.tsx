import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import {
    Alert,
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import * as Yup from 'yup'
import 'yup-phone'
import { Formik } from 'formik'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import AnimateButton from '../../../components/extended/AnimateButton'
import { useGetAuthMutation } from '../../../../store/queries/auth.queri'
import { TAuthResponse } from '../../../../data/AuthTypes'
import { useAppDispatch } from '../../../../hooks'
import { setAll } from '../../../../store/slice/authSlice'
import { setCurrentAccountAdapter } from '../../../../data/localstorage/CurrentAccountAdapter'
import { TErrorRTKQuery } from '../../../../data/RTKQueryTypes'

type TInitialFormValues = {
    phone: string,
    password: string,
    errorForm: string
}

const initialFormValues: TInitialFormValues = {
    phone: '',
    password: '',
    errorForm: ''
}

const SignInSchema = Yup.object().shape({
    phone: Yup.string()
        .max(10, 'Длина не должна превышать 10 символов')
        .required('Обязательное поле')
        .phone('IN', false, 'Формат телефона неверный'),
    password: Yup.string()
        .max(20, 'Длина не должна превышать 20 символов')
        .required('Обязательное поле')
})

const FormSignIn = ({ ...others }) => {
    const theme = useTheme()
    const [checked, setChecked] = useState(false)
    const [getAuth] = useGetAuthMutation()

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    // @ts-ignore
    const customInput: object = theme.typography.customInput

    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Войти с номером телефона</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={initialFormValues}
                validationSchema={SignInSchema}
                onSubmit={(values: TInitialFormValues, { setErrors, setSubmitting }) => {
                    setSubmitting(true)
                    getAuth({
                        login: values.phone,
                        password: values.password,
                        remember: checked
                    })
                        .unwrap()
                        .then((payload: TAuthResponse) => {
                            setSubmitting(false)
                            setErrors({errorForm: ''})
                            dispatch(setAll(payload))
                            setCurrentAccountAdapter({ token: payload.token })
                            navigate('/')
                        })
                        .catch((error: TErrorRTKQuery) => {
                            setSubmitting(false)
                            if ('data' in error) {
                                setErrors({errorForm: error.data.message})
                            } else {
                                setErrors({errorForm: 'Ошибка сервера'})
                            }
                        })
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
                            error={Boolean(touched.phone && errors.phone)}
                            sx={{ ...customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-phone-login">
                                Номер телефона / 9XXXXXXXXX
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-phone-login"
                                type="phone"
                                name="phone"
                                value={values.phone}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Номер телефона"
                                inputProps={{}}
                            />
                            {touched.phone && errors.phone && (
                                <FormHelperText error id="standard-weight-helper-text-phone-login">
                                    {errors.phone}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">
                                Пароль
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
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
                                label="Password"
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Запомнить меня"
                            />
                        </Stack>
                        {errors.errorForm && (
                            <Box sx={{ mt: 3 }}>
                                <Alert severity="error">{errors.errorForm}</Alert>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton
                                direction={'right'}
                                offset={10}
                                scale={{hover: 1, tap: 0.9}}
                                type={'slide'}
                            >
                                <LoadingButton
                                    disableElevation
                                    disabled={isSubmitting || !(isValid && dirty)}
                                    loading={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Войти
                                </LoadingButton>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default FormSignIn