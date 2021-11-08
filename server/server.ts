import { server } from "./app";

let PORT = 80;

server.listen(PORT, 
    () => {
        console.log('App is up and running!!!');
    })
