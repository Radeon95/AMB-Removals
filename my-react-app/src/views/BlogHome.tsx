import { Link } from "react-router-dom";
import "../style/Blog.css";

const blogPosts = [
  { slug: "moving-tips-2025", title: "Top Moving Tips for 2025" },
  {
    slug: "how-to-pack-fragile-items",
    title: "How to Pack Fragile Items Safely",
  },
  {
    slug: "office-relocation-checklist",
    title: "Your Office Relocation Checklist",
  },
];

const BlogHome = () => {
  return (
    <div className="blog-main">
      <a
        href="https://wa.me/447853451275"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-button whatsapp-float sticky no-text"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      <a
        href="https://t.me/YourTelegramUsername"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-button telegram-float sticky no-text"
      >
        <i className="fa-brands fa-telegram"></i>
      </a>

      <div className="blog-container">
        <h1>MBA Removals Blog</h1>
        <ul>
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogHome;
