function BlogCard({ title, description, author, username }) {
    return (
        <div className="blog-card">
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="blog-footer">
                <small>{author} (@{username})</small>
            </div>
        </div>
    );
}

export default BlogCard;
