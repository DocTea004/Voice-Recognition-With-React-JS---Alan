import { Card, CardActions,CardActionArea, CardContent, CardMedia,Button,Typography } from '@material-ui/core';
import React from 'react';
import useStyles from "./styles.js";
import classNames from 'classnames';


const NewCard = ({article:{description,publishedAt,source,title,url,urlToImage}, i}) => {

    const classes= useStyles();

    return (
        <Card ref={elRefs[i]} className={ activeArticle === i ? classes.activeCard : classes.card}>
            <CardActionArea href={url} target="_blank">
                <CardMedia  
                    className={classes.media}
                    image={urlToImage || ''}
                />

                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">
                        {(new Date(publishedAt)).toDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="h2">
                        {title}
                    </Typography>
                </div>

                <Typography gutterBottom variant= "h5" className={classes.title}>
                    {source.name}
                </Typography>

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p"></Typography>
                </CardContent>
            </CardActionArea>

            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary">
                    Learn More
                </Button>
                <Typography variant="h5" color="textSecondary">
                    {i+1}
                </Typography>
            </CardActions>
        </Card>
    )
}

export default NewCard
