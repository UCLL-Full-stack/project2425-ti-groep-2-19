import React from 'react';

const HomeOverview: React.FC = () => {
    const users = [
        { name: 'LeBron James', password: 'password123', role: 'player' },
        { name: 'Frank Vogel', password: 'password123', role: 'coach' },
        { name: 'admin', password: 'password456', role: 'admin' },
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Overview</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Password</th>
                        <th className="py-3 px-6 text-center">Role</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {users.map((user, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{user.name}</td>
                            <td className="py-3 px-6 text-left">{user.password}</td>
                            <td className="py-3 px-6 text-center">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HomeOverview;