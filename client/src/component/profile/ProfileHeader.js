import React, { useState, useEffect } from "react";
import isEmpty from "../../validation/is-empty";
import { useSelector } from 'react-redux';
import axios from 'axios';
import avatar from '../../img/defaultava.png'

const ProfileHeader = (props) => {
  const { profile, history } = props;
  console.log(history)
  const [isFollow, setIsFollow] = useState(false)
  const [loading, setLoading] = useState(false);

  const currentUser = useSelector(state => state.auth);
  console.log(currentUser);

  useEffect(() => {
    const user = { profile }
    console.log(user.profile.user.followings)
    if(user.profile.user.followings.length > 0){
      if(user.profile.user.followings.some(flw => flw.user === currentUser.user.id)){
        console.log('true')
        setIsFollow(true);
      }
    }
  }, [])

  const handleUnFollow = (id) => {
    setLoading(true)
    axios
      .put(`/api/users/unfollow/${id}`)
      .then((res) => {
        const { data } = res;
        if(data.success){
          setIsFollow(false);
        }
      })
      .catch((err) => console.log(err));
  }

  const handleFollow = (id) => {
    if (!currentUser.isAuthenticated) {
      history.push('/login');
    }
    setLoading(true)
    axios
      .put(`/api/users/follow/${id}`)
      .then((res) => {
        const { data } = res;
        if(data.success){
          setIsFollow(true);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              <img
                className="rounded-circle"
                alt="Avatar"
                src={profile.user && profile.user.avatar ? profile.user.avatar : avatar}
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{profile.user ? profile.user.name : null}</h1>
            <p className="lead text-center">
              {profile.status}{" "}
              {isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
            </p>
            <div>
              {isFollow
              ?
                <span onClick={() => handleUnFollow(profile.user._id)} className="btn btn-lg btn-dark">Followed</span>
              :
                <span onClick={() => handleFollow(profile.user._id)} className="btn btn-lg btn-success">Follow</span>
              }
              <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.website}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.twitter}
                    target="_blank"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.facebook}
                    target="_blank"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.linkedin}
                    target="_blank"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.instagram}
                    target="_blank"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.youtube}
                    target="_blank"
                  >
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
