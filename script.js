$(document).ready(function() {
    const $taskForm = $('#task-form');
    const $taskInput = $('#task-input');
    const $taskList = $('#task-list');

    $taskForm.on('submit', function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        const taskName = $taskInput.val().trim(); // Obtém o valor do input e remove espaços em branco
        if (taskName) { // Verifica se o valor não está vazio
            addTask(taskName); // Adiciona a tarefa
            $taskInput.val(''); // Limpa o campo de input
            $taskInput.focus(); // Foca no campo de input
        }
    });

    function addTask(taskName) {
        const $li = $('<li></li>').text(taskName); // Cria um novo item de lista com o nome da tarefa

        // Cria o container para os botões de ação
        const $actions = $('<div></div>').addClass('actions');

        // Botão Tarefa Concluída
        const $completeButton = $('<button></button>')
            .addClass('complete')
            .text('Tarefa Concluída')
            .on('click', function() {
                $li.toggleClass('completed'); // Alterna a classe 'completed' no item de lista
            });

        // Botão Modificar Tarefa
        const $modifyButton = $('<button></button>')
            .addClass('modify')
            .text('Modificar Tarefa')
            .on('click', function() {
                const newTaskName = prompt('Modificar tarefa:', $li.contents().filter(function() {
                    return this.nodeType == 3; // Filtra apenas o texto do item de lista
                }).text());
                if (newTaskName !== null && newTaskName.trim() !== '') {
                    $li.contents().filter(function() {
                        return this.nodeType == 3;
                    }).first().replaceWith(newTaskName.trim()); // Substitui o texto com o novo nome da tarefa
                }
            });

        // Botão Excluir Tarefa
        const $deleteButton = $('<button></button>')
            .addClass('delete')
            .text('Excluir Tarefa')
            .on('click', function() {
                $li.remove(); // Remove o item de lista
            });

        // Adiciona os botões ao container de ações
        $actions.append($completeButton, $modifyButton, $deleteButton);

        // Adiciona o container de ações ao item da lista
        $li.append($actions);
        $taskList.append($li); // Adiciona o item de lista ao container de lista de tarefas
    }
});
