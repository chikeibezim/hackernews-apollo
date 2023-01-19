import React from 'react';
import { useMutation, gql } from "@apollo/client"
import { AUTH_TOKEN } from '../constants';
import { timeDifferenceforDate } from '../utils';
import { FEED_QUERY } from './LinkList';

//component to display a single link
//this component expects a link in its props and renders the link's description and url


const Link = (props) => {
    const { link } = props;
    const authToken = localStorage.getItem(AUTH_TOKEN);

    //create mutation for voting
    const VOTE_MUTATION = gql`
        mutation VoteMutation($linkId: ID!){
            vote(linkId: $linkId){
                id
                link{
                    id
                    votes {
                        id
                        user {
                            id
                        }
                    }
                }
                user {
                    id
                }
            }
        }
    `;

    /*
    one of apollo's biggest value is that it creates and maintains a client-side cache
    for our graph-ql apps. We typically don't need to do much to manage the cache, but
    in some circumstances, we do.

    when we perform mutations that affect a list of data, we need to manaully
    intervene to update the cache.

    like the below, we've included an additional behavior in the update callback.
    This runs after the mutation has completed and allows us to read the cache,
    modify it and commit the changes.

    */

    const [vote] = useMutation(VOTE_MUTATION, {
        variables: {
            linkId: link.id
        },
        //destructue out the vote we're about to make for adding to cache
        update: (cache, { data: {vote}}) => {
            //read exact portion of APollo cache that we need to allow us update it
            const { feed } = cache.readQuery({
                query: FEED_QUERY
            });

            //create a new array of data that includes the vote we just made
            const updatedLinks = feed.links.map((feedLink) => {
                if(feedLink.id === link.id){
                    return {
                        ...feedLink,
                        votes: [...feedLink.votes, vote]
                    }
                }
                return feedLink;
            })

            //commit changes to query

            cache.writeQuery({
                query: FEED_QUERY,
                data: {
                    feed: { 
                        links: updatedLinks
                    }
                }
            });
        }
    })

    return (
        <div className='flex mt2 items-start'>
            <div className='flex items-center'>
                <span className='gray'>{props.index + 1}.</span>
                {authToken && (
                    <div
                        className='ml1 gray f11'
                        style={{ cursor: 'pointer'}}
                        onClick={vote}    
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