import Image, { StaticImageData } from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ImagePreviewType } from "@/@types/Types";
import { Card } from "@/components/ui/card";

export default function ImagesGallery({ images }: { images: ImagePreviewType[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 place-items-center">
      {images.map((image, index) => (
        <Card
          key={index}
          className={`h-60 w-full sm:h-80 sm:w-80 ${
            index === 1
              ? "sm:col-span-2 sm:row-span-2 sm:h-full sm:w-full"
              : ""
          }`}
        >
          <ZoomableImage src={image.url} alt={`${index} image`} />
        </Card>
      ))}
    </div>
  );
}


function ZoomableImage({
  src,
  alt,
}: {
  src: StaticImageData | string;
  alt: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover rounded-lg cursor-pointer"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-5xl overflow-clip text-white bg-transparent p-0 border-0">
        <div className="relative h-[80vh] w-full rounded-md bg-transparent shadow-md">
          <Image
            src={src}
            alt={alt}
            fill
            className="h-full w-full object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
