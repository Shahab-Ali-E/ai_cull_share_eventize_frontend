import { StaticImageData } from "next/image";

export interface ImagePreviewType{
    url:StaticImageData
}

/* 
    this is a base type which is using in eventarrangement data, 
    culling data  
*/
export interface BaseDataType {
    id: string;
    src: StaticImageData;
    heading?: string;
    description: string;
}


export interface eventArrangmentSliderImagesType extends  BaseDataType{
    href:string;
}
  
// Type for menu card data
export interface MenuCardDataType extends BaseDataType {
    href: string;
}

// food card component type
export interface FoodCardType extends Omit<BaseDataType,"src">{src?:StaticImageData}

// type for details of each menu which contains different dishes
export interface detailMenuCardType {
    mainCourses:BaseDataType[],
    Desserts?:BaseDataType[],
    Beverages?:BaseDataType[],
    PricePerHead?:FoodCardType[];
}  
  
// Type for how it works data
export type HowItWorksDataType = BaseDataType

// Type for corporate event data 
export interface CorporateEventDataType extends Omit<BaseDataType, "description"> {
    description: string[];
}

// corporat event card
export interface CorporateEventCardProps extends Omit<BaseDataType,"id" | "description"> {
    description:  string[];
}

// birthday event data type
export interface BirthdayEventDataType extends Omit<BaseDataType, "src" | "description">{
    src?:StaticImageData;
    description?:string;
    bullets?:string[];
    price?:string;
}

// birthday price card type
export interface BirthdayEventPriceType extends Omit<BaseDataType, "src">{
    bullets:string[];
    price:string;
}

// birthday event card type
export interface BirthdayEventCardProps extends Omit<BaseDataType, "src" | "description" | "id">{
    src?:StaticImageData;
    description?:string;
    bullets?:string[];
    price?:string;
}

/* 
    this is type for data for culling steps which was used in
    /culling-home page which elaborate how to perform culling

*/
export interface cullingStepsDataProps{
    title:string;
    steps:string[];
    gif:StaticImageData;
}


/*
    This is the type for get task updates, which is used 
    to get real time updates of culling task like closed eye task,
    separate blur image task and duplicate image separation task 
    from backend
*/

export interface getTaskUpdateInterface{
    state:string,
    status?:string,
    result:{
        status?:string,
        task_ids?:string[],
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        progress?:{}
    }
}


// top section props this top section was rendering after navbar of each module index pages
export interface TopSectionProps {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonHref: string;
    rightSideComp?: React.ReactNode; // Optional prop for right side comp where you can place any thing
    className?: string; // Allow custom styles
    revelPlaceHolderColor?:string;
    gradientColorLeft?:string;
    gradientColorRight?:string;
}

export interface RevelingHeadingProps {
    heading: string;
    description?: string;
    placeholderColor?: string;
    className?: string;
    headingClassName?: string;
    descriptionClassName?: string;
}