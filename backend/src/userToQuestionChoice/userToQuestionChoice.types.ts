export type AsakaiChoices = Record<number, number>

interface UserAlterodoResponse {
    givenName: string
    familyName: string
    pictureUrl: string
}

export interface AlterodoResponse {
    baseQuestionCount: number
    alterodo: SimilarityWithUserId & UserAlterodoResponse
    varieto: SimilarityWithUserId & UserAlterodoResponse
}

export interface Alterodos {
    alterodo: SimilarityWithUserId
    varieto: SimilarityWithUserId
}

export interface SimilarityWithUserId {
    userId: number
    commonQuestionCount: number
    sameAnswerCount: number
    similarity: number
}

export interface UserMap {
    x: number
    y: number
    id: number
    givenName: string
    familyName: string
    pictureUrl: string
}

export interface QuestionFilters {
    isValidated?: 'true'
    isNotValidated?: 'true'
    isInValidation?: 'true'
    isJoke?: 'true'
    isNotJoke?: 'true'
    isJokeOnSomeone?: 'true'
    isNotJokeOnSomeone?: 'true'
}

export interface AsakaiEmailDTO {
    email: string
    asakaiChoices?: AsakaiChoices
    alterodoUserId?: number
    addedByUserId?: number | null
}
