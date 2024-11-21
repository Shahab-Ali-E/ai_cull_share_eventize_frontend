export interface getTaskUpdateInterface{
    state:string,
    status?:string,
    result:{
        status?:string,
        task_ids?:string[],
        progress?:{}
    }
}