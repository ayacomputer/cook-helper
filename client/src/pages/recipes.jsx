import * as React from 'react';
import { useQuery } from '@apollo/client';
import { GET_RECIPES } from '../utils/queries';


export default function Recipes() {

    const [getRecipes, { error }] = useQuery(GET_RECIPES);


    return (
        <>
        </>
    )

}