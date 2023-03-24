import components from "./components";
import paths from "./paths";
import schemas from "./schemas";

export default {
  openapi: "3.0.0",
  info: {
    title: "4Dev - Enquetes para Programadores",
    description:
      "Essa é a documentação da API feita pelo instrutor Rodrigo Manguinho no curso da Udemy de NodeJs usando Typescript, TDD, Clean Architecture e seguindo os princípios do SOLID e Design Patterns.",
    version: "1.0.0",
    contact: {
      name: "Fellipe Lauton",
      email: "lipe_lauton@gmail.com",
      url: "https://www.linkedin.com/in/fellipe-lauton/",
    },
  },
  servers: [
    {
      url: "/api",
      description: "Servidor Principal",
    },
  ],
  tags: [
    {
      name: "Login",
      description: "APIs relacionadas a Login",
    },
    {
      name: "Enquete",
      description: "APIs relacionadas a Enquete",
    },
  ],
  paths,
  schemas,
  components,
};
