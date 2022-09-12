import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setName } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (firstName && lastName) {
      const name = { firstName, lastName };
      dispatch(setName(name));
      navigate('/play');
    }
  };

  return (
    <div className='dashboard'>
      <h2>Welcome to the memory game</h2>
      <img src='/img/brain.png' alt='brain' width='100px' height='90px' />
      <div className='wrapper'>
        <p>Please fill in the following boxes to get started.</p>
        <form autoComplete='off' onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='First Name'
              name='firstName'
              id='firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Last Name'
              name='lastName'
              id='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <button className='btn'>START</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
