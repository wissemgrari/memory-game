import { useEffect, useState } from 'react';
import { FaCrown, FaTrophy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';

import axios from 'axios';

const API_URL = 'https://memorygame-server.up.railway.app';

function Stats() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getUsers = async () => {
    const res = await axios.get(`${API_URL}/api/`);
    if (res.status === 200) {
      const { data } = res;
      setUsers(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const formatDate = (date) => {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();
    const fulldate = `${day}/${month}/${year}`;
    return fulldate;
  };

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='stats'>
      <div className='header'>
        <div></div>
        <div className='title'>
          <FaCrown size='40px' />
          <h2>Leaderboard</h2>
        </div>
        <button onClick={() => navigate('/play')}>Go Back</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Ranks</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {users
            .sort((a, b) => a.score - b.score)
            .map((user, index) => (
              <tr key={user._id}>
                <td>{index === 0 ? <FaTrophy /> : index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.score}</td>
                <td>{formatDate(user.createdAt)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stats;
