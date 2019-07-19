export function parsePrice(price) {
  return price
    .toLocaleString(
      'pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 2
      }
    )
}

export function currentDate() {
  return new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
}
