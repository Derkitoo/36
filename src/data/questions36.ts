export interface ProtocolQuestion {
  id: number;
  set: 1 | 2 | 3;
  question: string;
  category: string;
  tacticalInsight: string; // Ce que la question révèle chez l'autre
  signalsToWatch: string;  // Indices non-verbaux et comportementaux à observer
  suggestedAnswer: string; // Réponse magnétique si l'autre vous retourne la question
}

export const QUESTIONS_36: ProtocolQuestion[] = [
  // ==========================================
  // SÉRIE 1 : CURIOSITÉ & BRISE-GLACE (1 à 12)
  // ==========================================
  {
    id: 1,
    set: 1,
    category: "Idéaux & Aspirations",
    question: "Si tu pouvais inviter n'importe qui dans le monde à dîner, qui choisirais-tu ?",
    tacticalInsight: "Révèle ses figures d'admiration, ses fantasmes intellectuels ou de statut. Une personne qui choisit un proche montre un attachement sécurisant, tandis qu'un choix historique ou de pouvoir montre une soif d'ambition.",
    signalsToWatch: "Hésitation = peur d'être jugée sur ses goûts. Réponse rapide = projection d'une identité très affirmée.",
    suggestedAnswer: "Évite les clichés comme Gandhi ou Einstein. Choisis un personnage atypique qui illustre ta curiosité ou ton goût de l'aventure, puis explique la question précise que tu lui poserais."
  },
  {
    id: 2,
    set: 1,
    category: "Statut & Égo",
    question: "Aimerais-tu être célèbre ? De quelle manière ?",
    tacticalInsight: "Teste son besoin de validation externe et son rapport à la discrétion. Les personnalités anxieuses ou narcissiques cherchent la célébrité de masse ; les personnalités de pouvoir préfèrent l'influence discrète.",
    signalsToWatch: "Regarde si ses yeux s'illuminent en imaginant les regards tournés vers elle, ou si elle grimace en pensant à la perte d'intimité.",
    suggestedAnswer: "Dis que la notoriété de masse est une prison, mais que la reconnaissance de ses pairs pour une œuvre singulière est la seule forme d'influence qui en vaille la peine."
  },
  {
    id: 3,
    set: 1,
    category: "Contrôle & Spontanéité",
    question: "Avant de téléphoner, t'arrive-t-il de répéter ce que tu vas dire ? Pourquoi ?",
    tacticalInsight: "Mesure directe de son anxiété sociale et de son perfectionnisme. Cela vous indique à quel point elle calcule son image publique.",
    signalsToWatch: "Un sourire gêné indique qu'elle le fait souvent mais craint de paraître névrosée.",
    suggestedAnswer: "Admets-le avec humour pour les appels délicats ou négociations à fort enjeu. Cela montre que tu es stratégique sans être rigide."
  },
  {
    id: 4,
    set: 1,
    category: "Valeurs & Plaisir",
    question: "À quoi ressemblerait une journée 'parfaite' pour toi ?",
    tacticalInsight: "Distingue les hédonistes passifs (dormir, séries) des bâtisseurs d'expériences (créer, voyager, partager). C'est la boussole de son rythme de vie.",
    signalsToWatch: "Inclut-elle d'autres personnes dans sa journée ou est-ce une journée solitaire de déconnexion ?",
    suggestedAnswer: "Décris une journée équilibrée : un accomplissement stimulant le matin, un moment d'immersion physique ou esthétique l'après-midi, et une soirée intimiste captivante."
  },
  {
    id: 5,
    set: 1,
    category: "Expression Émotionnelle",
    question: "Quand as-tu chanté pour toi-même pour la dernière fois ? Et pour quelqu'un d'autre ?",
    tacticalInsight: "Évalue son niveau de lâcher-prise et sa spontanéité dans l'intimité.",
    signalsToWatch: "Si chanter devant autrui la terrifie, elle a un fort verrouillage du regard de l'autre.",
    suggestedAnswer: "Raconte une anecdote légère et autodérisoire (sous la douche ou en voiture), sans chercher à prouver un talent de chanteur."
  },
  {
    id: 6,
    set: 1,
    category: "Rapport au Temps & à l'Âge",
    question: "Si tu pouvais vivre jusqu'à 90 ans en gardant soit l'esprit, soit le corps d'une personne de 30 ans pour les 60 dernières années, que choisirais-tu ?",
    tacticalInsight: "Dilemme cérébral vs esthétique/physique. Révèle si son estime personnelle repose sur son intellect ou sur son corps.",
    signalsToWatch: "Si elle hésite longuement, elle est attachée aux deux avec la même intensité.",
    suggestedAnswer: "Choisis l'esprit sans hésiter. Dis que la lucidité permet de vivre pleinement même avec des rides, alors qu'un beau corps sans discernement est une coquille vide."
  },
  {
    id: 7,
    set: 1,
    category: "Pressentiment & Finitude",
    question: "As-tu un pressentiment secret sur la façon dont tu vas mourir ?",
    tacticalInsight: "Plongeon soudain vers la mortalité. Teste sa superstition, ses angoisses viscérales ou son détachement philosophique.",
    signalsToWatch: "Une rupture soudaine de légèreté. Regarde si elle esquive par une blague ou si elle partage une peur intime.",
    suggestedAnswer: "Réponds sur un ton calme : 'Vieux, fatigué d'avoir trop vécu d'aventures et sans regrets, probablement en m'endormant tranquillement.' Évite le tragique."
  },
  {
    id: 8,
    set: 1,
    category: "Miroir Relationnel",
    question: "Nomme 3 choses que nous semblons avoir en commun.",
    tacticalInsight: "Question charnière du protocole ! Elle force l'autre à chercher des points de connexion et à fabriquer activement de la synchronisation avec vous.",
    signalsToWatch: "Note si elle cite des faits superficiels (habits, boissons) ou des traits de personnalité profonds (humour piquant, curiosité, ambition).",
    suggestedAnswer: "Cite 2 traits observés avec finesse (ex: le refus des conversations banales, un certain goût du risque) et 1 trait amusant ou sensoriel."
  },
  {
    id: 9,
    set: 1,
    category: "Gratitude & Fondations",
    question: "Pour quoi te sens-tu le plus reconnaissant(e) dans ta vie ?",
    tacticalInsight: "Révèle ce qu'elle ne prend jamais pour acquis : sa famille, son indépendance chèrement acquise, sa résilience ou ses succès.",
    signalsToWatch: "Si sa reconnaissance va vers des personnes concrètes, elle valorise la loyauté.",
    suggestedAnswer: "Exprime de la gratitude pour les épreuves qui ont forgé ta solidité émotionnelle, plutôt que simplement pour des privilèges matériels."
  },
  {
    id: 10,
    set: 1,
    category: "Origines & Éducation",
    question: "Si tu pouvais changer quelque chose dans la façon dont tu as été élevé(e), que changerais-tu ?",
    tacticalInsight: "L'une des questions les plus puissantes de la Série 1. Elle ouvre la porte aux blessures d'enfance, aux dynamiques parentales et aux manques émotionnels structurants.",
    signalsToWatch: "Le ton de voix change souvent ici : écoute attentivement les reproches cachés envers ses figures parentales.",
    suggestedAnswer: "Sois mesuré : mentionne que tu aurais aimé apprendre plus tôt l'indépendance financière ou l'acceptation de l'échec, sans dénigrer ta famille."
  },
  {
    id: 11,
    set: 1,
    category: "Storytelling Personnel",
    question: "Prends 4 minutes et raconte ton histoire de vie à ton partenaire avec le plus de détails possible.",
    tacticalInsight: "Évalue son cadre narratif : se raconte-t-elle comme une victime des circonstances, une battante héroïque, ou une exploratrice curieuse ?",
    signalsToWatch: "Laisse-la parler sans l'interrompre. Les silences qu'elle laisse révèlent les périodes qu'elle préfère occulter.",
    suggestedAnswer: "Structure ton récit en 3 actes : D'où tu viens (origines), l'obstacle qui a tout changé (l'épreuve), et la direction précise où tu te diriges aujourd'hui."
  },
  {
    id: 12,
    set: 1,
    category: "Désir & Pouvoir",
    question: "Si tu pouvais te réveiller demain avec une compétence ou une qualité en plus, laquelle choisirais-tu ?",
    tacticalInsight: "Expose son plus grand complexe ou sa frustration actuelle (manque de patience, de charisme, de maîtrise des langues, de courage).",
    signalsToWatch: "Une compétence créative indique un manque d'expression ; une compétence relationnelle indique un désir de séduction ou de leadership.",
    suggestedAnswer: "Choisis une compétence d'anticipation ou de lecture intuitive des gens. C'est cohérent avec une posture de stratège élégant."
  },

  // ==========================================
  // SÉRIE 2 : INTIMITÉ & VALEURS (13 à 24)
  // ==========================================
  {
    id: 13,
    set: 2,
    category: "Vérité & Quête",
    question: "Si une boule de cristal pouvait te révéler la vérité sur toi-même, ta vie, ton avenir ou quoi que ce soit d'autre, que voudrais-tu savoir ?",
    tacticalInsight: "Révèle sa plus grande incertitude existentielle : l'amour durable, le succès matériel ou la santé de ses proches.",
    signalsToWatch: "Si elle refuse de savoir l'avenir, elle valorise l'illusion de contrôle ou le frisson de l'inconnu.",
    suggestedAnswer: "Dis que tu ne voudrais pas connaître l'issue de ta vie, car c'est l'incertitude qui donne du goût au combat, mais que tu aimerais savoir si tes choix actuels sont alignés avec ton potentiel maximal."
  },
  {
    id: 14,
    set: 2,
    category: "Rêves Inaboutis",
    question: "Y a-t-il quelque chose dont tu rêves depuis longtemps ? Pourquoi ne l'as-tu pas encore fait ?",
    tacticalInsight: "Identifie son facteur limitant interne (peur de l'échec, dépendance financière, regard des parents, confort passif).",
    signalsToWatch: "Cherche-t-elle des excuses externes ('je n'ai pas eu de chance') ou prend-elle la responsabilité de son report ?",
    suggestedAnswer: "Parle d'un projet ambitieux en cours de préparation en assumant le timing nécessaire pour l'exécuter avec excellence."
  },
  {
    id: 15,
    set: 2,
    category: "Fierté Personnelle",
    question: "Quelle est la plus grande réussite de ta vie jusqu'à présent ?",
    tacticalInsight: "Montre où se situe son étalon de valeur : une promotion, avoir surmonté une rupture, avoir aidé quelqu'un, ou avoir osé tout quitter.",
    signalsToWatch: "Fausse modestie vs fierté authentique et assumée.",
    suggestedAnswer: "Choisis un accomplissement où tu as dû faire preuve de courage contre l'avis de la majorité."
  },
  {
    id: 16,
    set: 2,
    category: "Piliers d'Amitié",
    question: "Qu'est-ce qui a le plus de valeur en amitié pour toi ?",
    tacticalInsight: "Révèle ses lignes rouges relationnelles : la loyauté absolue, la transparence brutale, ou la présence inconditionnelle.",
    signalsToWatch: "Si elle répond 'la loyauté', elle a probablement déjà été trahie dans le passé.",
    suggestedAnswer: "La loyauté discrète et la capacité à se dire des vérités désagréables avec bienveillance, sans jamais en parler dans le dos de l'autre."
  },
  {
    id: 17,
    set: 2,
    category: "Mémoire Heureuse",
    question: "Quel est ton souvenir le plus précieux ?",
    tacticalInsight: "Active les circuits dopaminergiques et l'ancrage émotionnel positif. Le souvenir qu'elle convoque devient associé à votre présence.",
    signalsToWatch: "Regarde sa respiration ralentir et ses traits du visage s'adoucir lorsqu'elle revisite ce moment.",
    suggestedAnswer: "Évoque un souvenir sensoriel riche en détails : un voyage spontané, un lever de soleil après une nuit de discussions passionnées."
  },
  {
    id: 18,
    set: 2,
    category: "Blessures & Traumatismes",
    question: "Quel est ton souvenir le plus terrible ?",
    tacticalInsight: "Zone de haute vulnérabilité. Elle teste votre capacité à accueillir son obscurité sans fuir ni la juger.",
    signalsToWatch: "Contact visuel rompu, voix qui faiblit. Restez parfaitement calme et attentif.",
    suggestedAnswer: "Partage un moment difficile de perte ou de désillusion, mais montre immédiatement comment cela vous a endurci et rendu plus clairvoyant."
  },
  {
    id: 19,
    set: 2,
    category: "Urgence Existentielle",
    question: "Si tu savais que tu allais mourir subitement dans un an, changerais-tu quelque chose à ta façon de vivre ? Pourquoi ?",
    tacticalInsight: "Met en lumière le décalage entre ce qu'elle fait au quotidien et ce qu'elle désire profondément au fond d'elle.",
    signalsToWatch: "Une pause silencieuse profonde. C'est l'indice d'une prise de conscience intime.",
    suggestedAnswer: "Dis que tu passerais moins de temps avec les personnes tièdes ou transactionnelles pour te consacrer exclusivement à ceux qui comptent."
  },
  {
    id: 20,
    set: 2,
    category: "Définition de l'Amitié",
    question: "Que signifie l'amitié pour toi ?",
    tacticalInsight: "Clarifie le contrat moral qu'elle passe tacitement avec ses intimes.",
    signalsToWatch: "Considère-t-elle l'amitié comme une fête légère ou comme un pacte d'entraide indestructible ?",
    suggestedAnswer: "Un sanctuaire où les masques sociaux tombent et où l'on peut réfléchir à voix haute sans craindre d'être mal compris."
  },
  {
    id: 21,
    set: 2,
    category: "Amour & Affection",
    question: "Quel rôle jouent l'amour et l'affection dans ta vie ?",
    tacticalInsight: "Permet de diagnostiquer son style d'attachement (sécure, évitant ou anxieux).",
    signalsToWatch: "Une minimisation excessive ('je n'en ai pas vraiment besoin') trahit souvent un style évitant protecteur.",
    suggestedAnswer: "L'amour est le carburant le plus puissant, mais seulement s'il est fondé sur le respect mutuel et la liberté réciproque, pas sur le besoin comblé."
  },
  {
    id: 22,
    set: 2,
    category: "Échange de Compliments",
    question: "Partagez alternativement 5 qualités positives que vous appréciez chez l'autre (5 chacun).",
    tacticalInsight: "Création massive d'intimité par validation réciproque. La règle du protocole exige d'inclure des choses que vous ne diriez pas à un inconnu.",
    signalsToWatch: "Observez le rougissement ou la gêne délicieuse lorsqu'elle reçoit un compliment sur sa personnalité profonde.",
    suggestedAnswer: "Complimente son regard, sa finesse d'esprit, son débit de voix ou sa façon d'écouter, plutôt que ses vêtements."
  },
  {
    id: 23,
    set: 2,
    category: "Famille & Racines",
    question: "Ta famille est-elle chaleureuse et unie ? As-tu l'impression que ton enfance a été plus heureuse que celle de la plupart des gens ?",
    tacticalInsight: "Révèle la solidité ou la fracture de son socle sécuritaire d'origine.",
    signalsToWatch: "L'amertume ou la nostalgie dans l'intonation.",
    suggestedAnswer: "Reconnais les forces et les failles de ta cellule familiale avec bienveillance et maturité."
  },
  {
    id: 24,
    set: 2,
    category: "La Relation Mère",
    question: "Que penses-tu de ta relation avec ta mère ?",
    tacticalInsight: "En psychologie dynamique, le rapport à la mère conditionne souvent la capacité à faire confiance et la peur de l'abandon ou de l'étouffement.",
    signalsToWatch: "Une réponse ultra-défensive ('tout est parfait') est souvent le signe d'un tabou non résolu.",
    suggestedAnswer: "Parle de l'évolution de votre lien : le passage de la dépendance infantile à une relation d'adultes lucides et respectueux."
  },

  // ==========================================
  // SÉRIE 3 : VULNÉRABILITÉ PROFONDE & LIEN (25 à 36)
  // ==========================================
  {
    id: 25,
    set: 3,
    category: "Affirmations du 'NOUS'",
    question: "Faites 3 déclarations véridiques commençant par 'Nous'. Par exemple : 'Nous sommes tous les deux dans cette pièce en train de...'",
    tacticalInsight: "Bascule linguistique vers le couple psychologique. Le mot 'Nous' crée instantanément un univers partagé.",
    signalsToWatch: "Sourit-elle en formulant un 'Nous' intime ? C'est le signal d'un consentement émotionnel clair.",
    suggestedAnswer: "'Nous sommes tous les deux surpris par la tournure de cette conversation', ou 'Nous avons tous les deux laissé tomber nos défenses habituelles ce soir.'"
  },
  {
    id: 26,
    set: 3,
    category: "Manque & Désir",
    question: "Complète cette phrase : 'J'aimerais avoir quelqu'un avec qui partager...'",
    tacticalInsight: "Exprime le vide émotionnel le plus urgent qu'elle ressent actuellement dans sa vie.",
    signalsToWatch: "Écoute si son désir est pragmatique (voyager) ou viscéral (les silences complices, les doutes intimes).",
    suggestedAnswer: "'...les victoires que personne d'autre ne peut comprendre, et les moments où l'on a juste besoin d'être soi-même sans performer.'"
  },
  {
    id: 27,
    set: 3,
    category: "Pacte de Proximité",
    question: "Si tu devais devenir un(e) ami(e) proche de ton partenaire ce soir, dis-lui ce qu'il/elle devrait absolument savoir d'important sur toi.",
    tacticalInsight: "Invitation explicite à dévoiler son mode d'emploi relationnel et ses zones d'ombres.",
    signalsToWatch: "Si elle donne un avertissement sincère ('j'ai du mal à exprimer quand je suis blessée'), notez-le mentalement.",
    suggestedAnswer: "Donne une clé d'accès sincère : par exemple, ta façon de réagir quand tu es stressé et ce dont tu as besoin pour te ressourcer."
  },
  {
    id: 28,
    set: 3,
    category: "Transparence Aiguë",
    question: "Dis à ton partenaire ce que tu aimes déjà chez lui ; sois très honnête cette fois, en disant des choses que tu ne dirais pas à quelqu'un que tu viens de rencontrer.",
    tacticalInsight: "Casse le filtre de politesse conventionnel. Cette question précipite l'attirance en verbalisant des détails intimes.",
    signalsToWatch: "Regarde ses yeux chercher les tiens. La tension magnétique atteint son pic ici.",
    suggestedAnswer: "Focalise-toi sur une micro-expression captivante : 'J'aime la façon dont ton regard s'intensifie quand tu cherches tes mots, ça montre que tu ne parles pas pour ne rien dire.'"
  },
  {
    id: 29,
    set: 3,
    category: "Honte & Vulnérabilité",
    question: "Partage avec ton partenaire un moment embarrassant de ta vie.",
    tacticalInsight: "Désamorce le piédestal et humanise instantanément la dynamique. La vulnérabilité partagée scelle l'attachement.",
    signalsToWatch: "L'éclat de rire complice après avoir avoué une situation ridicule.",
    suggestedAnswer: "Raconte une gaffe sociale ou un moment d'inattention sans gravité mais très drôle visuellement."
  },
  {
    id: 30,
    set: 3,
    category: "Larmes & Pudeur",
    question: "Quand as-tu pleuré devant une autre personne pour la dernière fois ? Et tout(e) seul(e) ?",
    tacticalInsight: "Accès direct au monde émotionnel souterrain. Permet de savoir comment elle gère la tristesse ou l'accablement.",
    signalsToWatch: "Si elle a honte de pleurer seule, elle porte une armure lourde au quotidien.",
    suggestedAnswer: "Parle d'un moment où l'émotion t'a submergé (face à une œuvre d'art, un deuil ou un soulagement intense), avec noblesse et calme."
  },
  {
    id: 31,
    set: 3,
    category: "Ancrage Positif Réciproque",
    question: "Dis à ton partenaire une chose que tu apprécies déjà particulièrement chez lui/elle.",
    tacticalInsight: "Deuxième renforcement de validation directe pour ancrer le sentiment de privilège réciproque.",
    signalsToWatch: "La chaleur dans la voix et le sourire naturel.",
    suggestedAnswer: "Valide son authenticité : 'Ta capacité à jouer le jeu de ce protocole avec sincérité, sans cynisme ni fausse posture.'"
  },
  {
    id: 32,
    set: 3,
    category: "Lignes Rouges Sacrées",
    question: "S'il y a quelque chose dont on ne peut pas rire, qu'est-ce que c'est pour toi ?",
    tacticalInsight: "Révèle son tabou ultime ou son point de sensibilité maximale.",
    signalsToWatch: "Le ton devient subitement sérieux. Mémorisez cette ligne rouge pour ne jamais la franchir maladroitement.",
    suggestedAnswer: "On peut rire de presque tout si l'intention n'est pas de détruire ou d'humilier délibérément une personne vulnérable."
  },
  {
    id: 33,
    set: 3,
    category: "Le Poids des Non-Dits",
    question: "Si tu devais mourir ce soir sans possibilité de communiquer avec qui que ce soit, que regretterais-tu le plus de ne pas avoir dit à quelqu'un ? Pourquoi ne l'as-tu pas encore dit ?",
    tacticalInsight: "Exhume les conflits irrésolus et les déclarations d'amour refoulées.",
    signalsToWatch: "Le regard dans le vide qui pense à une personne très précise.",
    suggestedAnswer: "Évoque un merci ou un pardon qu'on retarde souvent par orgueil, et réaffirme que cette question donne envie de le régler sans attendre."
  },
  {
    id: 34,
    set: 3,
    category: "Attachement Matériel vs Vital",
    question: "Ta maison prend feu avec tout ce que tu possèdes. Après avoir sauvé tes proches et tes animaux, il te reste le temps de sauver un seul objet. Quel est-il et pourquoi ?",
    tacticalInsight: "Distingue l'attachement aux souvenirs (lettres, journal intime, disque vinyle) de l'attachement pragmatique (disque dur, passeport).",
    signalsToWatch: "La valeur symbolique qu'elle attribue à cet objet révèle son noyau affectif.",
    suggestedAnswer: "Choisis un objet symbolique de mémoire familiale ou de création personnelle, irremplaçable par de l'argent."
  },
  {
    id: 35,
    set: 3,
    category: "La Mort dans le Cercle",
    question: "De toutes les personnes de ta famille, quelle mort te toucherait le plus profondément ? Pourquoi ?",
    tacticalInsight: "Question chirurgicale sur son pilier affectif central. Elle expose qui est la personne qui la maintient debout.",
    signalsToWatch: "Une grande retenue émotionnelle. Respectez absolument la solennité de cet aveu.",
    suggestedAnswer: "Nomme la personne qui t'a offert une sécurité inconditionnelle et décris brièvement son empreinte sur toi."
  },
  {
    id: 36,
    set: 3,
    category: "Demande d'Aide & Effet Benjamin Franklin",
    question: "Partage un problème personnel avec ton partenaire et demande-lui conseil sur la façon dont il/elle le gérerait. Demande-lui aussi de te dire ce que ton problème semble révéler sur toi.",
    tacticalInsight: "Apothéose du protocole : demander un conseil intime déclenche l'effet Benjamin Franklin (nous nous attachons à ceux que nous aidons). L'effet miroir final scelle une complicité quasi indestructible.",
    signalsToWatch: "Son implication totale à vous aider et l'acuité de son regard sur votre posture.",
    suggestedAnswer: "Partage un vrai dilemme moral ou stratégique (ex: trancher entre la sécurité d'un confort et l'audace d'un risque élevé) et écoute sa vision avec une attention absolue."
  }
];

export const EYE_CONTACT_EXERCISE = {
  title: "L'Épreuve Finale : 4 Minutes de Silence Yeux dans les Yeux",
  description: "Posez vos téléphones ou écrans. Ne parlez plus. Maintenez le contact visuel direct pendant exactement 4 minutes sans détourner le regard. Les premières secondes font sourire par gêne, puis l'intimité physiologique prend le relais.",
  durationSeconds: 240,
};
