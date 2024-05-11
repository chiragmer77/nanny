export interface UserModel {
    activityRate: number;
    avatar: string;
    birthday: string;
    companyID: number;
    countryID: string;
    countryName: string;
    endDate: string;
    firstName: string;
    holidays: number;
    hoursWeek: number;
    id: number;
    isActive: boolean;
    isAdmin: boolean;
    isManager: boolean;
    lang: string;
    lastName: string;
    teamID: number;
    teamName: string;
    password: string;
    role: string
    startDate: string;
    userName: string;
}

export interface UserBoxModel {
    fullName: string;
    userName: string;
    avatar: string;
    role: string;
    status?: string;
}