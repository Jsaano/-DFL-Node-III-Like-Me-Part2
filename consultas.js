const {Pool} = require('pg');

const pool = new Pool({

    host : 'localhost',
    user : 'postgres',
    password : 'admin',
    database : 'likeme',
    port : '5432'
});

const getPosts = async (req, res) => {
 try {
    const response = await pool.query('SELECT * FROM posts');
    res.status(200).json(response.rows);
}
catch (error) {
    console.log(error);
}
}

const createPost = async (req, res) => {
try {
    const { titulo,img ,descripcion,likes } = req.body;
    const response = await pool.query('INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)', [titulo, img, descripcion, likes]);
    console.log(response);
    res.json({
        message: 'Post Added successfully',
        body: {
            post: {titulo, img, descripcion, likes}
        }
    })
}

catch (error) {
    console.log(error);
}
}

const updatePost = async (req, res) => {
    try {
    const id = req.params.id;
    const { titulo, img, descripcion, likes } = req.body;

    const response = await pool.query('UPDATE posts SET titulo = $1, img = $2, descripcion = $3, likes = $4 WHERE id = $5', [
        titulo,
        img,
        descripcion,
        likes,
        id
    ]);
    console.log(response);
    res.json('Post Updated Successfully');
}
catch (error) {
    console.log(error);
}
}



const deletePost = async (req, res) => {
    try{
    const id = req.params.id;
    await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    res.json(`Post ${id} deleted Successfully`);
}
catch (error) {
    console.log(error);
}
}


module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost
}
