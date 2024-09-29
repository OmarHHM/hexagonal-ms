#!/usr/bin/env node

import { Plop, run } from "plop";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { cwd } from 'process';

const __dirname = cwd();
export default function funcionPlop(plop) {
    plop.setHelper('eq', function (a, b) {
        return a === b;
    });

     plop.setHelper('generateSecretKey', function () {
        return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    });

    const plopfilePath = __dirname;

    plop.setGenerator('Generar Proyecto', {
        description: 'Crea API REST con spring boot',
        prompts: [
            {
                type: 'input',
                name: 'projectName',
                message: 'Nombre del proyecto:'
            },
            {
                type: 'input',
                name: 'dominio',
                message: 'Nombre de tu dominio o paquetes Ej: com.ejemplo:'
            },

            {
                type: 'list',
                name: 'database',
                message: 'Base de datos:',
                choices: ['mysql', 'postgresql','sqlserver']
            }
        ],
        actions: [
            {
                type: 'add',
                path: `${plopfilePath}/{{projectName}}/pom.xml`,
                templateFile: 'templates/pom.hbs'
            },
            {
                type: 'add',
                path: `${plopfilePath}/{{projectName}}/src/main/resources/application.properties`,
                templateFile: 'templates/application.properties.hbs',
                data: {
                    secretKey: plop.getHelper('generateSecretKey')()
                }
            },
            {
                type: 'add',
                path: `${plopfilePath}/{{projectName}}/src/main/java/{{dominio}}/{{projectName}}/Application.java`,
                templateFile: 'templates/Application.java.hbs'
            },

            {
                type: 'add',
                path: `${plopfilePath}/{{projectName}}/src/main/java/{{dominio}}/{{projectName}}/SwaggerConfig.java`,
                templateFile: 'templates/SwaggerConfig.java.hbs',
                skipIfExists: true
            },

            {
                type: 'add',
                path: `${plopfilePath}/{{projectName}}/src/main/java/{{dominio}}/{{projectName}}/infrastructure/config/SecurityConfig.java`,
                templateFile: 'templates/SecurityConfig.java.hbs',
                skipIfExists: true
            },

            {
                type: 'add',
                path: `${plopfilePath}/{{projectName}}/src/main/java/{{dominio}}/{{projectName}}/infrastructure/repository/UserRepository.java`,
                templateFile: 'templates/UserRepository.java.hbs',
                skipIfExists: true
            },


            {
                type: 'add',
                path: `${plopfilePath}/{{projectName}}/src/main/java/{{dominio}}/{{projectName}}/infrastructure/security/JwtAuthenticationFilter.java`,
                templateFile: 'templates/JwtAuthenticationFilter.java.hbs',
                skipIfExists: true
            },


            {
                type: 'add',
                path: `${plopfilePath}/{{projectName}}/src/main/java/{{dominio}}/{{projectName}}/domain/model/User.java`,
                templateFile: 'templates/User.java.hbs',
                skipIfExists: true
            },
            {
                type: 'add',
                path: `${plopfilePath}/{{projectName}}/src/main/java/{{dominio}}/{{projectName}}/domain/model/Role.java`,
                templateFile: 'templates/Role.java.hbs',
                skipIfExists: true
            },

            {
                type: 'add',
                path: `${plopfilePath}/{{projectName}}/src/main/java/{{dominio}}/{{projectName}}/api/controller/UserController.java`,
                templateFile: 'templates/UserController.java.hbs',
                skipIfExists: true
            },

            {
                type: 'add',
                path: `${plopfilePath}/{{projectName}}/src/main/java/{{dominio}}/{{projectName}}/application/service/UserService.java`,
                templateFile: 'templates/UserService.java.hbs',
                skipIfExists: true
            },

            {
                type: 'add',
                path: `${plopfilePath}/{{projectName}}/src/main/java/{{dominio}}/{{projectName}}/application/service/AuthenticationService.java`,
                templateFile: 'templates/AuthenticationService.java.hbs',
                skipIfExists: true
            },
          
            {
                type: 'add',
                path: `${plopfilePath}/{{projectName}}/src/main/java/{{dominio}}/{{projectName}}/application/service/TokenService.java`,
                templateFile: 'templates/TokenService.java.hbs',
                skipIfExists: true
            },

            {
                type: 'add',
                path: `${plopfilePath}/{{projectName}}/src/main/java/{{dominio}}/{{projectName}}/application/exceptions/AuthenticationFailedException.java`,
                templateFile: 'templates/AuthenticationFailedException.java.hbs',
                skipIfExists: true
            },
          
            {
                type: 'add',
                path: `${plopfilePath}/{{projectName}}/src/main/java/{{dominio}}/{{projectName}}/application/exceptions/ResourceAlreadyExistsException.java`,
                templateFile: 'templates/ResourceAlreadyExistsException.java.hbs',
                skipIfExists: true
            },

            {
                type: 'add',
                path: `${plopfilePath}/{{projectName}}/src/main/java/{{dominio}}/{{projectName}}/application/dto/AuthenticationRequestDTO.java`,
                templateFile: 'templates/AuthenticationRequestDTO.java.hbs',
                skipIfExists: true
            },
            {
                type: 'add',
                path: `${plopfilePath}/{{projectName}}/src/main/java/{{dominio}}/{{projectName}}/application/dto/AuthenticationResponseDTO.java`,
                templateFile: 'templates/AuthenticationResponseDTO.java.hbs',
                skipIfExists: true
            },
            {
                type: 'add',
                path: `${plopfilePath}/{{projectName}}/src/main/java/{{dominio}}/{{projectName}}/application/dto/UserRequestDTO.java`,
                templateFile: 'templates/UserRequestDTO.java.hbs',
                skipIfExists: true
            },
            {
                type: 'add',
                path: `${plopfilePath}/{{projectName}}/src/main/java/{{dominio}}/{{projectName}}/application/dto/UserResponseDTO.java`,
                templateFile: 'templates/UserResponseDTO.java.hbs',
                skipIfExists: true
            },

            {
                type: 'add',
                path: `${plopfilePath}/{{projectName}}/src/main/java/{{dominio}}/{{projectName}}/util/UserMapper.java`,
                templateFile: 'templates/UserMapper.java.hbs',
                skipIfExists: true
            },

         
        ]
    });

    plop.setGenerator('Generar endpoint', {
        description: 'Crea un nuevo endpoint en el proyecto',
        prompts: [

            {
                type: 'input',
                name: 'projectName',
                message: 'Nombre del proyecto:'
            },
            {
                type: 'input',
                name: 'dominio',
                message: 'Nombre de tu dominio o paquetes Ej: com.ejemplo:'
            },

            {
                type: 'input',
                name: 'recurso',
                message: 'Nombre del recurso, es el nombre que quieras que aparezca en path (ej: customer = http://localhost:8080/api/cutomers) :'
            }
        ],
        actions: [
            {
                type: 'add',
                path: `${plopfilePath}/src/main/java/{{dominio}}/api/controller/{{recurso}}sController.java`,
                templateFile: 'templates/TemplateController.java.hbs'
            },
            
            {
                type: 'add',
                path: `${plopfilePath}/src/main/java/{{dominio}}/application/service/{{recurso}}sService.java`,
                templateFile: 'templates/TemplateService.java.hbs'
            },
            
            {
                type: 'add',
                path: `${plopfilePath}/src/main/java/{{dominio}}/application/dto/{{recurso}}sResponseDTO.java`,
                templateFile: 'templates/TemplateResponseDTO.java.hbs'
            },

            {
                type: 'add',
                path: `${plopfilePath}/src/main/java/{{dominio}}/application/dto/{{recurso}}sRequestDTO.java`,
                templateFile: 'templates/TemplateRequestDTO.java.hbs'
            },  
            {
                type: 'add',
                path: `${plopfilePath}/src/main/java/{{dominio}}/domain/model/{{recurso}}.java`,
                templateFile: 'templates/TemplateModel.java.hbs'
            },      
            {
                type: 'add',
                path: `${plopfilePath}/src/main/java/{{dominio}}/infraestructure/repository/{{recurso}}sRepository.java`,
                templateFile: 'templates/TemplateRepository.java.hbs'
            },   
            {
                type: 'add',
                path: `${plopfilePath}/src/main/java/{{dominio}}/util/{{recurso}}Mapper.java`,
                templateFile: 'templates/TemplateMapper.java.hbs'
            },   
        ]
    });
    plop.setPrompt('cwd', process.cwd());
};
