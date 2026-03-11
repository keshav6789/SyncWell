function AnimatedBackground() {
  return (
    <div style={styles.bg}>
      <div style={styles.circle1}></div>
      <div style={styles.circle2}></div>
      <div style={styles.circle3}></div>
    </div>
  );
}

const styles = {
  bg: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    overflow: "hidden",
    background: "linear-gradient(120deg,#f4f7f2,#f9f6e8,#eef3f9)",
  },

  circle1: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "rgba(134,121,61,0.15)",
    top: "10%",
    left: "10%",
    filter: "blur(80px)",
    animation: "float1 12s ease-in-out infinite",
  },

  circle2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(120,200,150,0.18)",
    bottom: "10%",
    right: "10%",
    filter: "blur(80px)",
    animation: "float2 14s ease-in-out infinite",
  },

  circle3: {
    position: "absolute",
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    background: "rgba(140,180,255,0.18)",
    top: "40%",
    right: "30%",
    filter: "blur(70px)",
    animation: "float3 16s ease-in-out infinite",
  }
};

export default AnimatedBackground;