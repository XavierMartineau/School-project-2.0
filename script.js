document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(
    ScrollTrigger,
    Draggable,
    //MotionPath,
    //MotionPathHelper,
    //DrawSVG,
    ScrambleTextPlugin,
    MorphSVGPlugin,
    SplitText
  );

  // Animation du texte "Quiz!" avec scrambleText
  gsap.to(".texte", {
    duration: 1.5,
    scrambleText: "Quiz",
    chars: "lowerCase",
    revealDelay: 0.5,
  });

  const Quiz = [
    "Test", // Français
    "Kuiz", // Japonais
    "Ceyan", // Chinois
    "Kwiz", // Coréen
    "Spraw", // Polonais
    "Prob", // Latin
    "Prash", // Hindi
    "Exet", // Grec
    "Visa", // Finnois
  ];

  const lightColors = [
    "#4FB1B3", // Turquoise profond pâle
    "#F89A8A", // Corail brûlé pâle
    "#C68CFF", // Mauve intense pâle
    "#F7D270", // Jaune moutarde pâle
    "#66BFBF", // Cyan électrique pâle
    "#FF80B3", // Rose fuchsia pâle
    "#3CA892", // Vert émeraude pâle
  ];

  let index = 0;
  const texteElement = document.querySelector(".texte");

  // Fonction pour animer le texte avec des couleurs changeantes
  function animerTexte() {
    const randomColor =
      lightColors[Math.floor(Math.random() * lightColors.length)];
    texteElement.style.color = randomColor;
    gsap.to(".texte", {
      duration: 2,
      scrambleText: Quiz[index],
      ease: "none",
      onComplete: () => {
        index = (index + 1) % Quiz.length;
        setTimeout(animerTexte, 800);
      },
    });
  }
  setTimeout(animerTexte, 800);

  gsap.fromTo(
    "svg",
    {
      y: "0%", // Valeur de départ : flèche commence à 100% de la hauteur du conteneur
    },
    {
      y: "750px", // Valeur d'arrivée : flèche se déplace jusqu'à 0%
      scrollTrigger: {
        trigger: ".container2 ", // Le déclencheur est le SVG à l'intérieur du conteneur
        start: "top top", // L'animation commence lorsque le haut du conteneur atteint le haut de la fenêtre
        end: "bottom top", // L'animation se termine lorsque le bas du conteneur atteint le haut de la fenêtre
        scrub: true, // L'animation suit le défilement
        markers: false, // Affiche les marqueurs pour débogage
      },
    }
  );
});
let tl = gsap.timeline(),
  mySplitText = new SplitText(".intro", { type: "words,chars" });
let chars = mySplitText.chars; //an array of all the divs that wrap each character

gsap.set(".intro", { perspective: 400 });

// Animation avec ScrollTrigger
gsap.from(chars, {
  duration: 0.3,
  opacity: 0,
  scale: 0,
  y: 80,
  rotationX: 180,
  transformOrigin: "0% 50% -50",
  ease: "back",
  stagger: 0.01,
  scrollTrigger: {
    trigger: ".intro", // Déclenche l'animation à l'apparition de l'élément .intro
    start: "top 60% ", // L'animation commence quand l'élément atteint 80% du viewport
    end: "bottom 60%", // L'animation se termine quand le bas de l'élément touche le haut du viewport
    scrub: true, // L'animation suit le défilement
    markers: false, // Affiche les marqueurs pour le débogage
  },
});
// Fonction pour vérifier si toutes les questions ont une case cochée
function checkQuestions() {
  const selectedYear = document.querySelector('input[name="year"]:checked');
  const selectedHTTP = document.querySelector('input[name="HTTP"]:checked');
  const selectedhttps = document.querySelector('input[name="https"]:checked');
  const selectedHTML = document.querySelector('input[name="HTML"]:checked');

  const submitBtn = document.getElementById("submitBtn");

  // Vérifier si toutes les questions ont une case sélectionnée
  if (selectedYear && selectedHTTP && selectedhttps && selectedHTML) {
    submitBtn.disabled = false; // Activation du bouton
    submitBtn.classList.remove("btn-danger"); // Enlever la classe rouge
    submitBtn.classList.add("btn-success"); // Ajouter la classe verte
  } else {
    submitBtn.disabled = true; // Désactivation du bouton
    submitBtn.classList.remove("btn-success"); // Enlever la classe verte
    submitBtn.classList.add("btn-danger"); // Ajouter la classe rouge
  }
}

// Fonction appelée lorsqu'on tente de soumettre les réponses
function submitAnswer() {
  const selectedYear = document.querySelector('input[name="year"]:checked');
  const selectedHTTP = document.querySelector('input[name="HTTP"]:checked');
  const selectedhttps = document.querySelector('input[name="https"]:checked');
  const selectedHTML = document.querySelector('input[name="HTML"]:checked');

  // Logique pour traiter les réponses et afficher le feedback
  const feedback1 = document.getElementById("feedback1");
  const feedback2 = document.getElementById("feedback2");
  const feedback3 = document.getElementById("feedback3");
  const feedback4 = document.getElementById("feedback4");

  // Réinitialisation des messages et des styles des cases
  feedback1.innerHTML = "";
  feedback1.className = "";
  feedback2.innerHTML = "";
  feedback2.className = "";
  feedback3.innerHTML = "";
  feedback3.className = "";
  feedback4.innerHTML = "";
  feedback4.className = "";

  // Réinitialiser les styles des cases
  document.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.disabled = true; // Désactiver les cases après soumission
    input.classList.remove("bg-dark", "text-success", "text-danger"); // Supprimer les classes de style sur les cases
  });

  let score = 0; // Initialisation du score

  // Vérification de la première réponse
  if (selectedYear.value === "1983") {
    feedback1.innerHTML = "+1 point ! Bonne réponse 🎉";
    feedback1.classList.add("text-success", "bg-dark");
    selectedYear.parentElement.classList.add("bg-dark", "text-success"); // Appliquer les classes sur le parent pour la bonne réponse
    score += 1; // Ajouter 1 point si la réponse est correcte
    console.log("+1 point pour la question 1");
  } else {
    feedback1.innerHTML =
      "0 point. Mauvaise réponse ❌ La bonne réponse était : 1983";
    feedback1.classList.add("text-danger", "bg-dark");
    document
      .getElementById("1983")
      .parentElement.classList.add("bg-dark", "text-success");
    selectedYear.parentElement.classList.add("bg-dark", "text-danger");
    console.log("0 point pour la question 1");
  }

  // Vérification de la deuxième réponse
  if (selectedHTTP.value === "C") {
    feedback2.innerHTML = "+1 point ! Bonne réponse 🎉";
    feedback2.classList.add("text-success", "bg-dark");
    selectedHTTP.parentElement.classList.add("bg-dark", "text-success");
    score += 1;
    console.log("+1 point pour la question 2");
  } else {
    feedback2.innerHTML =
      "0 point. Mauvaise réponse ❌<br> La bonne réponse était : Transfert de fichiers entre serveurs/navigateurs web";
    feedback2.classList.add("text-danger", "bg-dark");
    document
      .getElementById("Transfert")
      .parentElement.classList.add("bg-dark", "text-success");
    selectedHTTP.parentElement.classList.add("bg-dark", "text-danger");
    console.log("0 point pour la question 2");
  }

  // Vérification de la troisième réponse
  if (selectedhttps.value === "https") {
    feedback3.innerHTML = "+1 point ! Bonne réponse 🎉";
    feedback3.classList.add("text-success", "bg-dark");
    selectedhttps.parentElement.classList.add("bg-dark", "text-success");
    score += 1;
    console.log("+1 point pour la question 3");
  } else {
    feedback3.innerHTML =
      "0 point. Mauvaise réponse ❌<br> La bonne réponse était : https";
    feedback3.classList.add("text-danger", "bg-dark");
    document
      .getElementById("https")
      .parentElement.classList.add("bg-dark", "text-success");
    selectedhttps.parentElement.classList.add("bg-dark", "text-danger");
    console.log("0 point pour la question 3");
  }

  // Vérification de la quatrième réponse
  if (selectedHTML.value === "HTML5") {
    feedback4.innerHTML = "+1 point ! Bonne réponse 🎉";
    feedback4.classList.add("text-success", "bg-dark");
    selectedHTML.parentElement.classList.add("bg-dark", "text-success");
    score += 1;
    console.log("+1 point pour la question 4");
  } else {
    feedback4.innerHTML =
      "0 point. Mauvaise réponse ❌ <br>La bonne réponse était : HTML5";
    feedback4.classList.add("text-danger", "bg-dark");
    document
      .getElementById("HTML5")
      .parentElement.classList.add("bg-dark", "text-success");
    selectedHTML.parentElement.classList.add("bg-dark", "text-danger");
    console.log("0 point pour la question 4");
  }

  // Calcul du pourcentage
  let percentage = (score / 4) * 100;

  // Affichage du score et du pourcentage dans container6
  document.querySelector(".container6").innerHTML = `
    Vous avez ${score} point${
    score !== 1 ? "s" : ""
  } sur 4 <br>(${percentage.toFixed(2)}%)
  `;
  const winSvg = document.getElementById("win_svg");
  const failSvg = document.getElementById("fail_svg");

  // Condition pour afficher l'un ou l'autre SVG en fonction du pourcentage
  if (percentage >= 51) {
    winSvg.style.opacity = "1";
    failSvg.style.opacity = "0";
  } else {
    winSvg.style.opacity = "0";
    failSvg.style.opacity = "1";
  }
}
// Ajouter un événement sur chaque case de réponse pour vérifier si le bouton peut être activé
document.querySelectorAll('input[type="radio"]').forEach((input) => {
  input.addEventListener("change", checkQuestions); // Vérifie l'état du bouton quand une case est cochée
});

// Ajouter un événement pour le bouton de soumission
document.getElementById("submitBtn").addEventListener("click", function (e) {
  e.preventDefault();
  submitAnswer(); // Appelle la fonction de soumission si toutes les cases sont cochées
});
const container = document.getElementsByClassName("container4");
const image = document.getElementById("favicon");

// Calculer les positions de départ
const startX = container.offsetWidth - 150; // À droite
const startY = container.offsetHeight / 2 - 50; // Centré verticalement

// Positionner l'image à sa position initiale
gsap.set(image, {
  x: startX,
  y: startY,
});

// Initialiser le draggable
Draggable.create(image, {
  type: "x,y",
  bounds: container, // Limite au conteneur avec l'ID container4
  inertia: true, // Inertie pour un effet fluide
  onDrag: function () {
    const rotationFactor = 0.5;
    const rotationAngle = this.deltaX * rotationFactor;

    gsap.to(this.target, {
      rotation: `+=${rotationAngle}`, // Rotation pendant le drag
      duration: 0.0,
      overwrite: true,
    });
  },
  onPress: function () {
    this.target.style.cursor = "grabbing";
  },
  onRelease: function () {
    this.target.style.cursor = "grab";

    // Retourner à la position initiale
    gsap.to(this.target, {
      x: startX,
      y: startY,
      rotation: 0, // Réinitialiser la rotation
      duration: 0.5,
      ease: "power2.out",
    });
  },
});
var morph = gsap.to("#circle", {
  duration: 1,
  morphSVG: "#animal",
  repeat: 1,
  yoyo: true,
  repeatDelay: 0.2,
});

document.getElementById("startAnimation").onclick = function () {
  morph.restart(true);
};
// Sélectionner le bouton par son ID
document.getElementById("submitBtn").addEventListener("click", function (e) {
  // Empêcher l'action par défaut du bouton (si nécessaire, mais pas essentiel ici)
  e.preventDefault();

  // Sélectionner la div .container7
  const container7 = document.querySelector(".container7");

  // Si la div container7 existe, la supprimer
  if (container7) {
    container7.remove(); // Supprimer la div .container7 et son contenu
    console.log("Le container7 a été supprimé!");
  } else {
    console.log("Le container7 n'a pas été trouvé.");
  }
});
