export interface RequestApiData{
    _id: string;
    ownerId: string;
    ownerName: string;
    sitterId: string;
    sitterName: string;
    location: string;
    start: Date;
    end: Date;
    animalType: string;
    usefulInfo: string;
    accepted: Boolean;
    declined: Boolean;
    paid: Boolean;
    ownerPhoto?: string;
}
