import express, {Application} from 'express'
import userRouter from './src/user-management/infraestructure/routes/user.routes';
import groupRouter from './src/company-management/infraestructure/routes/group.routes';

class App{
    private app: Application;
    private port: string;

    //Paths
    private user_path:  string;
    private group_path: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '5000';

        //Paths
        this.user_path = '/api/user';
        this.group_path = '/api/group';

        this.middlewares();
        this.routes();
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server running on port ${this.port}`);
        });
    }


    middlewares(){
        //TODO: CORS
        this.app.use(express.json());
    }
    
    routes(){
       this.app.use(this.user_path, userRouter);
       this.app.use(this.group_path, groupRouter);
    }
}

export default App;

