import { Request, Response } from 'express';
import mysqlConnection from '../database/mysqlConnection';
import AppError from '../utils/AppError';

interface User {
    name: string;
    email: string;
    number: string;
    typeFornecedor: string;
    message: string;
}

class UserController {
    public async getUser(request: Request, response: Response): Promise<Response> {
        try {
            const [users] = await mysqlConnection.execute("SELECT * FROM fornecedor.fornecedores");
    
            return response.status(200).json(users);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    public async createUser(request: Request, response: Response): Promise<Response> {
        try {
            const { name, email, number, typeFornecedor, message }: User = request.body;
            
            await mysqlConnection.execute("INSERT INTO fornecedor.fornecedores (name, email, number, typeFornecedor, message) VALUES (?, ?, ?, ?, ?)",
             [ name, email, number, typeFornecedor, message ]);
    
            return response.status(200).json("Usuário criado com sucesso.");
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    public async updateUser(request: Request, response: Response): Promise<Response> {
        try {
            const { name, email, number, typeFornecedor, message }: User = request.body;
            
            const userId = request.params.id;
    
            await mysqlConnection.execute("UPDATE fornecedor.fornecedores SET `name` = ?, `email` = ?, `number` = ?, `typeFornecedor` = ?, `message` = ? WHERE `id` = ?",
              [name, email, number, typeFornecedor, message, userId]);
    
            return response.status(200).json("Usuário atualizado com sucesso.");
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    public async deleteUser(request: Request, response: Response): Promise<Response> {
        try {
            const userId = request.params.id;
    
            const result = await mysqlConnection.execute("DELETE FROM fornecedor.fornecedores WHERE id = ?", [userId]);
    
            if ((result[0] as any).affectedRows === 0) {
                throw new AppError("Usuário não encontrado.");
            }
    
            return response.status(200).json({ message: "Usuário excluído com sucesso." });
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
    
}

export default UserController;
