export class ApplicationsError extends Error{
    constructor(message, code){
        super(message);
        this.code = code;
    }
}