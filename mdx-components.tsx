import type { MDXComponents } from "mdx/types";
import Image from "next/image";

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => <h1 className="text-center text-4xl font-bold mb-12">{children}</h1>,
    em: ({ children }) => <p className="text-xl mb-2">{children}</p>,
    img: ({ src, alt }) => <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                              <Image src={src} fill className="object-cover" />
                            </div>,
    p: ({ children }) => <p className="text-xl mb-2">{children}</p>,
    ...components,
  };
}
