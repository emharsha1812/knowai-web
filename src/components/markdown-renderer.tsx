"use client";

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';
import { cn } from "@/lib/utils";

const VIDEO_EXTS = /\.(mp4|webm|mov|ogg)(\?.*)?$/i;

const VIDEO_CLASSES = "w-full rounded-xl my-4 bg-black";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("prose prose-neutral dark:prose-invert max-w-none prose-headings:font-sans prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80 prose-p:font-heading prose-p:text-[1.05rem] prose-p:leading-[1.8] prose-li:font-heading prose-li:text-[1.05rem] prose-li:leading-[1.8] prose-pre:bg-muted prose-pre:text-muted-foreground prose-code:font-mono prose-blockquote:font-heading prose-blockquote:text-muted-foreground prose-blockquote:border-l-4 prose-blockquote:border-muted prose-img:rounded-xl", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          // ![caption](file.mp4) → <video> instead of broken <img>
          img({ src, alt }) {
            if (src && typeof src === 'string' && VIDEO_EXTS.test(src)) {
              return (
                <video src={src} title={alt} controls playsInline className={VIDEO_CLASSES} />
              );
            }
            // eslint-disable-next-line @next/next/no-img-element
            return <img src={src} alt={alt} />;
          },
          // raw <video> tags — add consistent styling
          video({ src, children, ...props }) {
            return (
              <video src={src} controls playsInline className={VIDEO_CLASSES} {...props}>
                {children}
              </video>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
