import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

function Blog() {
    const [bloglist, setBloglist] = useState([]);

    const requestFetchBlogs = useCallback(async () => {
        const response = await fetch("/api/blogs");
        const json = await response.json();
        setBloglist(json.content);
    }, []);

    useEffect(()=>{
        requestFetchBlogs();
    }, [requestFetchBlogs]);

    return (
        <div>
            {bloglist.map((list)=>(
                <section className="blogSection">
                    <Link to={`/BlogDetail/${list._id}`}>
                        <div>
                            <img src={list.thumbnailImgBase64String} alt="" style={{maxWidth: "100%"}}/>
                        </div>
                        <div>
                            <h1>{list.subject}</h1>
                            <div className="date">
                                {list.createdAt}
                            </div>
                        </div>
                    </Link>
                </section>
            ))}
        </div>
    );
}

export default Blog;