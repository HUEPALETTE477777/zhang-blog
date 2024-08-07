const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

const BlogRoutes = require('./routes/blog-route');
const CommentRoutes = require('./routes/comment-route');
const UserRoutes = require('./routes/user-route');
const ImageRoute = require('./routes/image-route');

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use('/api/uploads', express.static(path.join(__dirname, '../src/uploads')));

app.use('/api/blogs', BlogRoutes);
app.use('/api/comments', CommentRoutes);
app.use('/api/auth', UserRoutes);
app.use('/api/images', ImageRoute);  

async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');

        app.get('/', (req, res) => {
            res.send('Blog Server Running!');
        });

        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

main();
