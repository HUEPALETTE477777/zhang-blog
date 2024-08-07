import React from 'react';
import { format_date } from "../../utils/dateFormat";
import EditorJSHTML from "editorjs-html";

const editorJSHTML = EditorJSHTML();

const SingleBlogCard = ({ blog }) => {
    const { title = '', description = '', content = '', author = {}, image = '', category = '', rating = '', createdAt = '' } = blog || {};
    const html_content = editorJSHTML.parse(content).join('');

    return (
        <>
            <div className="bg-white p-8">
                <div>
                    <h1 className="text-3xl md:5xl font-medium md:font-bold">{title}</h1>
                    <p className="mt-4 mb-4">By: <span className="text-theme">{author.username || 'Unknown'} [{author.role}]</span></p>
                    <p className="mt-4 mb-4">Category: <span className="text-theme font-medium">{category}</span></p>
                    <p className="mt-4 mb-4">Rating: <span className="text-theme">{rating} / 5</span></p>
                    <p className="mt-4 mb-4">Published: {format_date(createdAt)}</p>
                </div>
                <div>
                    <img src={image} className="mt-2 w-full md:h-[420px]" alt="Blog Post"/>
                </div>
                <div>
                    <p className="mt-4">Description: {description}</p>
                </div>
                <div className="mt-4 content-container">
                    <div dangerouslySetInnerHTML={{ __html: html_content }} className="blog-content"/>
                </div>
            </div>
        </>
    );
};

export default SingleBlogCard;
