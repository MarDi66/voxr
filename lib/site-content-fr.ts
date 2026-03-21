import type { FAQItem, ContentPageRecord, RelatedLink } from "./site-content";

const publishedTime = "2026-03-17";

export const solutionPagesFr: ContentPageRecord[] = [
  {
    slug: "anonymous-feedback-software",
    type: "solution",
    path: "/solutions/anonymous-feedback-software",
    title: "Logiciel de feedback anonyme pour les équipes modernes",
    description:
      "Découvrez ce dont les équipes ont besoin en matière de logiciel de feedback anonyme et comment Voxr aide les entreprises à recueillir des retours internes honnêtes sans exposer les collaborateurs.",
    eyebrow: "Page solution",
    intro:
      "Un logiciel de feedback anonyme offre aux collaborateurs un canal protégé pour partager leurs préoccupations, idées, éloges et irritants du quotidien sans associer leur identité à chaque message.",
    definition:
      "Le meilleur logiciel de feedback anonyme procure un sentiment de sécurité supérieur à un canal de discussion public et reste plus vivant qu'une boîte à suggestions oubliée. Il permet de s'exprimer honnêtement tout en gardant les échanges utiles pour l'équipe.",
    summaryPoints: [
      "Conçu pour un feedback interne honnête au sein d'un workspace privé.",
      "Utile pour les idées, les éloges, les blocages et les sujets sensibles.",
      "Pensé pour les équipes qui veulent des boucles de feedback plus rapides sans exposition publique.",
      "Mieux adapté à un dialogue continu qu'à des cycles ponctuels d'enquêtes.",
    ],
    comparison: {
      title: "Ce que doit inclure un bon logiciel de feedback anonyme",
      description:
        "Les équipes comparent souvent les outils anonymes avec les formulaires, les enquêtes ou les boîtes à suggestions manuelles. La vraie question est de savoir si le système produit un feedback utile et propice à la discussion.",
      headers: ["Fonctionnalité", "Boîte à suggestions classique", "Approche Voxr"],
      rows: [
        [
          "Conversation continue",
          "Le feedback disparaît généralement dans une file d'attente de formulaires.",
          "Les collaborateurs peuvent publier, commenter, réagir et faire avancer les fils de discussion utiles.",
        ],
        [
          "Périmètre du workspace",
          "Les soumissions aboutissent souvent dans une boîte de réception unique, sans contexte d'équipe.",
          "Chaque workspace dispose de son propre fil de feedback privé avec contrôle des accès.",
        ],
        [
          "Signal de confiance",
          "Beaucoup de systèmes affirment que le feedback est anonyme, mais donnent un sentiment de surveillance.",
          "Voxr est conçu autour du feedback interne anonyme comme promesse centrale du produit.",
        ],
      ],
    },
    sections: [
      {
        title: "Pourquoi les équipes recherchent un logiciel de feedback anonyme",
        paragraphs: [
          "Le problème principal est rarement un manque d'outils d'enquête. C'est l'écart entre ce que les collaborateurs pensent réellement et ce qu'ils se sentent en sécurité de dire à voix haute. Quand les canaux de feedback sont trop visibles, trop formels ou trop liés à la hiérarchie, les signaux utiles disparaissent.",
          "Un logiciel de feedback anonyme aide à combler cet écart. Il crée un espace où les collaborateurs peuvent signaler des problèmes en amont, partager des observations franches et proposer des améliorations avant que de petits irritants ne deviennent une dette culturelle.",
        ],
        bullets: [
          "Détecter les frictions avant qu'elles ne se transforment en turnover, en épuisement ou en désengagement silencieux.",
          "Offrir aux collaborateurs les plus discrets un canal qui ne dépend pas de l'aisance à s'exprimer en réunion.",
          "Recueillir un mélange plus riche d'éloges, d'idées et de préoccupations qu'une boîte à réclamations traditionnelle.",
          "Garder le feedback à proximité de l'équipe capable d'agir plutôt que de l'enterrer dans des tâches administratives RH.",
        ],
      },
      {
        title: "Comment Voxr s'inscrit dans cette catégorie",
        paragraphs: [
          "Voxr est conçu autour du feedback interne anonyme au sein d'un workspace. Les collaborateurs peuvent partager des retours, idées, éloges, préoccupations et commentaires visibles uniquement par les membres de ce même workspace.",
          "Cette structure compte. Elle maintient le feedback dans son contexte et rend le produit utile pour les équipes modernes qui ont besoin d'un retour interne léger et permanent plutôt que d'un processus annuel lourd.",
        ],
      },
      {
        title: "À qui s'adresse ce type de logiciel",
        paragraphs: [
          "Le logiciel de feedback anonyme est particulièrement utile pour les startups, les équipes en forte croissance, les entreprises distribuées et les managers qui souhaitent améliorer la confiance sans forcer les collaborateurs à s'exposer publiquement.",
          "Il est également précieux pour les équipes qui ont déjà essayé des formulaires ou des enquêtes mais les ont trouvés trop ponctuels pour impulser une amélioration au quotidien.",
        ],
      },
    ],
    faqs: [
      {
        question: "À quoi sert un logiciel de feedback anonyme ?",
        answer:
          "Il sert à recueillir les retours honnêtes des collaborateurs sur la santé de l'équipe, les idées, les blocages, le management, la communication et les préoccupations en milieu de travail, sans exiger qu'ils révèlent leur identité.",
      },
      {
        question: "En quoi est-ce différent d'une enquête pulse ?",
        answer:
          "Les enquêtes pulse mesurent le sentiment à intervalles réguliers. Un logiciel de feedback anonyme permet un retour continu et des échanges dès que les collaborateurs ont quelque chose d'utile à partager.",
      },
      {
        question: "Le feedback anonyme ne sert-il qu'aux plaintes ?",
        answer:
          "Non. Les systèmes performants capturent aussi les idées, les éloges, les améliorations de processus et les observations qui aident les équipes à mieux travailler.",
      },
    ],
    relatedLinks: [
      {
        href: "/product",
        label: "Voir la présentation du produit Voxr",
        description: "Comprendre comment les workspaces, publications, commentaires et formulaires fonctionnent ensemble.",
      },
      {
        href: "/guides/how-to-collect-anonymous-employee-feedback",
        label: "Apprendre à collecter du feedback anonyme",
        description: "Un guide pratique pour le déploiement, la modération et la construction de la confiance.",
      },
      {
        href: "/resources/anonymous-feedback-policy-template",
        label: "Utiliser un modèle de politique de feedback anonyme",
        description: "Définir les attentes concernant ce que les collaborateurs doivent partager et comment les dirigeants doivent répondre.",
      },
    ],
    cta: {
      title: "Transformez les retours anonymes en une véritable boucle de feedback interne",
      body:
        "Voxr offre à chaque workspace un espace privé pour recueillir les retours honnêtes des collaborateurs, en discuter en toute sécurité et garder les idées utiles visibles.",
      primary: {
        href: "/auth",
        label: "Créer un workspace Voxr",
      },
      secondary: {
        href: "/product",
        label: "Découvrir le produit",
      },
    },
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: "Logiciel de feedback anonyme", href: "/solutions/anonymous-feedback-software" },
    ],
    publishedTime,
  },
  {
    slug: "employee-feedback-platform",
    type: "solution",
    path: "/solutions/employee-feedback-platform",
    title: "Plateforme de feedback collaborateur pour une communication interne honnête",
    description:
      "Découvrez ce qu'une plateforme de feedback collaborateur devrait apporter aux équipes modernes et comment Voxr soutient un feedback privé basé sur des workspaces.",
    eyebrow: "Page solution",
    intro:
      "Une plateforme de feedback collaborateur devrait faciliter l'écoute de ce qui est vrai pour les équipes, pas seulement de ce qu'il est facile de dire devant un manager.",
    definition:
      "Une plateforme de feedback collaborateur utile allie confiance, structure et visibilité. Les collaborateurs ont besoin d'un moyen sûr de s'exprimer. Les dirigeants ont besoin d'un feedback qu'ils peuvent comprendre et sur lequel agir.",
    summaryPoints: [
      "Conçue pour un feedback interne continu, pas uniquement pour les cycles d'évaluation annuels.",
      "Prend en charge les commentaires, réactions et formulaires structurés dans un seul workspace.",
      "Maintient le feedback dans le périmètre de l'équipe concernée.",
      "Fonctionne bien pour les startups et les équipes modernes qui souhaitent une adoption légère.",
    ],
    sections: [
      {
        title: "Ce que les équipes attendent d'une plateforme de feedback collaborateur",
        paragraphs: [
          "La catégorie est plus large que le seul feedback anonyme. Les équipes ont aussi besoin d'un moyen d'organiser les retours, de comprendre ce qui mérite attention et de préserver le feedback utile après sa soumission.",
          "En pratique, cela signifie que la plateforme doit être suffisamment structurée pour soutenir l'action sans devenir un processus bureaucratique que les gens évitent.",
        ],
        bullets: [
          "Un flux de soumission simple pour que les collaborateurs l'utilisent réellement.",
          "Des limites claires sur qui peut consulter et discuter le feedback.",
          "Assez de contexte pour comprendre si le sujet est ponctuel, récurrent ou actionnable.",
          "Peu de friction pour les managers qui souhaitent répondre sans que les collaborateurs regrettent de s'être exprimés.",
        ],
      },
      {
        title: "Ce qui différencie Voxr",
        paragraphs: [
          "Voxr centre la plateforme autour de workspaces privés plutôt que d'une exposition à l'échelle de l'entreprise par défaut. Cela rend le produit adapté au feedback honnête au sein d'une équipe, d'un département ou d'un environnement d'entreprise où la confiance a encore besoin d'être renforcée.",
          "Parce que les collaborateurs peuvent partager des idées, des éloges, des préoccupations et des commentaires dans le même environnement, la plateforme devient un véritable système de voix des collaborateurs plutôt qu'un canal de plaintes à usage unique.",
        ],
      },
      {
        title: "Cas d'usage les plus adaptés",
        paragraphs: [
          "Voxr convient parfaitement aux équipes qui souhaitent une plateforme de feedback collaborateur légère sans construire un processus RH surdimensionné autour de chaque retour.",
          "C'est particulièrement pertinent lorsque les dirigeants veulent améliorer la communication, faire remonter les frictions et encourager les suggestions tout en préservant la sécurité psychologique.",
        ],
      },
    ],
    faqs: [
      {
        question: "Qui est responsable d'une plateforme de feedback collaborateur dans l'entreprise ?",
        answer:
          "La responsabilité varie. Les RH, les opérations People, les fondateurs et les responsables d'équipe peuvent tous l'utiliser, mais la plateforme fonctionne mieux quand les attentes de réponse et les règles de modération sont clairement définies.",
      },
      {
        question: "Tout le feedback collaborateur doit-il être anonyme ?",
        answer:
          "Pas nécessairement. De nombreuses équipes bénéficient d'un mélange de canaux anonymes et non anonymes. Les options anonymes sont surtout importantes quand le sujet est sensible ou que la hiérarchie altère la franchise.",
      },
      {
        question: "Une plateforme de feedback peut-elle remplacer les enquêtes ?",
        answer:
          "Elle peut réduire la dépendance excessive aux enquêtes, mais beaucoup d'équipes utilisent encore les deux. Les enquêtes sont utiles pour une mesure périodique. Les plateformes de feedback aident au dialogue continu et aux problèmes en temps réel.",
      },
    ],
    relatedLinks: [
      {
        href: "/features",
        label: "Découvrir les fonctionnalités de Voxr",
        description: "Voir les capacités du produit qui soutiennent un feedback collaborateur continu.",
      },
      {
        href: "/guides/internal-feedback-best-practices",
        label: "Lire les bonnes pratiques du feedback interne",
        description: "Utiliser des règles pratiques pour maintenir des canaux anonymes constructifs.",
      },
      {
        href: "/glossary/employee-voice",
        label: "Comprendre la voix des collaborateurs",
        description: "Clarifier ce que les équipes entendent par programmes de voix des collaborateurs.",
      },
    ],
    cta: {
      title: "Construisez un système de feedback collaborateur plus léger",
      body:
        "Utilisez Voxr pour offrir à chaque workspace un espace privé, propice à la discussion, pour la voix des collaborateurs, plutôt qu'un énième formulaire de feedback que personne ne consulte.",
      primary: {
        href: "/auth",
        label: "Commencer avec Voxr",
      },
      secondary: {
        href: "/features",
        label: "Voir les fonctionnalités clés",
      },
    },
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: "Plateforme de feedback collaborateur", href: "/solutions/employee-feedback-platform" },
    ],
    publishedTime,
  },
  {
    slug: "internal-feedback-tool",
    type: "solution",
    path: "/solutions/internal-feedback-tool",
    title: "Outil de feedback interne pour les équipes qui ont besoin de signaux plus rapides",
    description:
      "Évaluez ce que devrait faire un outil de feedback interne et comment Voxr aide les équipes à recueillir des retours honnêtes sans dépendre de canaux exposés.",
    eyebrow: "Page solution",
    intro:
      "Un outil de feedback interne devrait aider les équipes à comprendre ce que les collaborateurs observent au quotidien dans leur réalité de travail, pas seulement ce qui remonte lors des réunions formelles.",
    definition:
      "Les outils de feedback interne les plus utiles réduisent le coût de la prise de parole. Ils permettent aux collaborateurs de partager plus facilement ce qui fonctionne, ce qui ne va pas et ce qui pourrait être amélioré.",
    summaryPoints: [
      "Conçu pour un feedback interne privé, basé sur des workspaces.",
      "Utile quand les équipes veulent des signaux plus rapides que les évaluations ou enquêtes trimestrielles.",
      "Permet la discussion anonyme plutôt que des soumissions unidirectionnelles uniquement.",
      "Aide les équipes modernes à capturer les frictions opérationnelles et les idées des collaborateurs en un seul endroit.",
    ],
    sections: [
      {
        title: "Pourquoi les outils de feedback interne comptent",
        paragraphs: [
          "La plupart des équipes ont une dette de processus qu'elles ne perçoivent pas pleinement. Les solutions de contournement, les angles morts managériaux, les responsabilités floues et les frictions de communication apparaissent souvent d'abord dans des commentaires informels, pas dans des rapports formels.",
          "Un outil de feedback interne dédié facilite la collecte de ces signaux. C'est d'autant plus important quand une entreprise croît rapidement ou fonctionne à travers plusieurs équipes, sites ou fuseaux horaires.",
        ],
      },
      {
        title: "Ce qu'il faut rechercher dans l'outil",
        paragraphs: [
          "Le bon outil doit être suffisamment simple pour un usage régulier, mais suffisamment structuré pour que le feedback reste lisible et actionnable. Trop peu de structure produit du bruit. Trop de structure tue l'honnêteté.",
        ],
        bullets: [
          "Soumission rapide pour les suggestions, les blocages et les préoccupations.",
          "Contrôles de visibilité privés pour que le feedback ne soit pas surexposé.",
          "Une couche de discussion pour clarifier le contexte et les prochaines étapes.",
          "Des formulaires quand l'équipe a besoin d'inputs plus structurés qu'une publication ouverte.",
        ],
      },
      {
        title: "Pourquoi Voxr fonctionne pour les équipes modernes",
        paragraphs: [
          "Voxr conserve le feedback au sein des workspaces pour que la conversation reste pertinente pour les membres qui ont besoin de la voir. Le produit prend en charge à la fois les publications ouvertes et les formulaires structurés, ce qui offre de la flexibilité aux équipes sans changer d'outil.",
          "Cela en fait un outil de feedback interne pratique pour les startups, les équipes orientées opérations et les managers qui souhaitent une boucle de feedback régulière sans construire un programme lourd.",
        ],
      },
    ],
    faqs: [
      {
        question: "Quelle est la différence entre un outil de feedback interne et un outil d'engagement collaborateur ?",
        answer:
          "Les outils d'engagement se concentrent souvent sur des tableaux de bord de mesure et des enquêtes périodiques. Un outil de feedback interne est plus directement axé sur la collecte et la discussion des retours des collaborateurs.",
      },
      {
        question: "Les équipes peuvent-elles utiliser un outil de feedback interne pour des idées autant que pour des problèmes ?",
        answer:
          "Oui. Beaucoup des soumissions à plus forte valeur ajoutée sont des améliorations de processus, des idées produit et des observations qui ne justifieraient jamais une escalade formelle.",
      },
      {
        question: "Un outil de feedback interne a-t-il besoin de l'anonymat ?",
        answer:
          "Pas pour chaque message, mais les options anonymes sont souvent ce qui rend l'outil précieux quand les collaborateurs doivent aborder des sujets sensibles en toute honnêteté.",
      },
    ],
    relatedLinks: [
      {
        href: "/solutions/employee-suggestion-box-software",
        label: "Comparer avec un logiciel de boîte à idées",
        description: "Voir comment les outils de feedback interne modernes vont au-delà de la collecte passive de suggestions.",
      },
      {
        href: "/guides/workplace-trust-feedback-guide",
        label: "Lire le guide sur la confiance au travail",
        description: "Comprendre les conditions de confiance qui font fonctionner les canaux de feedback interne.",
      },
      {
        href: "/product",
        label: "Découvrir le produit",
        description: "Voir comment Voxr combine publications de feedback, formulaires et workspaces privés.",
      },
    ],
    cta: {
      title: "Offrez à votre équipe un moyen plus rapide de faire remonter les signaux internes",
      body:
        "Voxr aide les équipes à recueillir un feedback utile avant que les problèmes ne deviennent une dette de processus invisible.",
      primary: {
        href: "/auth",
        label: "Créer un workspace",
      },
      secondary: {
        href: "/solutions/employee-feedback-platform",
        label: "Voir les cas d'usage feedback collaborateur",
      },
    },
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: "Outil de feedback interne", href: "/solutions/internal-feedback-tool" },
    ],
    publishedTime,
  },
  {
    slug: "employee-suggestion-box-software",
    type: "solution",
    path: "/solutions/employee-suggestion-box-software",
    title: "Logiciel de boîte à idées pour les équipes modernes",
    description:
      "Découvrez comment un logiciel de boîte à idées se compare aux outils de feedback anonyme modernes et où Voxr se positionne pour le feedback interne privé.",
    eyebrow: "Page solution",
    intro:
      "Un logiciel de boîte à idées semble simple, mais la plupart des équipes n'ont pas besoin d'une boîte numérique qui collecte silencieusement des idées. Elles ont besoin d'un système en lequel les collaborateurs ont confiance et que les dirigeants consultent réellement.",
    definition:
      "Une boîte à idées moderne doit sembler vivante. Elle doit faciliter le partage de suggestions, l'ajout de contexte et la préservation des retours utiles après soumission.",
    summaryPoints: [
      "Plus adaptée qu'une boîte à suggestions unidirectionnelle pour un feedback interne continu.",
      "Utile pour les idées, les éloges, les améliorations et les préoccupations.",
      "La structure en workspace privé maintient la pertinence du feedback.",
      "Aide les équipes à remplacer les anciens systèmes de suggestions à base de boîte de réception.",
    ],
    comparison: {
      title: "Logiciel de boîte à idées vs plateforme de feedback anonyme moderne",
      headers: ["Question", "Logiciel de boîte à idées", "Voxr"],
      rows: [
        [
          "Que partage-t-on ?",
          "Principalement des idées ou des plaintes envoyées dans une boîte de réception unidirectionnelle.",
          "Des idées, éloges, préoccupations, commentaires et réponses à des formulaires structurés.",
        ],
        [
          "Que se passe-t-il ensuite ?",
          "Les dirigeants examinent les soumissions hors ligne, souvent avec un suivi insuffisant.",
          "Le feedback reste visible dans le workspace pour que la discussion puisse se poursuivre.",
        ],
        [
          "Quel ressenti pour les collaborateurs ?",
          "Utile, mais souvent passif et distant.",
          "Davantage comme une boucle de feedback interne avec une place claire dans la communication d'équipe.",
        ],
      ],
    },
    sections: [
      {
        title: "Pourquoi les boîtes à suggestions traditionnelles stagnent",
        paragraphs: [
          "Les boîtes à suggestions sont attrayantes car elles paraissent simples. Le problème est que beaucoup d'entre elles deviennent des impasses. Les collaborateurs soumettent des idées sans aucun signal que quelqu'un les ait lues, et encore moins ait agi dessus.",
          "Quand cela se produit, le canal cesse de construire la confiance. Il enseigne aux collaborateurs que le feedback disparaît une fois entré dans la boîte.",
        ],
      },
      {
        title: "Ce que devrait faire un meilleur logiciel de boîte à idées",
        paragraphs: [
          "Le meilleur modèle est un environnement de feedback léger qui protège toujours les collaborateurs. Il devrait permettre la publication anonyme, la discussion et une structure suffisante pour que le suivi reste gérable.",
        ],
        bullets: [
          "Maintenir une friction de soumission faible.",
          "Préserver l'anonymat quand la franchise en dépend.",
          "Permettre les commentaires ou les clarifications quand le contexte est important.",
          "Faire en sorte que le canal fasse partie des opérations de l'équipe, pas d'une archive oubliée.",
        ],
      },
      {
        title: "Pourquoi les équipes choisissent Voxr",
        paragraphs: [
          "Voxr fonctionne bien quand une équipe veut plus qu'une simple boîte à idées numérique. Le produit est conçu pour le feedback interne anonyme au sein d'un workspace, ce qui le rend utile à la fois pour les idées d'amélioration continue et pour les préoccupations plus sensibles.",
          "Cette combinaison aide les équipes à construire un système de voix des collaborateurs plus solide sans rendre le canal trop formel ou trop exposé.",
        ],
      },
    ],
    faqs: [
      {
        question: "Un logiciel de boîte à idées est-il encore utile ?",
        answer:
          "Oui, mais seulement si les collaborateurs lui font confiance et que la direction répond de manière cohérente. La version faible est une boîte de réception passive. La version forte est un canal de feedback interne vivant.",
      },
      {
        question: "Les boîtes à idées doivent-elles être anonymes ?",
        answer:
          "Souvent oui. L'anonymat réduit le coût social du partage de suggestions critiques ou de préoccupations, en particulier dans les petites équipes ou les environnements hiérarchiques.",
      },
      {
        question: "Un logiciel de boîte à idées peut-il être utilisé par les startups ?",
        answer:
          "Oui. Les startups bénéficient souvent d'un outil léger car les petits problèmes de processus et les frictions interpersonnelles deviennent rapidement coûteux.",
      },
    ],
    relatedLinks: [
      {
        href: "/resources/employee-feedback-template",
        label: "Utiliser le modèle de feedback collaborateur",
        description: "Structurer les suggestions pour que les collaborateurs sachent à quoi ressemble une bonne soumission.",
      },
      {
        href: "/guides/internal-feedback-best-practices",
        label: "Appliquer les bonnes pratiques du feedback interne",
        description: "Maintenir le canal constructif et digne d'être utilisé.",
      },
      {
        href: "/glossary/employee-suggestion-box",
        label: "Lire la page glossaire sur la boîte à idées",
        description: "Clarifier les différences entre les boîtes à idées et les systèmes plus larges de voix des collaborateurs.",
      },
    ],
    cta: {
      title: "Remplacez la boîte à idées morte par une véritable boucle de feedback",
      body:
        "Utilisez Voxr quand votre équipe a besoin de suggestions anonymes, d'un meilleur suivi et d'un endroit où le feedback interne reste suffisamment visible pour compter.",
      primary: {
        href: "/auth",
        label: "Démarrer un workspace",
      },
      secondary: {
        href: "/solutions/anonymous-feedback-software",
        label: "Voir le logiciel de feedback anonyme",
      },
    },
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Solutions", href: "/solutions" },
      {
        label: "Logiciel de boîte à idées",
        href: "/solutions/employee-suggestion-box-software",
      },
    ],
    publishedTime,
  },
];

export const guidePagesFr: ContentPageRecord[] = [
  {
    slug: "what-is-anonymous-employee-feedback",
    type: "guide",
    path: "/guides/what-is-anonymous-employee-feedback",
    title: "Qu'est-ce que le feedback anonyme des collaborateurs ?",
    description:
      "Une définition pratique du feedback anonyme des collaborateurs, pourquoi c'est important, où c'est utile et comment Voxr le prend en charge dans des workspaces privés.",
    eyebrow: "Guide",
    intro:
      "Le feedback anonyme des collaborateurs est un retour qui peut être exploité sans associer une identité personnelle visible à la personne qui l'a partagé.",
    definition:
      "En pratique, le feedback anonyme des collaborateurs existe pour protéger la franchise. Il offre aux collaborateurs une voie plus sûre pour partager ce qu'ils pensent réellement quand le statut, la politique ou la peur de représailles filtrerait autrement le message.",
    summaryPoints: [
      "Utile pour les préoccupations, les frictions, les idées, les éloges et le feedback sur les processus.",
      "Plus précieux quand la hiérarchie ou les dynamiques d'équipe réduisent la franchise.",
      "Fonctionne mieux quand les dirigeants expliquent comment le canal sera utilisé.",
      "Les systèmes solides associent l'anonymat à des normes de réponse claires.",
    ],
    sections: [
      {
        title: "Pourquoi le feedback anonyme des collaborateurs existe",
        paragraphs: [
          "Les collaborateurs ne restent pas silencieux parce qu'ils n'ont pas d'opinions. Ils restent silencieux parce que dire les choses à voix haute peut sembler coûteux. Le coût peut être social, politique ou managérial. Dans certaines entreprises, cela suffit à bloquer tout feedback utile.",
          "Le feedback anonyme des collaborateurs réduit ce coût. Il offre aux équipes un moyen d'entendre ce qui resterait autrement caché, notamment sur la confiance, la communication, la clarté des rôles, la charge de travail, le management et les frictions de processus.",
        ],
      },
      {
        title: "Ce que le feedback anonyme n'est pas",
        paragraphs: [
          "Ce n'est pas un substitut à toute conversation. Les équipes ont toujours besoin de communication directe, d'entretiens individuels avec le manager et d'autres canaux. Le feedback anonyme est un complément pour les situations où l'ouverture est irréaliste ou le sujet trop sensible.",
          "Il n'est pas non plus automatiquement utile simplement parce que les soumissions sont anonymes. La confiance ne s'améliore que quand les collaborateurs constatent que le feedback est pris au sérieux et traité de manière responsable.",
        ],
      },
      {
        title: "Comment Voxr prend en charge le feedback anonyme des collaborateurs",
        paragraphs: [
          "Voxr offre à chaque workspace un espace privé pour recueillir du feedback interne anonyme, des idées, des éloges, des préoccupations et des commentaires. Cette structure aide les équipes à capturer la franchise sans transformer chaque sujet sensible en un événement public à l'échelle de l'entreprise.",
          "Parce que le produit prend en charge les commentaires et les formulaires en plus des publications de feedback, les équipes peuvent utiliser le même environnement pour les retours au quotidien et les moments de collecte plus structurés.",
        ],
      },
    ],
    faqs: [
      {
        question: "Quand le feedback anonyme des collaborateurs est-il le plus utile ?",
        answer:
          "Il est le plus utile quand les collaborateurs doivent s'exprimer honnêtement sur des sujets sensibles ou quand une équipe a suffisamment de hiérarchie, de politique ou de peur pour que les gens s'autocensurent dans les canaux publics.",
      },
      {
        question: "Le feedback anonyme réduit-il la responsabilisation ?",
        answer:
          "Cela peut arriver si le canal est mal géré. Les bons systèmes définissent des normes claires, des règles de modération et des attentes de réponse pour que le feedback reste constructif.",
      },
      {
        question: "Les entreprises doivent-elles ne compter que sur les canaux anonymes ?",
        answer:
          "Non. Les canaux anonymes sont importants, mais ils fonctionnent mieux en complément des conversations directes, de l'accompagnement managérial et d'autres systèmes de communication.",
      },
    ],
    relatedLinks: [
      {
        href: "/solutions/anonymous-feedback-software",
        label: "Voir le logiciel de feedback anonyme",
        description: "Passer du concept aux critères de choix de plateforme.",
      },
      {
        href: "/guides/how-to-collect-anonymous-employee-feedback",
        label: "Apprendre à bien collecter du feedback anonyme",
        description: "Utiliser des pratiques de déploiement et de modération qui protègent la confiance.",
      },
      {
        href: "/glossary/anonymous-feedback",
        label: "Lire la page glossaire sur le feedback anonyme",
        description: "Obtenir une version plus rapide, centrée sur la définition du concept.",
      },
    ],
    cta: {
      title: "Intégrez le feedback anonyme des collaborateurs aux opérations réelles de l'équipe",
      body:
        "Voxr offre aux équipes modernes un espace privé pour recueillir les retours honnêtes des collaborateurs sans forcer chaque message dans un canal visible.",
      primary: {
        href: "/auth",
        label: "Commencer avec Voxr",
      },
      secondary: {
        href: "/product",
        label: "Voir le produit",
      },
    },
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Guides", href: "/guides" },
      { label: "Qu'est-ce que le feedback anonyme", href: "/guides/what-is-anonymous-employee-feedback" },
    ],
    publishedTime,
  },
  {
    slug: "how-to-collect-anonymous-employee-feedback",
    type: "guide",
    path: "/guides/how-to-collect-anonymous-employee-feedback",
    title: "Comment collecter du feedback anonyme des collaborateurs en toute sécurité",
    description:
      "Un guide pratique pour collecter du feedback anonyme des collaborateurs, définir les attentes et utiliser Voxr pour maintenir un canal sûr et utile.",
    eyebrow: "Guide",
    intro:
      "Collecter du feedback anonyme des collaborateurs n'est pas qu'un problème d'outillage. Le processus nécessite de la confiance, des limites claires et un suivi visible, sinon les collaborateurs cesseront de l'utiliser.",
    definition:
      "L'objectif est simple : créer un canal que les collaborateurs considèrent comme sûr, puis prouver par l'action que s'exprimer en vaut la peine.",
    summaryPoints: [
      "Expliquer l'objectif du canal avant de le lancer.",
      "Définir les types de feedback qui y ont leur place.",
      "Dire aux collaborateurs qui peut voir les publications et comment les réponses fonctionneront.",
      "Boucler le suivi de manière cohérente pour que le canal mérite une utilisation récurrente.",
    ],
    sections: [
      {
        title: "Commencer par le modèle opérationnel, pas par le formulaire",
        paragraphs: [
          "Avant de collecter la moindre soumission, décidez à quoi sert le canal. Est-ce pour la voix des collaborateurs au sens large, les améliorations de processus, les préoccupations sensibles, ou tout cela à la fois ? Les collaborateurs ont besoin d'une réponse claire pour savoir quand l'utiliser.",
          "Vous avez aussi besoin d'un modèle de réponse. Les équipes perdent la confiance quand le feedback anonyme entre dans un système sans propriétaire, sans rythme de relecture et sans attente de suivi.",
        ],
        bullets: [
          "Définir la responsabilité de la modération et des réponses.",
          "Expliquer les limites de visibilité dans un langage clair.",
          "Établir des normes pour un feedback respectueux, précis et utile.",
          "Informer les collaborateurs de la fréquence de relecture du canal.",
        ],
      },
      {
        title: "Collecter le feedback d'une manière qui procure un sentiment de sécurité",
        paragraphs: [
          "La sécurité est à la fois technique et sociale. Les collaborateurs ont besoin de la certitude que le produit garantit l'anonymat, mais aussi de preuves que la direction n'utilisera pas le canal comme un piège pour identifier les critiques.",
          "C'est pourquoi le discours de lancement est important. Évitez les promesses excessives. Soyez précis sur ce que l'outil fait, ce que les dirigeants verront et comment l'entreprise traitera les tendances ou les préoccupations sérieuses.",
        ],
      },
      {
        title: "Boucler le suivi après la collecte",
        paragraphs: [
          "Le moyen le plus rapide de tuer un canal de feedback anonyme est de lui donner l'apparence d'un vide. Si les collaborateurs ne voient jamais d'accusé de réception, de clarification ou d'action, la participation chute.",
          "Boucler le suivi ne signifie pas résoudre chaque problème immédiatement. Cela signifie montrer que le feedback est lu, priorisé et converti en prochaines étapes visibles chaque fois que possible.",
        ],
      },
    ],
    faqs: [
      {
        question: "À quelle fréquence une entreprise doit-elle examiner le feedback anonyme ?",
        answer:
          "Suffisamment souvent pour que les collaborateurs croient que le canal est vivant. La bonne cadence varie, mais la plupart des équipes ont besoin d'un rythme de relecture régulier et d'un responsable identifié.",
      },
      {
        question: "Les collaborateurs doivent-ils pouvoir soumettre des éloges anonymes en plus des préoccupations ?",
        answer:
          "Oui. Les canaux anonymes deviennent plus sains quand ils capturent aussi des idées et des éloges, pas seulement des problèmes.",
      },
      {
        question: "Quelle est l'erreur principale que commettent les entreprises ?",
        answer:
          "Lancer le canal sans attentes claires ou sans suivi visible. Le problème est généralement opérationnel, pas technique.",
      },
    ],
    relatedLinks: [
      {
        href: "/resources/anonymous-feedback-policy-template",
        label: "Utiliser le modèle de politique de feedback anonyme",
        description: "Transformer vos règles de déploiement en une politique écrite claire.",
      },
      {
        href: "/guides/internal-feedback-best-practices",
        label: "Consulter les bonnes pratiques du feedback interne",
        description: "Maintenir le canal constructif après le lancement.",
      },
      {
        href: "/product",
        label: "Voir comment Voxr facilite la collecte",
        description: "Utiliser les workspaces, commentaires et formulaires dans un seul produit.",
      },
    ],
    cta: {
      title: "Lancez le feedback anonyme avec des règles de fonctionnement plus claires",
      body:
        "Voxr offre aux équipes un workspace privé pour le feedback anonyme afin que le processus soit plus sûr, plus léger et plus facile à maintenir.",
      primary: {
        href: "/auth",
        label: "Créer un workspace",
      },
      secondary: {
        href: "/resources/anonymous-feedback-policy-template",
        label: "Obtenir le modèle de politique",
      },
    },
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Guides", href: "/guides" },
      {
        label: "Comment collecter du feedback anonyme",
        href: "/guides/how-to-collect-anonymous-employee-feedback",
      },
    ],
    publishedTime,
  },
  {
    slug: "internal-feedback-best-practices",
    type: "guide",
    path: "/guides/internal-feedback-best-practices",
    title: "Bonnes pratiques du feedback interne pour les équipes modernes",
    description:
      "Utilisez des bonnes pratiques concrètes du feedback interne pour maintenir le feedback anonyme des collaborateurs utile, fiable et actionnable avec Voxr.",
    eyebrow: "Guide",
    intro:
      "Le feedback interne fonctionne quand les collaborateurs font confiance au canal et que les dirigeants traitent le signal avec suffisamment de sérieux pour agir.",
    definition:
      "Les bonnes pratiques concernent moins la formulation que la discipline opérationnelle : objectif clair, responsabilité visible, modération utile et suivi cohérent.",
    summaryPoints: [
      "Garder le canal suffisamment ciblé pour être clair, mais suffisamment large pour être utile.",
      "Valoriser la précision, pas le volume.",
      "Considérer la modération comme de la gestion responsable, pas du contrôle d'image.",
      "Montrer ce qui s'est passé après que le feedback a été signalé.",
    ],
    sections: [
      {
        title: "Concevoir le canal autour de l'utilité",
        paragraphs: [
          "Les collaborateurs sont plus susceptibles de soumettre un feedback utile quand ils comprennent à quoi sert le canal et à quoi ressemble une bonne soumission. Un prompt vague invite des plaintes vagues.",
          "Encouragez le feedback qui décrit le problème, l'impact et l'amélioration que le collaborateur souhaiterait voir. Ce simple schéma améliore la qualité rapidement.",
        ],
      },
      {
        title: "Protéger la confiance tout en modérant de manière responsable",
        paragraphs: [
          "Les canaux de feedback interne ont besoin de modération, mais l'objectif devrait être de maintenir la conversation utile et respectueuse, pas de gommer les critiques. Une modération trop directive enseigne aux collaborateurs que l'honnêteté n'est pas sûre.",
          "Énoncez les règles de modération clairement et appliquez-les de manière cohérente. Les collaborateurs doivent connaître la frontière entre un feedback critique légitime et un abus improductif.",
        ],
      },
      {
        title: "Construire un rythme de réponse que les gens peuvent percevoir",
        paragraphs: [
          "Un canal de feedback devient crédible quand les collaborateurs peuvent pointer des changements, des accusés de réception ou des questions de suivi qui en découlent. La réponse n'a pas besoin d'être parfaite. Elle doit être visible.",
          "Même une brève mise à jour indiquant ce qui a été entendu, ce qui est en cours d'évaluation et ce qui va se passer ensuite peut améliorer significativement la confiance.",
        ],
      },
    ],
    faqs: [
      {
        question: "Quelle est la bonne pratique la plus importante ?",
        answer:
          "Le suivi visible. Les collaborateurs cessent d'utiliser les canaux de feedback interne quand ils pensent que rien ne se passe après la soumission.",
      },
      {
        question: "Le feedback interne doit-il être ouvert à tous les sujets ?",
        answer:
          "Pas sans accompagnement. Les équipes doivent expliquer quels sujets ont leur place dans le canal et vers quels canaux diriger les problèmes urgents ou très sensibles.",
      },
      {
        question: "Les managers peuvent-ils participer à la discussion ?",
        answer:
          "Oui, quand cela aide à clarifier le contexte ou à expliquer les prochaines étapes. Le ton compte : les managers doivent répondre pour apprendre et agir, pas pour se défendre.",
      },
    ],
    relatedLinks: [
      {
        href: "/resources/manager-response-template-anonymous-feedback",
        label: "Utiliser le modèle de réponse manager",
        description: "Répondre au feedback anonyme sans devenir défensif ou vague.",
      },
      {
        href: "/guides/workplace-trust-feedback-guide",
        label: "Lire le guide sur la confiance au travail",
        description: "Voir les conditions de confiance qui déterminent si les canaux de feedback fonctionnent.",
      },
      {
        href: "/solutions/internal-feedback-tool",
        label: "Explorer les outils de feedback interne",
        description: "Associer les bonnes pratiques à un modèle de produit qui les soutient.",
      },
    ],
    cta: {
      title: "Mettez en pratique de meilleures habitudes de feedback interne",
      body:
        "Voxr offre aux équipes un workspace privé où des normes claires, une modération légère et un suivi visible sont plus faciles à maintenir.",
      primary: {
        href: "/auth",
        label: "Commencer avec Voxr",
      },
      secondary: {
        href: "/features",
        label: "Voir les fonctionnalités du produit",
      },
    },
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Guides", href: "/guides" },
      { label: "Bonnes pratiques du feedback interne", href: "/guides/internal-feedback-best-practices" },
    ],
    publishedTime,
  },
  {
    slug: "workplace-trust-feedback-guide",
    type: "guide",
    path: "/guides/workplace-trust-feedback-guide",
    title: "Confiance au travail et feedback : un guide pratique",
    description:
      "Comprenez comment la confiance au travail affecte la qualité du feedback des collaborateurs et comment Voxr peut soutenir une communication interne plus sûre et plus honnête.",
    eyebrow: "Guide",
    intro:
      "La qualité du feedback est fortement influencée par la confiance. Si les collaborateurs anticipent un coût social, des représailles ou une attitude défensive silencieuse, ils s'autocensureront bien avant de parler.",
    definition:
      "La confiance au travail dans les systèmes de feedback signifie que les collaborateurs croient pouvoir dire quelque chose de vrai sans créer un risque personnel inutile.",
    summaryPoints: [
      "La confiance se construit par le comportement opérationnel, pas par le discours de lancement.",
      "Les collaborateurs observent comment les dirigeants réagissent au feedback inconfortable.",
      "L'anonymat aide, mais il ne corrige pas seul une culture défensive.",
      "Les canaux privés de workspace peuvent réduire la pression de la communication performative.",
    ],
    sections: [
      {
        title: "Pourquoi la confiance change le signal que vous recevez",
        paragraphs: [
          "Les environnements à faible confiance produisent un feedback filtré. Les collaborateurs partagent des opinions sans risque, s'expriment par abstractions ou attendent que la frustration devienne sévère. Cela signifie que les dirigeants reçoivent des informations moins utiles et les reçoivent plus tard.",
          "Le résultat n'est pas seulement une communication plus pauvre. C'est une vision opérationnelle dégradée. Les équipes manquent des signaux d'alerte précoces qui auraient pu être traités à moindre coût.",
        ],
      },
      {
        title: "Comment les canaux anonymes soutiennent la confiance",
        paragraphs: [
          "Les canaux anonymes aident quand le coût social de l'honnêteté est encore trop élevé. Ils permettent aux collaborateurs de dire ce qui serait difficile à dire dans un fil Slack public, un standup d'équipe ou une conversation avec le manager.",
          "Cela dit, l'anonymat ne soutient la confiance que si l'entreprise l'utilise de manière responsable. Les collaborateurs remarqueront rapidement si le canal existe sur le papier mais pas dans l'esprit.",
        ],
      },
      {
        title: "Signes que le système gagne la confiance",
        paragraphs: [
          "On peut généralement dire qu'un système de feedback fonctionne quand les collaborateurs passent d'une insatisfaction vague à des observations et idées spécifiques et utiles. Le ton devient plus pratique parce que le canal semble plus sûr.",
          "On observe aussi un meilleur comportement du management : plus d'accusés de réception, moins de réflexes défensifs et plus d'actions visibles basées sur ce qui a été entendu.",
        ],
      },
    ],
    faqs: [
      {
        question: "Un logiciel peut-il créer la confiance au travail à lui seul ?",
        answer:
          "Non. Le logiciel peut réduire les frictions et protéger l'anonymat, mais la confiance est créée par le comportement du management, la qualité des réponses et les preuves répétées que s'exprimer est sûr.",
      },
      {
        question: "Pourquoi les collaborateurs restent-ils silencieux même quand une entreprise dit que le feedback est bienvenu ?",
        answer:
          "Parce que l'ouverture affichée et l'expérience vécue sont différentes. Les collaborateurs réagissent à ce qui s'est passé avant, pas seulement au discours de la politique interne.",
      },
      {
        question: "Quel rôle joue l'anonymat dans la confiance ?",
        answer:
          "L'anonymat réduit le coût personnel de l'honnêteté. C'est souvent le pont qui permet aux équipes d'entendre la vérité pendant que la confiance globale est encore en construction.",
      },
    ],
    relatedLinks: [
      {
        href: "/guides/what-is-anonymous-employee-feedback",
        label: "Comprendre le feedback anonyme des collaborateurs",
        description: "Relier le problème de confiance à la conception du canal.",
      },
      {
        href: "/security",
        label: "Lire la page sécurité et confidentialité de Voxr",
        description: "Voir comment le produit est décrit pour gérer le feedback interne en toute sécurité.",
      },
      {
        href: "/glossary/workplace-trust",
        label: "Consulter la page glossaire sur la confiance au travail",
        description: "Obtenir un résumé plus court, orienté définition, du terme.",
      },
    ],
    cta: {
      title: "Créez un canal de feedback qui gagne la confiance au fil du temps",
      body:
        "Voxr aide les équipes à offrir aux collaborateurs une voie plus sûre vers un feedback interne honnête au sein d'un workspace privé.",
      primary: {
        href: "/auth",
        label: "Créer un workspace Voxr",
      },
      secondary: {
        href: "/security",
        label: "Consulter la sécurité et la confidentialité",
      },
    },
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Guides", href: "/guides" },
      { label: "Confiance au travail et feedback", href: "/guides/workplace-trust-feedback-guide" },
    ],
    publishedTime,
  },
];

export const resourcePagesFr: ContentPageRecord[] = [
  {
    slug: "employee-feedback-template",
    type: "resource",
    path: "/resources/employee-feedback-template",
    title: "Modèle de feedback collaborateur pour des retours internes honnêtes",
    description:
      "Utilisez ce modèle de feedback collaborateur pour recueillir des retours internes plus utiles et associez-le à Voxr pour un workflow de feedback collaborateur privé.",
    eyebrow: "Modèle",
    intro:
      "Un bon modèle de feedback collaborateur doit aider les collaborateurs à formuler quelque chose de suffisamment précis pour être actionnable sans transformer la soumission en un long formulaire.",
    definition:
      "Le modèle le plus efficace demande le problème, l'impact et l'amélioration souhaitée. Cette structure simple produit un feedback plus utile qu'un champ de texte vide seul.",
    summaryPoints: [
      "À utiliser pour les idées, les frictions, les éloges et les préoccupations.",
      "Assez court pour un usage récurrent, assez structuré pour l'action.",
      "Fonctionne bien dans les canaux anonymes et les formulaires structurés.",
      "Aide les managers à examiner le feedback sans deviner ce qui compte.",
    ],
    sections: [
      {
        title: "Modèle de feedback collaborateur recommandé",
        paragraphs: [
          "Utilisez ce prompt quand vous souhaitez que les collaborateurs partagent un feedback concis mais toujours utile :",
          "Que s'est-il passé ou quelle tendance observez-vous ? Pourquoi est-ce important ? Qu'est-ce qui améliorerait la situation ? Ajoutez tout contexte qui aiderait l'équipe à comprendre le sujet sans révéler de détails privés que vous ne souhaitez pas partager.",
        ],
        bullets: [
          "Qu'est-ce qui fonctionne bien et que l'équipe devrait continuer à faire ?",
          "Qu'est-ce qui cause des frictions, de la confusion ou des retards ?",
          "Quelle idée ou amélioration rendrait l'expérience meilleure ?",
          "Quel contexte aiderait les autres à comprendre la situation ?",
        ],
      },
      {
        title: "Quand utiliser un modèle plutôt qu'un prompt ouvert",
        paragraphs: [
          "Les modèles sont utiles quand les équipes veulent améliorer la qualité du feedback sans ajouter un processus de relecture lourd. Ils aident les collaborateurs à organiser leurs pensées et facilitent l'identification des thèmes récurrents.",
          "Ils sont particulièrement utiles pour les managers et les équipes opérationnelles qui ont besoin de cohérence à travers de nombreuses soumissions.",
        ],
      },
      {
        title: "Comment Voxr peut accompagner ce modèle",
        paragraphs: [
          "Voxr peut être utilisé comme le lieu permanent du feedback collaborateur et des formulaires structurés. Les équipes peuvent recueillir des publications anonymes ouvertes quand la rapidité compte et utiliser des formulaires quand elles souhaitent un flux de modèle plus guidé.",
          "Cela vous donne de la flexibilité sans disperser le feedback collaborateur à travers des systèmes déconnectés.",
        ],
      },
    ],
    faqs: [
      {
        question: "Un modèle de feedback collaborateur doit-il être anonyme ?",
        answer:
          "Cela dépend du contexte, mais les options anonymes sont souvent importantes quand le feedback est critique ou sensible.",
      },
      {
        question: "Quelle doit être la longueur du modèle ?",
        answer:
          "Court. L'objectif est de faciliter la prochaine chose utile à dire, pas de forcer les collaborateurs dans un long exercice de rédaction.",
      },
      {
        question: "Le même modèle peut-il être utilisé pour les éloges et les problèmes ?",
        answer:
          "Oui. La même structure fonctionne pour les deux tant que le prompt laisse de la place pour ce qui va bien et ce qui devrait changer.",
      },
    ],
    relatedLinks: [
      {
        href: "/resources/manager-response-template-anonymous-feedback",
        label: "L'associer à un modèle de réponse manager",
        description: "Améliorer à la fois les retours et le suivi.",
      },
      {
        href: "/solutions/employee-feedback-platform",
        label: "Voir la page plateforme de feedback collaborateur",
        description: "Relier le modèle à la décision plus large de plateforme.",
      },
      {
        href: "/guides/how-to-collect-anonymous-employee-feedback",
        label: "Lire le guide de collecte",
        description: "Utiliser le modèle dans un processus de déploiement digne de confiance.",
      },
    ],
    cta: {
      title: "Transformez le modèle en un workflow de feedback récurrent",
      body:
        "Utilisez Voxr pour recueillir le feedback collaborateur au sein d'un workspace privé et basculer entre publications ouvertes et formulaires structurés selon les besoins.",
      primary: {
        href: "/auth",
        label: "Commencer avec Voxr",
      },
      secondary: {
        href: "/features",
        label: "Voir les fonctionnalités formulaires et feedback",
      },
    },
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Ressources", href: "/resources" },
      { label: "Modèle de feedback collaborateur", href: "/resources/employee-feedback-template" },
    ],
    publishedTime,
  },
  {
    slug: "anonymous-feedback-policy-template",
    type: "resource",
    path: "/resources/anonymous-feedback-policy-template",
    title: "Modèle de politique de feedback anonyme pour les équipes internes",
    description:
      "Utilisez ce modèle de politique de feedback anonyme pour définir les attentes concernant les soumissions des collaborateurs, la modération et le suivi avec Voxr.",
    eyebrow: "Modèle",
    intro:
      "Un modèle de politique de feedback anonyme aide les équipes à expliquer le fonctionnement du canal avant que la première soumission n'apparaisse.",
    definition:
      "La politique doit répondre clairement à quatre questions : à quoi sert le canal, qui peut voir le feedback, comment fonctionne la modération et comment les dirigeants répondront.",
    summaryPoints: [
      "Clarifie l'objectif, la visibilité, la modération et les attentes de réponse.",
      "Aide les collaborateurs à faire confiance au système avant de l'utiliser.",
      "Utile pour les startups, les équipes RH et les responsables opérationnels.",
      "S'associe naturellement à un outil de feedback basé sur des workspaces privés.",
    ],
    sections: [
      {
        title: "Structure recommandée de politique de feedback anonyme",
        paragraphs: [
          "Une politique pratique peut être courte. Commencez par l'objectif du canal. Expliquez que les collaborateurs peuvent l'utiliser pour du feedback interne honnête, des préoccupations, des idées, des éloges et des commentaires qu'il peut être difficile d'exprimer publiquement.",
          "Puis définissez qui peut voir le feedback, comment l'entreprise modérera les contenus improductifs et à quelle fréquence le feedback sera examiné.",
        ],
        bullets: [
          "Objectif : pourquoi le canal existe et ce qu'il est conçu pour recueillir.",
          "Visibilité : qui peut accéder aux publications et si l'accès est spécifique au workspace.",
          "Modération : quels types de contenus peuvent être supprimés ou redirigés.",
          "Suivi : comment les dirigeants accusent réception et répondent aux thèmes récurrents.",
        ],
      },
      {
        title: "Ce qu'il ne faut pas promettre dans la politique",
        paragraphs: [
          "Évitez les affirmations juridiques ou de conformité larges à moins qu'elles ne soient explicitement vraies. L'objectif est la clarté, pas l'exagération. Les collaborateurs font davantage confiance à un langage précis qu'à des garanties gonflées.",
          "Il vaut mieux expliquer le produit et le processus honnêtement que de faire des promesses générales que l'équipe ne peut pas honorer de manière cohérente.",
        ],
      },
      {
        title: "Comment Voxr s'intègre dans la politique",
        paragraphs: [
          "Voxr offre aux équipes un workspace privé pour le feedback interne anonyme, ce qui facilite la description claire du système. Les collaborateurs peuvent comprendre que leur feedback reste dans le workspace concerné plutôt que d'être largement exposé par défaut.",
          "Cette simplicité aide les équipes à rédiger une politique plus précise et à la maintenir dans le temps.",
        ],
      },
    ],
    faqs: [
      {
        question: "Qui doit être responsable de la politique de feedback anonyme ?",
        answer:
          "La responsabilité revient souvent aux opérations People, aux RH, aux fondateurs ou à la direction de département, mais l'essentiel est que quelqu'un soit clairement responsable du canal.",
      },
      {
        question: "Quel niveau de détail doit avoir la politique ?",
        answer:
          "Assez détaillée pour lever l'ambiguïté, mais assez concise pour que les collaborateurs la lisent réellement. La plupart des équipes bénéficient d'une version courte en langage clair.",
      },
      {
        question: "La politique doit-elle mentionner la modération ?",
        answer:
          "Oui. Les collaborateurs ont besoin de connaître les règles et de comprendre comment l'entreprise distingue le feedback critique utile du contenu abusif ou hors sujet.",
      },
    ],
    relatedLinks: [
      {
        href: "/guides/how-to-collect-anonymous-employee-feedback",
        label: "Lire le guide de collecte du feedback anonyme",
        description: "Utiliser la politique dans un plan de déploiement complet.",
      },
      {
        href: "/security",
        label: "Consulter les détails de sécurité et confidentialité",
        description: "Aligner le langage de la politique avec le positionnement du produit.",
      },
      {
        href: "/resources/employee-feedback-template",
        label: "L'associer au modèle de feedback collaborateur",
        description: "Définir les attentes tant pour les règles que pour le format des soumissions.",
      },
    ],
    cta: {
      title: "Lancez le feedback anonyme avec des attentes plus claires",
      body:
        "Utilisez Voxr quand vous voulez que la politique et le produit renforcent le même message simple : les collaborateurs disposent d'un espace privé pour s'exprimer honnêtement.",
      primary: {
        href: "/auth",
        label: "Créer un workspace",
      },
      secondary: {
        href: "/security",
        label: "Voir la sécurité et la confidentialité",
      },
    },
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Ressources", href: "/resources" },
      {
        label: "Modèle de politique de feedback anonyme",
        href: "/resources/anonymous-feedback-policy-template",
      },
    ],
    publishedTime,
  },
  {
    slug: "manager-response-template-anonymous-feedback",
    type: "resource",
    path: "/resources/manager-response-template-anonymous-feedback",
    title: "Modèle de réponse manager au feedback anonyme",
    description:
      "Utilisez ce modèle de réponse manager pour accuser réception du feedback anonyme clairement et préserver la confiance des collaborateurs avec Voxr.",
    eyebrow: "Modèle",
    intro:
      "Les managers nuisent souvent à la confiance en répondant de manière trop défensive, trop vague ou trop tardive au feedback anonyme. Un modèle de réponse aide à garder un ton ancré et utile.",
    definition:
      "La meilleure réponse manager comporte quatre éléments : l'accusé de réception, la compréhension du sujet, la prochaine étape et un calendrier réaliste.",
    summaryPoints: [
      "Aide les managers à répondre sans attitude défensive.",
      "Utile pour les idées, les préoccupations et les frictions de processus.",
      "Favorise un meilleur suivi dans les canaux anonymes.",
      "S'associe bien aux discussions de feedback basées sur les workspaces.",
    ],
    sections: [
      {
        title: "Modèle de réponse recommandé",
        paragraphs: [
          "Une réponse manager simple peut ressembler à ceci : Merci d'avoir soulevé ce point. Nous comprenons la préoccupation et pourquoi elle est importante. Nous examinons le sujet avec les personnes concernées. Voici la prochaine étape et le délai dans lequel nous prévoyons de partager une mise à jour.",
          "Cette structure suffit à montrer aux collaborateurs que le message a été entendu sans trop s'engager ni tomber dans l'autoprotection.",
        ],
        bullets: [
          "Accuser réception du feedback directement.",
          "Reformuler le sujet dans un langage clair.",
          "Partager la prochaine étape ou le chemin de décision.",
          "Donner un signal de calendrier réaliste pour le suivi.",
        ],
      },
      {
        title: "À quoi ressemblent les réponses faibles",
        paragraphs: [
          "Les réponses faibles paraissent généralement évasives. Elles se concentrent sur l'intention plutôt que sur l'impact, évitent la précision ou suggèrent que le collaborateur a mal compris la situation.",
          "Même si un manager n'est pas d'accord avec le cadrage, la première réponse devrait tout de même communiquer compréhension et sérieux avant d'entrer dans la nuance.",
        ],
      },
      {
        title: "Comment Voxr facilite la boucle de réponse",
        paragraphs: [
          "Parce que Voxr maintient le feedback visible au sein du workspace, les managers et administrateurs peuvent répondre dans le même environnement où le feedback a été déposé. Cela rend la boucle plus facile à suivre qu'un processus de relecture via tableur privé ou boîte de réception.",
          "Le canal reste utile quand les collaborateurs constatent que les retours honnêtes mènent à un accusé de réception visible et à de l'action.",
        ],
      },
    ],
    faqs: [
      {
        question: "Les managers doivent-ils répondre à chaque publication anonyme ?",
        answer:
          "Chaque publication ne nécessite pas une longue réponse, mais le feedback important ne devrait pas sembler ignoré. La profondeur de réponse appropriée dépend du sujet et de l'action requise.",
      },
      {
        question: "Un manager peut-il être en désaccord avec un feedback anonyme ?",
        answer:
          "Oui, mais la réponse devrait commencer par accuser réception de la préoccupation et clarifier ce qui sera examiné au lieu de devenir argumentative.",
      },
      {
        question: "Pourquoi utiliser un modèle de réponse ?",
        answer:
          "Les modèles réduisent l'improvisation défensive. Ils aident les managers à répondre de manière cohérente sous pression et à préserver la confiance dans le canal.",
      },
    ],
    relatedLinks: [
      {
        href: "/guides/internal-feedback-best-practices",
        label: "Lire les bonnes pratiques du feedback interne",
        description: "Utiliser de meilleurs schémas de réponse dans le cadre du modèle opérationnel complet.",
      },
      {
        href: "/resources/anonymous-feedback-policy-template",
        label: "Consulter le modèle de politique",
        description: "Aligner les réponses des managers avec les règles établies du canal.",
      },
      {
        href: "/solutions/employee-feedback-platform",
        label: "Voir la page plateforme de feedback collaborateur",
        description: "Relier de meilleures réponses managériales au système de feedback global.",
      },
    ],
    cta: {
      title: "Rendez le suivi suffisamment visible pour construire la confiance",
      body:
        "Voxr aide les équipes à conserver le feedback anonyme et les réponses managériales dans le même workspace privé pour que les conversations utiles ne disparaissent pas.",
      primary: {
        href: "/auth",
        label: "Commencer avec Voxr",
      },
      secondary: {
        href: "/guides/workplace-trust-feedback-guide",
        label: "Lire le guide sur la confiance",
      },
    },
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Ressources", href: "/resources" },
      {
        label: "Modèle de réponse manager",
        href: "/resources/manager-response-template-anonymous-feedback",
      },
    ],
    publishedTime,
  },
];

export const glossaryPagesFr: ContentPageRecord[] = [
  {
    slug: "anonymous-feedback",
    type: "glossary",
    path: "/glossary/anonymous-feedback",
    title: "Définition du feedback anonyme",
    description:
      "Une définition glossaire du feedback anonyme, quand les équipes l'utilisent et comment Voxr prend en charge le feedback interne anonyme au sein de workspaces privés.",
    eyebrow: "Glossaire",
    intro:
      "Le feedback anonyme est un retour partagé sans exposer une identité visible à l'audience qui le reçoit.",
    definition:
      "Les équipes utilisent le feedback anonyme quand l'honnêteté dépend de la réduction du risque personnel lié à la prise de parole. C'est particulièrement courant dans les environnements de travail où la hiérarchie ou les dynamiques sociales réduisent la franchise.",
    summaryPoints: [
      "Utilisé pour réduire la peur, la politique et la pression sociale.",
      "Plus précieux quand il est associé à des règles de fonctionnement claires.",
      "Peut inclure des idées, des préoccupations, des éloges et des observations de processus.",
      "Fonctionne mieux quand l'audience sait comment répondre de manière responsable.",
    ],
    sections: [
      {
        title: "Pourquoi le terme compte",
        paragraphs: [
          "Le feedback anonyme est souvent présenté comme une fonctionnalité produit, mais c'est en réalité un mécanisme de confiance. L'anonymat compte parce qu'il change ce que les collaborateurs se sentent en sécurité de dire.",
          "C'est pourquoi les questions les plus utiles ne sont pas uniquement techniques. Les équipes doivent aussi se demander si le canal sera examiné sérieusement, modéré équitablement et utilisé de manière à préserver la confiance.",
        ],
      },
      {
        title: "Où il est utilisé au travail",
        paragraphs: [
          "Les entreprises utilisent le feedback anonyme pour les préoccupations internes, les suggestions des collaborateurs, les idées d'amélioration, le feedback sur le management et parfois la reconnaissance que les collaborateurs préfèrent partager sans visibilité.",
          "C'est particulièrement utile dans les petites équipes où un message public peut sembler inhabituellement exposé.",
        ],
      },
      {
        title: "Comment Voxr se rapporte au terme",
        paragraphs: [
          "Voxr est centré sur le feedback interne anonyme en entreprise. Les collaborateurs peuvent partager des retours, des idées, des éloges, des préoccupations et des commentaires dans un workspace privé visible uniquement par les membres de ce workspace.",
          "Cette structure rend le terme concret plutôt qu'abstrait : l'objectif n'est pas le feedback anonyme en théorie, mais le feedback interne anonyme que les équipes peuvent réellement utiliser.",
        ],
      },
    ],
    faqs: [
      {
        question: "Le feedback anonyme est-il la même chose que le feedback confidentiel ?",
        answer:
          "Pas nécessairement. Anonyme signifie que l'identité n'est pas visible dans le feedback lui-même. Confidentiel peut signifier que l'identité est connue d'un nombre limité de personnes mais pas largement divulguée.",
      },
      {
        question: "Pourquoi le feedback anonyme est-il controversé dans certaines équipes ?",
        answer:
          "Parce que les dirigeants craignent les abus ou les critiques de faible qualité. La réponse n'est pas de supprimer entièrement l'anonymat, mais de gérer le canal avec des normes claires et un suivi.",
      },
      {
        question: "Qu'est-ce qui rend le feedback anonyme utile plutôt que bruyant ?",
        answer:
          "Un objectif clair, de bons prompts, une modération équitable et de l'action visible. Sans cela, même les canaux bien intentionnés se dégradent.",
      },
    ],
    relatedLinks: [
      {
        href: "/guides/what-is-anonymous-employee-feedback",
        label: "Lire le guide complet",
        description: "Aller au-delà de la définition du glossaire.",
      },
      {
        href: "/solutions/anonymous-feedback-software",
        label: "Voir la page catégorie logiciel",
        description: "Passer du concept aux critères de sélection de produit.",
      },
      {
        href: "/glossary/employee-voice",
        label: "Lire la page glossaire sur la voix des collaborateurs",
        description: "Voir comment le feedback anonyme s'inscrit dans le concept plus large de voix des collaborateurs.",
      },
    ],
    cta: {
      title: "Intégrez le feedback anonyme dans un workflow d'équipe plus sûr",
      body:
        "Voxr offre aux équipes un workspace privé pour le feedback interne anonyme, plus facile à maintenir qu'une boîte de réception générique ou un outil d'enquête.",
      primary: {
        href: "/auth",
        label: "Créer un workspace",
      },
      secondary: {
        href: "/product",
        label: "Voir comment Voxr fonctionne",
      },
    },
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Glossaire", href: "/glossary" },
      { label: "Feedback anonyme", href: "/glossary/anonymous-feedback" },
    ],
    publishedTime,
  },
  {
    slug: "employee-voice",
    type: "glossary",
    path: "/glossary/employee-voice",
    title: "Définition de la voix des collaborateurs",
    description:
      "Une définition glossaire de la voix des collaborateurs, pourquoi c'est important et comment Voxr soutient concrètement la voix des collaborateurs via le feedback interne anonyme.",
    eyebrow: "Glossaire",
    intro:
      "La voix des collaborateurs décrit les moyens par lesquels les collaborateurs peuvent partager des idées, des préoccupations, des observations et des opinions qui influencent la manière dont le travail est vécu et amélioré.",
    definition:
      "Dans les entreprises solides, la voix des collaborateurs n'est pas qu'un score d'enquête. C'est la capacité répétée pour les collaborateurs de dire quelque chose d'utile et de faire confiance que cela sera entendu.",
    summaryPoints: [
      "Plus large que les seules enquêtes d'engagement.",
      "Inclut les suggestions, préoccupations, éloges et informations opérationnelles.",
      "Dépend de la confiance et de la qualité des réponses, pas seulement de l'outillage.",
      "Les canaux anonymes jouent souvent un rôle de soutien important.",
    ],
    sections: [
      {
        title: "Pourquoi la voix des collaborateurs compte",
        paragraphs: [
          "Les entreprises prennent de meilleures décisions quand les collaborateurs peuvent partager ce que les dirigeants ne peuvent pas directement voir. Cela inclut les frictions de processus au quotidien, les difficultés côté client, les dynamiques d'équipe et les idées d'amélioration.",
          "Quand la voix des collaborateurs est faible, les organisations le paient par le silence, la découverte tardive des problèmes et une méfiance évitable.",
        ],
      },
      {
        title: "Comment le feedback anonyme soutient la voix des collaborateurs",
        paragraphs: [
          "Toute forme de voix des collaborateurs ne doit pas être anonyme. Mais les options anonymes sont souvent la voie qui maintient la parole quand le sujet est sensible ou que les rapports de force sont déséquilibrés.",
          "C'est pourquoi les équipes qui cherchent à améliorer la voix des collaborateurs recherchent souvent aussi un canal de feedback interne anonyme.",
        ],
      },
      {
        title: "Comment Voxr soutient la voix des collaborateurs",
        paragraphs: [
          "Voxr offre à chaque workspace un espace privé où les collaborateurs peuvent partager des retours honnêtes, des idées, des éloges, des préoccupations et des commentaires. Cela rend le produit utile comme système léger de voix des collaborateurs pour les équipes modernes.",
          "L'objectif n'est pas un fil de communication générique. C'est un environnement interne protégé où les retours utiles des collaborateurs sont plus faciles à faire remonter.",
        ],
      },
    ],
    faqs: [
      {
        question: "La voix des collaborateurs est-elle la même chose que l'engagement collaborateur ?",
        answer:
          "Non. L'engagement porte sur ce que les gens ressentent. La voix des collaborateurs porte sur leur capacité à exprimer des retours utiles et à influencer l'amélioration du travail.",
      },
      {
        question: "Une entreprise peut-elle avoir une forte voix des collaborateurs sans anonymat ?",
        answer:
          "Parfois, mais de nombreuses équipes ont toujours besoin d'options anonymes pour les sujets sensibles. Supprimer entièrement l'anonymat restreint souvent ce que les collaborateurs sont prêts à dire.",
      },
      {
        question: "Quel est le plus grand frein à la voix des collaborateurs ?",
        answer:
          "Un manque de confiance que s'exprimer est sûr et utile. L'outillage compte, mais le comportement du management compte davantage.",
      },
    ],
    relatedLinks: [
      {
        href: "/guides/workplace-trust-feedback-guide",
        label: "Lire le guide sur la confiance au travail",
        description: "La confiance est la condition qui détermine si la voix des collaborateurs est réelle.",
      },
      {
        href: "/solutions/employee-feedback-platform",
        label: "Voir la page plateforme de feedback collaborateur",
        description: "Comprendre comment le concept se traduit dans le choix de produit.",
      },
      {
        href: "/glossary/anonymous-feedback",
        label: "Lire la page glossaire sur le feedback anonyme",
        description: "Voir l'un des mécanismes fondamentaux qui soutient la voix des collaborateurs.",
      },
    ],
    cta: {
      title: "Donnez à la voix des collaborateurs un espace privé pour vivre",
      body:
        "Voxr aide les équipes modernes à construire un canal léger de voix des collaborateurs autour du feedback interne anonyme et de discussions actionnables.",
      primary: {
        href: "/auth",
        label: "Commencer avec Voxr",
      },
      secondary: {
        href: "/solutions/employee-feedback-platform",
        label: "Voir la page plateforme de feedback collaborateur",
      },
    },
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Glossaire", href: "/glossary" },
      { label: "Voix des collaborateurs", href: "/glossary/employee-voice" },
    ],
    publishedTime,
  },
  {
    slug: "employee-suggestion-box",
    type: "glossary",
    path: "/glossary/employee-suggestion-box",
    title: "Définition de la boîte à idées collaborateur",
    description:
      "Une définition glossaire des boîtes à idées collaborateur, comment elles se comparent aux outils de feedback anonyme et où Voxr se positionne.",
    eyebrow: "Glossaire",
    intro:
      "Une boîte à idées collaborateur est un canal que les collaborateurs utilisent pour partager des idées ou des préoccupations de manière privée, souvent sans attendre une discussion en direct.",
    definition:
      "La boîte à idées traditionnelle est simple mais limitée. Les équipes modernes veulent souvent quelque chose de plus proche d'une plateforme de feedback anonyme qui permet le contexte, la discussion et le suivi.",
    summaryPoints: [
      "Format classique pour recueillir des idées et des préoccupations.",
      "Utile, mais souvent trop passive pour les équipes modernes.",
      "Peut évoluer vers un système de feedback anonyme plus large.",
      "Fonctionne mieux avec une responsabilité claire et des schémas de réponse.",
    ],
    sections: [
      {
        title: "Ce que la boîte à idées fait bien",
        paragraphs: [
          "La boîte à idées abaisse la barrière au partage. Les collaborateurs n'ont pas besoin d'une réunion ou d'une conversation avec le manager pour soulever un sujet ou une idée. Cette simplicité reste précieuse.",
          "C'est l'une des raisons pour lesquelles le concept reste familier dans les startups, les grandes entreprises et les équipes orientées opérations.",
        ],
      },
      {
        title: "Où le modèle classique atteint ses limites",
        paragraphs: [
          "La plupart des boîtes à idées sont unidirectionnelles. Les collaborateurs envoient quelque chose, puis attendent. Cela rend le canal facile à ignorer et difficile à crédibiliser.",
          "Les équipes modernes ont souvent besoin de plus que de la collecte. Elles ont besoin d'une boucle de feedback interne vivante où les thèmes utiles restent visibles suffisamment longtemps pour influencer l'action.",
        ],
      },
      {
        title: "Pourquoi Voxr est une alternative moderne",
        paragraphs: [
          "Voxr est conçu pour le feedback interne anonyme au sein de workspaces. Cela le rend plus utile qu'une boîte à idées passive quand les équipes veulent un dialogue continu, des idées pratiques et des préoccupations sensibles dans le même produit.",
          "Il conserve le bénéfice fondamental d'un retour plus sûr tout en rendant le suivi plus facile à voir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Une boîte à idées suffit-elle pour la voix des collaborateurs ?",
        answer:
          "Parfois, mais beaucoup d'équipes la dépassent rapidement. Dès que vous avez besoin de discussion, de visibilité et d'engagement récurrent, un système de feedback plus large est généralement préférable.",
      },
      {
        question: "Les boîtes à idées doivent-elles être numériques ?",
        answer:
          "Pour la plupart des équipes modernes, oui. Les outils numériques rendent la soumission, l'examen, l'organisation et le suivi plus pratiques.",
      },
      {
        question: "Une boîte à idées peut-elle traiter les préoccupations sensibles ?",
        answer:
          "Oui, mais seulement si les collaborateurs font confiance au système et comprennent qui peut accéder aux soumissions. C'est l'une des raisons pour lesquelles les outils basés sur des workspaces privés sont attractifs.",
      },
    ],
    relatedLinks: [
      {
        href: "/solutions/employee-suggestion-box-software",
        label: "Voir la page complète logiciel de boîte à idées",
        description: "Comparer le modèle classique avec une alternative moderne.",
      },
      {
        href: "/resources/employee-feedback-template",
        label: "Utiliser le modèle de feedback collaborateur",
        description: "Améliorer la qualité de ce que les collaborateurs soumettent.",
      },
      {
        href: "/glossary/anonymous-feedback",
        label: "Lire la page glossaire sur le feedback anonyme",
        description: "Comprendre le mécanisme de confiance qui alimente de meilleurs canaux de suggestions.",
      },
    ],
    cta: {
      title: "Allez au-delà d'une boîte à idées passive",
      body:
        "Voxr aide les équipes à transformer les retours plus sûrs des collaborateurs en une boucle de feedback interne vivante au sein de chaque workspace.",
      primary: {
        href: "/auth",
        label: "Créer un workspace Voxr",
      },
      secondary: {
        href: "/solutions/employee-suggestion-box-software",
        label: "Explorer la page solution",
      },
    },
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Glossaire", href: "/glossary" },
      { label: "Boîte à idées collaborateur", href: "/glossary/employee-suggestion-box" },
    ],
    publishedTime,
  },
  {
    slug: "workplace-trust",
    type: "glossary",
    path: "/glossary/workplace-trust",
    title: "Définition de la confiance au travail",
    description:
      "Une définition glossaire de la confiance au travail dans le contexte du feedback collaborateur et comment Voxr soutient une communication interne plus sûre.",
    eyebrow: "Glossaire",
    intro:
      "La confiance au travail est la conviction que l'on peut communiquer honnêtement, prendre un risque interpersonnel raisonnable et s'attendre à un traitement équitable en retour.",
    definition:
      "Dans les systèmes de feedback, la confiance au travail signifie que les collaborateurs croient pouvoir partager quelque chose de difficile sans déclencher de dommages sociaux ou politiques inutiles.",
    summaryPoints: [
      "Condition fondamentale pour un feedback collaborateur honnête.",
      "Façonnée par le comportement du management et les normes opérationnelles.",
      "Soutenue, mais pas créée, par les outils anonymes.",
      "Améliore la qualité et la rapidité des signaux internes.",
    ],
    sections: [
      {
        title: "Pourquoi la confiance au travail compte pour le feedback",
        paragraphs: [
          "Les collaborateurs s'autocensurent quand la confiance est faible. Ils en disent moins, adoucissent la vérité ou attendent qu'un problème soit impossible à ignorer. Cela réduit la qualité des informations opérationnelles que les dirigeants reçoivent.",
          "Les environnements à forte confiance bénéficient toujours des canaux anonymes, mais les environnements à faible confiance en dépendent beaucoup plus fortement.",
        ],
      },
      {
        title: "Comment la confiance se gagne",
        paragraphs: [
          "La confiance se construit par des preuves répétées : des réponses justes, un traitement prévisible des sujets sensibles et de l'action visible basée sur le feedback. Elle ne se construit pas uniquement par le discours de lancement.",
          "Les collaborateurs apprennent ce que le système est vraiment en observant ce qui se passe après que quelqu'un a pris la parole.",
        ],
      },
      {
        title: "Comment Voxr aide",
        paragraphs: [
          "Voxr offre aux équipes un workspace privé pour le feedback interne anonyme afin que les collaborateurs disposent d'une voie plus sûre pour signaler des problèmes pendant que la confiance se construit.",
          "Cela ne supprime pas le besoin de discipline managériale, mais offre aux entreprises une meilleure structure pour soutenir une communication honnête.",
        ],
      },
    ],
    faqs: [
      {
        question: "La confiance peut-elle exister sans anonymat ?",
        answer:
          "Oui, mais l'anonymat reste souvent utile pour les sujets sensibles. Confiance et anonymat ne sont pas des opposés ; ils fonctionnent souvent ensemble.",
      },
      {
        question: "Comment les dirigeants nuisent-ils à la confiance au travail dans les systèmes de feedback ?",
        answer:
          "En réagissant de manière défensive, en traitant la critique comme de la déloyauté ou en laissant le feedback disparaître sans action visible.",
      },
      {
        question: "Pourquoi la confiance au travail est-elle pertinente pour le choix d'un logiciel ?",
        answer:
          "Parce que l'outil façonne le sentiment de sécurité du canal. Un système privé bien délimité peut réduire le coût social de l'honnêteté.",
      },
    ],
    relatedLinks: [
      {
        href: "/guides/workplace-trust-feedback-guide",
        label: "Lire le guide complet sur la confiance",
        description: "Approfondir la manière dont la confiance façonne la qualité du feedback.",
      },
      {
        href: "/security",
        label: "Voir les détails de sécurité et confidentialité",
        description: "Comprendre comment le produit est positionné pour un feedback interne plus sûr.",
      },
      {
        href: "/glossary/employee-voice",
        label: "Lire la définition de la voix des collaborateurs",
        description: "Relier la confiance à l'objectif plus large de la voix des collaborateurs.",
      },
    ],
    cta: {
      title: "Soutenez la confiance au travail avec un canal de feedback plus sûr",
      body:
        "Voxr aide les équipes à créer une voie privée pour un feedback interne honnête pendant que les dirigeants construisent les habitudes de réponse qui rendent la confiance réelle.",
      primary: {
        href: "/auth",
        label: "Commencer avec Voxr",
      },
      secondary: {
        href: "/guides/workplace-trust-feedback-guide",
        label: "Lire le guide",
      },
    },
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Glossaire", href: "/glossary" },
      { label: "Confiance au travail", href: "/glossary/workplace-trust" },
    ],
    publishedTime,
  },
];

export const allContentPagesFr = [
  ...solutionPagesFr,
  ...guidePagesFr,
  ...resourcePagesFr,
  ...glossaryPagesFr,
];

export const homeCollectionsFr = {
  solutions: solutionPagesFr.map(({ path, title, description }) => ({
    href: path,
    label: title,
    description,
  })),
  guides: guidePagesFr.map(({ path, title, description }) => ({
    href: path,
    label: title,
    description,
  })),
  resources: [...resourcePagesFr, ...glossaryPagesFr].map(
    ({ path, title, description }) => ({
      href: path,
      label: title,
      description,
    })
  ),
};
