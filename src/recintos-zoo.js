class RecintosZoo {
    constructor() {
      // Dados dos recintos do zoológico
      this.recintos = [
        {
          numero: 1,
          bioma: "savana",
          tamanho: 10,
          animais: [{ especie: "MACACO", quantidade: 3, carnivoro: false }],
        },
        { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
        {
          numero: 3,
          bioma: "savana e rio",
          tamanho: 7,
          animais: [{ especie: "GAZELA", quantidade: 1, carnivoro: false }],
        },
        { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
        {
          numero: 5,
          bioma: "savana",
          tamanho: 9,
          animais: [{ especie: "LEAO", quantidade: 1, carnivoro: true }],
        },
      ];
  
      // Informações sobre os animais
      this.animaisInfo = {
        LEAO: { tamanho: 3, biomas: ["savana"], carnivoro: true },
        LEOPARDO: { tamanho: 2, biomas: ["savana"], carnivoro: true },
        CROCODILO: { tamanho: 3, biomas: ["rio"], carnivoro: true },
        MACACO: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
        GAZELA: { tamanho: 2, biomas: ["savana"], carnivoro: false },
        HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false },
      };
    }
  
    verificaAnimalEQuantidade(animal, quantidade) {
      if (!this.animaisInfo[animal]) {
        return { erro: "Animal inválido" };
      }
  
      if (quantidade <= 0) {
        return { erro: "Quantidade inválida" };
      }
  
      return null;
    }
  
    verificaCompatibilidade(recinto, animal, animalInfo, quantidade) {
      const espacoNecessario = animalInfo.tamanho * quantidade;
      const espacoOcupado = recinto.animais.reduce(
        (acc, a) => acc + a.quantidade * this.animaisInfo[a.especie].tamanho,
        0
      );
  
      // O espaço extra só é considerado se houver uma espécie diferente no recinto, regra 6: Quando há mais de uma espécie no mesmo recinto, é preciso considerar 1 espaço extra ocupado
      const especiesDiferentes = recinto.animais.some(
        (a) => a.especie !== animal
      );
      const espacoExtra = especiesDiferentes ? 1 : 0;
  
      const espacoLivre = recinto.tamanho - espacoOcupado - espacoExtra;
  
      // regra 1: Um animal se sente confortável se está num bioma adequado
      if (!animalInfo.biomas.some(b => recinto.bioma.includes(b))) {
        console.log(`Recinto ${recinto.numero} incompatível por bioma`);
        return false;
      }
  
      // Verifica se o recinto tem animais, se não tiver adiciona o carnivoro, regra 2: Animais carnívoros devem habitar somente com a própria espécie
      if (animalInfo.carnivoro && recinto.animais.length > 0 && especiesDiferentes) {
        console.log(`Recinto ${recinto.numero} tem animais de outra espécie, não pode adicionar carnívoros`);
        return false;
      }

      // Regra 1  Um animal com espaço suficiente para cada indivíduo
      if (espacoLivre < espacoNecessario) {
        console.log(`Recinto ${recinto.numero} não tem espaço suficiente`);
        return false;
      }
  
  
      // Verifica regras do hipopótamo regra 4 : Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
      if (animal === "HIPOPOTAMO") {
        if (!recinto.bioma.includes('rio' || 'savana' || 'savana e rio')) {
            console.log(`Recinto ${recinto.numero} não é adequado para hipopótamos (bioma inválido)`);
            return false;
        }
        if (recinto.bioma !== 'savana e rio' && recinto.animais.length > 0) {
            console.log(`Recinto ${recinto.numero} não é adequado para hipopótamos (recinto já ocupado e bioma inválido)`);
            return false;
        }
        
    }
    // Verifica conforto dos animais existentes Regra 3 : Animais já presentes no recinto devem continuar confortáveis com a inclusão do(s) novo(s)
      for (const animalPresente of recinto.animais) {
        const infoAnimalPresente = this.animaisInfo[animalPresente.especie];
        if (
          infoAnimalPresente.carnivoro &&
          animalPresente.especie !== animal
        ) {
          console.log(`Recinto ${recinto.numero} não é confortável para outros animais devido a presença de carnívoros`);
          return false;
        }
      }

        // REGRA 5: Um macaco não se sente confortável sem outro animal no recinto, seja da mesma ou outra espécie
        if (animal === "MACACO"){
            if (recinto.animais.length === 0 && quantidade === 1){
                console.log(`Recinto ${recinto.numero} não é adequado para apenas um macaco (recinto vazio)`);
                return false;
            }
        }
    
      return true;
    }
  
    analisaRecintos(animal, quantidade) {
      // Verifica animal e quantidade
      const erroValidacao = this.verificaAnimalEQuantidade(animal, quantidade);
      if (erroValidacao) {
        return erroValidacao;
      }
  
      const animalInfo = this.animaisInfo[animal];
      const recintosViaveis = [];
  
      // Percorre os recintos verificando compatibilidade
      for (const recinto of this.recintos) {
        const compativel = this.verificaCompatibilidade(recinto, animal, animalInfo, quantidade);
        if (compativel) {
          const espacoOcupado = recinto.animais.reduce(
            (acc, a) => acc + a.quantidade * this.animaisInfo[a.especie].tamanho,
            0
          );
          const especiesDiferentes = recinto.animais.some(
            (a) => a.especie !== animal
          );
          const espacoExtra = especiesDiferentes ? 1 : 0;
          const espacoLivre =
            recinto.tamanho -
            espacoOcupado -
            espacoExtra -
            animalInfo.tamanho * quantidade;
          recintosViaveis.push(
            `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`
          );
        }
      }
  
      if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável" };
      }
  
      return { recintosViaveis };
    }
  }
  
  export { RecintosZoo as RecintosZoo };
