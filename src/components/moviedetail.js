import React, { Component } from 'react';
import { fetchMovie } from "../actions/movieActions";
import {connect} from 'react-redux';
import {Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import { Image } from 'react-bootstrap';

import { LinkContainer } from "react-router-bootstrap"

class MovieDetail extends Component{

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null){
            dispatch(fetchMovie(this.props.movie_title));
        }

    }

   render(){
       const DetailInfo = () => {
           if (!this.props.selectedMovie) {
               return <div>Loading....</div>
           }

            return (
                <Card>
                    <Card.Header>Movie Detail</Card.Header>
                    <Card.Body>
                        <Image className="image" src={this.props.selectedMovie.imageUrl} thumbnail />
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem>{this.props.selectedMovie.title}</ListGroupItem>
                        <ListGroupItem>
                            {this.props.selectedMovie.actors.map((actor, i) =>
                                <p key={i}>
                                    <b>{actor.actorName}</b> {actor.characterName}
                                </p>)}
                        </ListGroupItem>
                        <ListGroupItem><h4><BsStarFill/> {this.props.selectedMovie.AverageReviews}</h4></ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {this.props.selectedMovie.MovieReview.map((review, i) =>
                            <p key={i}>
                                <b>{review.username}</b>&nbsp; {review.comment}
                                &nbsp;  <BsStarFill /> {review.rating}
                            </p>
                        )}
                    </Card.Body>
                </Card>
            )
        }
        return (
            <DetailInfo/>
        );
    }
}

const mapStateToProps = state => {
    return {
        movies : state.movie.movies
    }
}

export default connect(mapStateToProps)(MovieDetail);

