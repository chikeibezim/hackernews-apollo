import React from 'react';
import { AUTH_TOKEN } from '../constants';
import { timeDifferenceforDate } from '../utils';

//component to display a single link
//this component expects a link in its props and renders the link's description and url

const Link = (props) => {
    const { link } = props;
    const authToken = localStorage.getItem(AUTH_TOKEN);

    return (
        <div className='flex mt2 items-start'>
            <div className='flex items-center'>
                <span className='gray'>{props.index + 1}.</span>
                {authToken && (
                    <div
                        className='ml1 gray f11'
                        style={{ cursor: 'pointer'}}
                        onClick={() => { console.log("Clicked vote button")}}    
                    >
                        ▲
                    </div>
                )}
            </div>
            <div className='ml1'>
                    <div>
                        {link.description} ({link.url})
                    </div>
                    {(
                        <div className='f6 lh-copy gray'>
                            {link.votes.length} votes | by {' '}
                            {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
                            {timeDifferenceforDate(link.createdAt)}
                        </div>
                    )}
            </div>
        </div>
    )

}

export default Link;