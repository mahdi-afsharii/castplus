import { Nunito, Lalezar, Passion_One, Vazirmatn, Roboto, Baloo_Bhaijaan_2 } from 'next/font/google'

export const lalezar = Lalezar({ subsets: ['arabic'], weight: '400' })
export const nunito = Nunito({ subsets: ['latin', 'latin-ext', 'vietnamese', 'cyrillic', 'cyrillic-ext'] })
export const passionOne = Passion_One({ subsets: ['latin'], weight: '700'})
export const vazir = Vazirmatn({ subsets: ['latin'], weight: '400', variable: "--font-persian", display: "swap",})
export const vazirBold = Vazirmatn({ subsets: ['latin'], weight: '700'})
export const roboto = Roboto({ subsets: ['latin'], weight: '900'})
export const lightRoboto = Roboto({ subsets: ['latin'], weight: '400'})
export const balooBhaijaan2 = Baloo_Bhaijaan_2({ subsets: ['latin'], weight: '400', variable: "--font-english", display: "swap",})

 