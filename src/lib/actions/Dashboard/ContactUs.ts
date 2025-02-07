'use server';

import { CONTACT_US } from "@/constants/ApiUrls";
import { ContactUsFormType } from "@/schemas/ContactUs";

export const contactUs = async ({ contactUsData }: { contactUsData: ContactUsFormType }) => {
    // Create a plain object for the JSON payload
    const payload = {
        first_name: contactUsData.firstName,
        last_name: contactUsData.lastName,
        email: contactUsData.email,
        phone: contactUsData.phone || null, // Include phone only if it exists
        description: contactUsData.description,
    };

    console.log(payload)

    try {
        const response = await fetch(CONTACT_US, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the correct content type
            },
            body: JSON.stringify(payload), // Convert the payload to JSON
        });

        const jsonResponse = await response.json();

        if (response.ok) {
            return { success: jsonResponse }; // Return success response
        } else {
            // Handle server-side errors
            return {
                error: jsonResponse.message || 'Failed to submit the form',
            };
        }
    } catch (e) {
        console.error("Network error please try again later", e);
        return { error: "Network error please try again later" };
    }
};