export async function wait(ms: number = 1500) {
  return await new Promise((resolve) => setTimeout(resolve, ms))
}
