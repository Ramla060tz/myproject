import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './FishermanList.css';

const FishermanList = () => {
    const [fishermen, setFishermen] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchFishermen = () => {
        axios.get('http://localhost:8080/api/v1/fishers')
            .then(response => {
                setFishermen(response.data);
            })
            .catch(error => {
                console.error('Error fetching fisherman data:', error);
                setError(error);
            });
    };

    useEffect(() => {
        fetchFishermen();
    }, []);

    const handleUpdateFisherman = (id) => {
        navigate(`/Main/fisherman_update/${id}`);
    };

    const handleDeleteFisherman = (id) => {
        axios.delete(`http://localhost:8080/api/v1/fishers/${id}`)
            .then(() => {
                setFishermen(fishermen.filter(fisherman => fisherman.id !== id));
            })
            .catch(error => {
                console.error('Error deleting fisherman:', error);
            });
    };

    return (
        <div className="fisherman-table-container">
            <Navbar />
            <h2>Fisherman List</h2>
            {error && <div className="error-message">Error fetching fisherman data: {error.message}</div>}
            <button className="add-fisherman" onClick={() => navigate('/Main/fisherman_add')}>Add</button>
            <table id="fishermanTable" className="fisherman-table">
                <thead>
                    <tr>
                        <th className="small-col">ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {fishermen.map(fisherman => (
                        <tr key={fisherman.id}>
                            <td>{fisherman.id}</td>
                            <td>{fisherman.name}</td>
                            <td>{fisherman.age}</td>
                            <td>{fisherman.gender}</td>
                            <td>{fisherman.address}</td>
                            <td>
                                <button onClick={() => handleUpdateFisherman(fisherman.id)}>Update</button>
                                <button onClick={() => handleDeleteFisherman(fisherman.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FishermanList;
