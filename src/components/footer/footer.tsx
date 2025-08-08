import Logo from '../../assets/logo.svg';

// Footer Component
export const Footer = () => (
  <footer className="border-t border-gray-200 bg-white">
    <div className="mx-auto max-w-[1600px] px-6 py-12 md:py-16">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
            <div className="flex items-center gap-2">
              <img src={Logo} alt="Reclaim Logo" className="w-[140px]" />
            </div>
            <nav className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-8">
              <a
                href="https://reclaimprotocol.notion.site/Privacy-Policy-Reclaim-Protocol-115275b816cb80ab94b8ca8616673658"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="https://reclaimprotocol.notion.site/Terms-of-Service-Reclaim-Protocol-13c275b816cb80b1a5ade76c6f2532dd"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Terms of Service
              </a>
            </nav>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex gap-4">
              <a
                href="https://twitter.com/reclaimprotocol"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-100 p-2.5 text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="https://github.com/reclaimprotocol"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-100 p-2.5 text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-gray-200 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-500">© 2025 Reclaim Protocol. Privacy-first age verification.</p>
          <a
            href="https://twitter.com/reclaimprotocol"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            @reclaimprotocol
          </a>
        </div>
      </div>
    </div>
  </footer>
);
