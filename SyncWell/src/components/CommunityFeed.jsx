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
      const q = query(
        collection(db, "community_posts"),
        orderBy("createdAt", "desc")
      );

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
    <section style={styles.container}>
      
      <h2 style={styles.title}>🌿 SyncWell Community</h2>
      <p style={styles.subtitle}>
        Share your progress and inspire others
      </p>

      <form onSubmit={handlePost} style={styles.form}>

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Share something positive today..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="3"
          style={styles.textarea}
        />

        <button type="submit" disabled={loading} style={styles.postButton}>
          {loading ? "Posting..." : "Share Post"}
        </button>

      </form>

      <div style={styles.feed}>
        {posts.length === 0 ? (
          <p style={styles.empty}>
            No posts yet. Be the first to inspire the community 💚
          </p>
        ) : (
          posts.map((post) => (
            <div key={post.id} style={styles.card}>

              <div style={styles.header}>
                <div style={styles.avatar}>
                  {post.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h4 style={styles.name}>{post.name}</h4>
                  <span style={styles.time}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p style={styles.message}>{post.message}</p>

              <button
                onClick={() => handleLike(post)}
                style={styles.likeButton}
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

const styles = {

container:{
maxWidth:"900px",
margin:"60px auto",
padding:"20px",
fontFamily:"Arial"
},

title:{
textAlign:"center",
fontSize:"36px",
marginBottom:"5px",
color:"#2f2f2f"
},

subtitle:{
textAlign:"center",
color:"#6b7280",
marginBottom:"35px"
},

form:{
background:"rgba(255,255,255,0.75)",
backdropFilter:"blur(10px)",
padding:"25px",
borderRadius:"16px",
boxShadow:"0 12px 30px rgba(0,0,0,0.08)",
marginBottom:"35px"
},

input:{
width:"100%",
padding:"12px",
marginBottom:"12px",
borderRadius:"10px",
border:"1px solid #e5e7eb",
fontSize:"14px",
color:"#374151",
backgroundColor:"rgba(255,255,255,0.85)",
outline:"none"
},

textarea:{
width:"100%",
padding:"12px",
borderRadius:"10px",
border:"1px solid #e5e7eb",
marginBottom:"15px",
resize:"none",
color:"#374151",
backgroundColor:"rgba(255,255,255,0.85)",
outline:"none"
},

postButton:{
background:"linear-gradient(135deg,#86793d,#b5a864)",
color:"white",
border:"none",
padding:"10px 20px",
borderRadius:"10px",
cursor:"pointer",
fontWeight:"600",
boxShadow:"0 4px 12px rgba(0,0,0,0.15)"
},

feed:{
display:"grid",
gap:"18px"
},

card:{
background:"rgba(255,255,255,0.8)",
backdropFilter:"blur(8px)",
padding:"18px",
borderRadius:"16px",
boxShadow:"0 10px 25px rgba(0,0,0,0.08)",
transition:"0.3s"
},

header:{
display:"flex",
alignItems:"center",
gap:"12px",
marginBottom:"10px"
},

avatar:{
width:"40px",
height:"40px",
borderRadius:"50%",
background:"linear-gradient(135deg,#86793d,#b5a864)",
display:"flex",
alignItems:"center",
justifyContent:"center",
color:"white",
fontWeight:"bold"
},

name:{
margin:"0",
fontSize:"15px"
},

time:{
fontSize:"12px",
color:"#9ca3af"
},

message:{
margin:"8px 0 12px 0",
color:"#374151"
},

likeButton:{
background:"#f3f4f6",
border:"none",
padding:"6px 14px",
borderRadius:"10px",
cursor:"pointer",
fontWeight:"500"
},

empty:{
textAlign:"center",
color:"#6b7280"
}

};

export default CommunityFeed;