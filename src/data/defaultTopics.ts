import { SafetyTopic } from '../types';

export const DEFAULT_SAFETY_TOPICS: SafetyTopic[] = [
  {
    id: 'hauteur_01',
    title: 'Travaux en Hauteur : Zéro compromis avec la chute',
    category: 'Hauteur',
    sector: 'BTP, Maintenance, Industrie, Télécoms',
    summary: 'La chute de hauteur reste la 2ème cause d\'accidents mortels au travail. 15 minutes pour réviser la vérification des ancrages, le port effectif du harnais et l\'interdiction des moyens de fortune.',
    keyStat: '65 000 chutes de hauteur / an en France, dont plus de 10% avec séquelles graves ou décès (INRS).',
    goldenRule: 'Dès 1 mètre ou en bord de vide : protection collective prioritaire, sinon harnais relié à un point d\'ancrage certifié.',
    level: 'Essentiel',
    phases: [
      {
        number: 1,
        title: 'Accroche & Éveil (2 min)',
        durationMinutes: 2,
        leaderNotes: 'Démarrez par une question directe à l\'équipe. Pas de blâme : faites témoigner sur les situations vécues récemment (échelle qui glisse, garde-corps manquant).',
        keyPoints: [
          'Une chute de 2,5 mètres équivaut à un choc direct contre le sol à 25 km/h.',
          'La gravité n\'a pas de jour de repos : 70% des chutes surviennent sur des tâches rapides de moins de 10 minutes.'
        ]
      },
      {
        number: 2,
        title: 'Règles Vitales & Bonnes Pratiques (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Montrez la différence entre un moyen d\'accès (ex: échelle/escabeau) et un poste de travail sécurisé (PIRL, échafaudage).',
        keyPoints: [
          'Vérifier la date de validité et l\'état des sangles de harnais et longes avant chaque enfilage.',
          'Règle des 3 points d\'appui permanents sur les échelles d\'accès.',
          'Ne jamais shunter un garde-corps ou monter sur un fût / bidon pour gagner 50 cm.'
        ]
      },
      {
        number: 3,
        title: 'Cas Pratique & Débat Équipe (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Proposez le scénario du dilemme et animez le mini-quiz. Laissez l\'équipe argumenter.',
        keyPoints: [
          'Que fait-on si le point d\'ancrage est trop éloigné de la zone d\'intervention ?',
          'Comment réagir face à un collègue qui grimpe sans s\'attacher sous prétexte "qu\'il en a pour 30 secondes" ?'
        ]
      },
      {
        number: 4,
        title: 'Engagements & Tour de table (3 min)',
        durationMinutes: 3,
        leaderNotes: 'Faites formuler 1 à 2 engagements concrets par les opérateurs eux-mêmes.',
        keyPoints: [
          'Interdiction formelle des échelles comme poste de travail sans dérogation spécifique.',
          'Contrôle visuel systématique de l\'échafaudage (panneau vert/rouge) avant d\'y poser le pied.'
        ]
      }
    ],
    dosAndDonts: {
      dos: [
        'Vérifier le panneau de réception de l\'échafaudage avant de monter',
        'Régler son harnais au plus près du corps (cuissardes et sous-fessière bien ajustées)',
        'Signaler immédiatement tout platelage manquant ou plinthe déboîtée',
        'Utiliser une PIRL (Plateforme Individuelle Roulante Légère) pour les travaux de second œuvre'
      ],
      donts: [
        'Travailler sur les deux derniers échelons d\'un escabeau sans garde-corps',
        'Accrocher sa longe à un tuyau de fluide ou chemin de câble non homologué',
        'Déposer du matériel lourd au bord du vide sans filet ou plinthe anti-chute d\'objets',
        'Monter par temps d\'orage ou vent violent supérieur à 50 km/h sans consigne spécifique'
      ]
    },
    icebreakerQuestions: [
      'Avez-vous déjà ressenti un moment de flottement ou de déséquilibre sur un chantier ? Qu\'est-ce qui aurait pu mal tourner ?',
      'Qui dans l\'équipe a déjà refusé de monter sur une structure qui ne lui semblait pas sûre ?'
    ],
    dilemmaScenario: {
      scenario: 'Il est 16h45. Vous devez resserrer un collier à 3 mètres de haut. L\'échafaudage roulant a été démonté il y a 1 heure par l\'autre équipe. Il ne reste qu\'une simple échelle non attachée.',
      question: 'Prenez-vous l\'échelle pour finir la journée ou stoppez-vous l\'intervention ?',
      goodReaction: 'On stoppe immédiatement. On prévient le chef d\'équipe pour trouver une PIRL ou reprogrammer. 10 minutes gagnées ne valent pas 6 mois d\'arrêt ou une invalidité.'
    },
    quiz: [
      {
        question: 'L\'échelle est considérée par le Code du Travail comme :',
        options: [
          'Un poste de travail standard pour tout type d\'opération',
          'Un moyen d\'accès uniquement, sauf impossibilité technique prouvée et tâche courte',
          'Un équipement utilisable sans limite de hauteur si quelqu\'un tient le bas'
        ],
        correctIndex: 1,
        explanation: 'L\'échelle est un moyen d\'accès et non un poste de travail. L\'utilisation pour travailler doit rester exceptionnelle pour des travaux très ponctuels et de faible hauteur.'
      },
      {
        question: 'Quelle est la distance maximale de tirant d\'air requise lors de l\'utilisation d\'un absorbeur d\'énergie ?',
        options: [
          'Toujours moins de 2 mètres',
          'Entre 4 et 6 mètres selon la longe et le déploiement de l\'absorbeur',
          'Le tirant d\'air n\'a pas d\'importance si le harnais est serré'
        ],
        correctIndex: 1,
        explanation: 'Le tirant d\'air (hauteur libre sous les pieds) doit prendre en compte la longueur de la longe + le déploiement de l\'absorbeur (jusqu\'à 1,75 m) + la taille de la personne + 1 m de marge de sécurité (souvent 5 à 6 m au total).'
      },
      {
        question: 'Vrai ou Faux : Si un garde-corps me gêne pour passer une palette, je peux le démonter seul sans prévenir personne.',
        options: [
          'Vrai, tant que je le remets tout de suite après',
          'Faux, toute modification de protection collective nécessite l\'autorisation et un balisage'
        ],
        correctIndex: 1,
        explanation: 'Interdiction formelle de modifier une protection collective sans balisage et sans mise en place d\'une protection individuelle de substitution.'
      }
    ],
    recommendedCommitments: [
      'Je contrôle mon harnais et mes longes avant chaque prise de poste',
      'Je refuse d\'utiliser une échelle comme poste de travail permanent',
      'J\'avertis immédiatement mon équipe si je constate un garde-corps manquant'
    ]
  },
  {
    id: 'epi_02',
    title: 'Port effectif des EPI : Nos boucliers au quotidien',
    category: 'EPI',
    sector: 'Tous secteurs (BTP, Usine, Entrepôt, Laboratoire)',
    summary: 'Les EPI ne sont pas une option de confort mais la dernière barrière vitale entre le danger et votre corps. Traquer les faux prétextes du non-port.',
    keyStat: '1 accident sur 4 aurait pu être évité ou amoindri par le port strict des EPI adaptés (OPPBTP / CNAM).',
    goldenRule: 'Pas d\'EPI adapté = pas de travail. Ajusté, porté, entretenu et remplacé dès dégradation.',
    level: 'Essentiel',
    phases: [
      {
        number: 1,
        title: 'Accroche & Réalité terrain (2 min)',
        durationMinutes: 2,
        leaderNotes: 'Faites sortir les EPI des participants : demandez à chacun de vérifier l\'état de ses gants et de ses lunettes en direct.',
        keyPoints: [
          'Combien de fois a-t-on entendu : "J\'en ai juste pour 2 minutes..." avant une blessure à l\'œil ou à la main ?',
          'Les yeux et les mains représentent plus de 40% des lésions invalidantes en atelier et chantier.'
        ]
      },
      {
        number: 2,
        title: 'Typologie & Usure des EPI (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Expliquez comment reconnaître un EPI périmé ou non adapté (ex: gants anti-coupure niveau D/F vs gants manutention simple).',
        keyPoints: [
          'Casque : vérifier la date limite d\'utilisation gravée sous la visière (souvent 3 à 5 ans) et remplacer après tout choc.',
          'Lunettes de protection : les verres rayés fatiguent la vue et poussent à les retirer. Demandez le remplacement immédiat.',
          'Bouchons d\'oreilles / Casque antibruit : obligatoires dès 80 dB(A) (niveau sonore d\'une disqueuse ou d\'une scie).'
        ]
      },
      {
        number: 3,
        title: 'Échanges sur les freins au port (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Demandez ce qui gêne le plus au quotidien (buée, transpiration, dextérité) pour trouver des solutions adaptées ensemble.',
        keyPoints: [
          'Quelles alternatives existent pour la buée sur les lunettes ? (Modèles ventilés, spray anti-buée)',
          'Comment s\'assurer d\'avoir toujours une paire de gants de rechange dans son sac ou son véhicule ?'
        ]
      },
      {
        number: 4,
        title: 'Engagements & Remplacement (3 min)',
        durationMinutes: 3,
        leaderNotes: 'Rappelez le process simple pour échanger un EPI défectueux sans délai.',
        keyPoints: [
          'Changer immédiatement tout EPI usé ou endommagé auprès du magasin/responsable.',
          'Vigilance fraternelle : avertir gentiment un collègue qui a oublié ses lunettes ou son casque.'
        ]
      }
    ],
    dosAndDonts: {
      dos: [
        'Ajuster la jugulaire du casque de sécurité pour éviter qu\'il ne tombe lors des mouvements',
        'Porter des lunettes enveloppantes ou une visière lors des opérations de meulage/disquage',
        'Nettoyer régulièrement ses EPI et les ranger à l\'abri de l\'humidité et des UV',
        'Porter des gants adaptés au niveau de risque mécanique (marquage EN 388)'
      ],
      donts: [
        'Porter un sweat à capuche sous le casque (annule la stabilité et le rôle protecteur de la coiffe)',
        'Conserver des chaussures de sécurité dont la semelle ou l\'embout métallique est troué',
        'Utiliser des gants souillés d\'huile ou de produit chimique pour se frotter le visage',
        'Prêter ses bouchons d\'oreille moulés individuels'
      ]
    },
    icebreakerQuestions: [
      'Quel est le prétexte numéro un qu\'on se donne pour ne pas mettre un EPI sur une opération rapide ?',
      'Avez-vous déjà eu un EPI qui vous a concrètement sauvé d\'une blessure ? Racontez.'
    ],
    dilemmaScenario: {
      scenario: 'Vous devez meuler un tube acier pendant 45 secondes. Vos lunettes de sécurité sont restées dans le fourgon garé à 150 mètres.',
      question: 'Faites-vous le meulage en fermant à demi les yeux ou allez-vous chercher les lunettes ?',
      goodReaction: 'On va chercher ses lunettes immédiatement. 90% des corps étrangers oculaires arrivent sur des découpes de moins d\'une minute. Un œil ne se remplace pas.'
    },
    quiz: [
      {
        question: 'À partir de quel niveau sonore continu le port des protections auditives devient-il fortement recommandé, puis obligatoire ?',
        options: [
          'Recommandé à 80 dB(A), obligatoire à 85 dB(A)',
          'Obligatoire uniquement au-dessus de 110 dB(A)',
          'C\'est laissé au libre choix du travailleur'
        ],
        correctIndex: 0,
        explanation: 'Dès 80 dB(A), l\'employeur doit mettre à disposition des protections. Dès 85 dB(A), le port est strictement obligatoire (Code du Travail R4434-1).'
      },
      {
        question: 'Quelle est la durée de vie moyenne recommandée d\'un casque de chantier en polyéthylène après sa date de fabrication ?',
        options: [
          '1 an maximum',
          '36 à 48 mois (selon la notice fabricant et exposition au soleil)',
          'Illimitée tant qu\'il n\'a pas pris de coup'
        ],
        correctIndex: 1,
        explanation: 'Les plastiques vieillissent sous l\'effet des UV et de la chaleur. La date de péremption ou de fabrication est gravée sur le casque.'
      }
    ],
    recommendedCommitments: [
      'Je vérifie l\'état de mes EPI tous les matins avant de commencer',
      'Je demande le remplacement immédiat d\'un EPI dégradé sans attendre l\'accident',
      'J\'exerce la vigilance bienveillante en rappelant les EPI à mes collègues'
    ]
  },
  {
    id: 'tms_03',
    title: 'Gestes & Postures : Préserver son dos et ses articulations',
    category: 'TMS',
    sector: 'Logistique, BTP, Industrie, Tertiaire, Soins',
    summary: 'Les Troubles Musculo-Squelettiques (TMS) sont la 1ère maladie professionnelle en France. Adopter les bons réflexes d\'économie d\'effort et d\'échauffement.',
    keyStat: '87% des maladies professionnelles indemnisées sont liées aux TMS. Coût humain et souffrance au quotidien (Assurance Maladie).',
    goldenRule: 'Plier les genoux, garder le dos droit, porter la charge au plus près du corps et privilégier les aides mécaniques.',
    level: 'Essentiel',
    phases: [
      {
        number: 1,
        title: 'Accroche & Échauffement réveil (2 min)',
        durationMinutes: 2,
        leaderNotes: 'Faites faire 3 étirements simples debout à toute l\'équipe : rotation des épaules, étirement des poignets, bascule du bassin.',
        keyPoints: [
          'Le dos supporte jusqu\'à 5 fois le poids soulevé si vous vous penchez en avant jambes tendues (bras de levier).',
          'Un réveil musculaire de 2 minutes le matin divise par deux les risques de lumbago et faux mouvements.'
        ]
      },
      {
        number: 2,
        title: 'Les 4 règles d\'or du port de charge (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Faites la démonstration avec un colis ou un outil devant l\'équipe.',
        keyPoints: [
          '1. Évaluer le poids et la prise avant de soulever (secouer légèrement le carton).',
          '2. Écarter les pieds pour une bonne assise et fléchir les jambes (utiliser la force des cuisses, pas des vertèbres).',
          '3. Plaquer la charge contre son tronc (éviter de porter à bout de bras).',
          '4. Pivoter avec les pieds, jamais en vrillant le tronc (torsion = danger hernie).'
        ]
      },
      {
        number: 3,
        title: 'Organisation du poste & Entraide (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Discutez des charges supérieures à 25 kg et de l\'utilisation systématique des diables, transpalettes ou portage à deux.',
        keyPoints: [
          'Charge maximale recommandée pour un homme : 25 kg (femme : 15 kg). Au-delà : portage à 2 ou aide mécanique.',
          'Régler les hauteurs de travail pour éviter de travailler bras au-dessus des épaules ou dos courbé en permanence.'
        ]
      },
      {
        number: 4,
        title: 'Plan d\'actions & Aménagements (3 min)',
        durationMinutes: 3,
        leaderNotes: 'Notez les postes de travail où les opérateurs ont mal au dos pour lancer des améliorations concrètes.',
        keyPoints: [
          'Identifier les 2 manutentions les plus pénibles de votre semaine pour y trouver une solution.',
          'Mise en place de dessertes à roulettes ou de plateaux rehaussés.'
        ]
      }
    ],
    dosAndDonts: {
      dos: [
        'Utiliser systématiquement les aides à la manutention (chariot, diable, ventouse, palan)',
        'Porter à 2 personnes synchronisées pour tout objet volumineux ou supérieur à 25 kg',
        'Alterner les postures et faire des micro-pauses actives d\'étirement',
        'Garder un chemin de cheminement dégagé avant de déplacer une charge'
      ],
      donts: [
        'Soulever une charge lourde jambes tendues avec le dos rond',
        'Pivoter le buste pendant qu\'on porte une charge (torsion vertébrale)',
        'Porter une charge qui masque la visibilité de là où on pose les pieds',
        'Sauter du plateau d\'une camionnette ou d\'un quai de déchargement (tassement vertébral violent)'
      ]
    },
    icebreakerQuestions: [
      'Qui a déjà eu un lumbago ou une douleur articulaire au réveil après une journée de travail ? À quoi c\'était dû ?',
      'Quelle est la charge la plus galère que vous avez manipulée cette semaine ?'
    ],
    dilemmaScenario: {
      scenario: 'Une palette de sacs de ciment de 35 kg est livrée à 20 mètres de la zone de coulage. Le transpalette est bloqué derrière d\'autres palettes.',
      question: 'Portez-vous les sacs à l\'épaule un par un pour ne pas perdre 5 minutes à dégager le transpalette ?',
      goodReaction: 'On dégage le passage pour amener le transpalette. Transporter 15 sacs de 35 kg à l\'épaule représente plus de 500 kg de pression cumulée sur les disques vertébraux.'
    },
    quiz: [
      {
        question: 'Lorsqu\'on soulève 20 kg le dos penché en avant jambes raides, quelle est la pression exercée sur les disques lombaires L5-S1 ?',
        options: [
          'Environ 20 kg',
          'Environ 70 kg',
          'Près de 300 à 400 kg de pression due au bras de levier'
        ],
        correctIndex: 2,
        explanation: 'En raison du principe de bras de levier, le dos courbé multiplie par 15 à 20 la charge subie par les vertèbres lombaires, risquant la rupture discale ou la sciatique.'
      },
      {
        question: 'Pour tourner avec une charge lourde dans les bras, que faut-il faire ?',
        options: [
          'Tourner les épaules et le buste en gardant les pieds fixes',
          'Tourner l\'ensemble du corps en déplaçant les pieds pour éviter la torsion du tronc',
          'Accélérer le pas'
        ],
        correctIndex: 1,
        explanation: 'Il faut toujours pivoter avec les pieds (pas chassés ou petits pas) pour maintenir le bassin et les épaules alignés.'
      }
    ],
    recommendedCommitments: [
      'Je plie les genoux et garde la charge collée au corps à chaque soulèvement',
      'Je demande de l\'aide à un collègue dès qu\'une charge dépasse 25 kg ou est encombrante',
      'Je descends des véhicules en marche arrière en utilisant les 3 points d\'appui, sans sauter'
    ]
  },
  {
    id: 'chimique_04',
    title: 'Risque Chimique & FDS : Savoir ce que l\'on manipule',
    category: 'Chimique',
    sector: 'Industrie, BTP, Nettoyage, Ateliers, Peinture',
    summary: 'Colles, solvants, acides, dégraissants, huiles de coupe, ciment : les produits chimiques sont partout. Comprendre les pictogrammes et interdire les reconditionnements dangereux.',
    keyStat: 'Plus de 30% des cancers professionnels sont attribuables à des expositions chimiques non maîtrisées (INRS).',
    goldenRule: 'Pas d\'étiquette = danger mortel. Ne JAMAIS transvaser un produit chimique dans une bouteille alimentaire.',
    level: 'Intermédiaire',
    phases: [
      {
        number: 1,
        title: 'Accroche & Cas réels (2 min)',
        durationMinutes: 2,
        leaderNotes: 'Présentez une bouteille d\'eau minérale vide et demandez : "Avez-vous déjà vu du liquide de frein ou du décapant stocké là-dedans ?" Insistez sur le drame des confusions.',
        keyPoints: [
          'Chaque année, des intoxications graves surviennent par ingestion accidentelle de produits chimiques transvasés.',
          'Certains produits attaquent les voies respiratoires sans odeur alarmante.'
        ]
      },
      {
        number: 2,
        title: 'Les Nouveaux Pictogrammes CLP & FDS (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Faites un tour rapide des 4 pictogrammes les plus dangereux : Tête de mort (toxicité aiguë), Silhouette qui éclate (CMR / cancer), Flamme (inflammable), Corrosif.',
        keyPoints: [
          'La FDS (Fiche de Données de Sécurité) doit être accessible en 16 points : section 8 (EPI) et section 4 (premiers secours).',
          'Gants : les gants en latex ne protègent pas des solvants ! Il faut des gants en nitrile ou néoprène selon le produit.'
        ]
      },
      {
        number: 3,
        title: 'Ventilation, Stockage & Déversement (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Passez en revue l\'armoire de sécurité et le bac de rétention du site.',
        keyPoints: [
          'Toujours travailler sous aspiration ou en zone bien ventilée lors de l\'utilisation de produits volatils.',
          'Kit absorbant anti-pollution : où se trouve-t-il sur notre site et comment l\'utiliser en cas de fuite ?'
        ]
      },
      {
        number: 4,
        title: 'Engagements & Nettoyage (3 min)',
        durationMinutes: 3,
        leaderNotes: 'Vérifiez que tous les bidons de l\'atelier sont correctement étiquetés.',
        keyPoints: [
          'Re-étiqueter tout flacon de dosage avec le pictogramme et le nom du produit.',
          'Se laver les mains avant de manger ou de fumer après manipulation.'
        ]
      }
    ],
    dosAndDonts: {
      dos: [
        'Consulter la FDS avant d\'utiliser un nouveau produit chimique inconnu',
        'Stocker les produits inflammables dans une armoire coupe-feu ventilée',
        'Utiliser le bac de rétention sous chaque fût ou bidon de fluide',
        'Porter les gants chimiques adaptés au temps de perméation du solvant'
      ],
      donts: [
        'Transvaser un décapant ou solvant dans une bouteille d\'eau ou un gobelet à café',
        'Mélanger de l\'eau de javel avec un détartrant acide (dégagement de chlore gazeux toxique)',
        'Manger, boire ou vapoter dans la zone de manipulation de solvants',
        'Jeter les résidus de peinture ou solvants dans le réseau d\'eaux pluviales ou à l\'égout'
      ]
    },
    icebreakerQuestions: [
      'Quels produits chimiques utilisez-vous le plus souvent dans votre quotidien professionnel ?',
      'Savez-vous où se trouve la douche de sécurité ou le flacon lave-œil le plus proche ?'
    ],
    dilemmaScenario: {
      scenario: 'Vous devez faire un appoint rapide de solvant. L\'étiquette du bidon est arrachée et illisible. Le liquide est transparent et sent l\'acétone.',
      question: 'Utilisez-vous le bidon ou allez-vous en chercher un neuf étiqueté ?',
      goodReaction: 'On ne touche pas au bidon non identifié ! On le place en zone déchets chimiques / quarantaine et on utilise un bidon conforme étiqueté.'
    },
    quiz: [
      {
        question: 'Que signifie le pictogramme montrant un buste humain avec une étoile blanche éclatant dans la poitrine ?',
        options: [
          'Produit irritant pour la peau uniquement',
          'Danger pour la santé à long terme (cancérogène, mutagène, toxique pour la reproduction ou organes cibles)',
          'Produit explosif à l\'impact'
        ],
        correctIndex: 1,
        explanation: 'Ce symbole (SGH08) signale les dangers graves pour la santé : toxicité par inhalation répétée, cancérogène, mutagène ou toxique pour la reproduction (CMR).'
      },
      {
        question: 'En cas de projection de produit corrosif dans l\'œil, quelle est la première action vitale ?',
        options: [
          'Mettre un collyre apaisant',
          'Rincer immédiatement à l\'eau tiède ou solution lave-œil pendant 15 minutes continues en maintenant les paupières ouvertes',
          'Attendre l\'arrivée du médecin'
        ],
        correctIndex: 1,
        explanation: 'Le rinçage immédiat et prolongé (au moins 15 minutes) est la seule action qui permet de diluer et d\'évacuer le produit avant qu\'il ne détruise la cornée.'
      }
    ],
    recommendedCommitments: [
      'Je bannis définitivement tout contenant alimentaire pour les produits de travail',
      'Je vérifie la présence et le bon type de gants avant d\'ouvrir un bidon chimique',
      'Je referme systématiquement les contenants après usage pour limiter les émanations'
    ]
  },
  {
    id: 'coactivite_05',
    title: 'Coactivité Engins - Piétons : Les règles de survie',
    category: 'Engins',
    sector: 'BTP, Entrepôts, Carrières, Chantiers ferroviaires, Logistique',
    summary: 'Chariots élévateurs, pelleteuses, camions toupie, dumpers : la coactivité engins/piétons est responsable des accidents les plus foudroyants. Respecter les distances et le contact visuel.',
    keyStat: 'Un chariot élévateur de 3 tonnes chargé pèse près de 5 tonnes et met plus de 6 mètres à s\'arrêter à 15 km/h.',
    goldenRule: 'Contact visuel obligatoire avec le conducteur. Rester hors des angles morts et respecter la bulle de sécurité de 5 mètres.',
    level: 'Essentiel',
    phases: [
      {
        number: 1,
        title: 'Accroche & Zone d\'ombre (2 min)',
        durationMinutes: 2,
        leaderNotes: 'Expliquez que le conducteur d\'un engin en marche arrière ou mât chargé ne voit souvent pas un homme debout à moins de 3 mètres.',
        keyPoints: [
          'L\'angle mort d\'une pelle mécanique ou d\'un camion benne peut masquer un groupe entier de personnes.',
          'Le port du gilet haute visibilité classe 2 ou 3 fermé est un prérequis non négociable.'
        ]
      },
      {
        number: 2,
        title: 'Les 3 règles d\'or du piéton & du cariste (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Faites simuler le geste du contact visuel (pouce levé / regard franc).',
        keyPoints: [
          'Règle du contact visuel : Si vous ne voyez pas les yeux du conducteur dans son rétro ou à travers sa vitre, il ne vous voit pas.',
          'Ne jamais passer derrière un engin qui recule (bip de recul = alerte de danger immédiat).',
          'Ségrégation des flux : utiliser les cheminements piétons matérialisés au sol.'
        ]
      },
      {
        number: 3,
        title: 'Débat sur les situations pièges (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Abordez le cas de l\'utilisation du téléphone en marchant sur les voies de circulation.',
        keyPoints: [
          'Interdiction absolue des écouteurs / casques audio sur les zones d\'évolution d\'engins.',
          'Que faire lorsqu\'un livreur externe arrive sur site sans connaître le plan de circulation ?'
        ]
      },
      {
        number: 4,
        title: 'Engagements & Balisage (3 min)',
        durationMinutes: 3,
        leaderNotes: 'Validez les zones où le balisage temporaire doit être renforcé aujourd\'hui.',
        keyPoints: [
          'Balisage physique systématique de la zone de giration des pelles et grues.',
          'Vitesse limitée respectée par tous les conducteurs.'
        ]
      }
    ],
    dosAndDonts: {
      dos: [
        'Établir un contact visuel et attendre un geste franc du conducteur avant de traverser',
        'Porter son gilet haute visibilité fermé (orange ou jaune fluo selon consignes)',
        'Circuler exclusivement sur les allées piétonnes dédiées',
        'Couper le moteur et baisser les fourches/godet au sol lors du stationnement de l\'engin'
      ],
      donts: [
        'Marcher avec des écouteurs dans les oreilles ou le nez sur son smartphone',
        'Se tenir sous la charge suspendue ou dans le rayon de braquage d\'un engin',
        'Monter sur les fourches d\'un chariot ou sur le marchepied d\'un dumper en mouvement',
        'Reculer un camion sans signaleur dans une zone encombrée'
      ]
    },
    icebreakerQuestions: [
      'Avez-vous déjà été surpris par un chariot élévateur silencieux (électrique) qui arrivait à un croisement ?',
      'Conducteurs dans l\'équipe : quel comportement de piéton vous fait le plus peur au quotidien ?'
    ],
    dilemmaScenario: {
      scenario: 'Vous devez récupérer un carton dans une allée où un cariste est en train de gerber une palette à 6 mètres de haut.',
      question: 'Faufilez-vous rapidement sous le chariot pour attraper le carton en 5 secondes ?',
      goodReaction: 'On reste à distance hors de la zone de gerbage. On attend que le cariste ait redescendu les fourches, nous ait vus et nous fasse signe d\'avancer.'
    },
    quiz: [
      {
        question: 'Pourquoi le port d\'écouteurs de musique est-il formellement interdit sur les chantiers et en entrepôt ?',
        options: [
          'Uniquement pour des raisons de productivité',
          'Parce qu\'il masque les bips de recul, les avertisseurs sonores et les cris d\'alerte des collègues',
          'Ce n\'est pas interdit si le volume est faible'
        ],
        correctIndex: 1,
        explanation: 'L\'ouïe est un sens d\'alerte vital. Les écouteurs isolent complètement le piéton des bruits d\'approche des engins et des alertes de sécurité.'
      },
      {
        question: 'Quelle est la distance minimale de sécurité recommandée autour du rayon d\'action d\'une pelle mécanique en manœuvre ?',
        options: [
          '1 mètre',
          'Au moins la portée maximale du bras + 2 mètres (zone de balisage)',
          'Aucune si on porte un casque'
        ],
        correctIndex: 1,
        explanation: 'La zone dangereuse englobe la longueur totale de la flèche + le godet + le débattement de la tourelle et une marge de sécurité, soit souvent 5 à 10 mètres.'
      }
    ],
    recommendedCommitments: [
      'Je ne traverse jamais la trajectoire d\'un engin sans contact visuel validé avec le chauffeur',
      'Je porte mon gilet haute visibilité boutonné dès l\'entrée sur le site',
      'Je ne porte aucun écouteur audio pendant mes déplacements sur site'
    ]
  },
  {
    id: 'elec_06',
    title: 'Risque Électrique : La consignation sauve des vies',
    category: 'Électricité',
    sector: 'Maintenance, BTP, Industrie, Bâtiment, Tertiaire',
    summary: 'L\'électricité ne se voit pas, ne s\'entend pas et ne sent rien avant qu\'il ne soit trop tard. Règle absolue des 5 étapes de la consignation électrique et respect des habilitations.',
    keyStat: 'Le passage d\'un courant de seulement 50 mA (0,05 A) à travers le cœur pendant 1 seconde suffit à provoquer une fibrillation ventriculaire mortelle.',
    goldenRule: 'Ne jamais intervenir sans Vérification d\'Absence de Tension (VAT) avec appareil normé et cadenas de consignation posé.',
    level: 'Intermédiaire',
    phases: [
      {
        number: 1,
        title: 'Accroche & Les pièges du courant (2 min)',
        durationMinutes: 2,
        leaderNotes: 'Rappelez la différence entre électrisation (passage du courant dans le corps) et électrocution (mort suite au choc électrique).',
        keyPoints: [
          'Les câbles dénudés, les armoires ouvertes et les rallonges écrasées par les engins sont les pièges numéro 1.',
          'Une simple prise 230V peut tuer en milieu humide ou avec des mains moites.'
        ]
      },
      {
        number: 2,
        title: 'Les 5 étapes de la Consignation (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Passez en revue les 5 étapes normées NF C 18-510.',
        keyPoints: [
          '1. Séparation (ouverture des disjoncteurs / sectionneurs).',
          '2. Condamnation (pose du cadenas individuel + pancarte).',
          '3. Identification de l\'ouvrage.',
          '4. VAT (Vérification d\'Absence de Tension immédiate avec testeur VAT dédié, pas un simple multimètre).',
          '5. MALT/CC (Mise à la terre et en court-circuit si requis en haute tension).'
        ]
      },
      {
        number: 3,
        title: 'Outillage isolé & Rallonges de chantier (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Inspectez les câbles électriques visibles autour de vous pendant la causerie.',
        keyPoints: [
          'Outils isolés 1000V certifiés VDE indispensables.',
          'Interdiction des réparations au scotch d\'électricien sur les câbles de puissance.',
          'Dérouler entièrement les tourets de câbles pour éviter l\'effet bobine et la surchauffe/incendie.'
        ]
      },
      {
        number: 4,
        title: 'Engagements & Habilitations (3 min)',
        durationMinutes: 3,
        leaderNotes: 'Vérifiez que chaque intervenant est titulaire de son titre d\'habilitation à jour (B0, B1, B2, BR, BC, etc.).',
        keyPoints: [
          'Ne jamais intervenir sur une armoire sans titre d\'habilitation valide correspondant.',
          'Signaler et isoler immédiatement toute prise ou câble détérioré.'
        ]
      }
    ],
    dosAndDonts: {
      dos: [
        'Effectuer la VAT (Vérification d\'Absence de Tension) avec l\'appareil testé avant et après',
        'Consigner avec son propre cadenas individuel et garder la clé sur soi',
        'Dérouler entièrement les enrouleurs de chantier pour éviter l\'incendie par effet Joule',
        'Utiliser des coffrets de chantier équipés de disjoncteurs différentiels 30 mA'
      ],
      donts: [
        'Faire confiance à un collègue qui dit "C\'est bon, j\'ai coupé le disjoncteur" sans vérifier soi-même',
        'Remplacer un fusible par un fil de cuivre ou bricoler un raccordement sans boîte de dérivation',
        'Tirer sur le câble pour débrancher une fiche murale',
        'Poser des bouteilles d\'eau ou liquides sur le dessus d\'une armoire électrique'
      ]
    },
    icebreakerQuestions: [
      'Avez-vous déjà ressenti une "châtaigne" au travail ou chez vous ? Quelles étaient les conditions ?',
      'Qui parmi vous a déjà trouvé un câble de chantier rafistolé avec du scotch ? Qu\'avez-vous fait ?'
    ],
    dilemmaScenario: {
      scenario: 'Vous devez changer un luminaire dans un atelier. L\'armoire électrique est située dans un autre bâtiment fermé à clé. Vous pensez savoir sur quel interrupteur couper.',
      question: 'Coupez-vous l\'interrupteur mural simple pour intervenir vite fait ?',
      goodReaction: 'Non ! Un interrupteur simple peut être réenclenché par quelqu\'un d\'autre ou couper le mauvais circuit. On va chercher la clé, on coupe le disjoncteur, on consigne et on fait la VAT.'
    },
    quiz: [
      {
        question: 'Pourquoi un multimètre standard ne doit-il pas remplacer un testeur VAT (Vérificateur d\'Absence de Tension) réglementaire ?',
        options: [
          'Le multimètre est trop cher',
          'Le multimètre peut être mal calibré (ex: mode ohmmètre) et court-circuiter l\'installation ou donner un faux zéro mortel',
          'Les deux appareils sont identiques selon la norme'
        ],
        correctIndex: 1,
        explanation: 'Un testeur VAT possède une sécurité intrinsèque et doit être auto-testé immédiatement avant et après la mesure sur une source connue pour garantir l\'absence de tension.'
      },
      {
        question: 'Quelle est la fonction essentielle du cadenas de consignation ?',
        options: [
          'Empêcher le vol du disjoncteur',
          'Empêcher physiquement toute remise sous tension intempestive par un tiers pendant l\'intervention',
          'Décorer le tableau électrique'
        ],
        correctIndex: 1,
        explanation: 'Le cadenas personnel avec clé unique garantit que personne d\'autre ne peut réenclencher le courant pendant que vous travaillez sur le circuit.'
      }
    ],
    recommendedCommitments: [
      'Je réalise systématiquement la VAT avant de toucher à tout conducteur électrique',
      'Je pose mon cadenas individuel de consignation dont je suis le seul détenteur de clé',
      'Je sors immédiatement du service toute rallonge ou outil électrique présentant une gaine abîmée'
    ]
  },
  {
    id: 'routier_07',
    title: 'Risque Routier : La route est notre lieu de travail le plus risqué',
    category: 'Routier',
    sector: 'Tous secteurs, Commerciaux, Livreurs, Chantiers, Maintenance itinérante',
    summary: 'Le risque routier est la première cause de mortalité au travail. Vitesse, téléphone, fatigue et arrimage des charges dans les véhicules utilitaires.',
    keyStat: 'Les accidents de la route représentent près de 50% des accidents mortels du travail en France (Assurance Maladie - Risques Professionnels).',
    goldenRule: 'Au volant, je conduis : téléphone en mode silencieux, ceinture attachée, distances respectées et chargement sanglé.',
    level: 'Essentiel',
    phases: [
      {
        number: 1,
        title: 'Accroche & Prise de conscience (2 min)',
        durationMinutes: 2,
        leaderNotes: 'Demandez qui a répondu au téléphone au volant cette semaine (même avec kit mains libres). Rappelez la charge mentale.',
        keyPoints: [
          'Le kit mains libres divise par deux l\'attention visuelle : le cerveau est en réunion, pas sur la route.',
          'À 90 km/h, regarder son téléphone pendant 3 secondes équivaut à traverser un terrain de football à l\'aveugle (75 mètres).'
        ]
      },
      {
        number: 2,
        title: 'Arrimage & Sécurité dans l\'utilitaire (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Abordez le risque des outils projetés depuis la zone de chargement en cas de freinage d\'urgence.',
        keyPoints: [
          'En cas de choc à 50 km/h, une caisse à outils de 10 kg non arrimée se transforme en projectile d\'une demi-tonne.',
          'La cloison de séparation habitacle/coffre doit être intacte et verrouillée.',
          'Pression des pneus et niveau d\'huile à vérifier tous les mois ou avant long trajet.'
        ]
      },
      {
        number: 3,
        title: 'Gestion de la fatigue & Pression horaire (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Que fait-on quand on est en retard à un rendez-vous client ou sur un chantier ?',
        keyPoints: [
          'Prévenir son manager ou le client par un appel avant de prendre la route, puis conduire sereinement.',
          'Pause obligatoire de 15 à 20 minutes toutes les 2 heures de conduite.'
        ]
      },
      {
        number: 4,
        title: 'Engagements de l\'équipe (3 min)',
        durationMinutes: 3,
        leaderNotes: 'Formalisez la politique "zéro appel en conduisant" validée par la direction.',
        keyPoints: [
          'Mettre le mode "Ne pas déranger en conduisant" sur son smartphone.',
          'Vérifier le sanglage des matériaux avant chaque départ de chantier.'
        ]
      }
    ],
    dosAndDonts: {
      dos: [
        'Sangler systématiquement tout matériel lourd à l\'arrière du fourgon',
        'Activer le répondeur automatique de conduite sur son smartphone',
        'Boucler sa ceinture même pour une manœuvre de 50 mètres sur chantier',
        'Adapter sa vitesse aux conditions météo (pluie, brouillard, neige)'
      ],
      donts: [
        'Lire ou envoyer des SMS / emails en conduisant dans les bouchons',
        'Laisser des objets tranchants ou lourds posés librement sur le tableau de bord ou sous les sièges',
        'Conduire en état de fatigue avancée ou après consommation d\'alcool ou médicaments à pictogramme rouge',
        'Coller le véhicule qui précède sous prétexte qu\'on est pressé'
      ]
    },
    icebreakerQuestions: [
      'Quelle est la pire distraction que vous ayez constatée sur la route ces dernières semaines ?',
      'Comment gérez-vous les appels de clients ou collègues quand vous êtes au volant ?'
    ],
    dilemmaScenario: {
      scenario: 'Vous avez 20 minutes de retard pour l\'ouverture d\'un chantier client. Votre téléphone sonne sur le support GPS : c\'est le chef de projet.',
      question: 'Décrochez-vous pour expliquer votre retard tout en accélérant de 15 km/h au-dessus de la limite ?',
      goodReaction: 'On laisse sonner ou on s\'arrête sur une aire sécurisée pour rappeler. On roule à la vitesse autorisée. Aucun retard ne justifie un accident grave.'
    },
    quiz: [
      {
        question: 'À 50 km/h sur chaussée mouillée, quelle est la distance moyenne nécessaire pour arrêter un fourgon utilitaire chargé ?',
        options: [
          'Environ 12 mètres',
          'Plus de 35 à 40 mètres (temps de réaction + freinage)',
          '5 mètres grâce à l\'ABS'
        ],
        correctIndex: 1,
        explanation: 'Sur sol mouillé, la distance de freinage est multipliée par deux. En ajoutant le temps de réaction (1 seconde = 14 mètres à 50 km/h), il faut près de 40 mètres.'
      }
    ],
    recommendedCommitments: [
      'Je coupe mes notifications ou active le mode conduite dès que je monte au volant',
      'Je sangle mes équipements et outils dans le fourgon avant chaque départ',
      'Je m\'arrête 15 minutes dès les premiers signes de fatigue (yeux qui piquent, bâillements)'
    ]
  },
  {
    id: 'climat_08',
    title: 'Canicule & Fortes Chaleurs : Prévenir le coup de chaleur',
    category: 'Climat',
    sector: 'BTP, Travaux extérieurs, Couvreurs, Voirie, Usines chaudes',
    summary: 'Le coup de chaleur est une urgence vitale (pronostic vital engagé en quelques minutes). Connaître les signaux d\'alerte, adapter l\'hydratation et le rythme de travail.',
    keyStat: 'Le coup de chaleur professionnel tue chaque été : la température corporelle monte au-dessus de 40°C avec défaillance multi-organique rapide.',
    goldenRule: 'Boire au moins 3 litres d\'eau par jour par petites gorgées régulières, aménager les pauses à l\'ombre et surveiller ses collègues.',
    level: 'Essentiel',
    phases: [
      {
        number: 1,
        title: 'Accroche & Symptômes critiques (2 min)',
        durationMinutes: 2,
        leaderNotes: 'Présentez les signaux précurseurs : vertiges, confusion, maux de tête, arrêt de la transpiration (peau sèche et brûlante), crampes.',
        keyPoints: [
          'La soif est un signal tardif : quand on a soif, on a déjà perdu 20% de ses capacités physiques et de concentration.',
          'Le coup de chaleur peut frapper même les personnes jeunes et très sportives.'
        ]
      },
      {
        number: 2,
        title: 'Organisation des chantiers en période caniculaire (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Exposez les mesures du plan canicule de l\'entreprise.',
        keyPoints: [
          'Décaler les horaires de travail tôt le matin (ex: 6h - 13h30).',
          'Aménager des zones de repos ombragées et ventilées.',
          'Mettre à disposition 3 litres d\'eau fraîche minimum par salarié et par jour.',
          'Reporter les tâches physiques les plus intenses ou alterner les équipes.'
        ]
      },
      {
        number: 3,
        title: 'Conduite à tenir en cas de malaise (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Faites simuler l\'alerte aux secours (15 / 112 / SST du site).',
        keyPoints: [
          '1. Alerter immédiatement le 15 (SAMU) ou 112 : préciser "suspicion de coup de chaleur au travail".',
          '2. Transporter la victime à l\'ombre et au frais.',
          '3. Refroidir immédiatement le corps : desserrer les vêtements, appliquer des linges humides frais sur le cou/front, ventiler.',
          '4. Position Latérale de Sécurité (PLS) si la personne est inconsciente mais respire.'
        ]
      },
      {
        number: 4,
        title: 'Engagements de la journée (3 min)',
        durationMinutes: 3,
        leaderNotes: 'Validez les points d\'eau et les gourdes de chacun avant le début du poste.',
        keyPoints: [
          'Bouteille ou gourde individuelle pleine avant de monter sur le poste.',
          'Vigilance croisée : surveiller le teint et le comportement de ses collègues.'
        ]
      }
    ],
    dosAndDonts: {
      dos: [
        'Boire régulièrement un verre d\'eau toutes les 15 à 20 minutes sans attendre la soif',
        'Porter des vêtements amples, respirants et clairs couvrant la peau contre les UV',
        'Protéger la nuque avec un protège-nuque fixé au casque de chantier',
        'Consommer des repas légers riches en fruits et légumes'
      ],
      donts: [
        'Boire des sodas très sucrés, des boissons énergisantes ou de l\'alcool (augmente la déshydratation)',
        'Travailler torse nu (brûlures solaires graves et absorption accrue du rayonnement thermique)',
        'Rester seul isolé sur une zone sans contact radio ou visuel avec l\'équipe',
        'Donner à boire à une personne inconsciente ou semi-consciente (risque d\'étouffement)'
      ]
    },
    icebreakerQuestions: [
      'Avez-vous déjà eu un coup de pompe violent ou des étourdissements en plein soleil ? Qu\'avez-vous fait ?',
      'Combien de litres d\'eau buvez-vous en moyenne sur une journée chaude ?'
    ],
    dilemmaScenario: {
      scenario: 'Un collègue sur un toit commence à tenir des propos incohérents, titube et dit "j\'ai froid" alors qu\'il fait 35°C à l\'ombre.',
      question: 'Laissez-vous le collègue continuer pour finir le pan de toiture avant la pause ?',
      goodReaction: 'Alerte rouge immédiate ! La sensation de froid et la confusion en pleine chaleur sont des signes typiques du coup de chaleur avancé. On le descend à l\'ombre, on appelle le 15 et on le rafraîchit d\'urgence.'
    },
    quiz: [
      {
        question: 'Quelle boisson est formellement contre-indiquée lors de travaux par fortes chaleurs ?',
        options: [
          'L\'eau tempérée ou légèrement fraîche',
          'L\'alcool et les canettes énergisantes riches en caféine et sucre',
          'L\'eau avec une pincée de sel'
        ],
        correctIndex: 1,
        explanation: 'L\'alcool et la caféine sont diurétiques et accélèrent dramatiquement la déshydratation tout en perturbant la régulation thermique du corps.'
      }
    ],
    recommendedCommitments: [
      'Je garde ma gourde d\'eau fraîche à portée de main et bois toutes les 20 minutes',
      'Je surveille l\'état de lucidité de mes collègues et alerte au moindre signe anormal',
      'J\'utilise les protège-nuques et pauses ombragées prévues'
    ]
  },
  {
    id: 'plain_pied_09',
    title: '5S Sécurité & Chutes de Plain-Pied : Ordre et propreté',
    category: 'Plain-Pied',
    sector: 'Ateliers, Chantiers, Bureaux, Magasins, Entrepôts',
    summary: 'Les glissades, faux pas et trébuchements représentent 1 accident du travail sur 3. Un environnement rangé et propre est la base de toute culture de sécurité.',
    keyStat: 'Plus de 100 000 arrêts de travail par an en France sont dus à des chutes de plain-pied (sol mouillé, obstacle traînant, dénivelé non signalé).',
    goldenRule: 'Un sol propre, sec et dégagé en permanence. Tout objet posé par terre doit avoir une raison d\'y être.',
    level: 'Essentiel',
    phases: [
      {
        number: 1,
        title: 'Accroche & Le faux sentiment d\'anodin (2 min)',
        durationMinutes: 2,
        leaderNotes: 'Faites remarquer que les chutes de plain-pied causent souvent des fractures du poignet, des entorses graves ou des traumatismes crâniens.',
        keyPoints: [
          '"Ce n\'est rien, j\'ai juste glissé..." peut entraîner 3 mois d\'arrêt et des douleurs à vie.',
          'La majorité des chutes arrivent sur des trajets habituels du quotidien.'
        ]
      },
      {
        number: 2,
        title: 'La méthode 5S appliquée à la sécurité (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Présentez les 3 premiers S : Supprimer l\'inutile, Situer les outils, Scintiller (nettoyer au fur et à mesure).',
        keyPoints: [
          'Passage des câbles et tuyaux : utiliser des passe-câbles jaunes ou les faire cheminer en hauteur.',
          'Nettoyage immédiat de toute trace d\'huile, de graisse ou de liquide répandu au sol (saupoudrer de l\'absorbant).',
          'Éclairage : remplacer les ampoules grillées dans les escaliers et couloirs de circulation.'
        ]
      },
      {
        number: 3,
        title: 'Chasse aux pièges du site (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Faites le tour visuel de la zone avec l\'équipe pendant 3 minutes pour identifier 3 anomalies concrètes.',
        keyPoints: [
          'Y a-t-il des palettes qui débordent dans les allées ?',
          'Les marches d\'escalier ont-elles leurs bandes antidérapantes intactes ?',
          'Tenir la rampe dans les escaliers : un geste simple qui sauve.'
        ]
      },
      {
        number: 4,
        title: 'Engagements de rangement (3 min)',
        durationMinutes: 3,
        leaderNotes: 'Instaurez les 5 minutes de rangement collectif avant chaque fin de poste.',
        keyPoints: [
          '5 minutes de rangement systématique à 16h55.',
          'Chacun ramasse un déchet ou obstacle même si ce n\'est pas lui qui l\'a posé.'
        ]
      }
    ],
    dosAndDonts: {
      dos: [
        'Tenir la main courante systématiquement dans les escaliers',
        'Nettoyer ou signaler immédiatement tout liquide renversé au sol',
        'Cheminer les rallonges électriques en hauteur ou sous ponts de protection',
        'Porter des chaussures de sécurité avec semelle antidérapante en bon état (norme SRC)'
      ],
      donts: [
        'Courir dans les couloirs, les ateliers ou sur les chantiers',
        'Laisser traîner des chutes de câbles, des feuillards métalliques ou des morceaux de bois cloutés',
        'Transporter une pile de cartons tellement haute qu\'elle masque la vue sur ses pieds',
        'Sauter une volée de marches dans un escalier'
      ]
    },
    icebreakerQuestions: [
      'Quelle est la dernière fois où vous avez failli trébucher ici ? À cause de quoi ?',
      'Qui tient la rampe dans les escaliers à chaque descente ?'
    ],
    dilemmaScenario: {
      scenario: 'Vous voyez une flaque d\'huile sur le sol d\'un passage piéton. Ce n\'est pas votre machine qui a fui et vous êtes pressé de finir une tâche.',
      question: 'Enjambez-vous la flaque sans rien dire ou vous arrêtez-vous pour nettoyer/baliser ?',
      goodReaction: 'On s\'arrête ! On met de l\'absorbant ou on balise avec un panneau sol glissant, et on prévient la maintenance. Le prochain collègue qui passera sans regarder risque une chute lourde.'
    },
    quiz: [
      {
        question: 'Quelle est la première cause d\'accidents du travail avec arrêt dans le secteur tertiaire et les services ?',
        options: [
          'Les chutes de plain-pied et glissades',
          'Les incendies',
          'Les coupures avec du papier'
        ],
        correctIndex: 0,
        explanation: 'Dans le tertiaire comme dans l\'industrie, les chutes de plain-pied figurent sur le podium des accidents les plus fréquents (sols mouillés, moquettes décollées, escaliers).'
      }
    ],
    recommendedCommitments: [
      'Je tiens la rampe à chaque montée et descente d\'escalier',
      'Je ramasse ou range tout obstacle traînant au sol sans attendre qu\'un collègue trébuche',
      'Je participe aux 5 minutes de rangement collectif quotidien avant de quitter mon poste'
    ]
  },
  {
    id: 'confine_10',
    title: 'Espaces Confinés : Pièges mortels et asphyxie invisible',
    category: 'Confiné',
    sector: 'Assainissement, Cuves, Silos, Galeries techniques, BTP, Chimie',
    summary: 'Cuves, regards, canalisations, silos, fosses : l\'atmosphère d\'un espace confiné peut devenir mortelle en quelques secondes par manque d\'oxygène ou présence de gaz toxiques (H2S, CO).',
    keyStat: '60% des victimes décédées en espace confiné sont les sauveteurs improvisés qui ont voulu secourir un collègue sans équipement autonome.',
    goldenRule: 'Permis de pénétrer valide + Détecteur 4 gaz étalonné + Ventilation forcée + Surveillant de surface permanent avec moyen d\'évacuation.',
    level: 'Spécifique',
    phases: [
      {
        number: 1,
        title: 'Accroche & Le tueur invisible (2 min)',
        durationMinutes: 2,
        leaderNotes: 'Expliquez que l\'asphyxie à l\'azote ou l\'intoxication à l\'H2S anéantit les réflexes en moins de 10 secondes.',
        keyPoints: [
          'L\'oxygène normal dans l\'air est à 20,9%. En dessous de 17%, le cerveau perd connaissance sans douleur préalable.',
          'L\'H2S (sulfure d\'hydrogène) paralyse l\'odorat dès les premières bouffées : on ne le sent plus, puis on s\'effondre.'
        ]
      },
      {
        number: 2,
        title: 'Les 4 verrous de sécurité indispensables (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Montrez le détecteur 4 gaz et le harnais avec tripode d\'extraction.',
        keyPoints: [
          '1. Test d\'atmosphère à plusieurs niveaux de profondeur avant ouverture.',
          '2. Ventilation continue forcée pendant toute la durée de la présence humaine.',
          '3. Port du détecteur 4 gaz allumé en zone respiratoire (thorax).',
          '4. Surveillant extérieur dédié, équipé d\'un moyen de communication et d\'un treuil de sauvetage.'
        ]
      },
      {
        number: 3,
        title: 'La règle du sauveteur (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Insistez sur la consigne la plus dure à respecter : NE PAS DESCENDRE secourir un collègue inconscient sans ARI (Appareil Respiratoire Isolant).',
        keyPoints: [
          'Si un équipier tombe au fond : donner l\'alerte aux secours (18/112), actionner le treuil d\'extraction depuis le haut, ne JAMAIS descendre tête nue.',
          'Plus d\'un accident sur deux fait deux morts pour cette raison.'
        ]
      },
      {
        number: 4,
        title: 'Engagements & Permis (3 min)',
        durationMinutes: 3,
        leaderNotes: 'Vérifiez la signature du permis de pénétrer du jour.',
        keyPoints: [
          'Refus strict de descendre si le détecteur de gaz n\'a pas été testé le matin.',
          'Surveillant extérieur qui reste 100% du temps au poste sans s\'absenter.'
        ]
      }
    ],
    dosAndDonts: {
      dos: [
        'Vérifier le test de bon fonctionnement (bump test) du détecteur 4 gaz avant descente',
        'Conserver le harnais d\'extraction relié au câble du tripode pendant toute l\'opération',
        'Maintenir une communication vocale ou radio toutes les 3 minutes avec le surveillant',
        'Ventiler mécaniquement l\'espace en insufflant de l\'air neuf prélevé hors zone polluée'
      ],
      donts: [
        'Descendre dans un regard ou une cuve "juste pour jeter un œil" sans détecteur ni permis',
        'Laisser le surveillant extérieur quitter son poste pour aller chercher un outil',
        'Descendre dans la fosse pour porter secours à un collègue évanoui sans équipement respiratoire autonome',
        'Ventiler avec de l\'oxygène pur (risque d\'inflammation explosive instantanée)'
      ]
    },
    icebreakerQuestions: [
      'Avez-vous déjà dû pénétrer dans une fosse ou regard d\'assainissement ? Comment s\'est passée la préparation ?',
      'Qui parmi vous a déjà entendu sonner l\'alarme d\'un détecteur 4 gaz ? Quelle a été votre réaction ?'
    ],
    dilemmaScenario: {
      scenario: 'Vous êtes surveillant en surface. Votre collègue dans la fosse à 3 mètres de profondeur s\'affaisse brusquement au sol et ne répond plus. Le tripode avec treuil est en place.',
      question: 'Descendez-vous par l\'échelle pour le relever ou utilisez-vous le treuil depuis la surface ?',
      goodReaction: 'On reste en surface ! On déclenche l\'alerte immédiate aux secours et on mouline le treuil pour remonter la victime par son harnais. Descendre vous ferait perdre connaissance en quelques secondes à votre tour.'
    },
    quiz: [
      {
        question: 'Quel gaz toxique à odeur d\'œuf pourri paralyse rapidement l\'odorat et est fréquemment présent dans les réseaux d\'eaux usées ?',
        options: [
          'Le dioxyde de carbone (CO2)',
          'Le sulfure d\'hydrogène (H2S)',
          'Le méthane (CH4)'
        ],
        correctIndex: 1,
        explanation: 'L\'H2S dégage d\'abord une odeur d\'œuf pourri, mais à concentration dangereuse, il anesthésie instantanément le nerf olfactif, donnant l\'illusion trompeuse que le gaz a disparu avant l\'asphyxie.'
      }
    ],
    recommendedCommitments: [
      'Je ne pénètre jamais dans un espace confiné sans détecteur 4 gaz allumé et étalonné',
      'Je refuse de descendre sans la présence physique continue d\'un surveillant en surface',
      'Je respecte la règle d\'or : alerte et treuillage depuis l\'extérieur en cas de malaise'
    ]
  },
  {
    id: 'incendie_11',
    title: 'Risque Incendie & Évacuation : Les bons réflexes en 3 minutes',
    category: 'Incendie',
    sector: 'Bureaux, Ateliers, Chantiers, Hôtellerie, Établissements Recevant du Public (ERP)',
    summary: 'En cas de départ de feu, les fumées toxiques et l\'obscurité tuent bien avant les flammes. Connaître son extincteur, l\'alarme et son point de rassemblement.',
    keyStat: 'Il ne faut que 3 minutes à un feu de poubelle ou de canapé pour embraser une pièce entière (phénomène de flashover).',
    goldenRule: 'Donner l\'alarme, évacuer dans le calme sans utiliser les ascenseurs, rejoindre le point de rassemblement pour le comptage.',
    level: 'Essentiel',
    phases: [
      {
        number: 1,
        title: 'Accroche & Le danger des fumées (2 min)',
        durationMinutes: 2,
        leaderNotes: 'Rappelez que 80% des décès en incendie sont dus à l\'inhalation des fumées chaudes et toxiques (CO, cyanures).',
        keyPoints: [
          'La fumée monte et coupe toute visibilité : sous la fumée, il reste 30 à 50 cm d\'air respirable au niveau du sol.',
          'Si la fumée envahit le couloir : fermer la porte, calfeutrer le bas avec un linge humide et se manifester à la fenêtre.'
        ]
      },
      {
        number: 2,
        title: 'Les différents types d\'extincteurs (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Montrez l\'extincteur le plus proche pendant la causerie.',
        keyPoints: [
          'Eau pulvérisée avec additif (étiquette bleue/rouge) : feux de solides (bois, papier, cartons, tissus).',
          'CO2 - Dioxyde de carbone (tromblon noir) : feux d\'origine électrique et armoires techniques.',
          'Poudre polyvalente ABC : tous types de feux mais salissant pour le matériel électronique.',
          'Geste d\'utilisation : Dégoupiller, Faire un tir d\'essai, Viser la base des flammes en balayant.'
        ]
      },
      {
        number: 3,
        title: 'Évacuation & Rôle des guides/serre-files (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Posez la question : "Qui sait où est notre point de rassemblement exact ?"',
        keyPoints: [
          'À l\'audition de la sirène : quitter son poste sans courir, ne rien chercher dans ses tiroirs.',
          'Fermer les portes et fenêtres derrière soi pour freiner la propagation de l\'oxygène.',
          'Comptage au point de rassemblement : ne jamais quitter le point de rassemblement sans avoir été pointé par le serre-file.'
        ]
      },
      {
        number: 4,
        title: 'Engagements de dégagement (3 min)',
        durationMinutes: 3,
        leaderNotes: 'Vérifiez immédiatement qu\'aucun extincteur ni sortie de secours n\'est encombré par des cartons ou palettes.',
        keyPoints: [
          'Dégager immédiatement tout extincteur ou Issue de Secours masquée.',
          'Permis de feu obligatoire pour toute opération de soudage / meulage à chaud.'
        ]
      }
    ],
    dosAndDonts: {
      dos: [
        'Connaître l\'emplacement des 2 issues de secours et des extincteurs les plus proches de son poste',
        'Viser toujours la base des flammes avec l\'extincteur en se tenant à 2-3 mètres',
        'Fermer les portes coupe-feu derrière soi lors de l\'évacuation',
        'Se faire recenser impérativement au point de rassemblement'
      ],
      donts: [
        'Prendre l\'ascenseur pendant une alerte incendie (risque de blocage mortel dans la gaine enfumée)',
        'Retourner sur ses pas pour récupérer un manteau, des clés ou son ordinateur portable',
        'Bloquer les portes coupe-feu en position ouverte avec des cales en bois',
        'Entreposer des palettes ou cartons devant un extincteur ou un RIA (Robinet d\'Incendie Armé)'
      ]
    },
    icebreakerQuestions: [
      'Si l\'alarme incendie sonne maintenant, quelle est l\'issue de secours la plus rapide depuis cet endroit ?',
      'Avez-vous déjà dégoupillé un vrai extincteur en formation manipulation ?'
    ],
    dilemmaScenario: {
      scenario: 'La sirène incendie retentit dans l\'atelier. Vous vous rendez compte que vous avez laissé vos clés de maison et votre portefeuille dans le vestiaire à 30 mètres à l\'opposé de la sortie.',
      question: 'Faites-vous un détour rapide pour les attraper avant d\'évacuer ?',
      goodReaction: 'Non ! On évacue immédiatement. Le délai d\'embrasement et de propagation des fumées est imprévisible. La vie humaine passe avant tout bien matériel.'
    },
    quiz: [
      {
        question: 'Quel extincteur reconnaissable à son gros diffuseur noir (tromblon) est préconisé pour éteindre un feu d\'armoire électrique ?',
        options: [
          'L\'extincteur à eau pure',
          'L\'extincteur au dioxyde de carbone (CO2)',
          'Un seau de sable uniquement'
        ],
        correctIndex: 1,
        explanation: 'Le CO2 étouffe le feu par privation d\'oxygène et refroidissement sans laisser de résidu conducteur ni détruire irrémédiablement les composants électroniques.'
      }
    ],
    recommendedCommitments: [
      'Je repère dès aujourd\'hui l\'extincteur et la sortie de secours la plus proche de mon poste',
      'Je ne pose aucun objet encombrant devant les issues et extincteurs',
      'Je rejoins directement le point de rassemblement dès que l\'alarme retentit'
    ]
  },
  {
    id: 'comportement_12',
    title: 'Vigilance Partagée & Droit d\'Alerte : Protéger son collègue',
    category: 'Comportement',
    sector: 'Tous secteurs',
    summary: 'La sécurité n\'est pas l\'affaire exclusive du responsable HSE : c\'est un pacte d\'équipe. Savoir dire "Stop", accepter la remarque d\'un collègue et remonter les presque-accidents.',
    keyStat: 'Selon la pyramide de Bird, pour 1 accident mortel, il y a eu en amont 30 accidents légers, 300 presque-accidents et 3000 situations dangereuses non signalées.',
    goldenRule: 'Si tu vois quelque chose, dis-le. Si tu as un doute, stoppe le travail. Zéro sanction pour un arrêt sécurité justifié.',
    level: 'Essentiel',
    phases: [
      {
        number: 1,
        title: 'Accroche & Le silence complice (2 min)',
        durationMinutes: 2,
        leaderNotes: 'Abordez la peur de passer pour un "rabat-joie" ou une "balance". Renversez cette perception : avertir un collègue est un acte de bienveillance et de protection.',
        keyPoints: [
          'Laisser un collègue travailler en danger sans rien dire, c\'est risquer de devoir annoncer une mauvaise nouvelle à sa famille le soir.',
          'La vigilance partagée fonctionne dans les deux sens : accepter la remarque avec un simple "Merci".'
        ]
      },
      {
        number: 2,
        title: 'Le Droit d\'Alerte et de Retrait (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Expliquez les articles L4131-1 du Code du Travail : danger grave et imminent pour sa vie ou sa santé.',
        keyPoints: [
          'Le droit de retrait n\'est pas un acte d\'insubordination : c\'est un devoir légal si la sécurité n\'est pas assurée.',
          'Procédure : informer son responsable hiérarchique, consigner le motif et rester à disposition sur site sans se mettre en danger.'
        ]
      },
      {
        number: 3,
        title: 'La valeur des Presque-Accidents (5 min)',
        durationMinutes: 5,
        leaderNotes: 'Faites remonter 1 presque-accident récent survenu dans l\'équipe (outil tombé, glissade sans blessure).',
        keyPoints: [
          'Un presque-accident n\'est pas une faute : c\'est un cadeau pour progresser avant le vrai drame.',
          'Comment faire une déclaration simple en 1 minute sur l\'application ?'
        ]
      },
      {
        number: 4,
        title: 'Le pacte d\'équipe (3 min)',
        durationMinutes: 3,
        leaderNotes: 'Faites sceller le pacte de vigilance bienveillante entre tous les membres.',
        keyPoints: [
          'S\'engager à dire "Stop" chaque fois qu\'une situation dérape.',
          'Remercier tout collègue qui nous signale un oubli d\'EPI ou un geste risqué.'
        ]
      }
    ],
    dosAndDonts: {
      dos: [
        'Intervenir immédiatement avec courtoisie dès qu\'on voit un collègue en situation dangereuse',
        'Accueillir une remarque de sécurité avec gratitude ("Merci de me l\'avoir rappelé")',
        'Déclarer les presqu\'accidents et situations dangereuses pour faire corriger le matériel',
        'Soutenir un nouvel arrivant ou intérimaire en lui montrant les bons réflexes du site'
      ],
      donts: [
        'Se moquer d\'un collègue qui prend le temps de s\'équiper ou d\'attacher sa longe',
        'Penser "ce n\'est pas mon travail, c\'est au responsable sécurité de s\'en occuper"',
        'Cacher un presque-accident par peur d\'être jugé ou sanctionné',
        'S\'énerver quand quelqu\'un nous fait remarquer qu\'on a oublié ses lunettes'
      ]
    },
    icebreakerQuestions: [
      'Est-ce facile ou difficile pour vous d\'arrêter un collègue plus expérimenté qui fait une imprudence ?',
      'Quelle remarque de sécurité vous a-t-on faite un jour qui vous a rendu service ?'
    ],
    dilemmaScenario: {
      scenario: 'Vous voyez votre chef d\'équipe monter sur un muret sans harnais pour guider une manœuvre, car il est pressé.',
      question: 'Osez-vous lui dire d\'attacher sa longe ou gardez-vous le silence par respect hiérarchique ?',
      goodReaction: 'On l\'interpelle tout de suite avec respect : "Chef, descends ou mets ta longe, on ne veut pas d\'accident aujourd\'hui !". Un vrai leader sécurité valorise cette remarque.'
    },
    quiz: [
      {
        question: 'D\'après la pyramide des accidents (modèle de Bird / Heinrich), pour 1 accident mortel ou grave, combien de situations dangereuses ou presque-accidents ont eu lieu auparavant ?',
        options: [
          'Seulement 2 ou 3',
          'Plusieurs centaines voire milliers de signaux faibles ignorés',
          'Les accidents mortels sont toujours imprévisibles et sans signes avant-coureurs'
        ],
        correctIndex: 1,
        explanation: 'En traitant les 3 000 situations dangereuses et les 300 presqu\'accidents du quotidien, on élimine mathématiquement le risque de survenue de l\'accident mortel au sommet de la pyramide.'
      }
    ],
    recommendedCommitments: [
      'Je m\'engage à dire "Stop" avec bienveillance si je vois un collègue en danger',
      'Je réagis positivement par un "Merci" lorsqu\'on me fait un rappel de sécurité',
      'Je signale systématiquement les presqu\'accidents pour protéger mes collègues'
    ]
  }
];
