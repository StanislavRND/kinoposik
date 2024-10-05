/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@/types/User';
import { NextRequest } from 'next/server';

declare module 'next/server' {
  interface NextRequest {
    user?: User; 
  }
}