import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';


export default function ImageField({ image, setImage }) {
    const imageUrl = useRef('');

    const myWidget = window.cloudinary?.createUploadWidget({
        cloudName: 'ayacomputer',
        uploadPreset: 'cook_helper',
        multiple: false,
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info);
            imageUrl.current = result.info.imageUrl;
        }
    }
    )
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(event.target.value);
        console.log("data-------", ...recipeFields, stepsFields, ingredientsFields);

        try {
            const { data } = await CreateRecipe({
                variables: {
                    input: {
                        ...recipeFields[0],
                        image: imageUrl.current,
                        totalTime: Number(recipeFields[0].totalTime),
                        serves: Number(recipeFields[0].serves),
                        steps: stepsFields.map((s) => s.step),
                        ingredients: ingredientsFields
                    }
                }
            });

            setRecipeFields([{ image: '', name: '', serves: '' }]);
            setIngredientsFields([{ name: '', qty: '' },]);
            setStepsFields([{ step: '' },]);
        } catch (err) {
            console.error(err);
        }
    }


    const openCloudinaryWidget = () => {
        myWidget.open();
    }




    return (

        <Button onClick={openCloudinaryWidget}>Upload Image</Button>

    )
};
