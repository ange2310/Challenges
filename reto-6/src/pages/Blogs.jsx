import BlogCard from "../components/BlogCard";
import Sidebar from "../components/Sidebar";
import "../styles/Blogs.css";

function Blogs() {
  const blogs = [
    {
      title: "Creative Confidence",
      description: "Explorando cómo la creatividad mejora la confianza.",
      author: "Angelica Marcillo",
      username: "ange",
    },
    {
      title: "Financial Freedom",
      description: "Pasos para lograr independencia financiera.",
      author: "Angelica Marcillo",
      username: "ange",
    },
    {
      title: "Business Strategy",
      description: "Estrategias para crecer un negocio con éxito.",
      author: "Angelica Marcillo",
      username: "ange",
    },
  ];

  return (
    <div className="blogs-container">
      <Sidebar/>
      {blogs.map((blog, index) => (
        <BlogCard key={index} {...blog} />
      ))}
    </div>
  );
}

export default Blogs;
