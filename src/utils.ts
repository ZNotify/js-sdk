import {definitions, operations} from "./schema";

const TEST_ENDPOINT = "http://127.0.0.1:14444"
const PRODUCTION_ENDPOINT = "https://push.learningman.top"

export const ENDPOINT = process.env.NODE_ENV === "test" ? TEST_ENDPOINT : PRODUCTION_ENDPOINT

export function isUUID(str: string) {
    const uuidRegex = new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$", "i")
    return uuidRegex.test(str)
}

type removeUserSecret<T> = Omit<T, "user_secret">
type unwrap<T> = T[keyof T]
type merge<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never

type operationWithParameter = {
    [K in keyof operations as operations[K] extends { parameters: infer P } ? K : never]: operations[K]
}
type operationWithParameterIndex = keyof operationWithParameter

type operationWithValidResponse = {
    [K in keyof operations as operations[K] extends {
        responses: {
            200: { schema: infer S }
        }
    } ? K : never]: operations[K]
}
type operationWithValidResponseIndex = keyof operationWithValidResponse

export type argument<T extends operationWithParameterIndex> = removeUserSecret<merge<unwrap<operations[T]["parameters"]>>>

type successResponse<T extends operationWithValidResponseIndex> = operations[T]["responses"][200]["schema"]
type errorResponse = definitions["types.BadRequestResponse"] | definitions["types.UnauthorizedResponse"] | definitions["types.NotFoundResponse"]
export type response<T extends operationWithValidResponseIndex> = successResponse<T> | errorResponse
export type body<T extends operationWithValidResponseIndex> = response<T>["body"]
