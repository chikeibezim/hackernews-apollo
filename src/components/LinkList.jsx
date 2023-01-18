import React from 'react';
//import useQuery to help us fecth our data drom the database.
import { useQuery, gql } from '@apollo/client';

import Link from './Link';


//wite the graphql query
//the FEED_QUERY variable uses gql, a library that uses tagged template literals
//to parse the GraphQL query document we define.
const FEED_QEURY = gql`
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
    //here, the query document is then passed into the useQuery hook in the component
    //the hook returns 3 items:
    //i.loading: true as long as the request us still ongoing
    //ii.error: In case the request fails: contain info of what went wrong
    //iii. datat: actual data received from the seerver. It has the links property
    //which represents a list of link elements
    //Note: there are many more items the hook returns but this 3 are the most important
    
    const { loading, error, data } = useQuery(FEED_QEURY);
    console.log({loading, error, data });

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

export default LinkList;