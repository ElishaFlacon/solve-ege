require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const userRouter = require('./routes/user.routes');
const taskRouter = require('./routes/task.routes');
const errorMiddleware = require('./middlewares/error.middleware');


const PORT = process.env.APP_PORT;
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use(cookieParser());
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

// use errors at the end
app.use(errorMiddleware);




async function startApp() {
    try {
        app.listen(PORT, () => console.log(`SERVERT STRAT ON PORT ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}


startApp();













/****************************************


cd server
cd client
npm run dev


POSTGRESS
.\psql -U postgres
psql \! chcp 1251


****************************************/