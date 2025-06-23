export interface CompanyModel {
    id: number;
    name: string;
    unlocked: boolean,
    collaborationTurns: number,
    expectedRevenue: number,
    status?: string, 
    manager: number,
    senior: number,
    consultant: number
    
}


