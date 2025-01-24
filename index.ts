import dotenv from 'dotenv';
import App from './app';

dotenv.config();

try{
    const app = new App();
    app.listen();
}catch(error){
    console.log(error);
}
