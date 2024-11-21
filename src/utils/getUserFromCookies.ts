'use server';

// utils/getUserFromCookies.ts
import { cookies } from 'next/headers';

interface User {
  name: string;
  email: string;
  profileImageUrl: string;
  fallBack: string;
}

export async function getUserFromCookies(): Promise<User> {
  const cookieStore = cookies();

  // Getting user details from cookies
  const name: string | undefined = cookieStore.get('name')?.value;
  const email: string | undefined = cookieStore.get('email')?.value;
  const pictureURL: string | undefined = cookieStore.get("picture")?.value;

  // Handling if the values are not found
  const cleanedName: string = name?.replace(/^"|"$/g, '') ?? '';
  const cleanedEmail: string = email?.replace(/^"|"$/g, '') ?? '';
  const profileImageUrl: string = pictureURL?.replace(/^"|"$/g, '') ?? '';

  // Fallback initials (in case there's no name or only one letter)
  const fallBack: string = cleanedName.split(" ").map(namePart => namePart[0] || '').join('').toUpperCase() || 'G';

  return {
    name: cleanedName,
    email: cleanedEmail,
    profileImageUrl,
    fallBack
  };
}
