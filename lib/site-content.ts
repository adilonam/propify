export const KEY_STATS = [
  {
    value: "+2 500",
    label: "Traders financés",
    description:
      "De France, de Belgique, de Suisse, d'Espagne, d'Italie. Des profils différents, un point commun : arrêter de trader avec des comptes trop petits pour refléter leur vrai niveau.",
  },
  {
    value: "+10M$",
    label: "Reversés en récompenses",
    description:
      "Ce chiffre grimpe chaque semaine. Il représente chaque trader qui a validé ses objectifs et reçu son payout dans les délais annoncés, sans friction.",
  },
  {
    value: "90%",
    label: "Profit split",
    description:
      "La grande majorité de ce qui est généré reste dans la poche du trader. C'est l'un des splits les plus compétitifs du marché des prop firms européennes, et c'est assumé.",
  },
  {
    value: "24/7",
    label: "Support dédié",
    description:
      "Un humain derrière l'écran. Disponible par live chat, email et WhatsApp, peu importe l'heure, peu importe le marché ouvert.",
  },
] as const

export const CHALLENGE_TIERS = [
  {
    size: "10K",
    price: "89€",
    note: "Pour poser des bases solides et s'habituer aux règles dans des conditions sérieuses.",
  },
  {
    size: "25K",
    price: "149€",
    note: "Pour les traders qui ont déjà une stratégie définie et veulent la tester sur un capital significatif.",
  },
  {
    size: "50K",
    price: "249€",
    note: "Le choix le plus populaire, le meilleur équilibre entre capital accessible et objectif atteignable.",
    popular: true,
  },
  {
    size: "100K",
    price: "499€",
    note: "Pour ceux qui ont la consistance et veulent scaler sans se brider.",
  },
  {
    size: "200K",
    price: "999€",
    note: "Le niveau maximal, pour les traders qui connaissent leur edge et savent l'appliquer sous pression.",
  },
] as const

export const WHY_PROPIFY = [
  {
    title: "Payouts rapides et traçables",
    description:
      "Dès que les conditions du challenge sont remplies, le processus de payout démarre sans friction administrative. Les délais sont communiqués en amont, lisibles avant même l'achat.",
    highlighted: true,
  },
  {
    title: "Règles écrites pour être comprises",
    description:
      "Chaque challenge affiche son objectif de profit, sa perte maximale journalière, sa perte maximale globale et le nombre de jours minimum de trading, directement sur la page. Pas enfouies dans des conditions générales en police 8.",
  },
  {
    title: "Dashboard de suivi en temps réel",
    description:
      "Le drawdown, les statistiques, la progression vers la validation. Un trader qui pilote sans données prend de mauvaises décisions, et PROPIFY élimine cette variable dès le premier jour.",
  },
  {
    title: "Un environnement construit pour progresser",
    description:
      "Ce n'est pas simplement un accès à un compte démo. C'est un écosystème de trading avec des analyses régulières, un accompagnement francophone, et une communauté de traders qui évoluent dans les mêmes conditions.",
  },
] as const

export const TRUST_STEPS = [
  "Choisir le challenge qui correspond au niveau et au capital cible",
  "Trader dans un environnement simulé, avec des conditions identiques au live",
  "Valider les objectifs définis dans les règles du challenge",
  "Recevoir la récompense selon le calendrier établi dès le départ",
] as const

export const FAQ_ITEMS = [
  {
    question: "Les comptes sont-ils réels ?",
    answer:
      "Les challenges PROPIFY s'effectuent sur des comptes démo avec fonds fictifs. La récompense perçue lors du payout, en revanche, est bien réelle, calculée sur les profits générés pendant la phase de trading simulé.",
  },
  {
    question: "Quand les récompenses sont-elles versées ?",
    answer:
      "Une fois les objectifs validés et le compte vérifié, le payout est traité selon le calendrier communiqué dans les règles. Les délais sont fixés avant l'achat, pas découverts après.",
  },
  {
    question: "Y a-t-il une limite de temps pour compléter le challenge ?",
    answer:
      "Non. La période de trading est illimitée selon le format choisi. Aucune échéance arbitraire qui force des décisions précipitées.",
  },
  {
    question: "Les performances passées garantissent-elles les performances futures ?",
    answer:
      "Non, et aucune prop firm sérieuse ne devrait prétendre le contraire. Le trading implique un risque inhérent. PROPIFY fournit un cadre, un capital et un accompagnement. La performance, elle, vient du trader.",
  },
] as const

export const LEADERBOARD = [
  { rank: 1, trader: "Alex M.", country: "FR", profit: "+18.4%", payout: "€12 400" },
  { rank: 2, trader: "Sofia R.", country: "BE", profit: "+16.2%", payout: "€9 850" },
  { rank: 3, trader: "Marco V.", country: "IT", profit: "+15.1%", payout: "€8 200" },
  { rank: 4, trader: "Lucas D.", country: "CH", profit: "+14.8%", payout: "€7 640" },
  { rank: 5, trader: "Elena P.", country: "ES", profit: "+13.9%", payout: "€6 920" },
] as const
