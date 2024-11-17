"use client";

import { IImage } from "@/lib/database/models/image.model";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Card from "./Card";
import { Pagination, PaginationContent, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
import Search from "./Search";


const Collection = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
}: {
  images: IImage[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
}) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    // PAGINATION HANDLER

    const onPageChange = (action: string) => {
        const pageValue = action === 'next' ? Number(page) + 1 : Number(page) - 1;

        const newUrl = formUrlQuery({
            searchParams: searchParams.toString(),
            key: "page",
            value: pageValue,
        });

        router.push(newUrl, { scroll: false })
    }


    return (
        <>
            <div className="collection-heading">
                <h2 className="h2-bold text-dark-600">Recent Edits</h2>
                {hasSearch && <Search />}
            </div>

           {images.length > 0 ? (
            <div className="columns-2 md:columns-3">
                {images.map((image) => (
                    <div key={image._id.toString()} className="mb-4 break-inside-avoid">
                        <Card image={image} />
                    </div>
                ))}
            </div>
           ) : (
            <div className="collection-empty">
                <p className="p-20-semibold">Empty List!</p>
            </div>
           )}

           {/* {totalPages > 1 && (
            <Pagination className="mt-10">
                <PaginationContent className="flex w-full">
                    <Button
                        disabled={Number(page) <= 1}
                        className="collection-btn"
                        onClick={() => onPageChange("prev")}
                    >
                        <PaginationPrevious className="hover:bg-transparent hover:text-white" />
                    </Button>

                    <p className="flex-center p-16-medium w-fit flex-1">
                        {page} / {totalPages}
                    </p>

                    <Button
                        className="button w-32 bg-purple-gradient bg-cover text-white"
                        onClick={() => onPageChange("next")}
                        disabled={Number(page) >= totalPages}
                    >
                        <PaginationNext className="hover:bg-transparent hover:text-white" />
                    </Button>
                </PaginationContent>
            </Pagination>
           )} */}
        </>
    );
};


export default Collection;