import { useParams, Link } from "react-router-dom";
import "../style/Blog.css";

const blogContent: Record<string, { title: string; content: string }> = {
  "moving-tips-2025": {
    title: "Top Moving Tips for 2025",
    content:
      "Plan early, label boxes, and hire professionals like AMB Removals for a stress-free move.",
  },
  "how-to-pack-fragile-items": {
    title: "How to Pack Fragile Items Safely",
    content:
      "Use bubble wrap, pack tightly, and clearly mark boxes as 'Fragile'.",
  },
  "office-relocation-checklist": {
    title: "Your Office Relocation Checklist",
    content:
      "Notify employees, plan logistics, and coordinate with your moving service.",
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogContent[slug || ""];

  if (!post) return <p>Blog post not found.</p>;

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

      <div className="blog-post">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <Link to="/blog">← Back to Blog</Link>
      </div>
    </div>
  );
};

export default BlogPost;
