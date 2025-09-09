import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {
  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Sem animais duplicados', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,BOLA', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve ir para abrigo caso seja empate (duas pessoas querendo o animal)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,BOLA', 'Rex');
    expect(resultado.lista).toEqual(['Rex - abrigo']);
    expect(resultado.erro).toBeFalsy();
  });

  test('Loco pode ser adotado se for acompanhado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO,BOLA', '', 'Rex,Loco');
    expect(resultado.lista).toEqual([
      'Loco - pessoa 1',
      'Rex - pessoa 1'
    ]);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
    expect(resultado.lista).toEqual([
      'Fofo - abrigo',
      'Rex - pessoa 1'
    ]);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER', 'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');
    expect(resultado.lista).toEqual([
      'Bola - abrigo',
      'Fofo - pessoa 2',
      'Mimi - abrigo',
      'Rex - abrigo'
    ]);
    expect(resultado.erro).toBeFalsy();
  });
});