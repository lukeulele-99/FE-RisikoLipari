export interface CompanyDTO {
    id: number;
    id_region: number
    name: string;
    status: 'disponibile' | 'in collaborazione' | 'non disponibile';
}