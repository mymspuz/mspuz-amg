import React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined'

import MainCard from '../../../components/cards/MainCard'
import TotalIncomeCard from '../../../components/cards/Skeleton/TotalIncomeCard'
import themeTypography from "../../../theme/typography";

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, rgb(21, 101, 192) -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, rgb(21, 101, 192) -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}))

type TotalIncomeDarkCardProps = {
    isLoading: boolean
}

const TotalIncomeDarkCard: React.FC<TotalIncomeDarkCardProps> = ({ isLoading }: TotalIncomeDarkCardProps) => {
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
                                            backgroundColor: '#1565c0',
                                            color: '#fff'
                                        }}
                                    >
                                        <TableChartOutlinedIcon fontSize="inherit" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45
                                    }}
                                    primary={
                                        <Typography variant="h4" sx={{ color: '#fff' }}>
                                            $203k
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: 0.25 }}>
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

export default TotalIncomeDarkCard