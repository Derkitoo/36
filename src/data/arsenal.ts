// Données tactiques pour la Scénographie, le Profiler Greene, le Cold Reading et les Relances Voss

export interface TargetProfile {
  id: string;
  name: string;
  subtitle: string;
  avatar: string;
  traits: string[];
  trapToAvoid: string;
  recommendedPosture: string;
  priorityQuestions: number[]; // IDs des questions du Protocole 36 à poser en priorité
}

export const TARGET_PROFILES: TargetProfile[] = [
  {
    id: 'idealist',
    name: "L'Idéaliste Déçue",
    subtitle: "Recherche la transcendance, blasée des conversations tièdes",
    avatar: "✨",
    traits: [
      "Parle de livres, d'art, de voyages ou de sens de la vie",
      "Déteste les banalités du type 'tu fais quoi dans la vie'",
      "A déjà été déçue par des personnes superficielles"
    ],
    trapToAvoid: "Faire le mec pragmatique désabusé ou trop matériel. Cela brise son rêve immédiatement.",
    recommendedPosture: "Incarne l'authenticité sans concession et le romantisme lucide. Pose des questions profondes sans jamais paraître pressé.",
    priorityQuestions: [1, 9, 13, 17, 33]
  },
  {
    id: 'controller',
    name: "L'Ambitieuse de Contrôle",
    subtitle: "Habituée à mener, teste pour voir si vous avez du répondant",
    avatar: "👑",
    traits: [
      "Prend souvent l'initiative sur le choix du lieu ou de l'heure",
      "Évalue discrètement votre statut et votre ambition",
      "Déteste les hommes mous qui acquiescent à tout"
    ],
    trapToAvoid: "Entrer en compétition directe d'égo ou au contraire devenir un béni-oui-oui docile.",
    recommendedPosture: "Détachement absolu et calme olympien. Garde un sourire amusé quand elle tente de vous dominer verbalement.",
    priorityQuestions: [2, 6, 12, 15, 27]
  },
  {
    id: 'avoidant',
    name: "L'Évitante Indépendante",
    subtitle: "Chérie sa liberté par-dessus tout, fuit la demande d'attention",
    avatar: "🦅",
    traits: [
      "Change de sujet dès que la conversation devient trop intime trop vite",
      "A un emploi du temps très chargé et sur-investit sa carrière ou ses amis",
      "Hyper-sensible à la moindre tentative d'attachement prématuré"
    ],
    trapToAvoid: "Lui demander de la réassurance ou planifier le prochain rendez-vous avant la fin de la soirée.",
    recommendedPosture: "Donne-lui de l'espace. Montre que tu as ta propre vie bien remplie et que tu ne cherches pas à l'enfermer dans une cage.",
    priorityQuestions: [3, 4, 14, 20, 26]
  },
  {
    id: 'tester',
    name: "La Testeuse de Cadre",
    subtitle: "Envoie des piques pour mesurer votre solidité émotionnelle",
    avatar: "⚡",
    traits: [
      "Fait des remarques piquantes sur vos habits, vos choix ou votre statut",
      "Jauge si vous perdez vos moyens, si vous vous énervez ou vous justifiez",
      "Respecte uniquement ceux qui savent désamorcer ses tests avec humour"
    ],
    trapToAvoid: "Te justifier ('Non mais en fait je t'assure que...') ou te vexer.",
    recommendedPosture: "Autodérision et recadrage absurde. Embrasse la pique avec un rictus calme sans changer de tempo.",
    priorityQuestions: [5, 8, 22, 28, 32]
  },
  {
    id: 'guarded',
    name: "La Solitaire Réservée",
    subtitle: "Timide en surface, possède un monde intérieur d'une richesse rare",
    avatar: "🌙",
    traits: [
      "Met du temps à s'ouvrir, voix souvent douce et posée",
      "Observatrice aiguë, déteste les personnes bruyantes ou arrogantes",
      "A besoin d'un cadre sécurisant pour baisser sa garde"
    ],
    trapToAvoid: "Combler tous les silences par du bruit ou essayer de la forcer à être extravertie.",
    recommendedPosture: "Rythme vocal lent et chaleureux. Pose des questions de la Série I avec un intérêt sincère et laisse les silences respirer.",
    priorityQuestions: [7, 10, 16, 21, 30]
  }
];

export const SCENOGRAPHY_RULES = [
  {
    number: "01",
    title: "La Règle des 90° (Éliminer la confrontation)",
    principle: "Ne vous asseyez JAMAIS en face à face strict (confrontation d'entretien d'embauche ou de tribunal).",
    execution: "Choisissez une table ronde, ou asseyez-vous au comptoir d'un bar côte à côte, ou sur un angle de table à 90°. Cela permet de regarder ensemble vers l'extérieur et de briser la tension d'intimité quand nécessaire."
  },
  {
    number: "02",
    title: "La Dilatation Pupillaire (Lumière chaude & tamisée)",
    principle: "En psychologie évolutive, des pupilles dilatées sont le signal subconscient numéro 1 de l'attirance sexuelle et de l'intérêt.",
    execution: "Bannissez les endroits aux néons blancs agressifs. Privilégiez un bar tamisé aux lumières ambrées. Le cerveau de votre interlocuteur assimilera inconsciemment ses pupilles dilatées par la pénombre à un coup de cœur."
  },
  {
    number: "03",
    title: "Le Pont de Capilano (Le transfert d'adrénaline)",
    principle: "Le cerveau humain confond la montée physiologique de l'excitation (changement de lieu, micro-aventure) avec l'attirance amoureuse.",
    execution: "Ne restez jamais 3 heures assis sur les mêmes chaises. Faites 2 lieux dans la même soirée (ex: un premier verre dans un bar intimiste, puis une marche de 10 min vers un spot de dessert ou un toit). Deux lieux = l'impression d'avoir vécu plusieurs dates en un."
  }
];

export interface ColdReadingItem {
  id: string;
  label: string;
  phrase: string;
  psychologicalImpact: string;
}

export const COLD_READINGS: ColdReadingItem[] = [
  {
    id: 'cr-1',
    label: "L'Observatrice Secrète",
    phrase: "Tu donnes souvent l'impression d'être très sociable et facile d'accès, mais au fond, il y a une part très réservée de toi que presque personne ne connaît vraiment. Tu sélectionnes minutieusement ceux à qui tu ouvres la porte.",
    psychologicalImpact: "Effet Barnum universel. 95% des gens s'identifient à cette dualité et ont le sentiment que vous lisez directement dans leur âme."
  },
  {
    id: 'cr-2',
    label: "L'Intuitive Incomprise",
    phrase: "Tu as un radar très développé pour sentir l'hypocrisie chez les gens dès les premières minutes. Souvent tu gardes ça pour toi pour ne pas créer d'histoires, mais ton premier pressentiment s'avère presque toujours exact.",
    psychologicalImpact: "Valide son égo intuitif. Elle aura l'impression immédiate d'être sur la même longueur d'onde télépathique que vous."
  },
  {
    id: 'cr-3',
    label: "L'Ambitieuse Contrainte",
    phrase: "Il y a un grand décalage entre ce que les gens attendent de toi (la personne raisonnable et organisée) et ton envie viscérale d'envoyer parfois tout valser pour vivre des aventures imprévues.",
    psychologicalImpact: "Donne une autorisation implicite de lâcher prise et d'extérioriser son côté aventurier avec vous."
  },
  {
    id: 'cr-4',
    label: "La Fausse Cynique",
    phrase: "Tu joues parfois un peu les cyniques ou les détachées pour te protéger, mais au fond de toi, tu as un idéalisme presque intact sur les relations humaines. Tu préfères être seule que mal accompagnée.",
    psychologicalImpact: "Idéal pour les personnes piquantes ou dures en apparence : cela désarme leur armure en 10 secondes."
  }
];

export interface VossTechnique {
  id: string;
  name: string;
  category: string;
  script: string;
  context: string;
}

export const VOSS_TECHNIQUES: VossTechnique[] = [
  {
    id: 'voss-1',
    name: "L'Étiquetage Émotionnel (Labeling)",
    category: "Faire parler sans interroger",
    script: "On dirait que cette période de ta vie a été beaucoup plus lourde à porter que ce que tu laisses paraître...",
    context: "À prononcer sur un ton calme et descendant (voix de DJ de nuit). L'autre se sent comprise et se met à raconter tous les détails spontanément."
  },
  {
    id: 'voss-2',
    name: "Le Mirroring (L'Effet Miroir)",
    category: "Relancer sur un mot-clé",
    script: "[Répéter les 3 derniers mots avec intonation interrogative] '...plus jamais confiance ?' puis silence total.",
    context: "Force l'autre à élaborer et expliciter sa pensée sans avoir l'impression de subir un interrogatoire."
  },
  {
    id: 'voss-3',
    name: "L'Audit d'Accusation",
    category: "Désamorcer un malaise",
    script: "Tu vas probablement penser que je suis trop curieux ou que cette question arrive trop tôt dans la soirée, mais...",
    context: "Exagère la critique négative avant qu'elle ne la formule. Cela neutralise toute défiance psychologique."
  },
  {
    id: 'voss-4',
    name: "La Question Calibrée par le 'NON'",
    category: "Obtenir un accord sans pression",
    script: "Est-ce que ce serait une mauvaise idée si on commandait un deuxième verre ailleurs ?",
    context: "Les gens détestent dire OUI (sensation de piège) mais adorent dire NON (sentiment de sécurité et de contrôle)."
  }
];

export const PEAK_END_RULE = {
  title: "La Règle Pic-Fin (Kahneman) : L'Art du Climax et du Départ",
  principle: "La mémoire humaine ne conserve pas la durée d'une soirée, mais uniquement deux instants : l'émotion la plus intense (le Pic) et la manière dont elle s'est terminée (la Fin).",
  rules: [
    "Ne partez JAMAIS quand la soirée commence à s'essouffler ou que les bâillements arrivent.",
    "Partez juste après l'exercice des 4 minutes ou un fou rire partagé, au sommet de la complicité.",
    "Formule de départ chirurgicale : 'J'ai passé un moment exceptionnel, mais je dois être raisonnable pour demain. On s'arrête sur cette note parfaite.' Laissez-la sur sa faim."
  ]
};
