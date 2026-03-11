import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Header from "@/components/commonUI/Header";
import { getBlogPost, getBlogSlugs } from "@/lib/blog";
import { mdxComponents } from "@/components/blog/mdxComponents";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.frontmatter.title} | マグロポートフォリオ`,
    description: post.frontmatter.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const date = new Date(post.frontmatter.publishedAt).toLocaleDateString(
    "ja-JP"
  );

  return (
    <>
      <Header />
      <article className="text-white max-w-4/5 mx-auto mb-8">
        <header className="mb-8">
          <h1 className="text-4xl mb-2">{post.frontmatter.title}</h1>
          <time className="text-sm text-white/60">{date}</time>
        </header>
        <div className="blog-content max-w-none text-white/90 text-base leading-relaxed">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </article>
      <div className="text-center p-5 text-white">
        <p>&copy; 2025 Maguro Alternative. All rights reserved.</p>
      </div>
    </>
  );
}
