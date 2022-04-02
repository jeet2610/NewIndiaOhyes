export default class Exception extends Error {
    constructor(response) {
        super();
        this.response = response;
    }
}