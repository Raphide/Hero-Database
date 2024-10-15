import React, { createContext, useState } from 'react'

export const HeroSelectContext = createContext(null);

const HeroSelectContextProvider = ({children: any}) => {
    const [heroId, setHeroId] = useState<number>(0);

  return (
    <HeroSelectContext.Provider value={{heroId, setHeroId}}>{children}</HeroSelectContext.Provider>
  )
}

export default HeroSelectContextProvider