import a from "axios";
import {ENDPOINT} from "../src/utils";

export default async function checkTestServer() {
    try {
        await a.get(`${ENDPOINT}/alive`)
    } catch (e) {
        console.error(e);
        throw new Error("Test server is not running");
    }
}
