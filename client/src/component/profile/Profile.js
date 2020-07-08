import React, { Component } from 'react';
import Spinner from '../common/Spinner';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { getProfileByHandle, getProfileById } from '../../actions/profileAction';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import ProfilePost from './ProfilePost';
import Typography from '@material-ui/core/Typography';

class Profile extends Component {
    componentDidMount(){
        if(this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle)
        }
        if(this.props.match.params.id){
            this.props.getProfileById(this.props.match.params.id)
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.profile.profile === null && this.props.profile.loading){
            this.props.history.push('/error')
        }
    }

    renderPost = () => {
        const {profile, auth} = this.props;
        console.log(this.props.auth);
        if(profile.profile.user.followings.length > 0){
            if(profile.profile.user.followings.some(flw => flw.user === auth.user.id)){
                console.log('true')
                return (
                    <ProfilePost profile={profile} />
                )
            }
        }
        return (
            <Typography variant="h6">
                You need to follow {profile.profile.user.name} to see {profile.profile.user.name}'s posts
            </Typography>
        )
    }

    render() {
        const {profile, loading} = this.props.profile;
        let profileContent;

        if(!profile || loading){
            profileContent = <Spinner/>
        } else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-light mb-3 float-left">
                                Back
                            </Link>
                        </div>
                    </div>
                    <ProfileHeader profile={profile} history={this.props.history}/>
                    <ProfileAbout profile={profile}/>
                    <ProfileCreds education={profile.education} experience={profile.experience}/>
                    {profile.githubusername ? (<ProfileGithub username={profile.githubusername}/>): null}
                    {this.renderPost()}
                </div>
            )
        }

        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {profile ? profileContent : <Spinner/>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps,{getProfileByHandle, getProfileById})(Profile);