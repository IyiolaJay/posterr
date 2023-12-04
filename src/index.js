import expressApp from './app.js';
import { connectToDatabase } from './database/index.js';


const port = process.env.PORT || 5000;

const startApp =  (app , port)=>{
    
    app.listen(port, async()=>{
        
        // connect to database....
        await connectToDatabase();
        console.log(`App is live an listening on port ${port}`);
    })
}

startApp(expressApp, port);