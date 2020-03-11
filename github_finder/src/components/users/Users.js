import React from 'react'
import UserItem from './UserItem';
import PropTypes from 'prop-types';
import Spinner from '../layout/spinner';


const Users = ({ users, loading }) => {
    if(loading){
        return <Spinner />
    }else{
        return (
            <div style={UserStyle}>
                {users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        );
    }
}

Users.proTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

const UserStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    grid: '1rem'
}

export default Users
