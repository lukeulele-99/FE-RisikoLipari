export interface CompanyModel {
    id: number;
    name: string;
    unlocked: boolean,
    collaborationTurns: number,
    expectedRevenue: number,
    status?: string, 
    Manager: number,
    Senior: number,
    Consultant: number
    
}


