export const MOCK_REFERENCE = {
  id: 1,
  title: "Clean Code",
  description: "Boas práticas",
  author: "Robert C. Martin",
  url: "https://exemplo.com",
  category: "livro",
  status: "pending" as const,
  tags: JSON.stringify(["typescript", "boas-praticas"]),
  rating: 5,
  createdAt: new Date(),
  updatedAt: new Date(),
};
