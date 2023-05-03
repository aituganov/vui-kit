export function password(pwd: string) {
  if (pwd && pwd.length < 8) {
    return 'More than 7 symbols'
  }
  return true
}
