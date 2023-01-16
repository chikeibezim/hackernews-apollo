import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client'
import { useNavigate } from 'react-router-dom';

const CreateLink = () => {
    const navigate = useNavigate();

    const [ formState, setFormState ] = useState({
        description: "",
        url: ""

    });

    const CREATE_LINK_MUTATION = gql`
        mutation PostMutation(
            $description: String!
            $url: String!
        ) {
            post (description: $description, url: $url) {
                id
                createdAt
                url
                description
            }
        }
    `

    //here, we destrcuture out a function that can be used to call the mutauon
    const [createLink] = useMutation(CREATE_LINK_MUTATION, {
        variables: {
            description: formState.description,
            url: formState.url
        },
        onCompleted: () => navigate('/')
    });

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                createLink();
            }}>
                <div className='flex flex-column mt3'>
                    <input 
                        className='mb2' 
                        value={formState.description}
                        onChange={(e) => setFormState({ ...formState, description: e.target.value})}
                        type="text"
                        placeholder='A desciption for the link'
                    />

                    <input 
                        className='mb2' 
                        value={formState.url}
                        onChange={(e) => setFormState({ ...formState, url: e.target.value})}
                        type="text"
                        placeholder='A url for the link'
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateLink;