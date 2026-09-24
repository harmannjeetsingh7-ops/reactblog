import { Post } from "@/app/types/post";

export default async function BlogDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // Get the blog ID from the URL
    const { id } = await params;

    // Fetch the blog post
    const res = await fetch(`https://api.vercel.app/blog/${id}`);

    // Convert the response to a Post object
    const post: Post = await res.json();

    return (
        <main>
            <h1>Blog Detail</h1>
            <h2>{post.title}</h2>
            <article>{post.content}</article>
        </main>
    );
}