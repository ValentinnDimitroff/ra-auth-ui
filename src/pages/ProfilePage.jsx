import React from 'react';
import PropTypes from 'prop-types';

export const ProfilePage = ({ children }) => {
    const a = 5;
    return (
        <div>
            {a}
            {children}
        </div>
    );
};

ProfilePage.propTypes = {
    children: PropTypes.node,
};
