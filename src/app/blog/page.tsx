import { getBlogs } from "@/lib/api";
import BlogIndexClient from "./BlogIndexClient";

export default async function BlogPage() {
  const posts = await getBlogs();
  return <BlogIndexClient initialPosts={posts} />;
}
