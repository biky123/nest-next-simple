"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { notification } from 'antd';
import Router from 'next/router';

interface Profile {
    username: string;
    email: string;
  }

  const Profile: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
      const token = localStorage.getItem('token');
      console.log('token', token);
          if (!token) {
            Router.push('/login');
            return;
          }
      
      const fetchProfile = async () => {
        try {
          
          const response = await axios.get('http://localhost:3000/auth/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong Authorization header
          },
        });
          // console.log('response 1111', response)
          setProfile(response.data);
        } catch (error) {
          notification.error({ message: 'Can not fetch profile'
          });
          Router.push('/login'); // Điều hướng lại nếu có lỗi
        }
      };
      fetchProfile();
}, []);

    if (!profile) {
        return <p>Loading...</p>;
      }

      return (
        <div>
          <h1>Profile</h1>
          <p>Username: {profile.username}</p>
          <p>Email: {profile.email}</p>
        </div>
      );
  }

  export default Profile;