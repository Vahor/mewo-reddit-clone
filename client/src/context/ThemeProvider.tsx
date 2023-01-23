import React, {createContext, useContext, useEffect, useState} from "react";

type ThemeContextProps = {
    theme: 'light' | 'dark'
    setTheme: React.Dispatch<React.SetStateAction<ThemeContextProps['theme']>>,
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

const COOKIE_NAME = "mewo_reddit_theme"

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('Theme not defined')
    }
    return context
}

const getThemeOrDefault = (theme: any): ThemeContextProps['theme'] => {
    if (theme !== 'light' && theme !== 'dark') {
        return 'light'
    }
    return theme
}

export const ThemeContextProvider: React.FC<{ children: React.ReactElement }> = ({children}) => {

    const [theme, setTheme] = useState<ThemeContextProps['theme']>('light')

    useEffect(() => {
        setTheme(getThemeOrDefault(window.sessionStorage.getItem(COOKIE_NAME)))
    }, [])

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme
            }}
        >
            <div className={`${theme} flex flex-col justify-between h-screen`}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}
