'use server';

import { getTaskStatusProps, progressDataInterface } from '@/@types/smart-culling';
import { GET_TASK_STATUS } from '@/constants/ApiUrls';
import { fetchEventSource } from '@microsoft/fetch-event-source';

class RetriableError extends Error {}
class FatalError extends Error {}

export const getTaskStatus = async ({ task_id }: getTaskStatusProps) => {
  if (typeof window !== 'undefined') {  // Ensures this is only run in the client-side
    try {
      
      // Define the API URL
      const apiUrl = `${GET_TASK_STATUS}/${task_id}`;

      // Call the backend to get task status in real-time via SSE
      await fetchEventSource(apiUrl, {
        method: 'GET',
        credentials: 'include',
        onopen(response) {
          return new Promise<void>((resolve, reject) => {
            if (response.ok && response.headers.get('content-type') === 'text/event-stream') {
              console.log("Connection opened, waiting for updates...");
              resolve();
            } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
              // Client-side errors are usually non-retriable
              reject(new FatalError('Client Error'));
            } else {
              reject(new RetriableError('Server Error'));
            }
          });
        },
        onmessage(msg) {
          try {
            const taskInfo: progressDataInterface = JSON.parse(msg.data);

            // Log the task status or progress in the console
            console.log(`Task Status: ${taskInfo.status}`);
            if (taskInfo.progress) {
              console.log(`Progress: ${taskInfo.progress}%`);
            }

            // Handle different task states
            if (taskInfo.state === 'SUCCESS') {
              console.log("Task completed successfully!");
            } else if (taskInfo.state === 'FAILURE') {
              console.log("Task failed.");
            }
          } catch (error) {
            console.error('Error parsing task data:', error);
          }
        },
        onclose() {
          console.log("Connection closed.");
        },
        onerror(err) {
          if (err instanceof FatalError) {
            console.error('Fatal error:', err);
          } else {
            console.error('Error receiving updates:', err);
          }
        },
      });
    } catch (e) {
      console.error("An error occurred while fetching the task status:", e);
      return { error: "Failed to fetch task status" };
    }
  } else {
    console.error('Attempted to use EventSource in a server-side context');
    return { error: 'EventSource can only be used in the browser' };
  }
};
