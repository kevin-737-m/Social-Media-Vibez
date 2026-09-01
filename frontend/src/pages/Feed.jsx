import { useEffect, useState } from 'react'
import axios from 'axios'

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/posts");
                const data = response.data;
                setPosts(data.posts);
            } catch (error) {
                alert(error + " Fetch Failed!");
            }
        }
        fetchPosts();
    }, []);

    const likePost = async (id) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/posts/${id}/like`);
            const data = response.data;
            setPosts((prev) => prev.map((p) => (p._id === id ? data.post : p)));
        } catch (error) {
            alert(error + " Like Failed!");
        }
    }

    const commentPost = async (id) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/posts/${id}/comment`, {
                comment: comment
            });
            const data = response.data;
            setPosts((prev) => prev.map((p) => (p._id === id ? data.post : p)));
            setComment("");
        } catch (error) {
            alert(error + " Comment Failed!");
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/posts/${id}`);
            setPosts((prev) => prev.filter((p) => p._id !== id));
        } catch (error) {
            console.log(error);
            alert("Only The Creator Can Destroy This Post!");
        }
    }

    return (
        <div>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id}>
                        <img src={post.image} alt="" />
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                        <button
                            onClick={() => likePost(post._id)}>
                            Like
                        </button>
                        <span>
                            {post.likes.length} likes
                        </span>
                        {post.comments.map((comment, index) => (
                            <div key={index}>
                                <p>{comment.text}</p>
                                <p>by {comment.userId?.username || "Anonymous"}</p>
                            </div>
                        ))}
                        <input type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="What you think about this post"
                        />
                        <button
                            onClick={() => commentPost(post._id)}>
                            Comment
                        </button>
                        <button
                            onClick={() => handleDelete(post._id)}>
                            Delete This Post
                        </button>
                    </div>
                ))
            ) : (
                <p>No Posts Found</p>
            )}
        </div>
    )
}

export default Feed