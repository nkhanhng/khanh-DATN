import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link,withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import {createProfile, getCurrentProfile}from '../../actions/profileAction'
import isEmpty from '../../validation/is-empty'

class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location:'',
            status:'',
            skills:'',
            githubusername:'',
            bio:'',
            twitter:'',
            facebook:'',
            linkedin:'',
            youtube:'',
            instagram:'',
            error:{}
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        }

        this.props.createProfile(profileData, this.props.history);
    }

    componentDidMount(){
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.error){
            this.setState({error: nextProps.error})
        }

        if(nextProps.profile.profile){
            const profile = nextProps.profile.profile;

            //Bring skills array back to CSV
            const skillsCSV = profile.skills.join(',');

            // If profile field doesn exist
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';

            //set component field state
            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
                instagram: profile.instagram
            })
        }
    }

    render() {
        const {error, displaySocialInputs} = this.state;
        const options = [
            {value: 'Select your professional'},
            {value: 'Developer'},
            {value: 'Manager'},
            {value: 'Student'},
            {value: 'Other'}
        ];
        
        let socialInputs;
        if(displaySocialInputs){
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={error.twitter}
                    />
                    <InputGroup
                        placeholder="Facebook Profile URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={error.facebook}
                    />
                    <InputGroup
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={error.linkedin}
                    />
                    <InputGroup
                        placeholder="Youtube Channel URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={error.youtube}
                    />
                    <InputGroup
                        placeholder="Instagram Profile URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={error.instagram}
                    />
                </div>
            )
        }

        return (
            <div className="creat-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className='display-4 text-center'>Edit Profile</h1>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="*Profile"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={error.handle}
                                    info="An unique handle for your profile URL."
                                />
                                <SelectListGroup
                                    placeholder="Status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    options={options}
                                    error={error.status}
                                    info="Your career"
                                />
                                <TextFieldGroup
                                    placeholder="Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={error.company}
                                    info="Your company"
                                />
                                <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={error.website}
                                    info="Your website"
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={error.location}
                                    info="City or city & state suggested"
                                />
                                <TextFieldGroup
                                    placeholder="Skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={error.skills}
                                    info="Please use comma separated values(eg. HTML,JS,CSS)"
                                />
                                <TextFieldGroup
                                    placeholder="Github username"
                                    name="githubusername"
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    error={error.githubusername}
                                    info="Your repos"
                                />
                                <TextAreaFieldGroup
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={error.bio}
                                    info="Tell us a little about yourself"
                                />
                                <div className="mb-3">
                                    <button
                                    type="button" 
                                    onClick={()=>{
                                        this.setState(prevState => ({
                                            displaySocialInputs: !prevState.displaySocialInputs
                                        }))
                                    }} className="btn btn-light">
                                        Add Social Network Links
                                    </button>
                                    <span className='text-muted'>Optional</span>
                                </div>
                                {socialInputs}
                                <input type='submit' value="Submit" className="btn btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

EditProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    error: state.error
})

export default connect(mapStateToProps,{createProfile, getCurrentProfile})(withRouter(EditProfile));