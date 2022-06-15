import axios from "axios";
import {ENDPOINT} from "../src/utils";

export default async function checkTestServer() {
    try {
        await axios.get(`${ENDPOINT}/alive`)
    } catch (e) {
        throw new Error("Test server is not running");
    }

}
