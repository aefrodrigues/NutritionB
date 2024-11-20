import {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyRequest,
    FastifyReply
} from 'fastify'
import {CreateNutritionController} from './controllers/CreateNutritionController'

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){

    fastify.get("/teste", (request: FastifyRequest, reply: FastifyReply) => {
           
        let responseText = "```json\n{\n  \"nome\": \"Alvaro\",\n  \"sexo\": \"Masculino\",\n  \"idade\": 31,\n  \"altura\": 1.70,\n  \"peso\": 85,\n  \"objetivo\": \"perder peso\",\n  \"refeicoes\": [\n    {\n      \"horario\": \"7:00\",\n      \"nome\": \"Cafe da manha\",\n      \"alimentos\": [\n        \"1 copo (200ml) de leite desnatado\",\n        \"1 fatia de pao integral\",\n        \"1 colher (sopa) de geleia diet\",\n        \"1 fruta (maça, banana ou laranja)\"\n      ]\n    },\n    {\n      \"horario\": \"10:00\",\n      \"nome\": \"Lanche da manha\",\n      \"alimentos\": [\n        \"1 iogurte desnatado\",\n        \"1 punhado de castanhas\"\n      ]\n    },\n    {\n      \"horario\": \"13:00\",\n      \"nome\": \"Almoco\",\n      \"alimentos\": [\n        \"150g de carne grelhada (frango, peixe ou carne magra)\",\n        \"1 concha de arroz integral\",\n        \"1 concha de feijao\",\n        \"Salada verde a vontade\"\n      ]\n    },\n    {\n      \"horario\": \"16:00\",\n      \"nome\": \"Lanche da tarde\",\n      \"alimentos\": [\n        \"1 fruta (maça, banana ou laranja)\",\n        \"1 iogurte desnatado\"\n      ]\n    },\n    {\n      \"horario\": \"19:00\",\n      \"nome\": \"Jantar\",\n      \"alimentos\": [\n        \"150g de salada de legumes grelhados\",\n        \"1 omelete de 2 ovos\"\n      ]\n    }\n  ],\n  \"suplementos\": [\n    \"Proteina do soro do leite (whey protein)\",\n    \"Creatina (opcional, para auxiliar na performance fisica)\"\n  ]\n}\n```"
           
        try{

            //extrait o JSON
            let jsonString = responseText.replace(/```\w*\n/g,'').replace(/\n```/g,'').trim();

            let jsonObject = JSON.parse(jsonString);
            
            return reply.send(jsonString);
        }catch(err){
            console.log(err)
        }


        reply.send({ ok: true })
    })

    fastify.post("/create", async(request: FastifyRequest, reply: FastifyReply) => {
        return new CreateNutritionController().handle(request, reply)
    })

}

