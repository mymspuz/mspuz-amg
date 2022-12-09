import React from 'react'
import { Grid } from '@mui/material'

import { gridSpacing } from '../../../theme/constants'
import FileListCard from '../loading/components/FileListCard'

const ListDocsPage = () => {
    return (
        <Grid container spacing={ gridSpacing }>
            <Grid item xs={12}>
                <Grid container spacing={ gridSpacing }>
                    <Grid item xs={12}>
                        <FileListCard typeDoc={''} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ListDocsPage