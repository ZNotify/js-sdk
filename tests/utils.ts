import axios from "axios";
import {ENDPOINT} from "../src/utils";

export async function checkTestServer() {
    const resp = await axios.get(`${ENDPOINT}/alive`)
    if (!(resp.status === 204)) {
        throw new Error("Test server is not running");
    }
}
