import React, { useEffect, useState } from "react";
import axios from 'axios';
import ProfilePostItem from "./ProfilePostItem";

const ProfilePost = (props) => {
    const [posts, setPost] = useState([]);
    const { profile } = props;
    console.log(posts);

    useEffect(() => {
        axios.get(`/api/posts/user/${profile.profile.user._id}`)
            .then((data) => {
                setPost(data.data);
            })
            .catch(err => console.log(err))
    },[])

    return (
        <div className="card card-body mb-3 col-md-12 mt-4">
        {posts && posts.length > 0 
        ? 
            posts.map(post => <ProfilePostItem post={post} key={post._id}/>)
        : null
        }
        </div>
    );
};

export default ProfilePost;
