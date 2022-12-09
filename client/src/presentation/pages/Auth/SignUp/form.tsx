import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from '@mui/material'
import * as Yup from 'yup'
import 'yup-phone'
import { Formik } from 'formik'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import AnimateButton from '../../../components/extended/AnimateButton'
import { strengthColor, strengthIndicator } from '../../../../utils/password'

type TInitialFormValues = {
    phone: string
    password: string
    confirm: string
    agree: boolean
    submit: boolean
}

const initialFormValues: TInitialFormValues = {
    phone: '',
    password: '',
    confirm: '',
    agree: false,
    submit: false,
}

const SignUpSchema = Yup.object().shape({
    phone: Yup.string()
        .max(10, 'Длина не должна превышать 10 символов')
        .required('Обязательное поле')
        .phone('IN', false, 'Формат телефона неверный'),
    password: Yup.string()
        .max(20, 'Длина не должна превышать 20 символов')
        .required('Обязательное поле'),
    confirm: Yup.string()
        .max(20, 'Длина не должна превышать 20 символов')
        .required('Обязательное поле')
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
    agree: Yup.boolean()
        .oneOf([true], 'Примите правила и соглашение')
})

const FormSignUp = ({ ...others }) => {
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
                        <Typography variant="subtitle1">Регистрация в системе</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={initialFormValues}
                validationSchema={SignUpSchema}
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
                        <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ ...customInput }}>
                            <InputLabel htmlFor="outlined-adornment-phone-register">
                                Номер телефона / 9XXXXXXXXX
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-phone-register"
                                type="phone"
                                value={values.phone}
                                name="phone"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.phone && errors.phone && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.phone}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Пароль</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Пароль"
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
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
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
                            error={Boolean(touched.confirm && errors.confirm)}
                            sx={{ ...customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-confirm-register">Подтверждение</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-confirm-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.confirm}
                                name="confirm"
                                label="Подтверждение"
                                onBlur={handleBlur}
                                onChange={(e) => handleChange(e)}
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
                            {touched.confirm && errors.confirm && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.confirm}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={values.agree}
                                            onChange={handleChange}
                                            name="agree"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Соглашаюсь с &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="#">
                                                Правилами и Условиями.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                                {touched.agree && errors.agree && (
                                    <FormHelperText error id="standard-weight-helper-text-agree-register">
                                        {errors.agree}
                                    </FormHelperText>
                                )}
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

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
                                    Зарегистрироваться
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default FormSignUp