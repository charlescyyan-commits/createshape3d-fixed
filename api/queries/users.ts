export async function findUserByUnionId(unionId: string) {
  const { env } = await import("../lib/env");
  const isAdmin = unionId === env.ownerUnionId;
  return { id: 1, unionId, name: "User", email: "", role: isAdmin ? "admin" : "user" };
}

export async function upsertUser(data: { unionId: string; name?: string; email?: string; avatar?: string }) {
  const { env } = await import("../lib/env");
  const isAdmin = data.unionId === env.ownerUnionId;
  return { id: 1, unionId: data.unionId, name: data.name || "User", email: data.email || "", role: isAdmin ? "admin" : "user" };
}
