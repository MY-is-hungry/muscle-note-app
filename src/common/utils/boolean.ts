
export const getFulfillment = (target: number, current: number) => {
  return target <= current
}

export const isProduction = process.env.NODE_ENV === 'production'
