import dotenv from 'dotenv';
dotenv.config();
import App from './app';


try{
    const app = new App();
    app.listen();
}catch(error){
    console.log(error);
}
