import React, { useState } from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";

function DrawerComponent() {

    return (
        <>
            <Drawer>
                <List>
                    <ListItem>
                        <ListItemText>
                            <Link to="/">Dashboard</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Link to="/about">Cooking</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Link to="/contact">Create Recipe</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem >
                        <ListItemText>
                            <Link to="/about">Logout</Link>
                        </ListItemText>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};

export default DrawerComponent;