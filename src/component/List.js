import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    listItem: {
        color: '#303030'
    }
}));


export default function SimpleList() {
    const classes = useStyles();
    const [data, setData] = useState({hits: []});

    useEffect(
        async () => {
        const result = await axios(
            'http://hn.algolia.com/api/v1/search?query=redux',
        );

        setData(result.data);
    }, []);

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="Main mailbox folders">
                {
                    data.hits.map(item => (
                        <li key={item.objectID}>
                            <a href={item.url}>{item.title}</a>
                        </li>
                    ))}

                <ListItem button>
                    <ListItemText className={classes.listItem}>
                        text
                    </ListItemText>
                </ListItem>
            </List>
        </div>
    );
}