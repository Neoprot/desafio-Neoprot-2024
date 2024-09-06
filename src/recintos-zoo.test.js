import { RecintosZoo } from "./recintos-zoo.js";

describe('Recintos do Zoologico', () => {
    // Regra 4: Caso animal informado seja inválido, apresentar erro "Animal inválido"
    test('Deve rejeitar animal inválido', () => {
            const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
            expect(resultado.erro).toBe("Animal inválido");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    // Regra 5: Caso quantidade informada seja inválida, apresentar erro "Quantidade inválida"
    test('Deve rejeitar quantidade inválida', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
            expect(resultado.erro).toBe("Quantidade inválida");
            expect(resultado.recintosViaveis).toBeFalsy();
    });

    // Regra 6: Caso não haja recinto possível, apresentar erro "Não há recinto viável"
    test('Não deve encontrar recintos para 10 macacos', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
            expect(resultado.erro).toBe("Não há recinto viável");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recintos para 2 macacos', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });
    
    test('Não deve adicionar hipopótamo em recinto sem bioma "savana e rio" com outros animais', () => {
        const recintosZoo = new RecintosZoo();
        recintosZoo.recintos[2].animais.push({ especie: "GAZELA", quantidade: 1, carnivoro: false });
        recintosZoo.recintos[3].animais.push({ especie: "CROCODILO", quantidade: 1, carnivoro: false });
        const resultado = recintosZoo.analisaRecintos('HIPOPOTAMO', 1);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve adicionar hipopótamo em recinto em biomas inválidos', () => {
        const recintosZoo = new RecintosZoo();
        recintosZoo.recintos[2].animais.push({ especie: "GAZELA", quantidade: 1, carnivoro: false });
        recintosZoo.recintos[3].animais.push({ especie: "CROCODILO", quantidade: 2, carnivoro: false });
        const resultado = recintosZoo.analisaRecintos('HIPOPOTAMO', 1);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });
    
    test('Não deve adicionar um único macaco em recinto vazio', () => {
        const recintosZoo = new RecintosZoo();
        recintosZoo.recintos[0].animais.push({ especie: "MACACO", quantidade: 7, carnivoro: false });
        recintosZoo.recintos[2].animais.push({ especie: "GAZELA", quantidade: 2, carnivoro: false });
        const resultado = recintosZoo.analisaRecintos('MACACO', 1);
        console.log("teste:",resultado);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve adicionar leão em recinto com outros animais não carnívoros', () => {
        const recintosZoo = new RecintosZoo();
        recintosZoo.recintos[4].animais.push({ especie: "LEAO", quantidade: 2, carnivoro: false });
        const resultado = recintosZoo.analisaRecintos('LEAO', 1);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });
    

    test('Deve considerar espaço extra ao adicionar uma espécie diferente', () => {
        const recintosZoo = new RecintosZoo();
        const resultado = recintosZoo.analisaRecintos('MACACO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[1]).toBe('Recinto 3 (espaço livre: 3 total: 7)');
    });

    test('Não deve separar lotes de animais em recintos diferentes', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 12);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve adicionar hipopótamo em recinto adequado', () => {
        const resultado = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 3 (espaço livre: 0 total: 7)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 4 (espaço livre: 4 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(2);
    });
    

    test('Não deve adicionar animal se houver espaço insuficiente após considerar espaço extra', () => {
        const recintosZoo = new RecintosZoo();
        recintosZoo.recintos[0].animais.push({ especie: "MACACO", quantidade: 7, carnivoro: false });
        recintosZoo.recintos[1].animais.push({ especie: "MACACO", quantidade: 5, carnivoro: false });
        recintosZoo.recintos[2].animais.push({ especie: "GAZELA", quantidade: 2, carnivoro: false });
        const resultado = recintosZoo.analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });
    
});

