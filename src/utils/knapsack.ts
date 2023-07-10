interface Item {
  w: number; // Weight
  b: number; // Value
}

interface KnapsackResult {
  maxValue: number;
  set: Item[];
}

interface Minerio {
  nome: string;
  peso: number;
  valor: number;
  quantidade: number;
  img: string;
}

interface FormattedResult {
  name: string;
  quantity: number;
}

export default class Knapsack {
  public items: Item[] = [];
  public capacity: number;
  private minerios: Minerio[];
  private result: KnapsackResult | null = null;
  private melhorResultado = 0;
  private melhorResultadoItens: FormattedResult[] = [];

  constructor(minerios: Minerio[], capacity: number) {
    this.minerios = minerios;
    this.capacity = capacity;
    this.createData();
    this.solve();
    this.solveResult();
  }

  private createData(): void {
    this.items = [];

    this.minerios.forEach((minerio) => {
      const { peso, valor, quantidade } = minerio;

      for (let i = 0; i < quantidade; i++) {
        this.items.push({ w: peso, b: valor });
      }
    });
  }

  private knapsack(items: Item[], capacity: number): KnapsackResult {
    let idxItem = 0,
      idxWeight = 0,
      oldMax = 0,
      newMax = 0;

    const numItems = items.length,
      weightMatrix = new Array(numItems + 1),
      keepMatrix = new Array(numItems + 1),
      solutionSet = [];

    // Setup matrices
    for (idxItem = 0; idxItem < numItems + 1; idxItem++) {
      weightMatrix[idxItem] = new Array(capacity + 1);
      keepMatrix[idxItem] = new Array(capacity + 1);
    }

    // Build weightMatrix from [0][0] -> [numItems-1][capacity-1]
    for (idxItem = 0; idxItem <= numItems; idxItem++) {
      for (idxWeight = 0; idxWeight <= capacity; idxWeight++) {
        // Fill top row and left column with zeros
        if (idxItem === 0 || idxWeight === 0) {
          weightMatrix[idxItem][idxWeight] = 0;
        } else if (items[idxItem - 1].w <= idxWeight) {
          newMax =
            items[idxItem - 1].b +
            weightMatrix[idxItem - 1][idxWeight - items[idxItem - 1].w];
          oldMax = weightMatrix[idxItem - 1][idxWeight];

          if (newMax > oldMax) {
            weightMatrix[idxItem][idxWeight] = newMax;
            keepMatrix[idxItem][idxWeight] = 1;
          } else {
            weightMatrix[idxItem][idxWeight] = oldMax;
            keepMatrix[idxItem][idxWeight] = 0;
          }
        } else {
          weightMatrix[idxItem][idxWeight] =
            weightMatrix[idxItem - 1][idxWeight];
        }
      }
    }

    idxWeight = capacity;
    idxItem = numItems;
    for (idxItem; idxItem > 0; idxItem--) {
      if (keepMatrix[idxItem][idxWeight] === 1) {
        solutionSet.push(items[idxItem - 1]);
        idxWeight = idxWeight - items[idxItem - 1].w;
      }
    }

    return { maxValue: weightMatrix[numItems][capacity], set: solutionSet };
  }

  public formatResult(): FormattedResult[] {
    const formattedResult: FormattedResult[] = [];
    const itemOccurrences: Record<string, number> = {};

    if (this.result && this.minerios.length > 0) {
      this.result.set.forEach((item) => {
        const matchingMinerio = this.minerios.find(
          (minerio) => minerio.peso === item.w && minerio.valor === item.b
        );

        if (matchingMinerio) {
          const { nome } = matchingMinerio;
          itemOccurrences[nome] = (itemOccurrences[nome] || 0) + 1;
        }
      });

      for (const [name, quantity] of Object.entries(itemOccurrences)) {
        formattedResult.push({ name, quantity });
      }
    }

    return formattedResult;
  }

  public solve(): void {
    this.result = this.knapsack(this.items, this.capacity);
    this.melhorResultado = this.result.maxValue;
  }

  solveResult(): void {
    this.melhorResultadoItens = this.formatResult();
  }

  public getMelhorResultadoItens(): FormattedResult[] {
    return this.melhorResultadoItens;
  }

  public getMelhorResultado(): number {
    return this.melhorResultado;
  }

  public getResult(): KnapsackResult | null {
    return this.result;
  }

  public getItems(): Item[] {
    return this.items;
  }
}
