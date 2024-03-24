import React, { useEffect, useState } from 'react';
import { api } from '../../../config/api'; // Import the axios instance
import { Button, Card, CardActions, CardContent, Typography, TextField, Container, Grid, createTheme, ThemeProvider } from '@mui/material'; // Import Material-UI components
import Rating from '@mui/material/Rating'
import ReviewsIcon from '@mui/icons-material/Reviews';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const ReviewComponent = ({ shopId, token }) => {
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [error, setError] = useState('');
    const [currentReview, setCurrentReview] = useState(null);
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const [filteredReview,setFilteredReview]=useState([]);
    useEffect(() => {
        // Fetch reviews and average rating for the shop
        const fetchReviews = async () => {
            try {
                const response = await api.get(`/api/reviews`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Include JWT token in headers
                    }
                });
                setReviews(response.data);
                setFilteredReview(response.data.filter(review => review.shopIdd === shopId));
                console.log()
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchReviews();
    }, [shopId, token]);

    const handleNextReview = () => {
        setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % filteredReview.length);
      };
    
      const handlePreviousReview = () => {
        setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + filteredReview.length) % filteredReview.length);
      };
    
    useEffect(() => {
        setCurrentReview(filteredReview[currentReviewIndex]);
      }, [currentReviewIndex]);
    
      useEffect(() => {
        setCurrentReview(filteredReview[currentReviewIndex]);
      }, []);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post(`/api/review`, {
                shopId,
                reviewText,
                rating
            }, {
                headers: {
                    Authorization: `Bearer ${token}` // Include JWT token in headers
                }
            });
            setReviews([...reviews, response.data]);
            setReviewText('');
            setRating(0);
        } catch (error) {
            setError('Error submitting review');
            console.error('Error submitting review:', error);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await api.delete(`/api/delete/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Include JWT token in headers
                }
            });
            setReviews(reviews.filter((review) => review.id !== reviewId));
        } catch (error) {
            setError('Error deleting review');
            console.error('Error deleting review:', error);
        }
    };

    return (
        <>
    <Container className="mx-auto" style={{ display: 'flex', flexDirection: 'column', width: '80vw', height: 'auto', margin: '10vw',padding:"2vw" }}>
   
    <Typography variant="h6"> <ReviewsIcon/>&nbsp;Rating & Reviews</Typography>
    
    <Typography variant="h6">Average Rating: <Rating value={(filteredReview.reduce((accumulator, review) => accumulator + review.rating, 0))/filteredReview.length}/></Typography>
   <br/>
   <br/>
    <form onSubmit={handleSubmitReview}>
        <TextField
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            label="Write your review"
            variant="outlined"
            multiline
            rows={4}
            style={{width:"70vw"}}
        />
        <br/>
        <br/>
        <Rating
            value={rating}
            onChange={(event, newValue) => {
                setRating(newValue);
            }}
        />
        <br/>
        <br/>
        <Button type="submit" variant="contained" color="primary">Submit Review</Button>
        <br/>
        <br/>
    </form>
    {error && <Typography color="error">{error}</Typography>}
    <Typography variant="h6"> Your Reviews</Typography>
    <br/>
    <Grid container spacing={2}>
    {reviews
    .filter(review => review.shopIdd === shopId) // Add filtering based on shopId
    .map((review) => (
        <Grid item key={review.id} xs={12} sm={6} md={4}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="body1">{review.message}</Typography>
                    <Typography variant="body2">Rating:<Rating readOnly value={review.rating}/> </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => handleDeleteReview(review.id)} color="secondary">Delete</Button>
                </CardActions>
            </Card>
        </Grid>
))}
    </Grid>
    
</Container>
<Card className="mx-auto" style={{ maxWidth: '80vw' ,marginBottom:'5vw'}}>
      <CardContent>
      <Typography variant="h6"> Others Rating & Reviews</Typography>
        {currentReview && (
          <div>
            <Typography variant="body1"> <AccountCircleIcon/>&nbsp;{currentReview.customer.fullName}</Typography>
        <Rating name="half-rating" value={currentReview.rating} precision={0.5} readOnly />
            <Typography variant="body1">{currentReview.message}</Typography>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <Button variant="contained" onClick={handlePreviousReview}>
            <ArrowBackIcon />
          </Button>
          <Button  variant="contained"onClick={handleNextReview}>
            <ArrowForwardIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
    </>
    
);
};

export default ReviewComponent;