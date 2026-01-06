'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { login } from '@/redux/auth/authSlice';

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    // const token = Cookies.get('token');
    const user = Cookies.get('user');

    if (user) {
      dispatch(
        login({
            user:JSON.parse(user)
        }),
      );
    }
  }, [dispatch]);

  return null;
}
