export const MOCK_REFERENCE_SERVICE = {
  id: 1,
  title: "Clean Code",
  description: "Boas práticas",
  author: "Robert C. Martin",
  url: "https://exemplo.com",
  category: "livro",
  status: "pending" as const,
  tags: ["typescript", "boas-praticas"],
  rating: 5,
  createdAt: new Date(),
  updatedAt: new Date(),
};
