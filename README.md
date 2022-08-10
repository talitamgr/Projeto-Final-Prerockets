# Projeto-Final-Prerockets
Projeto Final do processo Pré-Rockets sobre o controle de uma biblioteca.

 Este projeto se resume no controle dos empréstimos de livros em uma biblioteca. Na qual, alguns bibliotecários, já previamente cadastrados, 
podem realizar as seguintes ações:

•	Realizar o login no portal;

•	Cadastrar um novo livro;

•	Emprestar um livro a um aluno;

•	Devolver um livro emprestado;

•	Ver o histórico de empréstimos;

•	Inativar um livro.


 Para salvar os processos e não perder dados novos inseridos, um prompt para salvar o novo arquivo é solicitado ao usuário ao fim de cada processo.

 Por exemplo, ao preencher todos os campos para adicionar um novo livro e apertar o botão de salvar, uma solicitação para salvar o novo arquivo de 
livros é solicitado ao usuário, já com o nome padrão do arquivo, sendo necessário que o usuário escolha a pasta correta para poder utilizar o novo arquivo nas próximas interações. 

 Nas funcionalidades da página da biblioteca, o prompt só aparece ao fechar o modal. Sendo possível fazer diversas modificações no livro selecionado (emprestar, inativar, devolver, ver histórico) enquanto o modal estiver aberto, então, depois de fechar o modal, todas as mudanças serão salvas. 
Essa abordagem foi escolhida para melhorar a experiência do usuário.

 Para efetuar o upload da capa do livro, é possível clicar em qualquer lugar dentro do espaço para a capa e é possível colocar outra capa clicando na foto inserida, caso tenha havido um erro na escolha do arquivo.

 Para efetuar a busca de livros na biblioteca, é possível escrever uma letra, uma palavra ou números. A busca sem filtros, retorna todos os livros que contém o item da busca. A busca com filtro, vai retornar os livros com o item da busca no filtro selecionado.

 Por exemplo, se for digitado o número “20”, todos os livros que contém “20” na data de entrada ou gênero ou autor ou no título, irão aparecer como resultado. Se for inserido um filtro de data, só aparecerão os livros com “20” na data. 
 
 Tanto no modal do Histórico de Empréstimos, quanto na página, os filtros funcionam em conjunto, não sendo necessário preencher todos os filtros. Por exemplo, se for inserida uma busca no filtro da primeira coluna e outra no filtro da segunda coluna, os filtros são somados, mostrando os resultados que satisfazem as duas buscas. Os resultados são mostrados assim que os caracteres são digitados nos filtros.
