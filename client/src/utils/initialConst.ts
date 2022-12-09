export const api_url = (): string => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.log(process.env.REACT_APP_URL_API_DEV)
        return 'http://localhost:5000/api/'//process.env.REACT_APP_URL_API_DEV as string
    } else {
        console.log(process.env.REACT_APP_URL_API_PROD)
        return 'http://localhost:5000/api/'//process.env.REACT_APP_URL_API_PROD as string
    }
}