import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        marginBottom:20

    },
    list:{
    },
    listItem: {
        color: '#303030'
    }
}));


export default function SimpleList() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

            async function fetchData() {
                setLoading(true);
                const result = await axios(
                    'https://jsonplaceholder.typicode.com/users'
                );
                setData(result.data);
                setLoading(false);

            }

            fetchData();
        }

        , []);

    return (
        <div className={classes.root}>
            <List
                className={classes.list}
                component="nav"

            >
                {
                    !loading ?
                    data.map(item => (
                        <ListItem button
                                  key={item.id}>
                            <ListItemText className={classes.listItem}>
                                {item.name}
                            </ListItemText>
                        </ListItem>
                    ))
                        :
                        <CircularProgress
                            thickness={10}
                        />
                }
            </List>
        </div>
    );
}