import { Form } from '@/components/ui/form';
import { DestinationDetailSchema } from '@/schemas/BookEvent';
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import StepDescription from "@/components/bookevent/StepDescription";


function Destination() {
    const router = useRouter();

    // define the form
    const DestinationForm = useForm<z.infer<typeof DestinationDetailSchema>>({
        resolver:zodResolver(DestinationDetailSchema),
        defaultValues:{
            selectCountry:'',
            preferredDestination:'',
            alternativePreferredDestination:'',
        }
    });

    // onSubmut the form
    const onSubmit = (data:z.infer<typeof DestinationDetailSchema>)=>{
        console.log("Form submitted with data of step 2", data);
        router.push('/book-event/step3')
    }

  return (
    <Form {...DestinationForm}>
        <form
            className="flex flex-col w-full space-y-14"
            onSubmit={DestinationForm.handleSubmit(onSubmit)}
        >
            {/* Description */}
            <StepDescription
                heading="Destination Information"
                description="Please provide your ."
            />   
        </form>
    </Form>
  )
}

export default Destination