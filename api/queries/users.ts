export async function findUserByUnionId(unionId: string) {
  return { id: 1, unionId, name: "User", email: "", role: "user" };
}

export async function upsertUser(data: { unionId: string; name?: string; email?: string; avatar?: string }) {
  return { id: 1, unionId: data.unionId, name: data.name || "User", email: data.email || "", role: "user" };
}
