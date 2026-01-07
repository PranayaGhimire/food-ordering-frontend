'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { login } from '@/redux/auth/authSlice';
import { useGetProfile } from '@/utils/apis/userApi';
import { RootState } from '@/redux/store';

export default function AuthInitializer() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state:RootState) => state.authReducer.isAuthenticated);

  useEffect(() => {

    
  }, [dispatch]);

  return null;
}
