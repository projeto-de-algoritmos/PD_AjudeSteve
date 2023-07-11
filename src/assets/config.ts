const data = {
  pesoMochila: Math.floor(Math.random() * (51 - 30)) + 30,
  minerios: [
    {
      nome: "Minério de carvão",
      peso: 2.0,
      valor: 7,
      quantidade: 4,
      img: "coal.png",
    },
    {
      nome: "Minério de ferro",
      peso: 4.0,
      valor: 10,
      quantidade: 3,
      img: "iron.png",
    },
    {
      nome: "Minério de ouro",
      peso: 1.0,
      valor: 3,
      quantidade: 12,
      img: "gold.png",
    },
    {
      nome: "Minério de diamante",
      peso: 9.0,
      valor: 30,
      quantidade: 4,
      img: "diamond.png",
    },
    {
      nome: "Minério de esmeralda",
      peso: 4.0,
      valor: 25,
      quantidade: 2,
      img: "emerald.png",
    },
    {
      nome: "Minério de ametista",
      peso: 2.0,
      valor: 5,
      quantidade: 5,
      img: "amethyst.png",
    },
    {
      nome: "Minério de netherite",
      peso: 10,
      valor: 32,
      quantidade: 2,
      img: "netherite.png",
    },
  ],
};

export default data;
