import Link from "next/link";
import { useRouter } from "next/router";

const Header2: React.FC = () => {
    const router = useRouter();
    const { teamId } = router.query;
    return (
        <header className="bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-center items-center">
                <nav className="flex space-x-4">
                    <Link href={`/players?teamId=${teamId}`} className="text-lg hover:text-orange-500">
                        Players
                    </Link>
                    <Link href={`/coaches?teamId=${teamId}`} className="text-lg hover:text-orange-500">
                        Coaches
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header2;