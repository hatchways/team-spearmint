export interface RequestApiData{
    _id: string;
    ownerId: string;
    sitterId: string;
    start: Date;
    end: Date;
    animalType: string;
    usefulInfo: string;
    status: string;
    paid: Boolean;
    ownerName: string;
    ownerPhoto?: string;
}
