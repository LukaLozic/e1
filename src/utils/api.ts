// src/utils/api.ts
import { Model } from '@/types/model'; // adjust path if needed

const API_URL = 'https://chaturbate.com/api/public/affiliates/onlinerooms/?wm=RCJNu&client_ip=request_ip&format=json';

export async function fetchModels(): Promise<Model[]> {
  try {
    const res = await fetch('https://chaturbate.com/api/public/affiliates/onlinerooms/?wm=RCJNu&client_ip=request_ip&format=json');

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (!data.results) {
      throw new Error('Invalid response format: "results" field is missing.');
    }

    return data.results as Model[];
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
}