import { transformationTypes } from '@/constants'
import { IImage } from '@/lib/database/models/image.model'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// Card.tsx
const Card = ({ image }: { image: IImage }) => {
    return (
        <Link
            href={`/transformations/${image._id}`}
            className="block w-full cursor-pointer rounded-2xl border-2 border-purple-200/15 bg-white p-0.5 shadow-xl shadow-purple-200/10 transition-all hover:shadow-purple-200/20 mb-4"
        >
            <CldImage 
                src={image.publicId}
                alt={image.title}
                width={image.width}
                height={image.height}
                {...image.config}
                loading='lazy'
                className="w-full rounded-2xl object-cover"
                sizes='(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw'
            />

            <div className='flex items-center justify-between mt-3'>
                <p className='font-semibold mr-3 line-clamp-1 text-dark-600'>
                    {image.title}
                </p>
                <Image
                    src={`/assets/icons/${transformationTypes[
                        image.transformationType as TransformationTypeKey
                    ].icon}`}
                    alt={image.title}
                    width={24}
                    height={24}
                />
            </div>
        </Link>
    )
}

export default Card