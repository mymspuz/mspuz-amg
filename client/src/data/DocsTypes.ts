import { Dayjs } from 'dayjs'
import { TablerIcon } from '@tabler/icons'

export type TDocsResponse = {
    id: number
    name: string
    size: string
    updateAt: string
}

export type TStatusDoc = {
    id: number
    title: string
    icon: TablerIcon | null
    color?: string
}

export type TTypeDocs = 'statements' | 'sales' | 'purchase' | 'personal' | ''

export type TDictTypeDocs = {
    name: TTypeDocs
    translate: 'выписка' | 'продажа' | 'покупка' | 'кадровый'
}

export type TFilter = {
    type: TTypeDocs | ''
    author: string
    dateAfter: Dayjs | null
    dateBefore: Dayjs | null
    status: TStatusDoc,
    isApply: boolean
}

export type TParamsRequest = {
    typeDoc?: TTypeDocs
    userName?: string
    dateAfter?: string
    dateBefore?: string
    statusDoc?: number
}

export type TChangeStatusReq = {
    docId: number
    statusId: number
}