import React from 'react'
import { useTheme, styled } from '@mui/material/styles'
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone'

import MainCard from '../../../components/cards/MainCard'
import TotalIncomeCard from '../../../components/cards/Skeleton/TotalIncomeCard'
import themeTypography from "../../../theme/typography";

const CardWrapper = styled(MainCard)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}))

type TotalIncomeLightCardProps = {
    isLoading: boolean
}

const TotalIncomeLightCard: React.FC<TotalIncomeLightCardProps> = ({ isLoading }: TotalIncomeLightCardProps) => {
    const theme = useTheme()

    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <CardWrapper
                    border={false}
                    content={false}
                    boxShadow={false}
                    contentClass={''}
                    contentSX={{}}
                    darkTitle={false}
                    secondary={''}
                    shadow={''}
                    sx={{}}
                    title={''}
                >
                    <Box sx={{ p: 2 }}>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...themeTypography(theme).commonAvatar,
                                            ...themeTypography(theme).largeAvatar,
                                            backgroundColor: theme.palette.warning.light,
                                            color: theme.palette.warning.dark
                                        }}
                                    >
                                        <StorefrontTwoToneIcon fontSize="inherit" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45
                                    }}
                                    primary={<Typography variant="h4">$203k</Typography>}
                                    secondary={
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                color: '#9e9e9e',
                                                mt: 0.5
                                            }}
                                        >
                                            Total Income
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper>
            )}
        </>
    )
}

export default TotalIncomeLightCard