import React, { useState, useEffect } from "react";
import axios from 'axios';
import Spinner from '../common/Spinner';
import SearchResults from "./SearchResults";

const SearchProfile = (props) => {
    const [profiles, setProfiles] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        const postData = {
            name: input
        }

        axios
        .post(`/api/users/search`, postData)
        .then((res) => {
            const { data } = res;
            console.log(data);
            setProfiles(data);
            setLoading(false);
        })
        .catch((err) => console.log(err));
    }

    let profileItems;
    if (profiles === null || loading) {
        profileItems = <Spinner />;
    } else {
        console.log(profiles)
        if (profiles && profiles.length > 0) {
        profileItems = profiles.map((profile) => (
            <SearchResults key={profile._id} profile={profile} />
        ));
        } else {
        profileItems = <h4>No profiles found...</h4>;
        }
    }
    return (
    <div className="profiles">
        <div className="container">
            <div className="row">
            <div className="col-md-12">
                <h1 className="display-4 text-center">Search Profile</h1>
                <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    aria-describedby="button-addon2"
                    onChange={(e) => setInput(e.target.value)}
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                        onClick={() => handleSubmit()}
                    >
                        Search
                    </button>
                </div>
                </div>
                {profileItems}
            </div>
            </div>
        </div>
    </div>
  );
};

export default SearchProfile;
