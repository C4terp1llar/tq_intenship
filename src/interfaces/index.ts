export interface WorkerArray {
    age: number;
    hireDate: string;
    name: string;
    remoteWork: boolean;
    salary: number;
    technology: string;
}
export interface NotificationStore{
    isVisible: boolean,
    message: string,
    type: '' | 'error' | 'success'
}
export interface WorkersStore{
    data: Record<string, WorkerArray>;
}
export interface TypeOfSort{
    value: string,
    title: string
}