class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
	const animaisCertos ={
      	Rex:{raca: 'cão', brinquedos: ['RATO','BOLA']},
      	Mimi:{raca: 'gato', brinquedos: ['BOLA','LASER']},
      	Fofo:{raca: 'gato', brinquedos: ['BOLA','RATO','LASER']},
      	Zero:{raca: 'gato', brinquedos: ['RATO','BOLA']},
      	Bola:{raca: 'cão', brinquedos: ['CAIXA','NOVELO']},
      	Bebe:{raca: 'cão', brinquedos: ['LASER','RATO','BOLA']},
      	Loco:{raca: 'jabuti', brinquedos: ['SKATE','RATO']},
    };

	const listaPessoa1 = brinquedosPessoa1.split(',').map(x => x.trim());
	const listaPessoa2 = brinquedosPessoa2.split(',').map(x => x.trim());
	const listaAnimais = ordemAnimais.split(',').map(x => x.trim());

	for(let animal of listaAnimais) {
    	if(!animaisCertos[animal]) return {
		erro: 'Animal inválido'
		};
    }
    if(new Set(listaAnimais).size !== listaAnimais.length) return {
		erro: 'Animal inválido'
	};

	function podeAdotar(listaPessoa, brinquedosAnimal) {
		let i = 0;
		for (let brinquedo of listaPessoa) {
			if(brinquedo === brinquedosAnimal[i]) {
				i++;
				if(i === brinquedosAnimal.length) return true;
			}
		}
		return false
	}

	let result =[];
	let [adocaoPessoa1,adocaoPessoa2] = [0,0];
	let [adotadosPessoa1,adotadosPessoa2] = [[],[]];

	for(let animal of listaAnimais) {
		const brinquedos = animaisCertos[animal].brinquedos;
		let adota1 = podeAdotar(listaPessoa1,brinquedos);
		let adota2 = podeAdotar(listaPessoa2, brinquedos);

		if (animal === 'Loco') {
            adota1 = brinquedos.every(b => listaPessoa1.includes(b));
            adota2 = brinquedos.every(b => listaPessoa2.includes(b));

			if(adota1 && adotadosPessoa1.length === 0) adota1 = false;
            if(adota2 && adotadosPessoa2.length === 0) adota2 = false;
        }

		let pertence = 'abrigo';
		if(adota1 && !adota2 && adocaoPessoa1 < 3){
			pertence = 'pessoa 1';
			adocaoPessoa1++;
			adotadosPessoa1.push(animal)
		} 
		else if(adota2 && !adota1 &&adocaoPessoa2 < 3){
			pertence = 'pessoa 2';
			adocaoPessoa2++;
			adotadosPessoa2.push(animal)
		}
		else if(adota1 && adota2){
			pertence = 'abrigo';
		}

		result.push(`${animal} - ${pertence}`);
	}

	result.sort((a,b) =>{
		const nome1 = a.split(' - ')[0];
		const nome2 = b.split(' - ')[0];
		return nome1.localeCompare(nome2);
  	});

	return {lista: result};
  }
}

export { AbrigoAnimais as AbrigoAnimais };
