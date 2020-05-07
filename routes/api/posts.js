const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')

//load Model
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

//validation
const validatePostInput = require('../../validation/post')

//@route   GET api/posts
//@desc    get all posts
//@access  Public

router.get('/',(req,res)=>{
    Post
        .find()
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopostfound: "No posts found"}));
});

//@route   GET api/posts/:id
//@desc    get post by id
//@access  Public

router.get('/:id',(req,res)=>{
    Post
        .findById(req.params.id)
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopostfound: "No post found"}));
});

//@route   POST api/posts
//@desc    Create post
//@access  Private

router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const { errors, isValid } = validatePostInput(req.body)

    if(!isValid){
        return res.status(400).json(errors)
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post))
});

//@route   DELETE api/posts/:id
//@desc    del post
//@access  Private

router.delete('/:id',passport.authenticate('jwt',{session: false}),(req,res)=>{
    Profile
        .findOne({user: req.user.id})
        .then(profile => {
            Post
                .findById(req.params.id)
                .then(post => {
                    //check owner
                    if(post.user.toString() !== req.user.id){
                        res.status(401).json({ notauthorized: 'User not authorized' })
                    }
                    post.remove().then(()=> res.json({success: true}))
                })
                .catch(err => res.status(404).json({postnotfound: "No post found"}))
        })
})

//@route   POST api/posts/like/:id
//@desc    like post
//@access  Private

router.post('/like/:id',passport.authenticate('jwt',{session: false}),(req,res)=>{
    Profile
        .findOne({user: req.user.id})
        .then(profile => {
            Post
                .findById(req.params.id)
                .then(post => {
                    if(post.likes.filter(like=> like.user.toString() === req.user.id).length > 0){
                        return res.status(400).json({alreadyliked: 'User already liked this post'})
                    }

                    //Add user id to likes array
                    post.likes.unshift({user: req.user.id})

                    post.save().then(post => res.json(post))
                })
                .catch(err => res.status(404).json({postnotfound: "No post found"}))
        })
})

//@route   POST api/posts/unlike/:id
//@desc    unlike post
//@access  Private

router.post('/unlike/:id',passport.authenticate('jwt',{session: false}),(req,res)=>{
    Profile
        .findOne({user: req.user.id})
        .then(profile => {
            Post
                .findById(req.params.id)
                .then(post => {
                    if(post.likes.filter(like=> like.user.toString() === req.user.id).length === 0){
                        return res.status(400).json({alreadyliked: 'You have not yet liked this post '})
                    }

                    //Get remove
                    const removeIndex = post.likes
                            .map(items => items.user.toString())
                            .indexOf(req.user.id)
                    //Splice
                    post.likes.splice(removeIndex, 1);

                    post.save().then(post => res.json(post))
                })
                .catch(err => res.status(404).json({postnotfound: "No post found"}))
        })
})

//@route   POST api/posts/comment/:id
//@desc    Add comment to post 
//@access  Private

router.post('/comment/:id',passport.authenticate('jwt',{session: false}), (req,res)=>{
    const { errors, isValid } = validatePostInput(req.body)

    if(!isValid){
        return res.status(400).json(errors)
    }

    Post
        .findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }

            post.comments.unshift(newComment);

            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({postnotfound : "No post found"}));
})

//@route   DELETE api/posts/comment/:id/:comment_id
//@desc    Del comment  
//@access  Private

router.delete('/comment/:id/:comment_id',passport.authenticate('jwt',{session: false}), (req,res)=>{

    Post
        .findById(req.params.id)
        .then(post => {
            //Check if comment exist
            if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
                return res.status(404).json({ commentnotexist: 'comment does not exist' })
            }

            const removeIndex = post.comments
                                        .map(item => item._id.toString())
                                        .indexOf(req.params.comment_id);

            //Splice
            post.comments.splice(removeIndex,1);

            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({postnotfound : "No post found"}));
})

module.exports = router;