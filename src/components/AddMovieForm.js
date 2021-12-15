import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EditMovieForm = (props) => {
    const { push } = useHistory();
    const { id } = useParams();
    const { setMovies } = props;
	const initialMovie = {
        title: '',
        director: '',
        genre: '',
        metascore: '',
        description: '',
    };

    const [movie, setMovie] = useState(initialMovie);
	
	const { title, director, genre, metascore, description } = movie;

    const handleChange = ev => {
        ev.persist();
        let value = ev.target.value;

        setMovie ({
            ...movie,
            [ev.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        
        axios.post(`http://localhost:9000/api/movies/`, movie)
            .then(resp => {
                setMovies(resp.data);
                push('/movies');
            })
            .catch(err => {
                console.error(err);
            })
    };

    return (
	<div>
        <div className="modal-content">
			<form onSubmit={handleSubmit}>
				<div className="modal-header">						
					<h4 className="modal-title">Add New Movie <strong>{movie.title}</strong></h4>
				</div>
				<div className="modal-body">					
					<div className="form-group">
						<label>Title</label>
						<input value={title} onChange={handleChange} name="title" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Director</label>
						<input value={director} onChange={handleChange} name="director" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Genre</label>
						<input value={genre} onChange={handleChange} name="genre" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Metascore</label>
						<input value={metascore} onChange={handleChange} name="metascore" type="number" className="form-control"/>
					</div>		
					<div className="form-group">
						<label>Description</label>
						<textarea value={description} onChange={handleChange} name="description" className="form-control"></textarea>
					</div>
                    <div className="modal-footer">			    
					<input onClick={handleSubmit} type="submit" className="btn btn-info" value="Save"/>
					<Link to={`/movies/1`}><input type="button" className="btn btn-default" value="Cancel"/></Link>
				</div>		
				</div>
			</form>
		</div>
    </div>
    )
}

export default EditMovieForm;