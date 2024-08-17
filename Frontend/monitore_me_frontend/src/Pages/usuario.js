document.addEventListener('DOMContentLoaded', () => {
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const userRole = document.getElementById('user-role');

    // Exemplo de dados do usuário. No projeto real, esses dados viriam de uma API.
    const userData = {
        nome: 'João Silva',
        email: 'joao.silva@example.com',
        papel: 'aluno'
    };

    // Preenche os campos na página
    userName.textContent = userData.nome;
    userEmail.textContent = userData.email;
    userRole.textContent = userData.papel;

    // Lógica para o botão de edição
    document.getElementById('edit-user-btn').addEventListener('click', () => {
        alert('Funcionalidade de edição ainda não implementada.');
    });
});
