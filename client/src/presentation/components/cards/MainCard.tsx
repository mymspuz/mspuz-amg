import { forwardRef } from 'react'
import { useTheme } from '@mui/material/styles'
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'

type MainCardProps = {
    border: boolean
    boxShadow: boolean
    children: JSX.Element
    content: boolean
    contentClass: string
    contentSX: object
    darkTitle: boolean
    secondary: string //JSX.Element | string | object
    shadow: string
    sx: object
    title: string //JSX.Element | string | object
}

const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 }
}

const MainCard = forwardRef(
    (
        {
            border = true,
            boxShadow,
            children,
            content = true,
            contentClass = '',
            contentSX = {},
            darkTitle,
            secondary,
            shadow,
            sx = {},
            title,
            ...others
        }: MainCardProps,
        ref
    ) => {
        const theme = useTheme()
        // @ts-ignore
        const bg = theme.palette.primary[200] + 75
        return (
            <Card
                // ref={ref}
                {...others}
                sx={{
                    border: border ? '1px solid' : 'none',
                    borderColor: bg,
                    ':hover': {
                        boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
                    },
                    ...sx
                }}
            >
                {/* card header and action */}
                {!darkTitle && title && <CardHeader sx={headerSX} title={title} action={secondary} />}
                {darkTitle && title && (
                    <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
                )}

                {/* content & header divider */}
                {title && <Divider />}

                {/* card content */}
                {content && (
                    <CardContent sx={contentSX} className={contentClass}>
                        {children}
                    </CardContent>
                )}
                {!content && children}
            </Card>
        )
    }
)

export default MainCard