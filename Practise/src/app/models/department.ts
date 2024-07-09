export interface Department
{
    id: number;
    name: string;
    subDepartment: SubDepartment; 
    subDepartmentId: number;
    message:string
}
export interface SubDepartment {
    id: number;
    name: string;
  }