import { validateTokenIamOracle } from "@/backend/adapters/iam/oracle/validateTokenIamOracle";

export async function validateToken(dni: string, password: string): Promise<void> {
  await validateTokenIamOracle(dni, password);
}