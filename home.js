gsap.registerPlugin(MotionPathPlugin);

const animation = gsap.to(".icon", {
  duration: 5,
  motionPath: {
    path: "#heart",
    align: "#heart",
    autoRotate: true,
    alignOrigin: [0.5, 0.5],
  },
  paused: true,
});

document.getElementById("startAnimation").addEventListener("click", () => {
  animation.restart();
});

// Ceci permet de mettre la boite sur le path dès le chargement de la page
animation.progress(0);

function redirectToPage() {
  window.location.href = "index.html";
}
