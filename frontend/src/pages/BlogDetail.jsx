import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

function BlogDetail() {
    const params = useParams();
    const [blog, setBlog] = useState({});

    const requestFetchBlog = useCallback(async () => {
        const response = await fetch(`/api/blogs/${params?.id}`);
        const json = await response.json();
        setBlog(json.content);
    }, [params?.id]);

    useEffect(() => {
        requestFetchBlog();
    }, [requestFetchBlog]);

    return (
        <div>
            <h1>BlogDetail입니다.</h1>
            <div>
                <img src={blog.thumbnailImgBase64String} alt="" style={{maxWidth: "100%"}}/>
                <div>
                    <h1>{blog.subject}</h1>
                    <p>{blog.blogBody}</p>
                </div>
            </div>

        </div>
    )
};

export default BlogDetail;