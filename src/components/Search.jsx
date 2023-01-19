import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import Link from './Link';

const FEED_SEARCH_QUERY = gql`
        query FeedSearchQuery($filter: String!){
            feed(filter: $filter){
                links {
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
            }
        }
    `;

const Search = () => {
    const [searchFilter, setSearchFilter] = useState('');

    /*
        we want to load the data everytime the user hits te OK button and 
        not upon the initial load of the component. We'll use the useLazyQuery
        Does what useQuery do but it must must be executed manually
    */

    const [executeSearch, { loading, data, error }] = useLazyQuery(
        FEED_SEARCH_QUERY
    );

    console.log({ data })
    
    return (
        <div>
            <div>
                Search
                <input type="text" onChange={(e) => setSearchFilter(e.target.value)} />
                <button 
                    onClick={() => 
                        executeSearch({ 
                            variables: { filter: searchFilter }
                        })
                    }
                >
                    OK
                </button>
            </div>
            {data &&
                data.feed.links.map((link, index) => {
                    return <Link key={link.id} link={link} index={index} />
                })
            }
        </div>

    )
}

export default Search;