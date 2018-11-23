import React from 'react';
import {Link} from "react-router-dom";

export default () => {
    return (
        <div>
            <h1 className="display-4">
                <span>404</span> Page Not Found
            </h1>
            <p>Sorry, that page does not exist</p>
            <Link to={'/'}>Home</Link>
        </div>
    );
};
