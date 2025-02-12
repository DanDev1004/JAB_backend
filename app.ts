import express, {Application} from 'express'
import authRouter from './src/user-management/infraestructure/routes/token-generator.routes';
import userRouter from './src/user-management/infraestructure/routes/user.routes';
import groupRouter from './src/company-management/infraestructure/routes/group.routes';
import empresaRouter from './src/company-management/infraestructure/routes/empresa.routes';
import empresaGroupRouter from './src/company-management/infraestructure/routes/empresa-group.routes';

class App{
    private app: Application;
    private port: string;

    //Paths
    private auth_path: string;
    private user_path:  string;
    private group_path: string;
    private company_path: string;
    private company_group_path: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '5000';

        //Paths
        this.auth_path = '/api/auth';
        this.user_path = '/api/user';
        this.group_path = '/api/group';
        this.company_path = '/api/company';
        this.company_group_path = '/api/company-group';

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
       this.app.use(this.auth_path, authRouter);
       this.app.use(this.user_path, userRouter);
       this.app.use(this.group_path, groupRouter);
       this.app.use(this.company_path, empresaRouter);
       this.app.use(this.company_group_path, empresaGroupRouter);
    }
}

export default App;

