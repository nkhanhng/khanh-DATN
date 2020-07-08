import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postAction'
import PostFeed from './PostFeed';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3)
      },
    },
}));
    
const Posts = (props) => {
    const classes = useStyles();
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch();
    const post = useSelector((state) => state.post);
    const { posts, loading, numPage } = post;
    useEffect(() => {
        dispatch(getPosts(currentPage));
    },[currentPage])
    let postContent;

    if(posts === null || loading){
        postContent = <Spinner/>
    } else {
        postContent = <PostFeed posts={posts}/>
    }

    return (
        <div className="feed">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 p-0">
                        <PostForm />
                    </div>
                    {postContent}
                    <div className={classes.root}>
                        <Pagination count={numPage} page={currentPage} onChange={(e, page) => setCurrentPage(page)}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

Posts.propTypes = {
    post: PropTypes.object.isRequired
}

export default Posts;