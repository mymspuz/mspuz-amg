import React, { useEffect, useRef, useState } from 'react'
import {
    Button,
    CardContent,
    FormControl,
    Grid,
    InputLabel,
    Stack,
    Input,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    MenuItem,
    Select,
    Paper,
    Chip,
    Box,
    IconButton,
    Menu,
    Divider,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { SelectChangeEvent } from '@mui/material/Select'

import {gridSpacing} from '../../../../theme/constants'
import MainCard from '../../../../components/cards/MainCard'

import {
    IconCaretDown, IconCircleX, IconCloudUpload, IconCircleCheck, IconFilter, IconFilterOff,
    IconCloudDownload,
    IconTrash, IconTrashX,
    IconDotsVertical, IconClipboardCheck, IconClipboardX
} from '@tabler/icons'
import {
    useDocsRemoveMutation,
    useDocsUploadMutation,
    useLazyDocsDownloadQuery,
    useLazyGetDocsAllQuery,
    useDocsChangeStatusMutation
} from '../../../../../store/queries/docs.queri'
import { TErrorRTKQuery } from '../../../../../data/RTKQueryTypes'
import {
    TStatusDoc,
    TFilter,
    TTypeDocs,
    TParamsRequest,
    TDictTypeDocs
} from '../../../../../data/DocsTypes'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import 'dayjs/locale/ru'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import Loader from '../../../../components/loader'
import {useAppSelector} from "../../../../../hooks";
import {CustomizedSnackbars} from "../../../../components";

type TDocRequest = {
    id: number
    type: TTypeDocs
    name: string
    size: string
    user: { id: number, login: string }
    updateAt: string
    status: number
}

type TState = {
    isLoading: boolean
    isError: boolean
    errorMsg: string
    rows: TDocRequest[]
}

interface TChipData {
    key: number
    label: string
    color: 'error' | 'default' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | undefined
}

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5)
}))

const statusDoc: TStatusDoc[] = [
    { id: 0, title: '',  icon: null, color: '' },
    { id: 1, title: 'загружен', icon: IconCloudUpload, color: 'primary' },
    { id: 2, title: 'принят', icon: IconCircleCheck, color: 'success' },
    { id: 3, title: 'отклонен', icon: IconCircleX, color: 'error' }
]

const dictTypeDocs: TDictTypeDocs[] = [
    { name: 'statements', translate: 'выписка' },
    { name: 'sales', translate: 'продажа' },
    { name: 'purchase', translate: 'покупка' },
    { name: 'personal', translate: 'кадровый' }
]

const FileListCard = ({ typeDoc }: { typeDoc: TTypeDocs }) => {
    const inputFileRef = useRef(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const [rowId, setRowId] = useState<number>(0)

    const auth = useAppSelector(state => state.auth)

    const initFilter: TFilter = {
        type: typeDoc,
        author: '',
        dateAfter: null,
        dateBefore: null,
        status: statusDoc[0],
        isApply: false
    }

    const [state, setState] = useState<TState>({
        isLoading: true,
        isError: false,
        errorMsg: '',
        rows: []
    })

    const handleClick = (event: any) => {
        setRowId(Number(event.currentTarget.id))
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setRowId(0)
        setAnchorEl(null)
    }

    const [filter, setFilter] = useState<TFilter>({ ...initFilter, isApply: true })
    const [chipData, setChipData] = useState<TChipData[]>(typeDoc ? [{ key: 4, label: 'Тип', color: 'primary' }] : [])

    const [open, setOpen] = useState<boolean>(false)
    const [selectedValue, setSelectedValue] = useState<boolean>(false)

    const [multiSelect, setMultiSelect] = useState<{ id: number, name: string }[]>([])
    const [multiMode, setMultiMode] = useState<boolean>(false)

    const [uploadDoc] = useDocsUploadMutation()
    const [getDocs] = useLazyGetDocsAllQuery()
    const [removeDoc] = useDocsRemoveMutation()
    const [downloadDoc] = useLazyDocsDownloadQuery()
    const [changeStatusDoc] = useDocsChangeStatusMutation()

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90, hide: true },
        { field: 'status', headerName: '', width: 60, sortable: false, disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.status === 1 &&
                            <IconButton color='primary'><IconCloudUpload /></IconButton>
                        }
                        {params.row.status === 2 &&
                            <IconButton color='success'><IconCircleCheck /></IconButton>
                        }
                        {params.row.status === 3 &&
                            <IconButton color='error'><IconCircleX /></IconButton>
                        }
                    </>
                )
            }
        },
        { field: 'type', headerName: 'Тип документа', width: 150, disableColumnMenu: true, headerAlign: 'center', hide: auth.role === 'USER' },
        { field: 'author', headerName: 'Автор', width: 150, disableColumnMenu: true, headerAlign: 'center' },
        { field: 'date', headerName: 'Дата', type: 'dateTime', width: 110, disableColumnMenu: true, headerAlign: 'center' },
        { field: 'name', headerName: 'Файл', sortable: false, width: 260, disableColumnMenu: true, headerAlign: 'center' },
        { field: 'action', headerName: 'Действия', width: 120, sortable: false, disableColumnMenu: true, headerAlign: 'center', align: 'center',
            renderCell: (params) => {
                const onRemoveClick = (e: any) => {
                    setMultiMode(false)
                    setOpen(true)
                    setAnchorEl(null)
                }
                const onDownLoadClick = (e: any) => {
                    setAnchorEl(null)
                    setState({...state, isLoading: true, isError: false, errorMsg: ''})
                    downloadDoc(rowId)
                        .unwrap()
                        .then((payload) => {
                            setState({...state, isLoading: false, isError: false, errorMsg: ''})
                        })
                        .catch((error: TErrorRTKQuery) => {
                            if ('data' in error) {
                                setState({...state, isLoading: false, isError: true, errorMsg: error.data.message})
                            } else {
                                setState({...state, isLoading: false, isError: true, errorMsg: 'Ошибка сервера'})
                            }
                        })
                }
                const onChangeStatusClick = (e: any, status: number) => {
                    setAnchorEl(null)
                    setState({...state, isLoading: true, isError: false, errorMsg: ''})
                    changeStatusDoc({docId: rowId, statusId: status})
                        .unwrap()
                        .then((payload) => {
                            setState({...state, isLoading: false, isError: false, errorMsg: ''})
                            setFilter({...filter, isApply: true})
                        })
                        .catch((error: TErrorRTKQuery) => {
                            if ('data' in error) {
                                setState({...state, isLoading: false, isError: true, errorMsg: error.data.message})
                            } else {
                                setState({...state, isLoading: false, isError: true, errorMsg: 'Ошибка сервера'})
                            }
                        })
                }
                return (
                    <>
                        <IconButton
                            id={params.row.id}
                            color='primary'
                            onClick={handleClick}
                        >
                            <IconDotsVertical />
                        </IconButton>
                        <Menu
                            id={params.row.id}
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            variant="selectedMenu"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                        >
                            <MenuItem onClick={onDownLoadClick}>
                                <ListItemIcon>
                                    <IconCloudDownload />
                                </ListItemIcon>
                                <ListItemText>Скачать</ListItemText>
                            </MenuItem>
                            {auth.role === 'ADMIN' && <Divider/>}
                            {auth.role === 'ADMIN' &&
                                <MenuItem onClick={(e: any) => onChangeStatusClick(e, 2)}>
                                    <ListItemIcon>
                                        <IconClipboardCheck/>
                                    </ListItemIcon>
                                    <ListItemText>Принять</ListItemText>
                                </MenuItem>
                            }
                            {auth.role === 'ADMIN' &&
                                <MenuItem onClick={(e: any) => onChangeStatusClick(e, 3)}>
                                    <ListItemIcon>
                                        <IconClipboardX/>
                                    </ListItemIcon>
                                    <ListItemText>Отклонить</ListItemText>
                                </MenuItem>
                            }
                            <Divider />
                            <MenuItem onClick={onRemoveClick}>
                                <ListItemIcon>
                                    <IconTrash />
                                </ListItemIcon>
                                <ListItemText>Удалить</ListItemText>
                            </MenuItem>
                        </Menu>
                    </>
                )
            },
        }
    ]

    const clearFilterParams = (src: TFilter): TParamsRequest => {
        let paramsRequest: TParamsRequest = {}
        if (src.type) paramsRequest = { ...paramsRequest, typeDoc: src.type }
        if (src.author) paramsRequest = { ...paramsRequest, userName: src.author }
        if (src.dateAfter) paramsRequest = { ...paramsRequest, dateAfter: src.dateAfter.startOf('day').toISOString() }
        if (src.dateBefore) paramsRequest = { ...paramsRequest, dateBefore: src.dateBefore.endOf('day').toISOString() }
        if (src.status.id) paramsRequest = { ...paramsRequest, statusDoc: src.status.id }
        return paramsRequest
    }

    const refreshData = () => {
        setState({...state, isLoading: true, isError: false, errorMsg: ''})
        getDocs(clearFilterParams(filter))
            .unwrap()
            .then((payload: any) => {
                setState({
                    ...state,
                    isLoading: false,
                    rows: payload.map((doc: any) => {
                        return {
                            id: doc.id,
                            type: dictTypeDocs.filter(t => t.name === doc.type)[0].translate,
                            status: doc.status,
                            author: doc.user.login,
                            date: doc.updateAt,
                            name: doc.name
                        }
                    })
                })
                setFilter({ ...filter, isApply: false })
            })
            .catch((error: TErrorRTKQuery) => {
                if ('data' in error) {
                    setState({...state, isLoading: false, isError: true, errorMsg: error.data.message})
                } else {
                    setState({...state, isLoading: false, isError: true, errorMsg: 'Ошибка сервера'})
                }
                setFilter({ ...filter, isApply: false })
            })
    }

    const onFileChangeCapture = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const fileList: FileList | null = e.target.files
        if (fileList) {
            const file: File = fileList[0]
            if (state.rows.some(f => f.name.toLowerCase() === file.name.toLowerCase())) {
                console.log('Такой файл уже загружен!!!')
                return
            }

            const body = new FormData()
            body.append('doc', file)
            body.append('type', typeDoc)
            body.append('filename', file.name)

            setState({ ...state, isLoading: true, isError: false, errorMsg: '' })
            uploadDoc(body)
                .unwrap()
                .then((payload: TDocRequest) => {
                    setFilter({ ...filter, isApply: true })
                })
                .catch((error: TErrorRTKQuery) => {
                    if ('data' in error) {
                        setState({...state, isLoading: false, isError: true, errorMsg: error.data.message})
                    } else {
                        setState({...state, isLoading: false, isError: true, errorMsg: 'Ошибка сервера'})
                    }
                })
        }
    }

    const onBtnClick = () => {
        // @ts-ignore
        inputFileRef.current.click()
    }

    const handleStatusChange = (event: SelectChangeEvent) => {
        setFilter({...filter, status: statusDoc.filter(e => e.id === Number(event.target.value))[0]})
    }

    const handleTypeChange = (event: SelectChangeEvent) => {
        if (event.target.value) {
            setFilter({...filter, type: dictTypeDocs.filter(e => e.name === event.target.value)[0].name})
        } else {
            setFilter({...filter, type: ''})
        }
    }

    const handleChipDelete = (chipToDelete: TChipData) => () => {
        setChipData(chipData.filter((chip) => chip.key !== chipToDelete.key))
    }

    const handleApplyFilter = () => {
        const chips: TChipData[] = []

        if (filter.author.trim()) {
            chips.push({ key: 0, label: 'Автор', color: 'info' })
        }

        if (filter.dateAfter) {
            chips.push({ key: 1, label: 'Начало', color: 'warning' })
        }

        if (filter.dateBefore) {
            chips.push({ key: 2, label: 'Конец', color: 'warning' })
        }

        if (filter.status.id) {
            chips.push({ key: 3, label: 'Статус', color: 'success' })
        }

        if (filter.type) {
            chips.push({ key: 4, label: 'Тип', color: 'primary' })
        }

        setChipData(chips)
    }

    const handleResetFilter = () => {
        setChipData([])
    }

    const handleMultiSelectRemove = () => {
        setMultiMode(true)
        setOpen(true)
    }

    useEffect(() => {
        let copyFilterState: TFilter = {...filter}
        if (!chipData.some(c => c.key === 0)) {
            copyFilterState = { ...copyFilterState, author: '' }
        }
        if (!chipData.some(c => c.key === 1)) {
            copyFilterState = { ...copyFilterState, dateAfter: null }
        }
        if (!chipData.some(c => c.key === 2)) {
            copyFilterState = { ...copyFilterState, dateBefore: null }
        }
        if (!chipData.some(c => c.key === 3)) {
            copyFilterState = { ...copyFilterState, status: { id: 0, title: '',  icon: null } }
        }
        if (!chipData.some(c => c.key === 4)) {
            copyFilterState = { ...copyFilterState, type: '' }
        }
        setFilter({ ...copyFilterState, isApply: true })
    }, [chipData])

    useEffect(() => {
        if (filter.isApply) {
            refreshData()
        }
    }, [filter])

    const getListFiles = (): string => {
        if (multiMode) {
            let result: string = ''
            multiSelect.forEach(e => result += `${e.name};`)
            return result
        } else {
            if (rowId) {
                const findRow = state.rows.filter(r => r.id === rowId)
                return findRow.length ? findRow[0].name : ''
            } else {
                return ''
            }
        }
    }

    interface RemoveDialogProps {
        open: boolean
        selectedValue: boolean
        fileName: string
        onClose: (value: boolean) => void
    }

    const handleCloseRemoveDialog = (value: boolean) => {
        setOpen(false)
        setSelectedValue(value)
    }

    useEffect(() => {
        if (selectedValue) {
            let arrayRemoveDoc: number[] = []
            if (multiMode) {
                arrayRemoveDoc = multiSelect.map(e => e.id)
            } else {
                arrayRemoveDoc.push(rowId)
            }
            setState({...state, isLoading: true, isError: false, errorMsg: ''})
            arrayRemoveDoc.forEach(async e => await removeDoc(e))
            setState((prevState) => {
                return {
                    ...prevState,
                    isLoading: false,
                    rows: prevState.rows.filter((row: TDocRequest) => !arrayRemoveDoc.some(e => e === row.id))
                }
            })
        }
    }, [selectedValue])

    const RemoveDialog: React.FC<RemoveDialogProps> = (props: RemoveDialogProps) => {
        const { onClose, selectedValue, open, fileName } = props

        const handleClose = () => {
            onClose(selectedValue)
        }

        const handleClick = (value: boolean) => {
            onClose(value)
        }

        return (
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle id="remove-dialog-title">
                    {"Вы уверены, что хотите удалить файл?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="remove-dialog-description">
                        {fileName.split(';').map(f => <p key={f}>{f}</p>)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClick(false)}>Отмена</Button>
                    <Button onClick={() => handleClick(true)} autoFocus>Подтверждаю</Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <>
            {state.isLoading ? (
                <Loader />
            ) : (
                <>
                    {state.isError && <CustomizedSnackbars color={"error"} content={state.errorMsg} />}
                    <Grid container spacing={ gridSpacing }>
                        <Grid item xs={12}>
                            <Grid container spacing={ gridSpacing }>
                                <Grid item xs={12}>
                                    <MainCard
                                        content={false}
                                        title={''}
                                        border={true}
                                        boxShadow={true}
                                        contentClass=''
                                        contentSX={{}}
                                        darkTitle={false}
                                        secondary={''}
                                        shadow={''}
                                        sx = {{
                                            minHeight: 'calc(100vh - 175px)'
                                        }}
                                    >
                                        <CardContent
                                            sx = {{
                                                height: '650px'
                                            }}
                                        >
                                            {state.isLoading
                                                ?
                                                <Loader />
                                                :
                                                <>
                                                    <Box sx={{mb: '10px'}}>
                                                        {auth.role === 'USER' &&
                                                            <>
                                                                <Button
                                                                    variant="contained"
                                                                    color='success'
                                                                    sx={{color: '#fff', fontWeight: '600'}}
                                                                    startIcon={<IconCloudUpload />}
                                                                    onClick={onBtnClick}
                                                                >
                                                                    Загрузить файл
                                                                </Button>
                                                                <Input
                                                                    type="file"
                                                                    sx={{display: 'none'}}
                                                                    inputRef={inputFileRef}
                                                                    onChangeCapture={onFileChangeCapture}
                                                                />
                                                            </>
                                                        }
                                                        <Button
                                                            variant="contained"
                                                            color='error'
                                                            sx={{color: '#fff', fontWeight: '600', ml: '10px'}}
                                                            disabled={multiSelect.length === 0}
                                                            startIcon={<IconTrashX />}
                                                            onClick={handleMultiSelectRemove}
                                                        >
                                                            Удалить выбранные
                                                        </Button>
                                                    </Box>
                                                    <Accordion sx={{ border: '1px solid #e2e2e2', borderRadius: '4px' }}>
                                                        <AccordionSummary
                                                            expandIcon={<IconCaretDown />}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                        >
                                                            <Typography>Фильтр</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Stack direction="row" spacing={2}>
                                                                {auth.role === 'ADMIN' &&
                                                                    <TextField
                                                                        id="outlined-name"
                                                                        label="Автор"
                                                                        size="small"
                                                                        value={filter.author}
                                                                        onChange={(e) => setFilter({
                                                                            ...filter,
                                                                            author: e.target.value
                                                                        })}
                                                                    />
                                                                }
                                                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                                                                    <DesktopDatePicker
                                                                        label='Начало периода'
                                                                        inputFormat='DD.MM.YYYY'
                                                                        value={filter.dateAfter}
                                                                        onChange={(newValue) => setFilter({...filter, dateAfter: newValue})}
                                                                        renderInput={(params) => <TextField {...params} size="small" />}
                                                                    />
                                                                </LocalizationProvider>
                                                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                                                                    <DesktopDatePicker
                                                                        label='Конец периода'
                                                                        inputFormat='DD.MM.YYYY'
                                                                        value={filter.dateBefore}
                                                                        onChange={(newValue) => setFilter({...filter, dateBefore: newValue})}
                                                                        renderInput={(params) => <TextField {...params} size="small" />}
                                                                    />
                                                                </LocalizationProvider>
                                                                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                                                    <InputLabel id="select-status">Статус</InputLabel>
                                                                    <Select
                                                                        labelId="select-status"
                                                                        id="select-status-list"
                                                                        value={String(filter.status.id)}
                                                                        onChange={handleStatusChange}
                                                                        label="Статус"
                                                                    >
                                                                        {statusDoc.map(s => <MenuItem key={s.id} value={s.id}>{s.title}</MenuItem>)}
                                                                    </Select>
                                                                </FormControl>
                                                                {auth.role === 'ADMIN' &&
                                                                    <FormControl sx={{m: 1, minWidth: 120}}
                                                                                 size="small">
                                                                        <InputLabel id="select-type">Тип
                                                                            документа</InputLabel>
                                                                        <Select
                                                                            labelId="select-type"
                                                                            id="select-type-list"
                                                                            value={filter.type as string}
                                                                            onChange={handleTypeChange}
                                                                            label="Тип документа"
                                                                        >
                                                                            <MenuItem value={''}></MenuItem>
                                                                            {dictTypeDocs.map(t => <MenuItem
                                                                                key={t.name}
                                                                                value={t.name}>{t.translate}</MenuItem>)}
                                                                        </Select>
                                                                    </FormControl>
                                                                }
                                                                <IconButton
                                                                    color="primary"
                                                                    aria-label="add to shopping cart"
                                                                    onClick={handleApplyFilter}
                                                                >
                                                                    <IconFilter />
                                                                </IconButton>
                                                                <IconButton
                                                                    color="error"
                                                                    aria-label="add to shopping cart"
                                                                    onClick={handleResetFilter}
                                                                >
                                                                    <IconFilterOff />
                                                                </IconButton>
                                                            </Stack>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                    <Paper
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'start',
                                                            flexWrap: 'wrap',
                                                            listStyle: 'none',
                                                            p: 0.5,
                                                            m: 0,
                                                        }}
                                                        component="ul"
                                                    >
                                                        {chipData.map((data) => {
                                                            return (
                                                                auth.role === 'ADMIN' && (
                                                                    <ListItem key={data.key}>
                                                                        <Chip
                                                                            label={data.label}
                                                                            color={data.color}
                                                                            onDelete={handleChipDelete(data)}
                                                                        />
                                                                    </ListItem>
                                                                )
                                                            )
                                                        })}
                                                    </Paper>
                                                    <DataGrid
                                                        rows={state.rows}
                                                        rowHeight={30}
                                                        columns={columns}
                                                        pageSize={10}
                                                        rowsPerPageOptions={[10]}
                                                        checkboxSelection
                                                        disableSelectionOnClick
                                                        experimentalFeatures={{ newEditingApi: true }}
                                                        onSelectionModelChange={(newSelection) => {
                                                            const selectedIDs = new Set(newSelection)
                                                            const selectedRowData = state.rows ? state.rows.filter((row: any) => selectedIDs.has(row.id)) : []
                                                            setMultiSelect(selectedRowData.map(select => {
                                                                return { id: select.id, name: select.name }
                                                            }))
                                                        }}
                                                    />
                                                </>
                                            }
                                        </CardContent>
                                    </MainCard>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <RemoveDialog
                        selectedValue={selectedValue}
                        open={open}
                        fileName={getListFiles()}
                        onClose={handleCloseRemoveDialog}
                    />
                </>
            )}
        </>
    )
}

export default FileListCard