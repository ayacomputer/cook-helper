import React from 'react';
import { Button } from '@mui/material';


export default function ImageField({ image, setImage }) {

    const myWidget = window.cloudinary?.createUploadWidget({
        cloudName: 'ayacomputer',
        uploadPreset: 'cook_helper',
        multiple: false,
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info);

        }
    }
    )


    const openCloudinaryWidget = () => {
        myWidget.open();
    }

    return (

        <Button onClick={openCloudinaryWidget}>Upload Image</Button>

    )
};
