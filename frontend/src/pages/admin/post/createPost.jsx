import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import ImageTool from '@editorjs/image';
import { usePostBlogMutation } from '../../../redux/features/blogs/blogsAPI';
import { useNavigate } from 'react-router-dom';


const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(1);

    const { user } = useSelector((state) => state.auth);
    const editorRef = useRef(null);
    const [postBlog, { isLoading }] = usePostBlogMutation();
    const navigate = useNavigate();

    useEffect(() => {
        const editor = new EditorJS({
            holder: 'editorjs',
            autofocus: true,
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: true,
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                },
                quote: {
                    class: Quote,
                    inlineToolbar: true,
                },
                image: {
                    class: ImageTool,
                    config: {
                        endpoints: {
                            byFile: 'http://localhost:4000/api/images/upload'
                        },
                    }
                }
            },
            onReady: () => {
                editorRef.current = editor;
            },
        });

        return () => {
            editor.destroy();
            editorRef.current = null;
        };
    }, []);

    const submitHandler = async (evt) => {
        evt.preventDefault();
        try {
            const content = await editorRef.current.save();
            const post = {
                title,
                image: imageUrl,
                content,
                description,
                category,
                author: user?._id,
                rating,
            };
            await postBlog(post).unwrap();
            alert('Post made successfully');
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.log('Error occurred while submitting content:', error);
        }
    };

    const image_upload_handler = async (evt) => {
        const file = evt.target.files[0]
        if (file) {
            const form_data = new FormData()
            form_data.append('image', file)
            try {
                const response = await fetch('http://localhost:4000/api/images/upload', {
                    method: 'POST',
                    body: form_data,
                });
                const res = await response.json()
                setImageUrl(res.file.url)
                setImage(file)
            } catch (error) {
                console.error("Error uploading file for cover image", error)
            }
        }
    }

    return (
        <div className="bg-white p-2">
            <h2 className="text-2xl">Create a new blog post</h2>
            <form className="pt-4" onSubmit={submitHandler}>
                <div className="mt-1 space-y-2">
                    <label className="text-xl">Title: </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(evt) => setTitle(evt.target.value)}
                        placeholder="Example: P.Diddy Party Gone Wrong"
                        className="w-full inline-block focus:outline-none border py-2 px-4"
                    />
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-5 mt-5">
                    <div className="md:w-1/3 w-full p-5 border">
                        <h1 className="text-2xl mb-2">Blog Format</h1>
                        <div className="mt-1 space-y-2">
                            <label className="text-sm font-medium">Cover Image: </label>
                            {imageUrl ?
                                <div className="relative">
                                    <img src={imageUrl} className="w-full object-cover" />
                                    <button type="button"
                                        onClick={() => {
                                            setImageUrl('');
                                            setImage(null);
                                        }}
                                        className="bg-theme p-2 w-full mt-2 text-white">
                                        Remove Cover Image
                                    </button>
                                </div>
                                :
                                <input type="file" accept="image/*" onChange={image_upload_handler} className="w-full inline-block focus:outline-none border py-2 px-4" />
                            }
                        </div>

                        <div className="mt-1 space-y-2">
                            <label className="text-sm font-medium">Category: </label>
                            <input
                                type="text"
                                value={category}
                                onChange={(evt) => setCategory(evt.target.value)}
                                placeholder="Example: Food/Entertainment"
                                className="w-full inline-block focus:outline-none border py-2 px-4"
                            />
                        </div>

                        <div className="mt-1 space-y-2">
                            <label className="text-sm font-medium">Description: </label>
                            <textarea
                                value={description}
                                onChange={(evt) => setDescription(evt.target.value)}
                                placeholder="Example: Description of the post"
                                className="w-full inline-block focus:outline-none border py-2 px-4 resize-none"
                                rows={5}
                                cols={5}
                            />
                        </div>

                        <div className="mt-1 space-y-2">
                            <label className="text-sm font-medium">Rating: </label>
                            <input
                                type="number"
                                value={rating}
                                onChange={(evt) => setRating(evt.target.value)}
                                className="w-full inline-block focus:outline-none border py-2 px-4 remove-arrow"
                            />
                        </div>

                        <div className="mt-1 space-y-2">
                            <label className="text-sm font-medium">Author: </label>
                            <input
                                type="text"
                                value={user?.username}
                                className="w-full inline-block focus:outline-none border py-2 px-4"
                                disabled
                            />
                        </div>

                        <button
                            className="px-3 py-2 mt-5 bg-theme hover:bg-white text-white hover:text-black transition ease-in-out w-full"
                            disabled={isLoading}
                        >
                            Submit
                        </button>
                    </div>
                    <div className="md:w-2/3 w-full">
                        <h1 className="text-2xl mb-5">Blog Content:</h1>
                        <p className="mb-2">Write your post below here</p>
                        <div id="editorjs" className="border p-2"></div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
