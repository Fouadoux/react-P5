export class DataBaseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DataBaseError';
    }
}