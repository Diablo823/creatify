import DeleteConformation from '@/components/shared/DeleteConformation';
import Header from '@/components/shared/Header';
import TransformedImage from '@/components/shared/TransformedImage';
import { Button } from '@/components/ui/button';
import { getImageById } from '@/lib/actions/image.actions';
import { getImageSize } from '@/lib/utils';
import { auth } from '@clerk/nextjs'

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const ImageDetails = async ({ params: { id } }: SearchParamProps) => {

  const { userId } = auth();

  const image = await getImageById(id);

  return (
    <>
      <Header title={image.title} />
      
      <p className='text-lg font-bold text-dark-400 mt-5'>{`Created by ${image.author.firstName}`}</p>

      <section className="mt-5 flex flex-wrap gap-4">
        <div className='p-14-medium md:p-16-medium flex gap-2'>
          <p className='text-dark-600'>Transformation</p>
          <p className='text-purple-400 capitalize'>
            {image.transformationType}
          </p>
        </div>

        {image.prompt && (
          <>
            <p className='hidden text-dark-400 md:block'>&#x25CF;</p>
            <div className='p-14-medium md:p-16-medium flex gap-2'>
              <p className="text-dark-600">Prompt:</p>
              <p className='capitalize text-purple-400"'>{image.prompt}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
          <p className='hidden text-dark-400 md:block'>&#x25CF;</p>
          <div className='p-14-medium md:p-16-medium flex gap-2'>
            <p className="text-dark-600">Color:</p>
            <p className='capitalize text-purple-400"'>{image.color}</p>
          </div>
        </>
        )}

        {image.aspectRatio && (
          <>
          <p className='hidden text-dark-400 md:block'>&#x25CF;</p>
          <div className='p-14-medium md:p-16-medium flex gap-2'>
            <p className="text-dark-600">Aspect Ratio:</p>
            <p className='capitalize text-purple-400"'>{image.aspectRatio}</p>
          </div>
        </>
        )}
      </section>

      <section className='mt-10 border-t border-dark-400/15'>
        <div className='transformation-grid'>
          {/* MEDIA UPLOADER */}
          <div className="flex flex-col gap-4">
            <h3 className="h3-bold text-dark-600">Original</h3>
            <Image 
              src={image.secureURL}
              alt='original Image'
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "width")}
            />
          </div>

          {/* TRANSFORMED IMAGE */}
          <TransformedImage 
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}          
          />
        </div>

        {userId === image.author.clerkId && (
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <Button asChild type='button' className='submit-button capitalize'>
              <Link href={`/transformations/${image._id}/update`}>
                Update Image
              </Link>
            </Button>

            <DeleteConformation imageId={image._id} />
          </div>
        )}
      </section>
    </>
  )
}

export default ImageDetails;