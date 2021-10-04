// implement your posts router here
const express = require('express');
const model   = require('./posts-model'); 
const router  = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await model.find();
        res.status(200).send(posts);
    }
    catch {
        res.status(500).json({
            message: 'The posts information could not be retrieved'
        });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const post = await model.findById(id);    
        if(!post) {
            res.status(404).json({
                message: 'The post with the specified ID does not exist'
            });
        } 

        res.status(200).send(post);
    }
    catch {
        res.status(500).json({
            message: 'The post information could not be retrieved'
        });
    }
});

router.get('/:id/comments', async (req, res) => {
    const id = req.params.id;
    try {
        const postComments = await model.findPostComments(id);
        if(!postComments) {
            res.status(404).json({
                message: 'The post with the specified ID does not exist'
            });
        }

        res.status(200).send(postComments);
    }
    catch {
        res.status(500).json({
            message: 'The comments information could not be retrieved'
        });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    if(!req.body.contents || !req.body.title) {
        res.status(400).json({
            message: 'Please provide title and contents for the post'
        });
    }

    const updatedPost = {
        title    : req.body.title,
        contents : req.body.contents,
    };

    try {
        const post = await model.update(id, updatedPost);
        console.log(post);
        if(!post) {
            res.status(404).json({
                message: 'The post with the specified ID does not exist'
            });
        }
        
        const newPost = await model.findById(id);
        res.status(200).send(newPost);
    }
    catch {
        res.status(500).json({
            message: 'The post information could not be modified'
        });
    }
});

router.post('/', async (req, res) => {
    if(!req.body.contents || !req.body.title) {
        res.status(400).json({
            message: 'Please provide title and contents for the post'
        });
    }

    const newPost = {
        title   : req.body.title,
        contents: req.body.contents,
    }

    try {
        const postID = await model.insert(newPost);
        const post   = await model.findById(postID.id)
        res.status(201).send(post);
    }
    catch {
        res.status(500).json({
            message: 'There was an error while saving the post to the database'
        })
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await model.findById(id);
        const post    = await model.remove(id);
        console.log(post);
        if(!post) {
            res.status(404).json({
                message: 'The post with the specified ID does not exist'
            });
        }
        
        res.status(200).send(deleted);

    } catch {
        res.status(500).json({
            message: 'The post could not be removed'
        });
    }
});



module.exports = router;