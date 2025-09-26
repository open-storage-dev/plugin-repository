export function BasePage({ children }: { children: React.ReactNode }) {
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
            <body className="antialiased bg-white text-black dark:bg-black dark:text-white p-0 m-0">
                <div className="max-w-6xl mx-auto border border-white/20  mt-14">
                    <header className="border-b border-white/20 p-6 flex justify-between items-center">
                        <div className="flex items-center gap-8">
                            <img src="/assets/OpenStorage-logo-white.svg" alt="OpenStorage" className="h-14 w-auto" />
                            <p className="text-2xl font-bold">Plugin Repository</p>
                        </div>

                        <nav>
                            <ul className="flex items-center gap-5">
                                <li>
                                    <a href="/">All plugins</a>
                                </li>
                                <li>
                                    <a href="https://github.com/open-storage/plugin-repository/pulls">Submit a plugin</a>
                                </li>
                            </ul>
                        </nav>
                    </header>
                    <main className="p-6">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    </>;
}