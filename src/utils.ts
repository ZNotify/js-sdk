const TEST_ENDPOINT = "http://localhost:14444"
const PRODUCTION_ENDPOINT = "https://push.learningman.top"

export const ENDPOINT = process.env.NODE_ENV === "test" ? TEST_ENDPOINT : PRODUCTION_ENDPOINT
