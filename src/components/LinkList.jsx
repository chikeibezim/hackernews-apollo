import React from 'react';
import { useLocation } from 'react-router-dom';
//import useQuery to help us fecth our data drom the database.
import { useQuery, gql } from '@apollo/client';

import Link from './Link';

//define subscription for newlinks
const NEW_LINKS_DOCUMENT = gql`
    subscription {
        newLink {
            id
            url
            description
            createdAt
            postedBy{
                id
                name
            }
            votes {
                id
                user {
                    id
                }
            }
        }
    }
`;

//define subscription for newVotes
const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
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
    wite the graphql query
    the FEED_QUERY variable uses gql, a library that uses tagged template literals
    to parse the GraphQL query document we define.

    We've also included some arguments for the query for pagination
    all aligned with the api arguments
    i. skip is where items will start
    ii. take defines the limit, or how many items needed

*/
const FEED_QUERY = gql`
    query FeedQuery(
        $take: Int
        $skip: Int
        $orderBy: LinkOrderByInput
    ){
        feed(take: $take, skip: $skip, orderBy: $orderBy) {
            links {
                id
                createdAt
                url
                description
                postedBy {
                    id
                    name
                }
                votes {
                    id
                    user {
                        id
                    }
                }
            }
        }
    }
`



const LinkList = () => {
    const location = useLocation(); //get current pathway of page visited
    const isNewPage = location.pathname.includes('new');
    const pageIndexParams = location.pathname.split('/');
    const page = parseInt(
        pageIndexParams[pageIndexParams - 1]
    );
    const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;
    /*
      here, the query document is then passed into the useQuery hook in the component
      the hook returns 3 items:
        i. loading: true as long as the request us still ongoing
        ii. error: In case the request fails: contain info of what went wrong
        iii. data: actual data received from the seerver. It has the links property
        which represents a list of link elements
      Note: there are many more items the hook returns but this 3 are the most important

    */

      //in order to subscribe to events on the Link type, we'll include a function subscribeToMore that can be destructured 
      //from useQuery
    
    const { loading, error, data, subscribeToMore } = useQuery(FEED_QUERY, {
        variables: getQueryVariables(isNewPage, page)
    });
    
    
    /*
        takes a single object as an argument. This object requires configuraton on
        how to listen for and respond to a subscription

        At the very least, we need to pass a subscription document to the document key
        in this object. This is a graphQL document where we define our subscription

        we can also pass a field called updateQuery which can be use to update the cache.
    */

    //adding subscription for new links
    subscribeToMore({
        document: NEW_LINKS_DOCUMENT,
        updateQuery: (prev, { subscriptionData }) => {
            if(!subscriptionData.data) return prev;
            const newLink = subscriptionData.data.newLink;
            const exists = prev.feed.links.find(
                ({ id }) => id === newLink.id
            );
            if(exists) return prev;

            return Object.assign([], prev, {
                feed: {
                    links: [newLink, ...prev.feed.links],
                    count: prev.feed.links.length + 1,
                    _typename: prev.feed.__typename
                }
            })
        }
    });

    //adding subscription for votes
    subscribeToMore({
        document: NEW_VOTES_SUBSCRIPTION
    })

    return (
        <div>
            {data && (
                <>
                    {data.feed.links.map((link, index) => (
                        <Link key={link.id} link={link} index={index} />
                    ))}
                </>
            )}
        </div>
    )
}

export {LinkList, FEED_QUERY};