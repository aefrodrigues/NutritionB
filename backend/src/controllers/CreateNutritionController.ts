import { FastifyRequest, FastifyReply } from "fastify";
import {CreateNutritionService} from '../services/CreateNutritionService'

export interface DataProps{
    nome: string;
    peso: string;
    altura: string;
    idade: string;
    sexo: string;
    objetivo: string;
    nivel: string;
}

class CreateNutritionController {
    
    async handle(request: FastifyRequest, reply: FastifyReply){
       const {nome, peso, altura, idade, sexo, objetivo, nivel} = request.body as DataProps;

       const createNutrition = new CreateNutritionService();

       const nutrition = await createNutrition.execute({
        nome, 
        peso, 
        altura, 
        idade, 
        sexo, 
        objetivo, 
        nivel,
    });

       reply.send(nutrition);
    }
}

export {CreateNutritionController}