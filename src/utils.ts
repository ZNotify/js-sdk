const TEST_ENDPOINT = "http://localhost:14444"
const PRODUCTION_ENDPOINT = "https://push.learningman.top"

export const ENDPOINT = process.env.NODE_ENV === "test" ? TEST_ENDPOINT : PRODUCTION_ENDPOINT

export function isUUID(str: string) {
    const uuidRegex = new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$", "i")
    return uuidRegex.test(str)
}
