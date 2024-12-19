import { PrismaClient } from '@prisma/client';
import Team from '../model/team';

const prisma = new PrismaClient();

const getTeamById = async ({ id }: { id: number }): Promise<Team | null> => {
    const teamPrisma = await prisma.team.findUnique({
        where: { id },
    });

    return teamPrisma ? new Team(teamPrisma) : null;
};

export default {
    getTeamById,
};
