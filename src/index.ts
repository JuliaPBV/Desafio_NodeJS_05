/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);


	// CÓDIGO PARA ATENDER OS REQUERIMENTOS
	// R01, R02, R03, R04, R05

});
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

class Cadastro {
	nome: string;
	idade: number;
	nota: number;

	constructor(nome: string, idade: number, nota: number) {
		this.nome = nome;
		this.idade = idade;
		this.nota = nota;
	}
	getNota(): number {
		return this.nota;
	}
};

let alunos: Array<Cadastro> = [];

function quantidade(): void {
	rl.question('quantos alunos deseja cadastrar? ', (quantidadeInput: any) => {
		const quantidade = parseInt(quantidadeInput);

		let contador = 0;

		function dadosAlunos(): any {
			rl.question('Qual é seu nome? ', (nome: any) => {
				rl.question('quantos anos tem? ', (idadeInput: any) => {
					const idade = parseInt(idadeInput);
					rl.question('Qual é a sua nota? ', (notaInput: any) => {
						const nota = parseFloat(notaInput);
						if (notaInput < 6){
							console.log('Estude mais!!');
						} else {
							console.log('Parabéns pela boa nota!');
						}
						console.log('Dados cadastrados com sucesso!');

						const aluno = new Cadastro(nome, idade, nota);
						alunos.push(aluno);
						contador++

						if (contador < quantidade) {
							dadosAlunos();

						} else {
							const somaTotal = somaNotas();
							console.log('O total da soma das notas: ', somaTotal);
							gerarCSV(somaTotal);
							rl.close();
						}
					});
				});
			});
		}
		while (contador < quantidade) {
			dadosAlunos();
			break;
		}
	});
}

function somaNotas(): number {
	let soma = 0;
	for (let cadastro of alunos) {
		soma += cadastro.getNota();
	}
//	console.log('O total da soma das notas: ', soma);
	return soma;
}

function gerarCSV(somaTotal: number): void {
	let csvCo = "Nome, Idade, Nota\n";

	alunos.forEach(aluno => {
		csvCo += `${aluno.nome}, ${aluno.idade}, ${aluno.nota}\n`;
	});

	csvCo+= `\nTotal das notas:${somaTotal}\n`;

	fs.writeFileSync('alunos.csv', csvCo, 'utf8');
	console.log('Arquivo CSV gerado com sucesso!');
}

quantidade();