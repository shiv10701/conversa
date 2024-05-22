import React, { Children, createContext, useState } from 'react'

export const FontFamily= createContext();

export const FontProvider= ({children})=>{
    const [Font,setFont]=useState(localStorage.getItem("choosenFontFam") || null);

    return (
    <FontFamily.Provider value={{Font,setFont}}>
        {children}
    </FontFamily.Provider>
    )
}
