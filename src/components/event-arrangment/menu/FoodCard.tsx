import { detailMenuCardType, FoodCardType } from '@/@types/Types'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import React from 'react'

function FoodCard({ data }: { data: detailMenuCardType }) {

  const renderCategory = (categoryName: string, items:FoodCardType[]) => (
    <div className='mb-14 sm:mt-6'>
      <Label className="text-3xl font-bold">{categoryName}</Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-5">
        {items.map((item, index) => (
          <Card className="text-start rounded-3xl" key={index}>
            <CardContent className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 space-x-0 sm:space-x-8 px-5 sm:px-8 py-3 sm:py-5">
              {/* Image */}
              {
                item.src?(
                <div >
                  <Image
                    src={item.src}
                    alt={item.heading || 'food'}
                    height={150}
                    width={150}
                    className="object-cover rounded-2xl h-full w-full sm:h-44 sm:w-44"
                    unoptimized 
                  />
                </div>
                )
                :null
              }

              {/* Text */}
              <div className="flex flex-col text-primary space-y-1 sm:space-y-2">
                <Label className="text-xl font-semibold">{item.heading}</Label>
                <Label className="text-base">{item.description}</Label>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  return (
    <div className="p-8">
      {data.mainCourses && renderCategory('Main Course', data.mainCourses)}
      {data.Desserts && renderCategory('Desserts', data.Desserts)}
      {data.Beverages && data.Beverages.length > 0 && renderCategory('Beverages', data.Beverages)}
      {data.PricePerHead && data.PricePerHead.length > 0 && renderCategory('Price Per Head', data.PricePerHead)}
    </div>
  )
}

export default FoodCard
