module.exports = (hostname) => {
    function inner(port, callback_func){
        console.log(`${hostname}`);
        callback_func(port)
    }
    return inner;
}

module.exports.server = function server(hostname, port){
    this.hostname = hostname;
    this.port = port;
    this.up = () => {
        console.log(`Running server on ${this.hostname}:${this.port}`);
    }
    this.down = () => {
        console.log(`Shuting down server on ${this.hostname}:${this.port}`)
    }
}

module.exports.exec = (callback_func) => {
    callback_func();
}

module.exports.netStack = function* NetStack(enable_protocols){
    // apps protocols: https,ftp, etc..
    yield new Promise((resolve, reject) => {
        if(enable_protocols.tcp){
            console.log("App data being process by TCP protocol...");
            setTimeout(()=>{resolve("{ok}")},3000);
        }
        if(!enable_protocols.tcp){
            reject(new Error("TCP protocol not enable"));
        }
    });

    yield new Promise((resolve, reject) => {
        if(enable_protocols.ip){
            console.log("App data being process by IP protocol...");
            setTimeout(()=>{resolve("{ok}")},5000);
        }
        if(!enable_protocols.tcp){
            reject(new Error("IP protocol not enable"));
        }
    });

    yield new Promise((resolve, reject) => {
        if(enable_protocols.arp){
            console.log("App data being process by ARP protocol...");
            setTimeout(()=>{resolve("{ok}")},2000);
        }
        if(!enable_protocols.tcp){
            reject(new Error("ARP protocol not enable"));
        }
    });
}