export class CreateUserDto {
    name: string;
    contact: string;
    email: string;
    password: string;
    role: string;
    isActive: boolean;
    isDeleted: boolean;
    createdDate: Date;
    updatedDate: Date;
    createdBy: string;
}
