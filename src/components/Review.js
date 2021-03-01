import React from 'react'
import {Rating} from '@material-ui/lab'
import {Typography, Box} from '@material-ui/core' 

const Review = ({content}) => {
    const {author, date, text, rating} = content
    return (
        <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="caption" gutterBottom>{author}</Typography>
            <Rating name="reviewRating" value={rating} readOnly/>
            <Typography variant="caption" paragraph>{date}</Typography>
            <Typography variant="caption" paragraph>{text}</Typography>
        </Box>
    )
}

export default Review
