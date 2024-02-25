// Define a classe AppError
class AppError {
    // Declaração das propriedades da classe
    message: string;     // Armazena a mensagem de erro
    statusCode: number;  // Armazena o código de status HTTP relacionado ao erro

    // Construtor da classe
    constructor(message: string, statusCode: number = 400) {
        // Inicializa as propriedades da classe com os valores fornecidos
        this.message = message;
        this.statusCode = statusCode;
    }
}

// Exporta a classe AppError para que possa ser utilizada em outros arquivos
export default AppError;
