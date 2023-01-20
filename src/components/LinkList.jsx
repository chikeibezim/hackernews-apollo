import React from 'react';
//import useQuery to help us fecth our data drom the database.
import { useQuery, gql } from '@apollo/client';

import Link from './Link';


//wite the graphql query
//the FEED_QUERY variable uses gql, a library that uses tagged template literals
//to parse the GraphQL query document we define.
const FEED_QUERY = gql`
    {
        feed {
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
    /*
      here, the query document is then passed into the useQuery hook in the component
      the hook returns 3 items:
        i. loading: true as long as the request us still ongoing
        ii. error: In case the request fails: contain info of what went wrong
        iii. datat: actual data received from the seerver. It has the links property
        iv. which represents a list of link elements
      Note: there are many more items the hook returns but this 3 are the most important

    */

      //in order to subscribe to events on the Link type, we'll include a function subscribeToMore that can be destructured 
      //from useQuery
    
    const { loading, error, data, subscribeToMore } = useQuery(FEED_QUERY);
    
    
    /*
        takes a single object as an argument. This object requires configuraton on
        how to listen for and respond to a subscription

        At the very least, we need to pass a subscription document to the document key
        in this object. This is a graphQL document where we define our subscription

        we can also pass a field called updateQuery which can be use to update the cache.
    */
    subscribeToMore({
        document: NEW_LINKS_DOCUMENT,
        updateQuery
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