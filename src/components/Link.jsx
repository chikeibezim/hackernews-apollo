import React from 'react';

//component to display a single link
//this component expects a link in its props and renders the link's description and url

const Link = (props) => {
    const { link } = props;
    return (
        <div>
            <div>
                {link.description} ({link.url})
            </div>
        </div>
    )

}

export default Link;