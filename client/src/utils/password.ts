import value from '../assets/scss/_themes-vars.module.scss'

const hasNumber = (number: string): boolean => new RegExp(/[0-9]/).test(number)

const hasMixed = (number: string): boolean => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number)

const hasSpecial = (number: string): boolean => new RegExp(/[!#@$%^&*)(+=._-]/).test(number)

type TLabel = 'Плохой' | 'Слабый' | 'Нормальный' | 'Хороший' | 'Надежный'

type Strength = {
    label: TLabel
    color: any
}

export const strengthColor = (count: number): Strength => {
    if (count < 2) return { label: 'Плохой', color: value.errorMain }
    if (count < 3) return { label: 'Слабый', color: value.warningDark }
    if (count < 4) return { label: 'Нормальный', color: value.orangeMain }
    if (count < 5) return { label: 'Хороший', color: value.successMain }
    if (count < 6) return { label: 'Надежный', color: value.successDark }
    return { label: 'Плохой', color: value.errorMain }
}

export const strengthIndicator = (number: string): number => {
    let strengths = 0
    if (number.length > 5) strengths += 1
    if (number.length > 7) strengths += 1
    if (hasNumber(number)) strengths += 1
    if (hasSpecial(number)) strengths += 1
    if (hasMixed(number)) strengths += 1
    return strengths
}