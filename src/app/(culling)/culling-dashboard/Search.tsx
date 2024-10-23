'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { useDebounce } from 'use-debounce'
import { RiSearch2Line } from 'react-icons/ri'

const Search = ({ search }: { search?: string }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialRender = useRef(true)

  const [text, setText] = useState(search || '')
  const [query] = useDebounce(text, 500)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }
    //checking for exsisting params
    const params = new URLSearchParams(searchParams.toString())

    if (!query) {
        // If search query is empty, remove the 'search' param
        params.delete('search');
      
        // If there are still other params, keep them in the URL
        const queryString = params.toString();
        router.push(queryString ? `${window.location.pathname}?${queryString}` : `${window.location.pathname}`);

    } else {
        params.set('search',query)
        router.push(`${window.location.pathname}?${params.toString()}`);
    }
  }, [query,router,searchParams])

  return (
    <div>
        <Input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="search in culling"
            icon={<RiSearch2Line size={15} />}
            className="bg-gray-200 dark:bg-primary-foreground text-primary xl:w-[23rem] lg:w-80 md:w-72 text-base py-6"
        />
    </div>
  )
}

export default Search