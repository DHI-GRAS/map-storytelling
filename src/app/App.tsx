import React, { FC } from 'react'
import AppScreen from 'app-screen/AppScreen'
import ThemeProvider from '@bit/dhi-solutions.shared.ui.theme-provider'

const App: FC = () => (
		<ThemeProvider overrides={{}}>
			<AppScreen />
		</ThemeProvider>
)
export default App
