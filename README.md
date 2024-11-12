# App_de_Tarefas
Aplicativo simples para registro de tarefas em React

**Função do Projeto**

O app desenvolvido serve para poder registrar as tarefas que o usuário tem de fazer. Uma das telas do aplicativo permite o usuário ver todas as atividades que estão registradas.
Na mesma tela o usuário pode excluir a atividade, caso já a tenha completado.

**Funcionamento**
O aplicativo tem a seguinte tela principal:

![image](https://github.com/user-attachments/assets/5b1d9559-cee6-48eb-9dd8-2d1b40b867dc)

Na tela "Adicionar Atividade", existem dois Inputs de texto, que o usuário deve preencher:

![image](https://github.com/user-attachments/assets/e0621c03-f24e-4048-9ca7-10e09eb356e3)

Ao clickar no botão "Salvar Atividade", a atividade será salva e o texto na Tela Principal será atualizado:

![image](https://github.com/user-attachments/assets/ccf3f67c-39a9-4299-ae3b-b27b201200c3)

Na tela "Ver Jornal", todas as atividades que o usuário ingressou estarão disponiveis:

![image](https://github.com/user-attachments/assets/7f3a47ee-62d6-4867-9ae5-ec4b1499cc15)

Clickando no botão "Excluir" a tela principal será atualizada novamente:

![image](https://github.com/user-attachments/assets/132a1f70-931c-41fd-9ac8-c4cc79822a19)


**Motivação**

A motivação inicial do projeto era fazer uma agenda interativa, que recebesse o horário da atividade e avisasse o usuário através de uma notificação e uma vibração.
Ao não chegar em uma maneira viável de fazer isso, optei por começar simples e fazer apenas uma agenda.

**Dificuldades**

- No início por tentar integrar o horário da atividade
- Lidar com a transformação de string -> array, por usar o AsyncStorage
- Lidar com o array vazio e arrays em geral (Documentação que me ajudou: https://react.dev/learn/updating-arrays-in-state)

