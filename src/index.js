import { init } from './socket.js';
import expressApp from './app.js';
import { connectToDatabase } from './database/index.js';

const port = process.env.PORT || 5000;

const startApp =  (app , port)=>{
    
    const server = app.listen(port, async()=>{
        // connect to database....
        await connectToDatabase();
        console.log(`App is live an listening on port ${port}`);
    })
    init(server);



}

startApp(expressApp, port);