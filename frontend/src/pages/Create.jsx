import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Create = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const CreatePost = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("image", image);

            const response = await axios.post("https://social-media-vibez.onrender.com/api/posts", formData);
            const data = response.data;
            console.log(data);
            alert("Post Created Successfully!");
            navigate('/feed')
        } catch (error) {
            alert(error + " Create Failed!");
        }
    }
    return (
        <div>
            <h1>Create New Post</h1>

            <form onSubmit={CreatePost}>
                <input type="file"
                    required
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <input type="text"
                    placeholder='Title'
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder='Description'
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Post</button>
            </form>

        </div>
    )
}

export default Create