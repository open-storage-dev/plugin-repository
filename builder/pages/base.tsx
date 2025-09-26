export function BasePage({ children, page }: { children: React.ReactNode, page: 'list' }) {
    return <>
        <html lang="en" className="dark">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                <title>Plugin Repository - OpenStorage</title>
                <meta name="description" content="Plugin Repository for OpenStorage" />
                <link rel="icon" href="/favicon.ico" />

                <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
                <style type="text/tailwindcss" dangerouslySetInnerHTML={{
                    __html: `
                    @theme {
                        --font-sans: 'JetBrains Mono', monospace;
                    }
                    `
                }}>
                </style>
            </head>
            <body className="antialiased bg-white text-black dark:bg-black dark:text-white p-0 m-0 min-h-screen pt-14 flex flex-col justify-between">
                <div className="w-full max-w-6xl mx-auto border border-white/20">
                    <header className="border-b border-white/20 p-6 flex justify-between items-center">
                        <div className="flex items-center gap-8">
                            <img src="/assets/OpenStorage-logo-white.svg" alt="OpenStorage" className="h-14 w-auto" />
                            <p className="text-2xl font-bold">Plugin Repository</p>
                        </div>

                        <nav>
                            <ul className="flex items-center gap-5">
                                <li>
                                    <a href="/" className={page === 'list' ? 'underline' : ''}>All plugins</a>
                                </li>
                                <li>
                                    <a href="https://github.com/open-storage-dev/plugin-repository/compare">Submit a plugin</a>
                                </li>
                            </ul>
                        </nav>
                    </header>
                    <main className="p-6">
                        {children}
                    </main>
                </div>

                <footer className="p-6 mt-20">
                    <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-2">
                        <p className="text-sm">
                            <span className="opacity-75">OpenStorage is made by </span>
                            <a href="https://mateffy.org" className="text-white hover:underline">Mátéffy Software Research</a>
                        </p>

                        <p className="text-sm">
                            <span className="opacity-75">© Copyright {new Date().getFullYear()} </span>
                            <a href="https://mateffy.me" className="text-white hover:underline">Lukas Mátéffy</a>
                            <span className="opacity-75"> – </span>
                            <a href="https://mateffy.me" className="text-white hover:underline">Imprint & Privacy Policy</a>
                        </p>
                    </div>
                </footer>
            </body>
        </html>
    </>;
}