class Funcionario {
    constructor(nome, idade, cargo) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
    }

    seApresentar() {
        return `Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e sou ${this.cargo}.`;
    }

    trabalhar() {
        return `${this.nome} está trabalhando como ${this.cargo}.`;
    }
}

class Gerente extends Funcionario {
    constructor(nome, idade, cargo, departamento) {
        super(nome, idade, cargo);
        this.departamento = departamento;
    }

    gerenciar() {
        return `${this.nome} está gerenciando o departamento de ${this.departamento}.`;
    }
}

class Desenvolvedor extends Funcionario {
    constructor(nome, idade, cargo, linguagem) {
        super(nome, idade, cargo);
        this.linguagem = linguagem;
    }

    programar() {
        return `${this.nome} está programando em ${this.linguagem}.`;
    }
}

function exibirErro(mensagem) {
    const erroDiv = document.getElementById('erro');
    erroDiv.innerText = mensagem;
}

document.getElementById('formFuncionario').addEventListener('submit', function(event) {
    event.preventDefault();

    try {
        const nome = document.getElementById('nome').value;
        const idade = parseInt(document.getElementById('idade').value);
        const cargo = document.getElementById('cargo').value;
        const departamento = document.getElementById('departamento').value;
        const linguagem = document.getElementById('linguagem').value;

        if (!nome || isNaN(idade) || idade <= 0 || !cargo) {
            throw new Error("Por favor, preencha todos os campos obrigatórios corretamente.");
        }

        let funcionario;
        if (cargo.toLowerCase() === "gerente") {
            if (!departamento) {
                throw new Error("O campo 'Departamento' deve ser preenchido para gerentes.");
            }
            funcionario = new Gerente(nome, idade, cargo, departamento);
        } else if (cargo.toLowerCase() === "desenvolvedor") {
            if (!linguagem) {
                throw new Error("O campo 'Linguagem' deve ser preenchido para desenvolvedores.");
            }
            funcionario = new Desenvolvedor(nome, idade, cargo, linguagem);
        } else {
            throw new Error("Cargo inválido. Escolha 'Gerente' ou 'Desenvolvedor'.");
        }

        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = `
            <p>${funcionario.seApresentar()}</p>
            <p>${funcionario.trabalhar()}</p>
            ${cargo.toLowerCase() === "gerente" ? `<p>${funcionario.gerenciar()}</p>` : ''}
            ${cargo.toLowerCase() === "desenvolvedor" ? `<p>${funcionario.programar()}</p>` : ''}
        `;

        // Limpar erros
        exibirErro('');
        
    } catch (error) {
        exibirErro(error.message);
    }
});
