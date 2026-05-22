"use client";

import React, { forwardRef } from "react";
import Image, { ImageProps } from "next/image";
import {
  cloudinaryLoader,
  getBlurDataURL,
  isCloudinaryUrl,
} from "@/lib/cloudinary-helpers";

type CloudinaryImageProps = Omit<ImageProps, "placeholder" | "blurDataURL"> & {
  enableBlur?: boolean;
};

const CloudinaryImage = forwardRef<HTMLImageElement, CloudinaryImageProps>(
  ({ src, enableBlur = true, ...props }, ref) => {
    const srcString = typeof src === "string" ? src : "";
    const isCloudinary = typeof src === "string" && isCloudinaryUrl(src);

    const blurProps: Partial<ImageProps> =
      isCloudinary && enableBlur
        ? {
            placeholder: "blur" as const,
            blurDataURL: getBlurDataURL(srcString),
          }
        : {};

    const loaderProp = isCloudinary ? { loader: cloudinaryLoader } : {};

    return (
      <Image
        ref={ref}
        src={src}
        {...loaderProp}
        {...blurProps}
        {...props}
      />
    );
  }
);

CloudinaryImage.displayName = "CloudinaryImage";

export default CloudinaryImage;
