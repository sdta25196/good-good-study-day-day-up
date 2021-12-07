import path from "path"

export default function projectPathResolve(relativePath: string): string {
  return path.resolve(process.cwd(), relativePath)
}