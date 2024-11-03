const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAllCompetitions = async () => {
    try {
        const response = await fetch(`${API_URL}/competitions`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching competitions:', error);
        throw error;
    }
};

const getCompetitionById = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}/competitions/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching competition:', error);
        throw error;
    }
};

export default {
    getAllCompetitions,
    getCompetitionById,
};