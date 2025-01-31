'use client'

import DropDown, { DropDownItemType } from '@/components/Dropdown';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

function SortByDropDown() {
    const router = useRouter();
    const searchParam = useSearchParams();

    const handleSortBy = (sort_order: string, sort_by: string) => {
        // Create a new URLSearchParams object from the current query parameters
        const params = new URLSearchParams(searchParam.toString());
        
        // Append or update the sort_by and sort_order parameters
        params.set('sort_by', sort_by);
        params.set('sort_order', sort_order);

        // Push the updated query string to the router
        router.push(`${window.location.pathname}?${params.toString()}`);
    };


    // Define the dropdown data for sorting options
    const droDownData: DropDownItemType[] = [
        { label: 'A - Z', onClick: () => handleSortBy('asc', 'name')},
        { label: 'Z - A', onClick: () => handleSortBy('desc', 'name') },
        { label: 'Date', onClick: () => handleSortBy('desc', 'created_at')},
        { label: 'Large Size', onClick: () => handleSortBy('asc', 'size')},
        { label: 'Small Size', onClick: () => handleSortBy('desc', 'size')},
    ];
    
  return (
    <>
        <DropDown
            buttonLabel='Sort by'
            dropdownItems={droDownData}
        />
    </>
  )
}

export default SortByDropDown