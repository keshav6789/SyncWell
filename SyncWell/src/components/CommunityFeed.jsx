import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  orderBy
} from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

function CommunityFeed() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "community_posts"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const postList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setPosts(postList);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();

    if (!message.trim() || !name.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "community_posts"), {
        userId: auth.currentUser?.uid || "demoUser",
        name,
        message,
        likes: 0,
        createdAt: new Date().toISOString()
      });

      setMessage("");
      fetchPosts();
    } catch (error) {
      console.error("Error posting message:", error);
      alert("Failed to post");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (post) => {
    try {
      const ref = doc(db, "community_posts", post.id);

      await updateDoc(ref, {
        likes: (post.likes || 0) + 1
      });

      fetchPosts();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <section
      style={{
        maxWidth: "900px",
        margin: "60px auto",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >
      <h2 style={{ textAlign: "center", fontSize: "32px" }}>
        Community
      </h2>

      <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "25px" }}>
        Share your progress and motivate others 💪
      </p>

      <form
        onSubmit={handlePost}
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
          marginBottom: "30px"
        }}
      >
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <textarea
          placeholder="Share something with the community..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="3"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            resize: "none"
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>

      <div style={{ display: "grid", gap: "15px" }}>
        {posts.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            No posts yet. Be the first to share!
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              style={{
                background: "#ffffff",
                padding: "18px",
                borderRadius: "15px",
                boxShadow: "0 6px 16px rgba(0,0,0,0.06)"
              }}
            >
              <h4 style={{ margin: "0 0 6px 0" }}>{post.name}</h4>

              <p style={{ margin: "0 0 10px 0", color: "#374151" }}>
                {post.message}
              </p>

              <button
                onClick={() => handleLike(post)}
                style={{
                  background: "#f3f4f6",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                ❤️ {post.likes || 0}
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default CommunityFeed;