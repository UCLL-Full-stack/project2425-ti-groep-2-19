import { Coach } from '@/types';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CoachOverviewTableProps {
    coaches: Coach[];
    setCoaches: (coaches: Coach[]) => void;
}

const CoachOverviewTable: React.FC<CoachOverviewTableProps> = ({ coaches, setCoaches }) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Name</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {coaches.map(coach => (
                        <tr key={coach.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left cursor-pointer hover:underline">{coach.user.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default CoachOverviewTable;