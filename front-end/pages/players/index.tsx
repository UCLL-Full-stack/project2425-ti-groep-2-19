import PlayerOverviewTable from "@/components/players/playerOverviewTable";
import Header from "@/components/header";
import Header2 from "@/components/header2";
import PlayerService from "@/services/PlayerService";
import { Player, User } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import withAuth from '@/components/withAuth';

const Players: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<String | null>(null);
    const [userRole, setUserRole] = useState<String | null>(null);
    const router = useRouter();
    const { teamId } = router.query;
    useEffect(() => {
        return setUserRole(localStorage.getItem("userRole"));
    }, []);

    const getPlayers = async () => {
        try {
            const data = await PlayerService.getAllPlayers();
            if (teamId) {
                setPlayers(data.filter((player: { team: { id: number; }; }) => player.team.id === Number(teamId)));
            } else {
                setPlayers(data);
            }
        } catch (error) {
            console.error('Failed to fetch players:', error);
        }
    };

    useEffect(() => {
        getPlayers();
    }, [teamId]);

    return (
        <>
            <Head>
                <title>Players</title>
            </Head>
            <Header />
            <Header2 />
            <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h1 className="text-4xl font-bold mb-8">Players</h1>
                <section className="w-full max-w-4xl">
                    <PlayerOverviewTable
                        players={players}
                        setPlayers={setPlayers}
                    />
                </section>

            </main>
        </>
    );
};

export default withAuth(Players);