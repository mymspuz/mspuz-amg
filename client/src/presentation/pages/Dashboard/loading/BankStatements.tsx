import React from 'react'
import { Grid } from '@mui/material'

import { gridSpacing } from '../../../theme/constants'
import FileListCard from './components/FileListCard'


const BankStatements = () => {

    return (
        <Grid container spacing={ gridSpacing }>
            <Grid item xs={12}>
                <Grid container spacing={ gridSpacing }>
                    <Grid item xs={12}>
                        <FileListCard typeDoc={'statements'}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default BankStatements