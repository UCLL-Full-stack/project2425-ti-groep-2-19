import CoachOverviewTable from "../../components/coaches/coachOverviewTable";
import Header from "@/components/header";
import Header2 from "@/components/header2";
import { Coach } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CoachService from "@/services/CoachServive";
import withAuth from '@/components/withAuth';

const Coaches: React.FC = () => {
    const [coaches, setCoaches] = useState<Coach[]>([]);
    const router = useRouter();
    const { teamId } = router.query;

    const getCoaches = async () => {
        try {
            const data = await CoachService.getAllCoaches();
            if (teamId) {
                setCoaches(data.filter((coach: Coach) => coach.team.id === Number(teamId)));
            } else {
                setCoaches(data);
            }
        } catch (error) {
            console.error('Failed to fetch coaches:', error);
        }
    };

    useEffect(() => {
        getCoaches();
    }, [teamId]);

    return (
        <>
            <Head>
                <title>Coaches</title>
            </Head>
            <Header />
            <Header2 />
            <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h1 className="text-4xl font-bold mb-8">Coaches</h1>
                <section className="w-full max-w-4xl">
                    <CoachOverviewTable
                        coaches={coaches}
                        setCoaches={setCoaches}
                    />
                </section>
            </main>
        </>
    );
};

export default withAuth(Coaches);