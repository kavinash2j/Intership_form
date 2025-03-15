class expressError {
    constructor(status=500,msg){
        Super();
        this.msg = msg;
        this.status = status;
    }
}

module.exports = expressError;