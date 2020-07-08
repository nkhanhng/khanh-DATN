import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from "classnames";
import { addLike, removeLike } from '../../actions/postAction';

const ProfilePostItem = (props) => {
    const {post} = props;
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth);

    const onLike = (id) => {
        dispatch(addLike(id));
    }

    const onUnLike = (id) => {
        dispatch(removeLike(id));
    }

    const findUserLike = (likes) => {
        if (likes.filter(like => like.user === currentUser.user.id).length > 0) {
            return true;
        } else return false;
    }

    return (
    <div className="row">
        <div className="col-md-2">
            <a href="profile.html">
            <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt="avatar"
            />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
        </div>
        <div className="col-md-10">
            <p className="lead h-75">{post.text}</p>
            <span>
            <button
                onClick={() => onLike(post._id)}
                type="button"
                className="btn btn-light mr-1"
            >
                <i
                className={classnames("fas fa-thumbs-up", {
                    "text-info": findUserLike(post.likes),
                })}
                />
                <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button
                onClick={() => onUnLike(post._id)}
                type="button"
                className="btn btn-light mr-1"
            >
                <i className="text-secondary fas fa-thumbs-down" />
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments
            </Link>
            </span>
        </div>
    </div>
  );
};

export default ProfilePostItem;
