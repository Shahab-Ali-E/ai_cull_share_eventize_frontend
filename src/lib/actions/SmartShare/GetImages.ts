'use server';

import { SmartShareImagesMetadata } from '@/@types/smart-share';
import { GET_IMAGES_BY_FACE } from '@/constants/ApiUrls';
import { getClerkToken } from '../clerk-token';

// Interface for the upload
interface GetImagesByFaceRecognitionProps {
  eventId: string;
  faceImage: FormData;
}

export const GetImagesByFaceRecognition = async ({
  eventId,
  faceImage,
}: GetImagesByFaceRecognitionProps): Promise<{ data?: SmartShareImagesMetadata[]; error?: string }> => {
  try {
    // getting jwt token from clerk so that we can access backend resorces
        const token = await getClerkToken();

    const apiUrl = `${GET_IMAGES_BY_FACE}/${eventId}`;

    const response = await fetch(apiUrl, {
      cache: 'no-cache',
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: faceImage,
    });

    const jsonResponse = await response.json();

    if (!response.ok) {
      // Ensure the error is a string
      const errorMsg = typeof jsonResponse === 'string' ? jsonResponse : JSON.stringify(jsonResponse);
      return { error: errorMsg };
    }
    if (response.status === 200) {
      return { data: jsonResponse };
    }

    // Fallback in case the response status is not handled
    console.log('Response from backend of get-images:', jsonResponse);
    return { error: 'Unexpected response status' };
  } catch (e) {
    console.error('Error occurred while fetching the images:', e);
    return { error: 'Failed to fetch images' };
  }
};
