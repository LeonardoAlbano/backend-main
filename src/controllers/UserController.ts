// Importa os tipos Request e Response do módulo 'express'
import { Request, Response } from 'express';

// Importa o objeto mysqlConnection do arquivo '../database/mysqlConnection'
import mysqlConnection from '../database/mysqlConnection';

// Importa a classe AppError do arquivo '../utils/AppError'
import AppError from '../utils/AppError';

// Define a interface User que representa a estrutura de um usuário
interface User {
    name: string;
    email: string;
    number: string;
    typeFornecedor: string;
    message: string;
}

// Define a classe UserController
class UserController {

    // Método assíncrono para obter usuários
    public async getUser(request: Request, response: Response): Promise<Response> {
        try {
            // Executa uma consulta SQL para selecionar todos os usuários da tabela fornecedor.fornecedores
            const [users] = await mysqlConnection.execute("SELECT * FROM fornecedor.fornecedores");
    
            // Retorna uma resposta com status 200 e os usuários encontrados em formato JSON
            return response.status(200).json(users);
        } catch (error) {
            // Em caso de erro, registra o erro no console e retorna uma resposta com status 500 e uma mensagem de erro
            console.error('Erro ao buscar usuários:', error);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    // Método assíncrono para criar um usuário
    public async createUser(request: Request, response: Response): Promise<Response> {
        try {
            // Extrai os campos name, email, number, typeFornecedor e message do corpo da requisição
            const { name, email, number, typeFornecedor, message }: User = request.body;
            
            // Executa uma inserção SQL na tabela fornecedor.fornecedores com os dados fornecidos
            await mysqlConnection.execute("INSERT INTO fornecedor.fornecedores (name, email, number, typeFornecedor, message) VALUES (?, ?, ?, ?, ?)",
             [ name, email, number, typeFornecedor, message ]);
    
            // Retorna uma resposta com status 200 e uma mensagem indicando que o usuário foi criado com sucesso
            return response.status(200).json("Usuário criado com sucesso.");
        } catch (error) {
            // Em caso de erro, registra o erro no console e retorna uma resposta com status 500 e uma mensagem de erro
            console.error('Erro ao cadastrar usuário:', error);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    // Método assíncrono para atualizar um usuário
    public async updateUser(request: Request, response: Response): Promise<Response> {
        try {
            // Extrai os campos name, email, number, typeFornecedor e message do corpo da requisição
            const { name, email, number, typeFornecedor, message }: User = request.body;
            
            // Obtém o ID do usuário a ser atualizado dos parâmetros da requisição
            const userId = request.params.id;
    
            // Executa uma atualização SQL na tabela fornecedor.fornecedores com os dados fornecidos
            await mysqlConnection.execute("UPDATE fornecedor.fornecedores SET `name` = ?, `email` = ?, `number` = ?, `typeFornecedor` = ?, `message` = ? WHERE `id` = ?",
              [name, email, number, typeFornecedor, message, userId]);
    
            // Retorna uma resposta com status 200 e uma mensagem indicando que o usuário foi atualizado com sucesso
            return response.status(200).json("Usuário atualizado com sucesso.");
        } catch (error) {
            // Em caso de erro, registra o erro no console e retorna uma resposta com status 500 e uma mensagem de erro
            console.error('Erro ao atualizar usuário:', error);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    // Método assíncrono para excluir um usuário
    public async deleteUser(request: Request, response: Response): Promise<Response> {
        try {
            // Obtém o ID do usuário a ser excluído dos parâmetros da requisição
            const userId = request.params.id;
    
            // Executa uma exclusão SQL na tabela fornecedor.fornecedores com o ID fornecido
            const result = await mysqlConnection.execute("DELETE FROM fornecedor.fornecedores WHERE id = ?", [userId]);
    
            // Verifica se algum registro foi afetado pela operação de exclusão
            if ((result[0] as any).affectedRows === 0) {
                // Se nenhum registro foi afetado, lança um erro indicando que o usuário não foi encontrado
                throw new AppError("Usuário não encontrado.");
            }
    
            // Retorna uma resposta com status 200 e uma mensagem indicando que o usuário foi excluído com sucesso
            return response.status(200).json({ message: "Usuário excluído com sucesso." });
        } catch (error) {
            // Em caso de erro, registra o erro no console e retorna uma resposta com status 500 e uma mensagem de erro
            console.error('Erro ao excluir usuário:', error);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
    
}

// Exporta a classe UserController para que ela possa ser utilizada em outros arquivos
export default UserController;
