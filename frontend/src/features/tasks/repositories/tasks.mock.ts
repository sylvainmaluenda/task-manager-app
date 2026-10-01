import type { Task } from "@/features/tasks/types/task.type";

export const mockTasks: Map<number, Task> = new Map([
  [
    1,
    {
      id: 1,
      categoryId: 1,
      title: "Acheter du lait",
      description: "Prendre deux bouteilles de lait demi-écrémé.",
      done: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    2,
    {
      id: 2,
      categoryId: 1,
      title: "Faire les courses de la semaine",
      description:
        "Acheter les produits nécessaires pour les repas de la semaine.",
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    3,
    {
      id: 3,
      categoryId: 1,
      title: "Acheter des fruits et légumes",
      description:
        "Prendre des pommes, des bananes, des tomates et des courgettes.",
      done: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    4,
    {
      id: 4,
      categoryId: 1,
      title: "Renouveler le stock de café",
      description: "Acheter un paquet de café en grains pour la maison.",
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    5,
    {
      id: 5,
      categoryId: 1,
      title: "Acheter des produits ménagers",
      description:
        "Prendre du liquide vaisselle, de la lessive et des sacs-poubelle.",
      done: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    6,
    {
      id: 6,
      categoryId: 1,
      title: "Passer à la boulangerie",
      description:
        "Acheter une baguette et quelques viennoiseries pour le week-end.",
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    7,
    {
      id: 7,
      categoryId: 1,
      title: "Acheter de l'eau",
      description: "Prendre un pack de bouteilles d'eau pour la maison.",
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],

  [
    8,
    {
      id: 8,
      categoryId: 2,
      title: "Préparer la réunion de lundi",
      description:
        "Relire les documents et préparer les principaux points à présenter.",
      done: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    9,
    {
      id: 9,
      categoryId: 2,
      title: "Répondre aux e-mails",
      description:
        "Traiter les messages en attente et répondre aux demandes urgentes.",
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    10,
    {
      id: 10,
      categoryId: 2,
      title: "Mettre à jour le rapport mensuel",
      description:
        "Compléter les chiffres du mois et finaliser le rapport d'activité.",
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    11,
    {
      id: 11,
      categoryId: 2,
      title: "Planifier les tâches de la semaine",
      description:
        "Définir les priorités et organiser les tâches à réaliser cette semaine.",
      done: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    12,
    {
      id: 12,
      categoryId: 2,
      title: "Corriger les bugs en attente",
      description: "Résoudre les problèmes identifiés lors des derniers tests.",
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    13,
    {
      id: 13,
      categoryId: 2,
      title: "Préparer la présentation client",
      description:
        "Finaliser les diapositives et vérifier les données présentées au client.",
      done: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    14,
    {
      id: 14,
      categoryId: 2,
      title: "Faire le point avec l'équipe",
      description:
        "Organiser un court échange sur l'avancement des projets en cours.",
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],

  [
    15,
    {
      id: 15,
      categoryId: 3,
      title: "Réserver l'hôtel",
      description:
        "Comparer les hôtels disponibles et confirmer la réservation.",
      done: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    16,
    {
      id: 16,
      categoryId: 3,
      title: "Acheter les billets de train",
      description:
        "Réserver les billets aller-retour pour le trajet des vacances.",
      done: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    17,
    {
      id: 17,
      categoryId: 3,
      title: "Préparer les valises",
      description:
        "Préparer les vêtements et les affaires nécessaires pour le séjour.",
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    18,
    {
      id: 18,
      categoryId: 3,
      title: "Vérifier les documents de voyage",
      description:
        "Vérifier les cartes d'identité, réservations et billets avant le départ.",
      done: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    19,
    {
      id: 19,
      categoryId: 3,
      title: "Préparer l'itinéraire",
      description:
        "Repérer les lieux à visiter et organiser les étapes du séjour.",
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  [
    20,
    {
      id: 20,
      categoryId: 3,
      title: "Prévenir les voisins de l'absence",
      description: "Informer les voisins des dates de départ et de retour.",
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
]);
