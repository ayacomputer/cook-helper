import * as React from 'react';

import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, GET_RECIPES_BY_IDS } from '../utils/queries';
import { REMOVE_RECIPE } from '../utils/mutations';
import { Button, Box, Grid, Card, CardActionArea, CardMedia, CardContent, Container, Typography } from '@mui/material';
import NavBar from '../layouts/NavBar';

// seeding manually atm
// const selectedRecipeIds = ['627ae5aa64bc7fd03ba7ee2c', '627ae5aa64bc7fd03ba7ee33', '627ae5aa64bc7fd03ba7ee38']
// const recipes = [{
//     "name": "Mashed Potato",
//     "image": "https://images.media-allrecipes.com/userphotos/9420958.jpg",
//     "ingredients": [
//         {
//             "name": "Potato",
//             "qty": "4"
//         },
//         {
//             "name": "Salt",
//             "qty": "handful"
//         },
//         {
//             "name": "Butter",
//             "qty": "A lot!"
//         },
//         {
//             "name": "Pepper",
//             "qty": "To taste"
//         }
//     ],
//     "steps": [
//         "Cut potato in the same size and put them into a pot.",
//         "Fill water to cover the potato,",
//         "Cook potato until you can poke with a skewer easily.",
//         "Drain the water and put the pan back to the stove for 1 to 2 minutes to dry.",
//         "Mash the potato and add butter and pepper."
//     ],
//     "totalTime": 40,
//     "serves": 4
// },
// {
//     "name": "Fusilli with Spinach and Anchovies",
//     "image": "https://www.saltandlavender.com/wp-content/uploads/2020/05/spinach-goat-cheese-pasta-1.jpg",
//     "ingredients": [
//         {
//             "name": "Garlic",
//             "qty": "5 cloves"
//         },
//         {
//             "name": "Olive oil",
//             "qty": "4 tbsp"
//         },
//         {
//             "name": "Anchovies",
//             "qty": "10 fillets"
//         },
//         {
//             "name": "Frozen spinach",
//             "qty": "250g"
//         },
//         {
//             "name": "Fusilli Pasta",
//             "qty": "500g"
//         }
//     ],
//     "steps": [
//         "Take out a packet of frozen spinach from the freezer and defrost at room temperature.",
//         "Put water in a big pot and bring it to boil, then add a handful of salt in the pot, put pasta for 11 mins from as the packet tells you.",
//         "Meanwhile, put a glug of olive oil into a cold pan, then crush the garlic cloves onto it.",
//         "Turn the stove on, start at very very low heat.",
//         "Then add defrost spinach, and then cook it for a while.",
//         "Add anchovies and its oil and stir, right before adding pasta to it.",
//         "Take out pasta from the pot, drain, then add it to the pan. ( add a bit of pasta water if it is dry. )"
//     ],
//     "totalTime": 30,
//     "serves": 4
// },
// {
//     "name": "Apple",
//     "image": "https://homecookbasics.com/wp-content/uploads/2020/12/How-to-Cut-an-Apple.jpg.webp",
//     "ingredients": [
//         {
//             "name": "apple",
//             "qty": "1"
//         }
//     ],
//     "steps": [
//         "Wash apple",
//         "Peel apple",
//         "Cut apple"
//     ],
//     "totalTime": 50,
//     "serves": 4
// },]

const Cooking = () => {
    const meData = useQuery(QUERY_ME);

    const [removeRecipeId] = useMutation(REMOVE_RECIPE);
    const userData = meData.data?.me || {};
    const selectedRecipeIds = userData.selectedRecipeIds || [];

    console.log("-----selectedRecipesIds : ", selectedRecipeIds)
    console.log("-----userData", userData)

    let results = useQuery(GET_RECIPES_BY_IDS, { variables: { id: selectedRecipeIds } })
    let recipes = results?.data?.getRecipesByIds || [];

    console.log("---------recipes:", recipes)

    const handleRemoveRecipe = async (recipeId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            await removeRecipeId({
                variables: { recipeId },
            });

        } catch (err) {
            console.error(err);
        }
    };

    // const errors = meData.error || recipes.error;
    // const loading = meData.loading || recipes.loading;

    // if (loading) {
    //     return <h2>LOADING...</h2>;
    // }
    const fontFamily = [
        'Nunito',
        'Comforter',
        'Roboto'
    ].join(',');

    const styles = {
        mainContainer: {
            background: "rgb(32, 33, 36)",
            height: "100%"
        },
        cardContainer: {
            maxwidth: "80%",
            margin: "3rem auto",
            background: "inherit",
        },
        wheat: {
            color: "wheat",
            border: "none",
            fontWeight: "bold",
            fontFamily: fontFamily
        },
        green: {
            color: "rgba(150, 202, 27, 0.911)",
            fontFamily: fontFamily,
            fontWeight: "Bold"
        },
        img: {
            background: "rgb(32, 33, 36)",
            width: "50%",
            height: "100px",
            objectFit: "cover top"
        }
    };

    return (
        <>
            <NavBar />
            <Box component="div" style={styles.mainContainer}>
                <Container fluid="true" className='text-light bg-dark'>
                    <Typography justify="center">
                        Today's Meal
                    </Typography>
                    <h4 style={{ "textAlign": "center" }}>
                        {recipes.length
                            ? `Viewing ${recipes.length} selected ${recipes.length === 1 ? 'recipe' : 'recipes'}:`
                            : 'You have not selected any recipe yet!'}
                    </h4>
                </Container>
                <Grid container style={{ "justifyContent": "center" }}>
                    {recipes.map((recipe, i) => (
                        <Grid item xs={12} sm={6} md={4} xl={3} key={recipe._id} >
                            <Card style={styles.cardContainer} elevation={8} className="cookingRecipe">
                                <CardActionArea border='dark'>
                                    <Typography variant="h5" style={styles.green}>{recipe.name}</Typography>
                                    <Typography variant="h6" style={styles.wheat}>Total Time: {recipe.totalTime} mins</Typography>
                                    <Grid container style={{ "textAlign": "left", "padding": "0.2em" }}>
                                        {recipe.image ? <CardMedia component="img" image={recipe.image} alt={`The photo for ${recipe.name}`} style={styles.img} /> : null}
                                        <Card item xs={12} sm={6} md={6} xl={6} style={{ "textAlign": "left", "padding": "0.2em", "width": "50%" }}>
                                            <Typography variant="h5">Ingredients: </Typography>
                                            {recipe.ingredients.map((ingredient, i) => (
                                                <Typography key={ingredient._id}><b>{ingredient.qty}</b>  {ingredient.name}</Typography>
                                            ))}
                                        </Card>
                                    </Grid>

                                    <CardContent >
                                        {recipe.steps.map((step, i) => (
                                            <Card key={step._id} style={{ "textAlign": "left", "padding": "0.2em" }}><p><b>Step {i + 1}:</b> {step}</p></Card>
                                        ))}
                                        <Button className='btn-block btn-danger' onClick={() => handleRemoveRecipe(recipe._id)}>
                                            Remove this Recipe!
                                        </Button>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>

                    ))}
                </Grid>
            </Box>

        </>)

}

export default Cooking;