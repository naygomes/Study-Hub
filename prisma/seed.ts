import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const references = [
    {
      title: "Clean Code",
      description:
        "Guia de boas práticas para escrever código limpo e legível.",
      author: "Robert C. Martin",
      url: "https://www.oreilly.com/library/view/clean-code/9780136083238/",
      category: "livro",
      status: "completed" as const,
      tags: JSON.stringify(["boas-praticas", "arquitetura"]),
      rating: 5,
    },
    {
      title: "Node.js Documentation",
      description: "Documentação oficial do Node.js.",
      author: null,
      url: "https://nodejs.org/en/docs",
      category: "site",
      status: "reading" as const,
      tags: JSON.stringify(["nodejs", "backend"]),
      rating: null,
    },
    {
      title: "Prisma ORM - Getting Started",
      description: "Guia introdutório do Prisma ORM com TypeScript.",
      author: "Prisma Team",
      url: "https://www.prisma.io/docs/getting-started",
      category: "artigo",
      status: "completed" as const,
      tags: JSON.stringify(["prisma", "typescript", "banco-de-dados"]),
      rating: 4,
    },
    {
      title: "TypeScript Handbook",
      description: "Documentação oficial do TypeScript com exemplos práticos.",
      author: "Microsoft",
      url: "https://www.typescriptlang.org/docs/handbook/intro.html",
      category: "site",
      status: "reading" as const,
      tags: JSON.stringify(["typescript"]),
      rating: null,
    },
    {
      title: "The Pragmatic Programmer",
      description:
        "Livro sobre produtividade e boas práticas de desenvolvimento.",
      author: "David Thomas, Andrew Hunt",
      url: "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/",
      category: "livro",
      status: "pending" as const,
      tags: JSON.stringify(["carreira", "boas-praticas"]),
      rating: null,
    },
    {
      title: "Express.js Guide",
      description:
        "Guia completo para aprender Express.js com exemplos práticos.",
      author: "Express.js Team",
      url: "https://expressjs.com/en/starter/installing.html",
      category: "artigo",
      status: "review" as const,
      tags: JSON.stringify(["express", "nodejs", "backend"]),
      rating: 5,
    },
  ];

  for (const reference of references) {
    await prisma.reference.upsert({
      where: { id: references.indexOf(reference) + 1 },
      update: {},
      create: reference,
    });
  }

  console.log(`✅ Seed concluído: ${references.length} referências inseridas.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
