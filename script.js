// Script pour le site "Bien gérer son argent"

console.log('Site chargé avec succès ! 🎉');

// ============================================
// SYSTÈME D'ONGLETS
// ============================================

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        
        // Retirer la classe active de tous les boutons et contenus
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Ajouter la classe active au bouton cliqué et au contenu correspondant
        this.classList.add('active');
        document.getElementById(`tab-${targetTab}`).classList.add('active');
        
        // Scroll vers le haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Quiz interactif avec navigation
let currentQuestion = 1;
const totalQuestions = 5;

const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

// Fonction pour afficher une question
function showQuestion(questionNumber) {
    // Cacher toutes les questions
    for (let i = 1; i <= totalQuestions; i++) {
        document.getElementById(`question-${i}`).style.display = 'none';
    }
    
    // Afficher la question actuelle
    document.getElementById(`question-${questionNumber}`).style.display = 'block';
    
    // Gérer les boutons
    if (questionNumber === 1) {
        prevButton.style.display = 'none';
    } else {
        prevButton.style.display = 'block';
    }
    
    if (questionNumber === totalQuestions) {
        nextButton.textContent = 'Voir mes résultats';
    } else {
        nextButton.textContent = 'Suivante →';
    }
}

// Bouton Précédente
prevButton.addEventListener('click', function() {
    if (currentQuestion > 1) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
});

// Bouton Suivante / Voir mes résultats
nextButton.addEventListener('click', function() {
    // Vérifier si une réponse est sélectionnée
    const currentAnswer = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    
    if (!currentAnswer) {
        alert('Attention ! Tu dois sélectionner une réponse avant de continuer.');
        return;
    }
    
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        showQuestion(currentQuestion);
    } else {
        // Calculer et afficher le résultat
        showResults();
    }
});

// Fonction pour calculer et afficher les résultats
function showResults() {
    // Vérifier que toutes les questions sont répondues
    let allAnswered = true;
    for (let i = 1; i <= totalQuestions; i++) {
        if (!document.querySelector(`input[name="q${i}"]:checked`)) {
            allAnswered = false;
            break;
        }
    }
    
    if (!allAnswered) {
        alert('Attention ! Tu dois répondre à toutes les questions.');
        return;
    }
    
    // Compter les bonnes réponses
    let score = 0;
    
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');
    const q4 = document.querySelector('input[name="q4"]:checked');
    const q5 = document.querySelector('input[name="q5"]:checked');
    
    if (q1.value === 'correct') score++;
    if (q2.value === 'correct') score++;
    if (q3.value === 'correct') score++;
    if (q4.value === 'correct') score++;
    if (q5.value === 'correct') score++;
    
    // Cacher la dernière question
    document.getElementById(`question-${totalQuestions}`).style.display = 'none';
    
    // Afficher le résultat
    const resultDiv = document.getElementById('quiz-result');
    const scoreText = document.getElementById('result-score');
    const messageText = document.getElementById('result-message');
    
    // Score
    scoreText.textContent = `Tu as obtenu ${score}/5 ! `;
    
    // Message personnalisé selon le score
    let message = '';
    let emoji = '';
    
    if (score === 5) {
        emoji = '🏆';
        message = `${emoji} Parfait ! Tu maîtrises déjà super bien les bases de la gestion d'argent. Continue comme ça, tu es sur la bonne voie !`;
    } else if (score === 4) {
        emoji = '🌟';
        message = `${emoji} Excellent ! Tu as de très bonnes bases. Quelques petites améliorations et tu seras au top !`;
    } else if (score === 3) {
        emoji = '👍';
        message = `${emoji} Pas mal ! Tu connais déjà quelques principes importants, mais il y a encore des choses à apprendre.`;
    } else if (score === 2) {
        emoji = '📚';
        message = `${emoji} C'est un début ! Tu as encore beaucoup à découvrir sur la gestion d'argent, mais ne t'inquiète pas, c'est pour ça que ce site existe.`;
    } else {
        emoji = '💪';
        message = `${emoji} Il y a du travail, mais ce n'est pas grave ! La bonne nouvelle, c'est que tu es au bon endroit pour apprendre.`;
    }
    
    messageText.textContent = message;
    
    // Afficher le résultat
    resultDiv.style.display = 'block';
    
    // Cacher les boutons de navigation
    document.querySelector('.quiz-navigation').style.display = 'none';
    
    // Scroll vers le résultat
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Bouton Recommencer le quiz
document.getElementById('restart-quiz').addEventListener('click', function() {
    // Réinitialiser la question actuelle
    currentQuestion = 1;
    
    // Décocher toutes les réponses
    for (let i = 1; i <= totalQuestions; i++) {
        const radios = document.querySelectorAll(`input[name="q${i}"]`);
        radios.forEach(radio => radio.checked = false);
    }
    
    // Cacher le résultat
    document.getElementById('quiz-result').style.display = 'none';
    
    // Réafficher les boutons de navigation
    document.querySelector('.quiz-navigation').style.display = 'flex';
    
    // Afficher la première question
    showQuestion(1);
    
    // Scroll vers le début du quiz
    document.querySelector('.quiz-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Initialiser le quiz
showQuestion(1);

// ============================================
// QUIZ 2 : Et maintenant ?
// ============================================

let currentQuestion2 = 1;
const totalQuestions2 = 10;

const prevButton2 = document.getElementById('quiz2-prev-button');
const nextButton2 = document.getElementById('quiz2-next-button');

// Fonction pour afficher une question du quiz 2
function showQuestion2(questionNumber) {
    // Cacher toutes les questions
    for (let i = 1; i <= totalQuestions2; i++) {
        const questionEl = document.getElementById(`quiz2-question-${i}`);
        if (questionEl) {
            questionEl.style.display = 'none';
        }
    }
    
    // Afficher la question actuelle
    const currentQuestionEl = document.getElementById(`quiz2-question-${questionNumber}`);
    if (currentQuestionEl) {
        currentQuestionEl.style.display = 'block';
    }
    
    // Gérer les boutons
    if (questionNumber === 1) {
        prevButton2.style.display = 'none';
    } else {
        prevButton2.style.display = 'block';
    }
    
    if (questionNumber === totalQuestions2) {
        nextButton2.textContent = 'Voir mes résultats';
    } else {
        nextButton2.textContent = 'Suivante →';
    }
}

// Bouton Précédente Quiz 2
prevButton2.addEventListener('click', function() {
    if (currentQuestion2 > 1) {
        currentQuestion2--;
        showQuestion2(currentQuestion2);
    }
});

// Bouton Suivante / Voir mes résultats Quiz 2
nextButton2.addEventListener('click', function() {
    // Vérifier si une réponse est sélectionnée
    const currentAnswer = document.querySelector(`input[name="q2_${currentQuestion2}"]:checked`);
    
    if (!currentAnswer) {
        alert('Attention ! Tu dois sélectionner une réponse avant de continuer.');
        return;
    }
    
    if (currentQuestion2 < totalQuestions2) {
        currentQuestion2++;
        showQuestion2(currentQuestion2);
    } else {
        // Calculer et afficher le résultat
        showResults2();
    }
});

// Fonction pour calculer et afficher les résultats du Quiz 2
function showResults2() {
    // Vérifier que toutes les questions sont répondues
    let allAnswered = true;
    for (let i = 1; i <= totalQuestions2; i++) {
        if (!document.querySelector(`input[name="q2_${i}"]:checked`)) {
            allAnswered = false;
            break;
        }
    }
    
    if (!allAnswered) {
        alert('Attention ! Tu dois répondre à toutes les questions.');
        return;
    }
    
    // Compter les bonnes réponses
    let score = 0;
    
    for (let i = 1; i <= totalQuestions2; i++) {
        const answer = document.querySelector(`input[name="q2_${i}"]:checked`);
        if (answer && answer.value === 'correct') {
            score++;
        }
    }
    
    // Cacher la dernière question
    document.getElementById(`quiz2-question-${totalQuestions2}`).style.display = 'none';
    
    // Afficher le résultat
    const resultDiv = document.getElementById('quiz2-result');
    const scoreText = document.getElementById('quiz2-result-score');
    const messageText = document.getElementById('quiz2-result-message');
    
    // Score
    scoreText.textContent = `Tu as obtenu ${score}/10 ! `;
    
    // Message personnalisé selon le score
    let message = '';
    let emoji = '';
    
    if (score >= 9) {
        emoji = '🏆';
        message = `${emoji} Extraordinaire ! Tu es un·e véritable expert·e en gestion d'argent ! Tu as parfaitement compris tous les concepts.`;
    } else if (score >= 7) {
        emoji = '🌟';
        message = `${emoji} Excellent ! Tu as très bien compris les principes de base. Avec un peu de pratique, tu seras au top !`;
    } else if (score >= 5) {
        emoji = '👍';
        message = `${emoji} Bien joué ! Tu as compris l'essentiel. Relis les sections où tu as hésité pour améliorer encore tes connaissances.`;
    } else if (score >= 3) {
        emoji = '📚';
        message = `${emoji} C'est un bon début ! Reprends le temps de lire les conseils ci-dessus, ils t'aideront beaucoup.`;
    } else {
        emoji = '💪';
        message = `${emoji} Ne te décourage pas ! Relis attentivement les conseils et refais le quiz. Tu vas progresser !`;
    }
    
    messageText.textContent = message;
    
    // Afficher le résultat
    resultDiv.style.display = 'block';
    
    // Cacher les boutons de navigation
    document.querySelector('#quiz2-container .quiz-navigation').style.display = 'none';
    
    // Scroll vers le résultat
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Bouton Recommencer le quiz 2
document.getElementById('quiz2-restart').addEventListener('click', function() {
    // Réinitialiser la question actuelle
    currentQuestion2 = 1;
    
    // Décocher toutes les réponses
    for (let i = 1; i <= totalQuestions2; i++) {
        const radios = document.querySelectorAll(`input[name="q2_${i}"]`);
        radios.forEach(radio => radio.checked = false);
    }
    
    // Cacher le résultat
    document.getElementById('quiz2-result').style.display = 'none';
    
    // Réafficher les boutons de navigation
    document.querySelector('#quiz2-container .quiz-navigation').style.display = 'flex';
    
    // Afficher la première question
    showQuestion2(1);
    
    // Scroll vers le début du quiz
    document.querySelector('.quiz-2').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Initialiser le quiz 2
showQuestion2(1);

// ============================================
// JEU : LE DÉFI DU MOIS
// ============================================

let gameBudget = 800;
let gameDay = 1;
let gameScore = 0;
let usedEvents = []; // Pour suivre les événements déjà utilisés
let debtScenarioTriggered = false; // Pour suivre si le scénario dette a été déclenché
let debtScenarioStep = 0; // Étape du scénario dette
let gameEvents = [
    {
        icon: "gift",
        title: "Anniversaire d'un ami",
        description: "Ton ami fête son anniversaire et t'invite à une sortie. Que fais-tu ?",
        choices: [
            { text: "J'y vais et je dépense 60 francs", impact: -60, score: 0, feedback: "C'était sympa, mais ça a coûté cher..." },
            { text: "J'offre un petit cadeau fait maison (10 francs)", impact: -10, score: 20, feedback: "Super choix ! Ton ami a adoré et tu as économisé." },
            { text: "Je décline poliment", impact: 0, score: 10, feedback: "Tu as économisé, mais ton ami est un peu déçu..." }
        ]
    },
    {
        icon: "smartphone",
        title: "Nouveau téléphone en promo",
        description: "Le téléphone de tes rêves est en promo à 600 francs (au lieu de 800). Que fais-tu ?",
        choices: [
            { text: "Je l'achète, c'est une super promo !", impact: -600, score: -50, feedback: "Aïe ! Tu as dépensé presque tout ton budget pour un téléphone..." },
            { text: "Je prends un crédit pour l'acheter", impact: -100, score: -80, feedback: "Mauvaise idée ! Tu paies des intérêts en plus..." },
            { text: "J'attends et je réfléchis", impact: 0, score: 40, feedback: "Excellent réflexe ! Tu as évité un achat impulsif." }
        ]
    },
    {
        icon: "coffee",
        title: "Déjeuner avec des amis",
        description: "Tes amis proposent d'aller au restaurant à midi. Que fais-tu ?",
        choices: [
            { text: "J'y vais (25 francs)", impact: -25, score: 5, feedback: "C'était bon, mais tu pouvais économiser..." },
            { text: "Je propose un pique-nique à la place (8 francs)", impact: -8, score: 25, feedback: "Génial ! Tes amis ont adoré l'idée et tu as économisé." },
            { text: "J'apporte mon repas de la maison (2 francs)", impact: -2, score: 30, feedback: "Bravo ! C'est le choix le plus économique." }
        ]
    },
    {
        icon: "dollar-sign",
        title: "Tu reçois ton argent de poche",
        description: "C'est le jour de l'argent de poche ! Tu reçois 100 francs.",
        choices: [
            { text: "J'en mets 50 de côté pour les imprévus", impact: 100, score: 50, feedback: "Super ! Tu penses à l'avenir." },
            { text: "Je garde tout disponible", impact: 100, score: 20, feedback: "Pas mal, mais tu aurais pu économiser un peu..." }
        ]
    },
    {
        icon: "monitor",
        title: "Sortie d'un nouveau jeu vidéo",
        description: "Le jeu que tu attends depuis des mois sort aujourd'hui à 80 francs.",
        choices: [
            { text: "Je l'achète tout de suite", impact: -80, score: -10, feedback: "Tu as cédé à la tentation..." },
            { text: "J'attends les soldes dans 2 mois", impact: 0, score: 35, feedback: "Excellente patience ! Tu pourras l'avoir moins cher." },
            { text: "Je l'emprunte à un ami", impact: 0, score: 45, feedback: "Génial ! Tu économises 80 francs et tu joues quand même." }
        ]
    },
    {
        icon: "shopping-bag",
        title: "Un influenceur promeut des baskets",
        description: "Ton influenceur préféré porte des baskets trop stylées à 150 francs. Que fais-tu ?",
        choices: [
            { text: "Je les achète pour être à la mode", impact: -150, score: -40, feedback: "Mauvais choix... Tu as dépensé beaucoup pour suivre la mode." },
            { text: "Je cherche des alternatives moins chères", impact: -50, score: 30, feedback: "Bien joué ! Tu as trouvé un modèle similaire pour 3 fois moins cher." },
            { text: "Je garde mes baskets actuelles", impact: 0, score: 40, feedback: "Excellent ! Être soi-même ne coûte rien." }
        ]
    },
    {
        icon: "alert-circle",
        title: "Ton vélo est cassé",
        description: "La réparation coûte 40 francs. Que fais-tu ?",
        choices: [
            { text: "Je le répare (40 francs)", impact: -40, score: 25, feedback: "Bon choix ! C'est un investissement utile." },
            { text: "Je prends les transports publics en attendant (5 francs/jour)", impact: -25, score: 10, feedback: "Ça coûte moins cher à court terme, mais..." },
            { text: "Je le répare moi-même avec YouTube (10 francs de pièces)", impact: -10, score: 50, feedback: "Excellent ! Tu as économisé ET appris quelque chose." }
        ]
    },
    {
        icon: "tv",
        title: "Abonnement streaming",
        description: "Un service de streaming te propose un essai gratuit, puis 15 francs/mois.",
        choices: [
            { text: "J'accepte et je note d'annuler avant la fin", impact: 0, score: 20, feedback: "Bien pensé ! Profiter sans payer." },
            { text: "J'accepte et j'oublie d'annuler", impact: -15, score: -30, feedback: "Oups ! Tu paies maintenant un abo que tu n'utilises pas..." },
            { text: "Je refuse, je n'en ai pas besoin", impact: 0, score: 30, feedback: "Sage décision ! Tu évites un piège classique." }
        ]
    },
    {
        icon: "package",
        title: "Une super offre limitée",
        description: "Un site propose -70% sur tout, mais seulement aujourd'hui ! Que fais-tu ?",
        choices: [
            { text: "J'achète plein de choses (120 francs)", impact: -120, score: -50, feedback: "Piège ! Tu as acheté des choses dont tu n'avais pas besoin..." },
            { text: "Je regarde seulement ce dont j'ai vraiment besoin (30 francs)", impact: -30, score: 35, feedback: "Bien ! Tu as profité de l'offre intelligemment." },
            { text: "C'est sûrement une arnaque, je passe", impact: 0, score: 25, feedback: "Prudent ! Beaucoup de promos sont trompeuses." }
        ]
    },
    {
        icon: "briefcase",
        title: "Opportunité de petit job",
        description: "On te propose un petit job le week-end pour 80 francs.",
        choices: [
            { text: "J'accepte et je travaille", impact: 80, score: 60, feedback: "Excellent ! Tu gagnes de l'argent honnêtement." },
            { text: "Je préfère me reposer", impact: 0, score: 0, feedback: "C'était une opportunité ratée de gagner de l'argent..." }
        ]
    },
    {
        icon: "film",
        title: "Sortie ciné avec tes amis",
        description: "Tes amis vont voir le dernier film au ciné. Place + pop-corn = 35 francs.",
        choices: [
            { text: "J'y vais avec eux", impact: -35, score: 5, feedback: "Le film était cool, mais c'était cher pour 2h de distraction..." },
            { text: "Je propose une soirée film à la maison (10 francs)", impact: -10, score: 30, feedback: "Excellente alternative ! Tout le monde a adoré." },
            { text: "Je leur dis que je suis occupé", impact: 0, score: 5, feedback: "Tu as économisé mais tu as raté un bon moment..." }
        ]
    },
    {
        icon: "coffee",
        title: "Pause café quotidienne",
        description: "Tu prends un café en ville tous les jours (4 francs). Sur une semaine, ça fait 28 francs.",
        choices: [
            { text: "Je continue, j'adore ça", impact: -28, score: -20, feedback: "28 francs par semaine = 112 francs par mois juste pour du café..." },
            { text: "Je fais mon café à la maison (5 francs/semaine)", impact: -5, score: 40, feedback: "Super économie ! Tu gardes le plaisir pour beaucoup moins cher." },
            { text: "Je passe à l'eau", impact: 0, score: 30, feedback: "Radical mais efficace ! Et meilleur pour la santé." }
        ]
    },
    {
        icon: "music",
        title: "Concert de ton artiste préféré",
        description: "Ton artiste préféré vient en concert ! Billet à 120 francs.",
        choices: [
            { text: "J'achète le billet tout de suite", impact: -120, score: -30, feedback: "Super souvenir, mais ça coûte très cher..." },
            { text: "Je le regarde en live sur Internet (gratuit)", impact: 0, score: 35, feedback: "Malin ! Tu profites quand même sans te ruiner." },
            { text: "Je cherche quelqu'un pour partager les frais", impact: -60, score: 20, feedback: "Bonne idée de négocier et partager !" }
        ]
    },
    {
        icon: "activity",
        title: "Abonnement salle de sport",
        description: "Une salle de sport te propose 60 francs/mois. Tu veux être en forme !",
        choices: [
            { text: "Je m'inscris pour l'année (720 francs)", impact: -720, score: -80, feedback: "Énorme dépense d'un coup ! Et si tu n'y vas pas souvent ?" },
            { text: "Je fais du sport dehors (gratuit)", impact: 0, score: 50, feedback: "Parfait ! Course, pompes, tractions... c'est gratuit et efficace." },
            { text: "J'essaie 1 mois d'abord (60 francs)", impact: -60, score: 25, feedback: "Sage de tester avant de t'engager sur l'année." }
        ]
    },
    {
        icon: "smile",
        title: "Tu veux faire un gâteau",
        description: "Tu veux faire un gâteau pour le goûter. Comment tu t'y prends ?",
        choices: [
            { text: "J'achète un gâteau tout fait (15 francs)", impact: -15, score: 0, feedback: "Pratique mais cher pour un simple goûter..." },
            { text: "Je le fais moi-même (5 francs d'ingrédients)", impact: -5, score: 30, feedback: "Bravo ! Moins cher, plus fun et tu apprends à cuisiner." },
            { text: "Je prends juste des biscuits (3 francs)", impact: -3, score: 20, feedback: "Simple et économique !" }
        ]
    },
    {
        icon: "cpu",
        title: "Ton ordinateur est lent",
        description: "Ton ordi rame. Un nouveau coûte 1200 francs, mais tu peux upgrader la RAM pour 80 francs.",
        choices: [
            { text: "J'achète un nouveau PC", impact: -1200, score: -100, feedback: "Énorme erreur ! Tu as dépensé 1200 francs alors que ton PC était réparable..." },
            { text: "J'upgrade la RAM (80 francs)", impact: -80, score: 60, feedback: "Excellent choix ! Ton PC est comme neuf pour 15 fois moins cher." },
            { text: "Je nettoie et optimise (gratuit)", impact: 0, score: 50, feedback: "Parfait ! Souvent un bon nettoyage suffit." }
        ]
    },
    {
        icon: "truck",
        title: "Permis de conduire",
        description: "Tu veux passer ton permis. Auto-école = 2500 francs, conduite accompagnée = 1500 francs.",
        choices: [
            { text: "Auto-école classique", impact: -2500, score: -50, feedback: "C'est cher mais nécessaire. Essaie de travailler pour le payer." },
            { text: "Conduite accompagnée", impact: -1500, score: 40, feedback: "Bien pensé ! Tu économises 1000 francs." },
            { text: "J'attends d'avoir plus d'argent", impact: 0, score: 30, feedback: "Sage décision d'attendre plutôt que de t'endetter." }
        ]
    }
];

function startGame() {
    gameBudget = 800;
    gameDay = 1;
    gameScore = 0;
    usedEvents = []; // Réinitialiser les événements utilisés
    debtScenarioTriggered = false;
    debtScenarioStep = 0;
    updateDashboard();
    
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('event-area').style.display = 'block';
    document.getElementById('game-end').style.display = 'none';
    
    showNextEvent();
}

function updateDashboard() {
    document.getElementById('budget').textContent = `${gameBudget} CHF`;
    document.getElementById('budget').style.color = gameBudget < 0 ? '#e74c3c' : (gameBudget < 200 ? '#ff9800' : '#667eea');
    document.getElementById('day').textContent = `${gameDay} / 30`;
    document.getElementById('score').textContent = gameScore;
}

function showNextEvent() {
    if (gameDay > 30) {
        endGame(true);
        return;
    }
    
    // Si budget négatif et scénario pas encore déclenché, lancer le scénario dette
    if (gameBudget < 0 && !debtScenarioTriggered) {
        debtScenarioTriggered = true;
        debtScenarioStep = 1;
        showDebtScenario();
        return;
    }
    
    // Si en plein scénario dette, continuer le scénario
    if (debtScenarioTriggered && debtScenarioStep > 0 && debtScenarioStep <= 5) {
        showDebtScenario();
        return;
    }
    
    // Si le scénario dette est terminé et toujours négatif, game over
    if (debtScenarioTriggered && debtScenarioStep > 5 && gameBudget < -50) {
        endGame(false);
        return;
    }
    
    // Vérifier s'il reste des événements disponibles
    if (usedEvents.length >= gameEvents.length) {
        // Tous les événements ont été utilisés, on finit le jeu
        endGame(true);
        return;
    }
    
    // Choisir un événement qui n'a pas encore été utilisé
    let event;
    let eventIndex;
    do {
        eventIndex = Math.floor(Math.random() * gameEvents.length);
        event = gameEvents[eventIndex];
    } while (usedEvents.includes(eventIndex));
    
    // Marquer cet événement comme utilisé
    usedEvents.push(eventIndex);
    
    document.getElementById('event-day').textContent = `Jour ${gameDay}`;
    document.getElementById('event-icon').innerHTML = `<i data-feather="${event.icon}" style="width: 48px; height: 48px;"></i>`;
    feather.replace();
    document.getElementById('event-title').textContent = event.title;
    document.getElementById('event-description').textContent = event.description;
    
    const choicesContainer = document.getElementById('event-choices');
    choicesContainer.innerHTML = '';
    
    event.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'game-button choice';
        button.textContent = choice.text;
        button.onclick = () => makeChoice(choice);
        choicesContainer.appendChild(button);
    });
}

function makeChoice(choice) {
    gameBudget += choice.impact;
    gameScore += choice.score;
    gameDay += Math.floor(Math.random() * 3) + 2; // Avance de 2-4 jours
    
    updateDashboard();
    
    // Vérifier si on vient de tomber en négatif
    let debtWarning = '';
    if (gameBudget < 0 && !debtScenarioTriggered) {
        debtWarning = '<p style="color: #e74c3c; font-weight: bold; font-size: 1.2em; margin-top: 20px;"><i data-feather="alert-triangle" style="width: 24px; height: 24px; vertical-align: middle; margin-right: 8px;"></i> Attention ! Tu commences à avoir des dettes !</p>';
    }
    
    // Afficher le feedback
    const eventArea = document.getElementById('event-area');
    const feedbackIcon = choice.impact >= 0 ? 'check-circle' : 'trending-down';
    const feedbackColor = choice.impact >= 0 ? 'var(--color-soft-green)' : 'var(--color-coral)';
    eventArea.innerHTML = `
        <div class="event-card">
            <div class="event-feedback">
                <div class="event-icon" style="background: linear-gradient(135deg, ${feedbackColor}, ${choice.impact >= 0 ? 'var(--color-soft-blue)' : 'var(--color-warning)'});">
                    <i data-feather="${feedbackIcon}" style="width: 60px; height: 60px; color: white;"></i>
                </div>
                <h3 style="margin-top: 20px;">${choice.feedback}</h3>
                <p style="font-size: 1.5em; margin: 20px 0; font-weight: 700; color: ${choice.impact >= 0 ? 'var(--color-soft-green)' : 'var(--color-coral)'};">
                    ${choice.impact > 0 ? '+' : ''}${choice.impact} CHF
                </p>
                <p style="color: #636e72; font-size: 1.1em;">Budget actuel : <strong style="color: ${gameBudget < 0 ? '#e74c3c' : '#667eea'}; font-size: 1.3em;">${gameBudget} CHF</strong></p>
                ${debtWarning}
                <button class="game-button primary" onclick="continueGame()" style="margin-top: 30px;">Continuer <i data-feather="arrow-right" style="width: 18px; height: 18px; margin-left: 8px; vertical-align: middle;"></i></button>
            </div>
        </div>
    `;
    feather.replace();
}

function continueGame() {
    document.getElementById('event-area').innerHTML = `
        <div class="event-card">
            <div class="event-day" id="event-day"></div>
            <div class="event-icon" id="event-icon">📅</div>
            <h3 id="event-title"></h3>
            <p id="event-description"></p>
            <div class="event-choices" id="event-choices"></div>
        </div>
    `;
    showNextEvent();
}

function endGame(success) {
    document.getElementById('event-area').style.display = 'none';
    document.getElementById('game-end').style.display = 'block';
    
    const resultTitle = document.getElementById('result-title');
    const resultIcon = document.getElementById('result-icon');
    const resultMessage = document.getElementById('result-message');
    
    if (!success) {
        resultTitle.textContent = "😰 Défi échoué...";
        resultTitle.style.color = '#e74c3c';
        resultIcon.textContent = "💸";
        resultMessage.textContent = "Tu es tombé en négatif ! Les dettes s'accumulent et tu as du mal à t'en sortir. Retiens la leçon : surveille tes dépenses et évite les achats impulsifs !";
    } else if (gameBudget >= 800) {
        resultTitle.textContent = "🏆 Champion de la gestion !";
        resultTitle.style.color = '#27ae60';
        resultIcon.textContent = "🏆";
        resultMessage.textContent = "Incroyable ! Non seulement tu as survécu au mois, mais tu as même AUGMENTÉ ton budget ! Tu es un vrai pro de la gestion d'argent. Continue comme ça !";
        gameScore += 100;
    } else if (gameBudget >= 400) {
        resultTitle.textContent = "🌟 Excellent travail !";
        resultTitle.style.color = '#667eea';
        resultIcon.textContent = "🌟";
        resultMessage.textContent = "Bravo ! Tu as bien géré ton budget et tu finis le mois avec un bon coussin de sécurité. Tu as fait des choix intelligents !";
        gameScore += 50;
    } else if (gameBudget >= 100) {
        resultTitle.textContent = "👍 Pas mal !";
        resultTitle.style.color = '#ff9800';
        resultIcon.textContent = "👍";
        resultMessage.textContent = "Tu as survécu au mois, mais c'était juste ! Tu pourrais faire mieux en évitant certaines dépenses inutiles. Réessaie pour améliorer ton score !";
    } else {
        resultTitle.textContent = "😅 Ouf, tu as survécu !";
        resultTitle.style.color = '#ff9800';
        resultIcon.textContent = "😅";
        resultMessage.textContent = "Tu as réussi à finir le mois, mais tu es presque à sec ! Fais plus attention à tes dépenses la prochaine fois.";
    }
    
    document.getElementById('final-budget').textContent = `${gameBudget} CHF`;
    document.getElementById('final-score').textContent = gameScore;
}

// Scénario spécial "Dettes" - Questions enchaînées
function showDebtScenario() {
    let scenario;
    
    if (debtScenarioStep === 1) {
        scenario = {
            day: "Situation critique",
            icon: "alert-triangle",
            title: "Tu es en négatif !",
            description: `Tu as ${gameBudget} CHF. Tu es endetté ! Un ami te propose de te prêter 100 francs.`,
            choices: [
                { text: "J'accepte son prêt (mais je devrai rembourser)", nextStep: 2, impact: 100, score: -10, feedback: "Tu as accepté le prêt. Maintenant il faut rembourser..." },
                { text: "Je refuse et je cherche un job urgent", nextStep: 3, impact: 50, score: 30, feedback: "Bonne décision ! Tu as trouvé un petit boulot." }
            ]
        };
    } else if (debtScenarioStep === 2) {
        // Suite si tu as accepté le prêt de l'ami
        scenario = {
            day: "Conséquences",
            icon: "credit-card",
            title: "La dette s'accumule",
            description: "Ton ami veut ses 100 francs, mais tu n'as pas assez. Une société de crédit te propose un mini-crédit.",
            choices: [
                { text: "J'accepte le crédit (120 francs mais 150 à rembourser)", nextStep: 4, impact: 120, score: -50, feedback: "Mauvaise décision ! Les intérêts vont te plomber..." },
                { text: "Je parle à mes parents pour m'aider", nextStep: 5, impact: 100, score: 40, feedback: "Sage décision ! Tes parents t'aident et te conseillent." }
            ]
        };
    } else if (debtScenarioStep === 3) {
        // Suite si tu as refusé et cherché un job
        scenario = {
            day: "Tu te reprends",
            icon: "trending-up",
            title: "Tu travailles dur",
            description: "Grâce à ton job, tu remontes la pente. Mais ton téléphone tombe en panne...",
            choices: [
                { text: "Je le fais réparer (40 francs)", nextStep: 6, impact: -40, score: 20, feedback: "Bon choix, tu as réparé l'essentiel sans te ruiner." },
                { text: "J'en achète un nouveau en crédit (800 francs)", nextStep: 4, impact: -800, score: -80, feedback: "Catastrophe ! Tu replonges dans les dettes..." }
            ]
        };
    } else if (debtScenarioStep === 4) {
        // Mauvaise spirale du crédit
        scenario = {
            day: "Spirale infernale",
            icon: "trending-down",
            title: "Les dettes s'accumulent",
            description: "Les crédits s'empilent, les intérêts explosent. Tu reçois des lettres de relance...",
            choices: [
                { text: "Je demande de l'aide à un service d'aide aux jeunes", nextStep: 5, impact: 50, score: 60, feedback: "Excellent ! Ils t'aident à restructurer tes dettes." },
                { text: "J'ignore les lettres et j'espère que ça passe", nextStep: 6, impact: -100, score: -100, feedback: "Erreur terrible ! Les poursuites commencent..." }
            ]
        };
    } else if (debtScenarioStep === 5) {
        // Bonne issue : tu demandes de l'aide
        scenario = {
            day: "Issue positive",
            icon: "star",
            title: "Tu t'en sors !",
            description: "Avec l'aide reçue, tu arrives à rembourser progressivement. Tu as appris une leçon importante.",
            choices: [
                { text: "Je continue le jeu avec cette leçon en tête", nextStep: 7, impact: 100, score: 80, feedback: "Bravo ! Tu as appris de tes erreurs." }
            ]
        };
    } else if (debtScenarioStep === 6) {
        // Issue négative finale
        scenario = {
            day: "Fin du jeu",
            icon: "x-circle",
            title: "Game Over",
            description: "Les dettes sont trop importantes. Tu es en poursuites, c'est la spirale infernale. Le jeu se termine ici...",
            choices: [
                { text: "Voir mes résultats", nextStep: -1, impact: -200, score: -200, feedback: "Tu as vu les conséquences des dettes..." }
            ]
        };
    } else {
        // Fin du scénario, retour au jeu normal
        debtScenarioStep = 0;
        showNextEvent();
        return;
    }
    
    document.getElementById('event-day').textContent = scenario.day;
    document.getElementById('event-icon').innerHTML = `<i data-feather="${scenario.icon}" style="width: 48px; height: 48px;"></i>`;
    feather.replace();
    document.getElementById('event-title').textContent = scenario.title;
    document.getElementById('event-description').textContent = scenario.description;
    
    const choicesContainer = document.getElementById('event-choices');
    choicesContainer.innerHTML = '';
    
    scenario.choices.forEach((choice) => {
        const button = document.createElement('button');
        button.className = 'game-button choice';
        button.textContent = choice.text;
        button.onclick = () => makeDebtChoice(choice);
        choicesContainer.appendChild(button);
    });
}

function makeDebtChoice(choice) {
    gameBudget += choice.impact;
    gameScore += choice.score;
    gameDay += 2;
    
    debtScenarioStep = choice.nextStep;
    
    updateDashboard();
    
    // Si nextStep = -1, c'est game over
    if (choice.nextStep === -1) {
        endGame(false);
        return;
    }
    
    // Afficher le feedback
    const eventArea = document.getElementById('event-area');
    const debtFeedbackIcon = choice.impact >= 0 ? 'check-circle' : 'trending-down';
    const debtFeedbackColor = choice.impact >= 0 ? 'var(--color-soft-green)' : 'var(--color-coral)';
    eventArea.innerHTML = `
        <div class="event-card">
            <div class="event-feedback">
                <div class="event-icon" style="background: linear-gradient(135deg, ${debtFeedbackColor}, ${choice.impact >= 0 ? 'var(--color-soft-blue)' : 'var(--color-warning)'});">
                    <i data-feather="${debtFeedbackIcon}" style="width: 60px; height: 60px; color: white;"></i>
                </div>
                <h3 style="margin-top: 20px;">${choice.feedback}</h3>
                <p style="font-size: 1.5em; margin: 20px 0; font-weight: 700; color: ${choice.impact >= 0 ? 'var(--color-soft-green)' : 'var(--color-coral)'};">
                    ${choice.impact > 0 ? '+' : ''}${choice.impact} CHF
                </p>
                <p style="color: #636e72; font-size: 1.1em;">Budget actuel : <strong style="color: ${gameBudget < 0 ? '#e74c3c' : '#667eea'}; font-size: 1.3em;">${gameBudget} CHF</strong></p>
                <button class="game-button primary" onclick="continueGame()" style="margin-top: 30px;">Continuer <i data-feather="arrow-right" style="width: 18px; height: 18px; margin-left: 8px; vertical-align: middle;"></i></button>
            </div>
        </div>
    `;
    feather.replace();
}

// Event listeners
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('restart-game').addEventListener('click', startGame);

// ============================================
// NAVIGATION ENTRE JEUX
// ============================================
function showGame(gameId) {
    // Cacher le sélecteur
    document.querySelector('.games-selector').style.display = 'none';
    
    // Cacher tous les jeux
    document.getElementById('game-defi').style.display = 'none';
    document.getElementById('game-mythes').style.display = 'none';
    document.getElementById('game-tri').style.display = 'none';
    
    // Afficher le jeu choisi
    if (gameId === 'defi') {
        document.getElementById('game-defi').style.display = 'block';
    } else if (gameId === 'mythes') {
        document.getElementById('game-mythes').style.display = 'block';
    } else if (gameId === 'tri') {
        document.getElementById('game-tri').style.display = 'block';
    }
    
    // Recharger les icônes Feather
    feather.replace();
}

function backToGamesMenu() {
    // Afficher le sélecteur
    document.querySelector('.games-selector').style.display = 'block';
    
    // Cacher tous les jeux
    document.getElementById('game-defi').style.display = 'none';
    document.getElementById('game-mythes').style.display = 'none';
    document.getElementById('game-tri').style.display = 'none';
    
    // Recharger les icônes Feather
    feather.replace();
}

// ============================================
// JEU VRAI/FAUX - MYTHES DE L'ARGENT
// ============================================
let mythesQuestions = [
    {
        statement: "Un crédit à la consommation est une bonne solution pour acheter un téléphone tout de suite.",
        answer: false,
        explanation: "FAUX ! Un crédit coûte toujours plus cher que le prix initial à cause des intérêts. Il vaut mieux économiser et acheter sans crédit."
    },
    {
        statement: "Le leasing permet de devenir propriétaire du véhicule à la fin du contrat.",
        answer: false,
        explanation: "FAUX ! Avec le leasing, tu paies pour utiliser le véhicule, mais tu ne deviens jamais propriétaire. C'est comme une location longue durée."
    },
    {
        statement: "Il est important de faire un budget pour savoir combien on peut dépenser chaque mois.",
        answer: true,
        explanation: "VRAI ! Faire un budget t'aide à savoir où va ton argent et à éviter les mauvaises surprises."
    },
    {
        statement: "Si j'ai des dettes et que j'ignore les lettres, elles vont finir par disparaître.",
        answer: false,
        explanation: "FAUX ! Ignorer les lettres empire la situation. Les intérêts continuent de s'accumuler et tu risques d'avoir des poursuites."
    },
    {
        statement: "Attendre quelques jours avant un gros achat permet d'éviter les achats impulsifs.",
        answer: true,
        explanation: "VRAI ! Prendre le temps de réfléchir permet de distinguer les vrais besoins des envies passagères."
    },
    {
        statement: "Une carte de crédit est comme avoir de l'argent gratuit qu'on ne doit pas rembourser.",
        answer: false,
        explanation: "FAUX ! Une carte de crédit est une dette que tu dois rembourser, souvent avec des intérêts très élevés si tu ne paies pas rapidement."
    },
    {
        statement: "Avoir des poursuites peut m'empêcher de trouver certains emplois ou de louer un appartement.",
        answer: true,
        explanation: "VRAI ! Un extrait de poursuites négatif peut bloquer l'accès à certains métiers (banque, comptabilité) et les propriétaires peuvent refuser de te louer un logement."
    },
    {
        statement: "Il est plus intelligent d'économiser petit à petit que d'acheter à crédit.",
        answer: true,
        explanation: "VRAI ! En économisant, tu paies le prix réel sans intérêts en plus, et tu apprécies davantage ce que tu achètes."
    },
    {
        statement: "Je peux signer un contrat même si je ne comprends pas tout ce qui est écrit dedans.",
        answer: false,
        explanation: "FAUX ! Ne signe JAMAIS un contrat que tu ne comprends pas. Ta signature t'engage légalement et c'est difficile de revenir en arrière."
    },
    {
        statement: "Demander conseil à un adulte de confiance avant une décision financière importante est une bonne idée.",
        answer: true,
        explanation: "VRAI ! Les adultes ont de l'expérience et peuvent t'aider à repérer les pièges. Demander de l'aide est une force, pas une faiblesse."
    }
];

let currentMytheIndex = 0;
let mythesScore = 0;

function startMythesGame() {
    currentMytheIndex = 0;
    mythesScore = 0;
    
    // Cacher l'écran de démarrage
    document.getElementById('mythes-start').style.display = 'none';
    
    // Cacher l'écran de résultats
    document.getElementById('mythes-results').style.display = 'none';
    
    // Afficher la zone de jeu
    document.getElementById('mythes-play-area').style.display = 'block';
    
    // Afficher la première question
    showMytheQuestion();
}

function showMytheQuestion() {
    const question = mythesQuestions[currentMytheIndex];
    
    // Mettre à jour la progression
    document.getElementById('mythes-current').textContent = currentMytheIndex + 1;
    document.getElementById('mythes-progress-bar').style.width = ((currentMytheIndex + 1) / mythesQuestions.length * 100) + '%';
    
    // Recréer la structure complète de la carte
    const questionDiv = document.getElementById('mythes-question-card');
    questionDiv.innerHTML = `
        <div class="event-icon" id="mythes-icon">
            <i data-feather="help-circle" style="width: 60px; height: 60px;"></i>
        </div>
        <h3 id="mythes-statement" style="font-size: 1.4em; line-height: 1.6; margin: 30px 0;">${question.statement}</h3>
        
        <div class="mythes-buttons">
            <button class="game-button" id="btn-vrai" onclick="checkMythes(true)" 
                    style="background: linear-gradient(135deg, var(--color-soft-green), #27ae60); color: white; font-size: 1.2em; padding: 20px; margin: 10px;">
                <i data-feather="check-circle" style="width: 24px; height: 24px; vertical-align: middle; margin-right: 10px;"></i>
                VRAI
            </button>
            <button class="game-button" id="btn-faux" onclick="checkMythes(false)" 
                    style="background: linear-gradient(135deg, var(--color-coral), #e74c3c); color: white; font-size: 1.2em; padding: 20px; margin: 10px;">
                <i data-feather="x-circle" style="width: 24px; height: 24px; vertical-align: middle; margin-right: 10px;"></i>
                FAUX
            </button>
        </div>
    `;
    
    // Recharger les icônes
    feather.replace();
}

function checkMythes(userAnswer) {
    const question = mythesQuestions[currentMytheIndex];
    const isCorrect = userAnswer === question.answer;
    
    // Mettre à jour le score
    if (isCorrect) {
        mythesScore += 10;
    }
    
    // Remplacer le contenu de la carte par le feedback
    const questionDiv = document.getElementById('mythes-question-card');
    const feedbackIcon = isCorrect ? 'check-circle' : 'x-circle';
    const feedbackColor = isCorrect ? 'var(--color-soft-green)' : 'var(--color-coral)';
    const feedbackTitle = isCorrect ? 'Bravo !' : 'Pas tout à fait...';
    
    questionDiv.innerHTML = `
        <div class="event-icon" style="background: linear-gradient(135deg, ${feedbackColor}, ${isCorrect ? 'var(--color-soft-blue)' : 'var(--color-warning)'});">
            <i data-feather="${feedbackIcon}" style="width: 60px; height: 60px; color: white;"></i>
        </div>
        <h3 style="margin-top: 20px; color: ${feedbackColor};">${feedbackTitle}</h3>
        <p style="font-size: 1.2em; margin: 20px 0; line-height: 1.6;">${question.explanation}</p>
        <p style="font-size: 1.1em; color: var(--color-soft-blue); font-weight: 600;">Score actuel : ${mythesScore} / ${mythesQuestions.length * 10}</p>
        <button class="game-button primary" onclick="nextMytheQuestion()" style="margin-top: 20px;">
            ${currentMytheIndex < mythesQuestions.length - 1 ? 'Question suivante' : 'Voir mes résultats'}
            <i data-feather="arrow-right" style="width: 18px; height: 18px; margin-left: 8px; vertical-align: middle;"></i>
        </button>
    `;
    
    feather.replace();
}

function nextMytheQuestion() {
    currentMytheIndex++;
    
    if (currentMytheIndex < mythesQuestions.length) {
        showMytheQuestion();
    } else {
        showMythesResults();
    }
}

function showMythesResults() {
    // Cacher la zone de jeu
    document.getElementById('mythes-play-area').style.display = 'none';
    
    // Afficher les résultats
    document.getElementById('mythes-results').style.display = 'block';
    
    // Calculer le pourcentage
    const percentage = mythesScore;
    
    // Déterminer le message
    let resultTitle, resultText, resultIcon, resultColor;
    
    if (percentage >= 90) {
        resultTitle = 'Excellent !';
        resultText = 'Tu maîtrises parfaitement les bases de la gestion financière ! Continue comme ça.';
        resultIcon = 'award';
        resultColor = 'var(--color-soft-green)';
    } else if (percentage >= 70) {
        resultTitle = 'Très bien !';
        resultText = 'Tu as de bonnes connaissances ! Quelques petites choses à réviser, mais tu es sur la bonne voie.';
        resultIcon = 'thumbs-up';
        resultColor = 'var(--color-soft-blue)';
    } else if (percentage >= 50) {
        resultTitle = 'Pas mal !';
        resultText = 'Tu as des bases, mais il te reste encore des choses à apprendre. Rejoue pour améliorer ton score !';
        resultIcon = 'smile';
        resultColor = 'var(--color-warning)';
    } else {
        resultTitle = 'Continue d\'apprendre !';
        resultText = 'N\'hésite pas à relire les sections du site et à rejouer pour mieux comprendre les pièges financiers.';
        resultIcon = 'book';
        resultColor = 'var(--color-coral)';
    }
    
    // Afficher les résultats
    document.getElementById('mythes-result-title').textContent = resultTitle;
    document.getElementById('mythes-result-text').textContent = resultText;
    document.getElementById('mythes-final-score').textContent = mythesScore;
    
    const resultIconEl = document.querySelector('#mythes-result-icon');
    resultIconEl.innerHTML = `<i data-feather="${resultIcon}" style="width: 60px; height: 60px;"></i>`;
    resultIconEl.style.background = `linear-gradient(135deg, ${resultColor}, var(--color-soft-blue))`;
    
    feather.replace();
}

// Event listeners pour le jeu Vrai/Faux
document.getElementById('start-mythes-game').addEventListener('click', startMythesGame);
document.getElementById('restart-mythes-game').addEventListener('click', startMythesGame);

// ============================================
// JEU TRI DES DÉPENSES
// ============================================
let triDepenses = [
    { text: "Acheter un téléphone à crédit", category: "piege", icon: "smartphone", explanation: "C'est un PIÈGE ! Acheter à crédit coûte beaucoup plus cher à cause des intérêts. Mieux vaut économiser et acheter comptant." },
    { text: "Payer ton abonnement de bus/train", category: "besoin", icon: "map", explanation: "C'est un BESOIN ! Les transports sont essentiels pour aller à l'école ou au travail." },
    { text: "Acheter des baskets de marque à 250 CHF", category: "envie", icon: "shopping-bag", explanation: "C'est une ENVIE ! Tu peux trouver de bonnes baskets pour moins cher. Les marques coûtent plus pour le logo que pour la qualité." },
    { text: "Faire tes courses alimentaires", category: "besoin", icon: "shopping-cart", explanation: "C'est un BESOIN ! Se nourrir est essentiel. Mais attention aux achats impulsifs au supermarché !" },
    { text: "Prendre un crédit pour des vacances", category: "piege", icon: "alert-circle", explanation: "C'est un PIÈGE ! Ne prends JAMAIS de crédit pour des vacances. Si tu n'as pas l'argent, c'est que tu ne peux pas te les offrir." },
    { text: "Sortir au restaurant avec des amis", category: "envie", icon: "coffee", explanation: "C'est une ENVIE ! C'est sympa mais pas essentiel. Tu peux aussi proposer un pique-nique pour économiser !" },
    { text: "Payer ton loyer", category: "besoin", icon: "home", explanation: "C'est un BESOIN ! Le logement est une priorité absolue. Ne jamais retarder le paiement du loyer." },
    { text: "S'abonner à 5 plateformes de streaming", category: "piege", icon: "tv", explanation: "C'est un PIÈGE ! 5 abonnements = 60-100 CHF/mois. Garde-en un ou deux maximum et partage avec ta famille." },
    { text: "Acheter un jeu vidéo en soldes", category: "envie", icon: "monitor", explanation: "C'est une ENVIE ! Les jeux vidéo sont un loisir, pas un besoin. Mais attendre les soldes est malin !" },
    { text: "Acheter des habits basiques (t-shirts, jeans)", category: "besoin", icon: "user", explanation: "C'est un BESOIN ! Tout le monde a besoin de vêtements. Mais achète l'essentiel, pas toute la collection !" },
    { text: "Prendre un abonnement de salle de sport à 80 CHF/mois", category: "envie", icon: "activity", explanation: "C'est une ENVIE ! Le sport est important, mais tu peux courir et faire des exercices dehors gratuitement." },
    { text: "Payer tes frais médicaux", category: "besoin", icon: "heart", explanation: "C'est un BESOIN ! La santé passe avant tout. Toujours payer ses factures médicales." },
    { text: "Acheter le dernier iPhone dès sa sortie", category: "piege", icon: "smartphone", explanation: "C'est un PIÈGE ! Ton téléphone actuel fonctionne sûrement encore. Attends qu'il soit vraiment cassé et achète un modèle moins cher." },
    { text: "Acheter un cadeau d'anniversaire pour un ami", category: "envie", icon: "gift", explanation: "C'est une ENVIE ! C'est gentil mais pas obligatoire. Un cadeau fait maison ou symbolique a autant de valeur !" },
    { text: "Souscrire une assurance maladie obligatoire", category: "obligatoire", icon: "shield", explanation: "C'est OBLIGATOIRE ! L'assurance maladie est une obligation légale en Suisse. Tu peux avoir des amendes si tu n'en as pas." },
    { text: "Payer tes impôts", category: "obligatoire", icon: "file-text", explanation: "C'est OBLIGATOIRE ! Les impôts sont une obligation légale. Ne pas les payer peut entraîner des poursuites très graves." },
    { text: "Payer ta prime de caisse maladie", category: "obligatoire", icon: "heart", explanation: "C'est OBLIGATOIRE ! La caisse maladie est obligatoire en Suisse, même pour les jeunes. Ne jamais sauter un paiement." },
    { text: "Rembourser un prêt bancaire", category: "obligatoire", icon: "alert-octagon", explanation: "C'est OBLIGATOIRE ! Si tu as signé un prêt, tu DOIS le rembourser. Sinon, tu risques des poursuites et un dossier négatif." }
];

let currentTriIndex = 0;
let triScore = 0;

function startTriGame() {
    currentTriIndex = 0;
    triScore = 0;
    
    // Mélanger les dépenses
    triDepenses.sort(() => Math.random() - 0.5);
    
    // Cacher l'écran de démarrage
    document.getElementById('tri-start').style.display = 'none';
    
    // Cacher l'écran de résultats
    document.getElementById('tri-results').style.display = 'none';
    
    // Afficher la zone de jeu
    document.getElementById('tri-play-area').style.display = 'block';
    
    // Afficher la première dépense
    showTriDepense();
}

function showTriDepense() {
    const depense = triDepenses[currentTriIndex];
    
    // Mettre à jour le score et la progression
    document.getElementById('tri-score').textContent = triScore;
    document.getElementById('tri-progress').textContent = `${currentTriIndex + 1}/${triDepenses.length}`;
    
    // Changer l'icône et les couleurs
    const iconColors = ['#4facfe', '#00f2fe', '#667eea', '#764ba2', '#f093fb', '#f5576c', '#43e97b', '#38f9d7'];
    const randomColor1 = iconColors[Math.floor(Math.random() * iconColors.length)];
    const randomColor2 = iconColors[Math.floor(Math.random() * iconColors.length)];
    
    // Recréer la structure complète de la carte
    const cardDiv = document.getElementById('tri-depense-card');
    cardDiv.innerHTML = `
        <div class="event-icon" id="tri-icon" style="background: linear-gradient(135deg, ${randomColor1}, ${randomColor2});">
            <i data-feather="${depense.icon}" style="width: 60px; height: 60px;"></i>
        </div>
        <h3 id="tri-depense" style="font-size: 1.6em; margin: 25px 0;">${depense.text}</h3>
        
        <!-- Boutons de tri -->
        <div style="display: grid; grid-template-columns: 1fr; gap: 15px; margin-top: 30px;">
            <button class="game-button" id="btn-besoin" onclick="classifyDepense('besoin')" 
                    style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; font-size: 1.1em; padding: 18px;">
                <i data-feather="check-circle" style="width: 24px; height: 24px; vertical-align: middle; margin-right: 10px;"></i>
                BESOIN
            </button>
            <button class="game-button" id="btn-envie" onclick="classifyDepense('envie')" 
                    style="background: linear-gradient(135deg, #f093fb, #f5576c); color: white; font-size: 1.1em; padding: 18px;">
                <i data-feather="heart" style="width: 24px; height: 24px; vertical-align: middle; margin-right: 10px;"></i>
                ENVIE
            </button>
            <button class="game-button" id="btn-piege" onclick="classifyDepense('piege')" 
                    style="background: linear-gradient(135deg, #fa709a, #fee140); color: white; font-size: 1.1em; padding: 18px;">
                <i data-feather="alert-triangle" style="width: 24px; height: 24px; vertical-align: middle; margin-right: 10px;"></i>
                PIÈGE
            </button>
            <button class="game-button" id="btn-obligatoire" onclick="classifyDepense('obligatoire')" 
                    style="background: linear-gradient(135deg, #ff0844, #ffb199); color: white; font-size: 1.1em; padding: 18px;">
                <i data-feather="alert-octagon" style="width: 24px; height: 24px; vertical-align: middle; margin-right: 10px;"></i>
                OBLIGATOIRE
            </button>
        </div>
    `;
    
    // Recharger les icônes
    feather.replace();
}

function classifyDepense(userCategory) {
    const depense = triDepenses[currentTriIndex];
    const isCorrect = userCategory === depense.category;
    
    // Mettre à jour le score
    if (isCorrect) {
        triScore += 10;
    }
    
    // Remplacer le contenu de la carte par le feedback
    const cardDiv = document.getElementById('tri-depense-card');
    const feedbackIcon = isCorrect ? 'check-circle' : 'x-circle';
    const feedbackColor = isCorrect ? 'var(--color-soft-green)' : 'var(--color-coral)';
    const feedbackTitle = isCorrect ? 'Exact !' : 'Pas tout à fait...';
    
    cardDiv.innerHTML = `
        <div class="event-icon" style="background: linear-gradient(135deg, ${feedbackColor}, ${isCorrect ? 'var(--color-soft-blue)' : 'var(--color-warning)'});">
            <i data-feather="${feedbackIcon}" style="width: 60px; height: 60px; color: white;"></i>
        </div>
        <h3 style="margin-top: 20px; color: ${feedbackColor};">${feedbackTitle}</h3>
        <p style="font-size: 1.2em; margin: 20px 0; line-height: 1.6;">${depense.explanation}</p>
        <p style="font-size: 1.1em; color: var(--color-soft-blue); font-weight: 600;">Score actuel : ${triScore} / ${triDepenses.length * 10}</p>
        <button class="game-button primary" onclick="nextTriDepense()" style="margin-top: 20px;">
            ${currentTriIndex < triDepenses.length - 1 ? 'Dépense suivante' : 'Voir mes résultats'}
            <i data-feather="arrow-right" style="width: 18px; height: 18px; margin-left: 8px; vertical-align: middle;"></i>
        </button>
    `;
    
    feather.replace();
}

function nextTriDepense() {
    currentTriIndex++;
    
    if (currentTriIndex < triDepenses.length) {
        showTriDepense();
    } else {
        showTriResults();
    }
}

function showTriResults() {
    // Cacher la zone de jeu
    document.getElementById('tri-play-area').style.display = 'none';
    
    // Afficher les résultats
    document.getElementById('tri-results').style.display = 'block';
    
    // Calculer le pourcentage
    const maxScore = triDepenses.length * 10;
    const percentage = (triScore / maxScore) * 100;
    
    // Déterminer le message
    let resultTitle, resultText, resultIcon, resultColor;
    
    if (percentage >= 90) {
        resultTitle = 'Expert !';
        resultText = 'Tu sais parfaitement distinguer les besoins, les envies et les pièges ! Tu es un champion de la gestion financière.';
        resultIcon = 'award';
        resultColor = 'var(--color-soft-green)';
    } else if (percentage >= 80) {
        resultTitle = 'Très bien !';
        resultText = 'Tu as de très bonnes bases ! Quelques petites confusions, mais tu es sur la bonne voie.';
        resultIcon = 'thumbs-up';
        resultColor = 'var(--color-soft-blue)';
    } else if (percentage >= 60) {
        resultTitle = 'Pas mal !';
        resultText = 'Tu comprends les grandes lignes, mais il faut encore affiner ton jugement. Rejoue pour t\'améliorer !';
        resultIcon = 'smile';
        resultColor = 'var(--color-warning)';
    } else {
        resultTitle = 'Continue d\'apprendre !';
        resultText = 'C\'est un bon début, mais tu dois encore travailler pour mieux distinguer les dépenses. Relis les sections et rejoue !';
        resultIcon = 'book';
        resultColor = 'var(--color-coral)';
    }
    
    // Afficher les résultats
    document.getElementById('tri-result-title').textContent = resultTitle;
    document.getElementById('tri-result-text').textContent = resultText;
    document.getElementById('tri-final-score').textContent = triScore;
    document.getElementById('tri-max-score').textContent = maxScore;
    
    const resultIconEl = document.querySelector('#tri-result-icon');
    resultIconEl.innerHTML = `<i data-feather="${resultIcon}" style="width: 60px; height: 60px;"></i>`;
    resultIconEl.style.background = `linear-gradient(135deg, ${resultColor}, var(--color-soft-blue))`;
    
    feather.replace();
}

// Event listeners pour le jeu Tri des Dépenses
document.getElementById('start-tri-game').addEventListener('click', startTriGame);
document.getElementById('restart-tri-game').addEventListener('click', startTriGame);

