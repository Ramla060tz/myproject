import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './AddFisherman.css';

const AddFisherman = () => {
  const { id } = useParams();
  const [fisherman, setFisherman] = useState({
    name: '',
    age: '',
    gender: '',
    address: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/v1/fishers/${id}`)
        .then(response => {
          setFisherman({
            name: response.data.name || '',
            age: response.data.age || '',
            gender: response.data.gender || '',
            address: response.data.address || ''
          });
        })
        .catch(error => {
          console.error('Error fetching fisherman data:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFisherman({ ...fisherman, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id 
      ? axios.put(`http://localhost:8080/api/v1/fishers/${id}`, fisherman)
      : axios.post('http://localhost:8080/api/v1/fishers', fisherman);

    request
      .then(response => {
        console.log('Fisherman saved successfully:', response.data);
        navigate('/Main/fisherman_list');
      })
      .catch(error => {
        console.error('Error saving fisherman:', error);
      });
  };

  const handleCancel = () => {
    navigate('/Main/fisherman_list');
  };

  return (
    <div className="fisherman-form-container">
      <h2>{id ? 'Update' : 'Add'} Fisherman</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={fisherman.name} onChange={handleChange} required />
        </label>
        <label>
          Age:
          <input type="number" name="age" value={fisherman.age} onChange={handleChange} required />
        </label>
        <label>
          Gender:
          <input type="text" name="gender" value={fisherman.gender} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={fisherman.address} onChange={handleChange} required />
        </label>
        <div className="form-buttons">
          <button type="submit">{id ? 'Save' : 'Add'}</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddFisherman;
