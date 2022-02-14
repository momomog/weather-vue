import { baseImageUrl } from '@/api/weather/api'

export const getImageUrlByCode = (imageCode: string) => `${baseImageUrl}${imageCode}.png`
