# App_de_Tarefas
Aplicativo simples para registro de tarefas em React

**Função do Projeto**

O app desenvolvido serve para poder registrar as tarefas que o usuário tem de fazer. Uma das telas do aplicativo permite o usuário ver todas as atividades que estão registradas.
Na mesma tela o usuário pode excluir a atividade, caso já a tenha completado.

**Funcionamento**
O aplicativo tem a seguinte tela principal:

![image](https://github.com/user-attachments/assets/6b983a16-293c-4bfe-b0c5-f7a1a2a95efa)


Na tela "Adicionar Atividade", existem dois Inputs de texto, que o usuário deve preencher:

![image](https://github.com/user-attachments/assets/b1854f20-ffff-4f50-a68b-4509f44ca25f)


Ao clickar no botão "Salvar Atividade", a atividade será salva e o texto na Tela Principal será atualizado:

![image](https://github.com/user-attachments/assets/49e4bcaf-aac9-414f-9338-375d713f3156)


Na tela "Ver Jornal", todas as atividades que o usuário ingressou estarão disponiveis:

![image](https://github.com/user-attachments/assets/b62dc3a1-62e3-4e26-a076-4ffa052f2383)


Clickando no botão "Excluir" a tela principal será atualizada novamente:

![image](https://github.com/user-attachments/assets/65822988-f243-4a3d-9555-a9ac6812b4ef)



**Motivação**

A motivação inicial do projeto era fazer uma agenda interativa, que recebesse o horário da atividade e avisasse o usuário através de uma notificação e uma vibração.
Ao não chegar em uma maneira viável de fazer isso, optei por começar simples e fazer apenas uma agenda.

**Dificuldades**

- No início por tentar integrar o horário da atividade
- Lidar com a transformação de string -> array, por usar o AsyncStorage
- Lidar com o array vazio e arrays em geral (Documentação que me ajudou: https://react.dev/learn/updating-arrays-in-state)

