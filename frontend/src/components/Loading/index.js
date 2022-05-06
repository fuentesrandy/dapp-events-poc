import React from 'react';

const Loading = ({ isLoading }) => {
    return (
        isLoading ? <div>Loading...</div > : <></>)
}


export default Loading;