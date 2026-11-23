import DockNav from './components/DockNav'
import EpisodePlayer from './components/Player/EpisodePlayer'
import Header from './components/Header'
import Provider from './components/Provider'
import './globals.css'
import { EpisodeProvider } from './context/EpisodeContext'
import Sidebar from './components/Sidebar'
import { balooBhaijaan2, vazir } from './utils/fonts'

export const metadata = {
	title: 'CastPlus',
	description: 'CastPlus Podcast Platform',
	manifest: '/manifest.json',
	themeColor: '#ffffff',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link rel="manifest" href="/manifest.json"/>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
				<link rel="manifest" href="/site.webmanifest"></link>
				<meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff"></meta>
			</head>
			<body className={`${balooBhaijaan2.className} ${vazir.className} ${'bg-White'}`}>
				<Provider>
					{/* <Header /> */}
					<EpisodeProvider>
						<main className="mb-20 md:mb-0">
  							<div className="flex min-h-screen">
  								{/* Sidebar */}
  								<aside className="hidden md:block fixed top-0 left-0 h-screen w-20 lg:w-64 z-50">
  									<Sidebar />
  								</aside>

  								{/* Main Content */}
  								<div className="flex-1 min-w-0 md:ml-16 lg:ml-64">
  									{children}
  								</div>
  							</div>
						</main>
						<EpisodePlayer />
					</EpisodeProvider>
					<DockNav />
				</Provider>
			</body>
		</html>
	)
}
