class Team {
    static from(
        teamPrisma: {
            players: ({
                user: { id: number; name: string; password: string; email: string; role: string };
            } & { number: number; id: number; userId: number; teamId: number })[];
            coaches: ({
                user: { id: number; name: string; password: string; email: string; role: string };
            } & { id: number; userId: number; teamId: number })[];
        } & { id: number; name: string; competitionId: number }
    ): Team | PromiseLike<Team | null> | null {
        throw new Error('Method not implemented.');
    }
    private id: number | undefined;
    private name: string;
    private points: number;

    constructor(teamData: { id?: number; name: string }) {
        this.id = teamData.id;
        this.name = teamData.name;
        this.points = 0; // Points start at 0
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getPoints(): number {
        return this.points;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setPoints(points: number): void {
        this.points = points;
    }

    public equals(team: Team): boolean {
        return (
            this.id === team.getId() &&
            this.name === team.getName() &&
            this.points === team.getPoints()
        );
    }
}

export default Team;
