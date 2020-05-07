import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import {createProfile}from '../../actions/profileAction'


class CreateProfile extends Component {
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

    componentWillReceiveProps(nextProps){
        if(nextProps.error){
            this.setState({error: nextProps.error})
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
                            <h1 className='display-4 text-center'>Create Profile</h1>
                            <p className="lead text-center">
                                Input your info
                            </p>
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

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    error: state.error
})

export default connect(mapStateToProps,{createProfile})(withRouter(CreateProfile));