export interface VisitorData{
    user_id: string ,
    first_name: string,
    last_name: string,
    email:string,
    accessed_at:string 
}

export interface UserEventAccess {
    event_id: string;
    event_name: string;
    created_at: string;
    views: VisitorData[];
}

export interface AnalyticsResponse {
    smart_share_events: number;
    culling_workspaces: number;
    booked_events: number;
    user_event_access: UserEventAccess[];
    total_smart_culling_storage:number,
    total_smart_culling_storage_used:string,
    total_smart_share_storage:number,
    total_smart_share_storage_used:string,
}
