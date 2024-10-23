'use server';

import { GET_TASK_STATUS } from '@/constants/ApiUrls';
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';

// Interface for the upload
interface getTaskStatusProps {
  task_id: string;
}

//interface for data for task
interface progressDataInterface{
    state:string,
    status:string,
    result:string,
}

//
export const getTaskStatus = async ({ task_id }: getTaskStatusProps) => {
    try {
        // Get the cookies from the incoming request
        // const cookieHeader = cookies().toString();
        //make the api route by appending task id
        const apiUrl = `${GET_TASK_STATUS}/${task_id}`;

        //call the task api from backend
        const eventResponse = new EventSource(apiUrl,{
            withCredentials: true,
        });
        
       return new Promise((resolve, reject)=>{
            //contains all messages streamed from backend
            const progressData: progressDataInterface[] = [];

            eventResponse.onmessage = (event)=>{

                console.log("event from backend")

                const taskInfo = JSON.parse(event.data)
                progressData.push(taskInfo)

                // You can access and process taskInfo.progress and taskInfo.status here
                console.log(`Task Progress: ${taskInfo.progress}% - ${taskInfo.status}`);
                
                // Optionally, stop the event source if the task is done (SUCCESS/FAILURE)
                if (taskInfo.state === 'SUCCESS' || taskInfo.state === 'FAILURE') {
                    eventResponse.close();
                    resolve(progressData);
                }
            }
            eventResponse.onerror = (error) => {
                console.error('Error receiving task updates:', error);
                reject(error);
                eventResponse.close();
            };
       })
       
    } catch (e) {
        // You can handle different types of errors or just use the error message
        console.error("An error occurred while fetching the workspaces:", e);
        return { error: "Failed to fetch workspaces" };
    }
};
