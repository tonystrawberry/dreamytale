import type { MDXComponents } from "mdx/types";
import Image from "next/image";

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => <h1 className="text-6xl font-bold mb-4 tracking-tighter">{children}</h1>,
    h2: ({ children }) => <h2 className="text-4xl font-bold my-4 tracking-tighter">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold my-4 tracking-tighter">{children}</h3>,
    em: ({ children }) => <p className="text-xl mb-2">{children}</p>,
    img: ({ src, alt }) => <div className="relative w-full h-80 mb-4 rounded-sm overflow-hidden">
                              <Image alt={alt as string} src={src as string} fill className="object-cover" />
                            </div>,
    p: ({ children }) => <p className="mb-2">{children}</p>,
    ul: ({ children }) => <ul className="list-inside my-4 ml-4">{children}</ul>,
    li: ({ children }) => <li className="mb-2 border-l-4 border-black pl-2">{children}</li>,
    ...components,
  };
}
