
'use client';

import { Post } from "@/app/types/post";
import { useSessionCounter } from "@/app/context/globalContext";
import {BtnLink} from "react-simple-wysiwyg";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PostList({posts}: {posts: Post[]}) {
    // check global context for username
    const { username } = useSessionCounter();
    const router = useRouter();

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this post?")) {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_DOMAIN}/posts/${id}`,
                    {
                        method: "DELETE",
                        credentials: "include"
                    }
                );

                if (response.ok) {
                    router.refresh();
                } else {
                    console.log("Delete failed:", response.status);
                    alert("Failed to delete post");
                }
            } catch (error) {
                console.log("Error:", error);
                alert("Failed to delete post");
            }
        }
    }

    //console.log(posts);
    return (
        <ul>
            {posts.map((post) => (
                <li key={post._id} className="card">
                    <h3>{post.title}</h3>
                    {username == post.author &&
                        <>
                            <Link href={`/blog/${post._id}/edit`} className="button">Edit</Link>
                            <button className="button" onClick={() => handleDelete(post._id)}>Delete</button>
                        </>
                    }
                </li>
            ))}
        </ul>
    )

}
