import { Coach } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAllCoaches = async (): Promise<Coach[]> => {
    try {
        const response = await fetch(`${API_URL}/coaches`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching coaches:', error);
        throw error;
    }
}

const CoachService = {
    getAllCoaches,
};

export default CoachService;