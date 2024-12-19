import CompetitionOverviewTable from "@/components/competitions/competitionOverviewTable";
import Header from "@/components/header";
import TeamOverviewTable from "@/components/teams/teamOverviewTable";
import CompetitionService from "@/services/CompetitionService";
import { Competition } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import withAuth from '@/components/withAuth';
import {jwtDecode, JwtPayload} from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
    role: string;
}

const Competitions: React.FC = () => {
    const [userRole, setUserRole] = useState<string | null>(null);
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
    const router = useRouter();

    const getCompetitions = async () => {
        try {
            const data = await CompetitionService.getAllCompetitions();
            setCompetitions(data);
        } catch (error) {
            console.error('Failed to fetch competitions:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decodedToken = jwtDecode<CustomJwtPayload>(token);
            setUserRole(decodedToken.role);
        }
        getCompetitions();
    }, []);

    const handleAddCompetition = () => {
        router.push('/competitions/addCompetition');
    };

    return (
        <>
            <Head>
                <title>Competitions</title>
            </Head>
            <Header />
            <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h1 className="text-4xl font-bold mb-8">Competitions</h1>
                <section className="w-full max-w-4xl">
                    <CompetitionOverviewTable
                        competitions={competitions}
                        setCompetitions={setCompetitions}
                        selectCompetition={setSelectedCompetition}
                        userRole={userRole}
                    />
                </section>
                {selectedCompetition && (
                    <section className="w-full max-w-4xl mt-8">
                        <h2 className="text-2xl font-bold mb-4">Teams in {selectedCompetition.name}</h2>
                        <TeamOverviewTable competition={selectedCompetition} />
                    </section>
                )}
                {userRole === "admin" && (<button
                    onClick={handleAddCompetition}
                    className="mt-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Competition
                </button>)}
            </main>
        </>
    );
};

export default withAuth(Competitions);